<template>
  <div class="edit_trail">
    <h1>
      Modyfikacja odcinka:<br>
      {{ start_x }}/{{ start_y }} {{ start_name }}<br>
      {{ end_x }}/{{ end_y }} {{ end_name }}
    </h1>
    <div class="form">
      <div class="input_row">
        <div class="label">
          Punkty:
        </div>
        <input type="number" v-model="points">
      </div>
      <div class="input_row">
        <div class="label">
          Obszar
        </div>
        <select v-model="curr_area">
          <option v-for="area in areas" :key="area.code">
            {{ area.id }}.
            {{ area.area_name }} - {{ area.code }}
          </option>
        </select>
      </div>
      <label>
        <input type="checkbox" v-model="is_active">
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
  name: 'EditTrail',
  props: {
    item: {
      type: Object,
      required: true,
    },
    areas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      is_active: this.item.is_active,
      points: this.item.points,
      area_code: this.item.area_code,
      start_x: this.item.start_x,
      start_y: this.item.start_y,
      start_name: this.item.start_name,
      end_x: this.item.end_x,
      end_y: this.item.end_y,
      end_name: this.item.end_name,
      incorrectInput: false,
      error_message: '',
      curr_area: `${this.item.area_id}. ${this.item.area_name} - ${this.item.area_code}`,
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async confirm() {
      const editedTrail = JSON.stringify({
        points: parseInt(this.points, 10),
        is_active: this.is_active,
        area: parseInt(this.curr_area.split('.')[0], 10),
      });
      console.log(editedTrail);
      await axios.put(config.apiPath.concat(`/trail/${this.id}`), editedTrail, {
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
              this.error_message = 'Odcinek o podanym id nie istnieje';
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
.edit_trail {
  min-width: 400px;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  border: black solid 1px;
  color: black;
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
