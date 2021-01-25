<template>
  <div class="add_waypoint">
    <h1>
      Dodawanie punktu na trasie:
    </h1>
    <div class="form">
      <div class="input_row">
        <div class="label">
          Współrzędna X:
        </div>
        <input type="number" v-model="x">
      </div>
      <div class="input_row">
        <div class="label">
          Współrzędna Y:
        </div>
        <input type="number" v-model="y">
      </div>
      <div class="input_row">
        <div class="label">
          Nazwa:
        </div>
        <input v-model="name">
      </div>
      <div class="input_row">
        <div class="label">
          Wyspokość NPM:
        </div>
        <input type="number" v-model="asl">
      </div>
      <div class="options">
        <button class="cancel" :onclick="cancel">Anuluj</button>
        <button class="confirm" :onclick="confirm">Potwierdź</button>
      </div>
    </div>
    <div class="error_message" v-if="incorrectInput">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
  name: 'AddWaypoint',
  data() {
    return {
      x: 0.0,
      y: 0.0,
      name: '',
      asl: 0,
      incorrectInput: false,
      error_message: '',
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async confirm() {
      const newWaypoint = JSON.stringify({
        x: parseInt(this.x, 10),
        y: parseInt(this.y, 10),
        name: this.name,
        asl: parseInt(this.asl, 10),
      });
      await axios.post(config.apiPath.concat('/waypoint'), newWaypoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          this.$emit('confirm');
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              this.error_message = 'Wprowadzono błędne dane';
              break;
            case 409:
              this.error_message = 'Punkt na trasie o podanych koordynatach już istnieje';
              break;
            default:
              this.error_message = 'Wystąpił nieoczekiwany błąd';
          }
          this.incorrectInput = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.add_waypoint {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  border: black solid 1px;
}

.input_row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 0.5rem;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

button {
  width: 5rem;
  margin: 5px auto;
  padding: 2px;
  border-radius: 5px;
}

.error_message {
  color: red;
  padding: 0.7rem 0 0 0;
}
</style>
