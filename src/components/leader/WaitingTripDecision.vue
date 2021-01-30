<template>
  <div class="decision">
    <div class="confirm" v-if="does_confirm">
      <div class="message">
        Czy na pewno chcesz zatwierdzić wycieczkę nr: {{ id }}
      </div>
      <div class="options">
        <button class="yes" :onclick="confirm">Tak</button>
        <button class="no" :onclick="cancel">Nie</button>
      </div>
    </div>
    <div class="reject" v-else>
      <div class="message">
        Czy na pewno chcesz odrzucić wycieczkę nr: {{ id }}
      </div>
      <div class="options">
        <button class="yes" :onclick="reject">Tak</button>
        <button class="no" :onclick="cancel">Nie</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
  name: 'WaitingTripDecision',
  props: {
    does_confirm: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    confirm() {
      axios.put(config.apiPath.concat(`/trip/confirm/${this.id}/2`))
        .then(() => {
          this.$emit('update');
        })
        .catch((error) => {
          console.log(error);
          this.$emit('update');
        });
    },
    reject() {
      axios.put(config.apiPath.concat(`/trip/reject/${this.id}/2`))
        .then(() => {
          this.$emit('update');
        })
        .catch((error) => {
          console.log(error);
          this.$emit('update');
        });
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.decision {
  min-width: 150px;
  width: 60%;
  background-color: white;
  padding: 4rem;
  border-radius: 10px;
  border: black solid 1px;
  color: black;
}

.message {
  margin: 0.5rem auto;
}

button {
  margin: 0 1rem;
  padding: 0.2rem 0.8rem;
}
</style>
