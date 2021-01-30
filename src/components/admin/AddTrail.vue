<template>
  <div class="add_trail">
    <h1>
      Dodawanie odcinka:
    </h1>
    <div class="form">
      <div class="input_row">
        <div class="label">
          Punkt startowy:
        </div>
        <select v-model="curr_start" id="add_trail_start">
          <option v-for="waypoint in waypoints" :key="waypoint.id">
            {{ waypoint.id }}.
            {{ waypoint.coordinate_x }}/{{ waypoint.coordinate_y }} {{ waypoint.waypoint_name }}
          </option>
        </select>
      </div>
      <div class="input_row">
        <div class="label">
          Punkt końcowy:
        </div>
        <select v-model="curr_end" id="add_trail_end">
          <option v-for="waypoint in waypoints" :key="waypoint.id">
            {{ waypoint.id }}.
            {{ waypoint.coordinate_x }}/{{ waypoint.coordinate_y }} {{ waypoint.waypoint_name }}
          </option>
        </select>
      </div>
      <div class="input_row">
        <div class="label">
          Punkty:
        </div>
        <input type="number" v-model="points" id="add_trail_points">
      </div>
      <div class="input_row">
        <div class="label">
          Obszar
        </div>
        <select v-model="curr_area" id="add_trail_area">
          <option v-for="area in areas" :key="area.code">
            {{ area.id }}.
            {{ area.area_name }} - {{ area.code }}
          </option>
        </select>
      </div>
      <label>
        <input type="checkbox" v-model="is_active" id="add_trail_is_active">
        Trasa czynna
      </label>
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
  name: 'AddTrail',
  props: {
    areas: {
      type: Array,
      required: true,
    },
    waypoints: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      points: 0,
      is_active: true,
      incorrectInput: false,
      error_message: '',
      curr_start: {},
      curr_end: {},
      curr_area: {},
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      const newTrail = this.getDataObject();
      if (newTrail) this.sendRequest(JSON.stringify(newTrail));
    },
    getDataObject() {
      let dataObject = {};
      try {
        dataObject = {
          points: parseInt(this.points, 10),
          start: parseInt(this.curr_start.split('.')[0], 10),
          end: parseInt(this.curr_end.split('.')[0], 10),
          area: parseInt(this.curr_area.split('.')[0], 10),
          is_active: this.is_active,
        };
      } catch {
        this.error_message = 'Proszę uzupełnić wszystkie pola';
        this.incorrectInput = true;
        return false;
      }
      if ((!dataObject.points && dataObject.points !== 0) || !dataObject.start
        || !dataObject.end || !dataObject.area) {
        this.error_message = 'Proszę uzupełnić wszystkie pola';
        this.incorrectInput = true;
        return false;
      }
      if (dataObject.points <= 0) {
        this.error_message = 'Punkty powinny być liczbą dodatnią';
        this.incorrectInput = true;
        return false;
      }
      return dataObject;
    },
    sendRequest(newTrail) {
      axios.post(config.apiPath.concat('/trail'), newTrail, {
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
.add_trail {
  min-width: 400px;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  border: black solid 1px;
}

.input_row {
  display: grid;
  grid-template-columns: 1fr 2fr;
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

select {
  width: 30ch;
}

.input_row > input {
  width: 29ch;
}

label {
  display: flex;
  justify-content: center;
}
</style>
