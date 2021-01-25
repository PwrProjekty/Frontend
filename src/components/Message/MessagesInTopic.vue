<template>
  <div class="messages_in_topic">
    <div class="messages_header">
      <div class="name_and_topic">
        {{ receiver_name }} {{ receiver_surname }} - {{ topic }}
      </div>
      <button class="cancel" :onclick="cancel">X</button>
    </div>
    <div class="messages_content" ref="messagesContainer">
      <message-item v-for="message in messages"
                    :class="message.sender_id===receiver_id?'receiver':'sender'"
                    class="message" :message="message.content" :key="message.id"/>
    </div>
    <new-message :topic="topic" :sender_id="sender_id" :receiver_id="receiver_id"
                 @sent="sent"/>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';
import MessageItem from '@/components/Message/MessageItem.vue';
import NewMessage from '@/components/Message/NewMessage.vue';

export default {
  name: 'MessagesInTopic',
  components: {
    NewMessage,
    MessageItem,
  },
  props: {
    trip_id: {
      type: Number,
      required: true,
    },
    receiver_name: {
      type: String,
      required: true,
    },
    receiver_surname: {
      type: String,
      required: true,
    },
    receiver_id: {
      type: Number,
      required: true,
    },
    sender_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      messages: [],
      topic: `Wycieczka nr ${this.trip_id}`,
    };
  },
  methods: {
    async getMessages() {
      await axios.get(config.apiPath.concat('/messages'), {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          topic: this.topic,
          user1_id: this.sender_id,
          user2_id: this.receiver_id,
        },
      })
        .then((response) => {
          this.messages = response.data.json_list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$emit('cancel');
    },
    sent() {
      axios.put(config.apiPath.concat(`/trip/explain/${this.trip_id}/${this.sender_id}`))
        .then(() => {
          this.$emit('update');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    await this.getMessages();
    const content = this.$refs.messagesContainer;
    content.scrollTop = content.scrollHeight;
  },
};
</script>

<style lang="scss">
.messages_in_topic {
  border: black solid 2px;
  background-color: white;
  min-width: 400px;
  width: 90%;
}

.messages_content {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
}

.message {
  border: solid gray 1px;
  border-radius: 5px;
  width: 70%;
}

.sender {
  background-color: #8a8a8a;
  color: #ffffff;
  align-self: flex-end;
  border: solid gray 1px;
  margin: 0.5rem 0 0.5rem 2rem;
}

.receiver {
  background-color: #f5f5f5;
  color: #000000;
  align-self: flex-start;
  border: solid gray 1px;
  margin: 0.5rem 2rem 0.5rem 0;
}

.messages_header {
  background-color: #d6d6d6;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  border: solid gray 1px;
}

button {
  font-weight: bold;
  border: grey solid 1px;
}
</style>
