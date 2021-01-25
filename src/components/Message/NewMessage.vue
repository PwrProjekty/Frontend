<template>
  <div class="new_message">
    <textarea class="message_input" v-model="message"
              rows="3"></textarea>
    <button class="send" :onclick="send" :disabled="message.length===0">&gt;</button>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
  name: 'NewMessage',
  props: {
    topic: {
      type: String,
      required: true,
    },
    sender_id: {
      type: Number,
      required: true,
    },
    receiver_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      message: '',
    };
  },
  methods: {
    send() {
      const newMess = JSON.stringify({
        topic: this.topic,
        sender_id: this.sender_id,
        receiver_id: this.receiver_id,
        content: this.message,
      });
      axios.post(config.apiPath.concat('/message'), newMess, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          this.$emit('sent');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new_message {
  border: grey solid 1px;
  display: grid;
  grid-template-columns: 9fr 1fr;
}

.message_input {
  resize: none;
  overflow-y: scroll;
}
</style>
