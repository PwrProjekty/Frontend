<template>
  <div class="edit_waypoint">
    <h1>
      Modyfikacja punktu na trasie: {{ x }}/{{ y }}
    </h1>
    <div class="form">
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
  name: 'EditWaypoint',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      name: this.item.waypoint_name,
      x: this.item.coordinate_x,
      y: this.item.coordinate_y,
      asl: this.item.height_asl,
      incorrectInput: false,
      error_message: '',
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async confirm() {
      const editedWaypoint = JSON.stringify({
        x: this.x - 0,
        y: this.y - 0,
        name: this.name,
        asl: this.asl - 0,
      });
      await axios.put(config.apiPath.concat(`/waypoint/${this.id}`), editedWaypoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          this.$emit('update');
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              this.error_message = 'Wprowadzono błędne dane';
              break;
            case 404:
              this.error_message = 'Punkt na trasie o podanym id nie istnieje';
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
.edit_waypoint {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  border: black solid 1px;
  color: black;
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
