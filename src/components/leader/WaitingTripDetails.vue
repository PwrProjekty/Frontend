<template>
  <div class="waiting_trip_details">
    <h1>
      Szczegóły wycieczki nr: {{ id }}
    </h1>
    <div class="header">
      <div class="name_surname">
        Imie i nazwisko turysty: {{ tourist_name }} {{ tourist_surname }}
      </div>
      <div class="trip_time">
        Czas trwania wycieczki: {{ start_date }} - {{ end_date }}
      </div>
    </div>
    <div class="status">
      Status wycieczki: {{ status }}
    </div>
    <div class="options">
      <button class="cancel" :onclick="cancelButtonClick">Powrót</button>
      <button class="confirm" :onclick="confirmButtonClick">Zatwierdź</button>
      <button class="explaining" :onclick="explainingButtonClick">Odeślij do wyjaśnienia</button>
      <button class="reject" :onclick="rejectButtonClick">Odrzuć</button>
    </div>
    <div class="confirmations">
      <div class="list_header">
        Potwierdzenia
      </div>
      <div class="list_content">
        <div v-for="(confirmation, index) in confirmations"
             class="conf" :class="index%2===0?'even':'odd'"
             :key="confirmation.waypoint_name+confirmation.date_time">
          <div class="main_data">
            <div class="waypoint_name">
              Punkt na trasie: {{ confirmation.waypoint_name }}
            </div>
            <div class="qr" v-if="confirmation.is_qr">
              Zeskanowano kod QR
            </div>
            <div class="qr" v-else>
              Nie zeskanowano kodu QR
            </div>
          </div>
          <div class="description">
            {{ confirmation.description }}
          </div>
          <div class="photos">
            <div v-for="photo in confirmation.photos" class="photo" :key="photo">
              <img :src="api_path + photo" alt="Zdjęcie potwierdzające"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <waiting-trip-decision class="window transform" v-if="confirm_window"
                           :id="id" :does_confirm="true"
                           @update="update" @cancel="cancel"/>
    <waiting-trip-decision class="window transform" v-if="reject_window"
                           :id="id" :does_confirm="false"
                           @update="update" @cancel="cancel"/>
    <messages-in-topic class="window transform_top" v-if="message_window"
                       :receiver_id="tourist_id" :sender_id="2" :trip_id="id"
                       :receiver_name="tourist_name" :receiver_surname="tourist_surname"
                       @update="update" @cancel="cancel"/>
  </div>
</template>

<script>
import WaitingTripDecision from '@/components/leader/WaitingTripDecision.vue';
import MessagesInTopic from '@/components/Message/MessagesInTopic.vue';
import config from '@/config';

export default {
  name: 'WaitingTripDetails',
  components: {
    MessagesInTopic,
    WaitingTripDecision,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      tourist_name: this.item.tourist_name,
      tourist_surname: this.item.tourist_surname,
      tourist_id: this.item.tourist_id,
      start_date: this.item.start_date,
      end_date: this.item.end_date,
      status: this.item.status,
      confirmations: this.item.confirmations,
      confirm_window: false,
      reject_window: false,
      message_window: false,
      api_path: config.apiPath,
    };
  },
  methods: {
    cancelButtonClick() {
      this.$emit('cancel');
    },
    confirmButtonClick() {
      this.confirm_window = true;
    },
    rejectButtonClick() {
      this.reject_window = true;
    },
    explainingButtonClick() {
      this.message_window = true;
    },
    update() {
      this.confirm_window = false;
      this.reject_window = false;
      this.message_window = false;
      this.$emit('update');
    },
    cancel() {
      this.confirm_window = false;
      this.reject_window = false;
      this.message_window = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.waiting_trip_details {
  min-width: 400px;
  width: 60%;
  height: 80%;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  border: black solid 1px;
  color: black;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.header * {
  margin: 0.3rem;
}

.list_header {
  background-color: #d6d6d6;
  text-align: left;
  padding: 0.2rem;
  border: solid gray 1px;
}

.confirmations {
  margin: 0.3rem 0;
  border: solid black 2px;
  overflow-y: scroll;
  height: 75%;
}

.even {
  background-color: #f5f5f5;
  color: #000000;
}

.odd {
  background-color: #8a8a8a;
  color: #ffffff;
}

.main_data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0;
}
.conf{
  border-top: 2px black solid;
  border-bottom: 2px black solid;
}

.options {
  display: flex;
  justify-content: space-around;
}

.status, .description {
  margin: 0.3rem;
}

.window {
  z-index: 1;
  position: fixed;
}

.transform {
  left: 50%;
  top: 30%;
  transform: translate(-50%);
}

.transform_top {
  left: 50%;
  top: 5%;
  transform: translate(-50%);
}

.wrap_content {
  display: flex;
  flex-wrap: wrap;
}

.photos {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 15px;
}

.photo {
  width: 30%;
  margin: auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
