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
          Wysokość NPM:
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
    confirm() {
      const editedWaypoint = this.getDataObject();
      if (editedWaypoint) this.sendRequest(JSON.stringify(editedWaypoint));
    },
    getDataObject() {
      const dataObject = {
        x: parseInt(this.x, 10),
        y: parseInt(this.y, 10),
        name: this.name,
        asl: parseInt(this.asl, 10),
      };
      if ((!dataObject.x && dataObject.x !== 0) || (!dataObject.y && dataObject.y !== 0)
        || (!dataObject.asl && dataObject.asl !== 0)) {
        this.error_message = 'Proszę uzupełnić wszystkie pola';
        this.incorrectInput = true;
        return false;
      }
      if (dataObject.asl <= 0) {
        this.error_message = 'Wysokość nad poziom morza musi być wartością dodatnią';
        this.incorrectInput = true;
        return false;
      }
      if (dataObject.name.length === 0) {
        this.error_message = 'Proszę podać nazwę';
        this.incorrectInput = true;
        return false;
      }
      return dataObject;
    },
    sendRequest(editedWaypoint) {
      axios.put(config.apiPath.concat(`/waypoint/${this.id}`), editedWaypoint, {
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
