<template>
  <div class="delete_trail">
    <h1>
      Usuwanie odcinka:<br>{{ start_name }}-{{ end_name }}
    </h1>
    <div class="error_message" v-if="deleteForbidden">
      <div class="message">
        {{ error_message }}
      </div>
      <div class="form">
        <div class="options">
          <button class="OK" :onclick="no">OK</button>
        </div>
      </div>
    </div>
    <div class="delete_message" v-else>
      <div class="message">
        Czy na pewno chcesz usunąć ten odcinek?
        <br>
        Operacja nie będzie możliwa, jeśli w systemie istnieje
        choć jedno powiązanie z tym odcinkiem.
      </div>
      <div class="form">
        <div class="options">
          <button class="yes" :onclick="yes">Tak</button>
          <button class="no" :onclick="no">Nie</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
  name: 'DeleteTrailWarning',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      start_name: this.item.start_name,
      end_name: this.item.end_name,
      deleteForbidden: false,
      error_message: '',
    };
  },
  methods: {
    no() {
      this.$emit('no');
    },
    async yes() {
      await axios.delete(config.apiPath.concat(`/trail/${this.id}`))
        .then(() => {
          this.$emit('yes');
        })
        .catch((error) => {
          switch (error.response.status) {
            case 409:
              this.error_message = 'Usunięcie tego odcinka jest '
                + 'niemożliwe z powodu istniejących powiązań';
              break;
            case 404:
              this.error_message = 'Brak odcinka o tym id';
              break;
            default:
              this.error_message = 'Wystąpił nieoczekiwany błąd';
          }
          this.deleteForbidden = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.delete_trail {
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

.message {
  margin: 0.5rem auto;
}
</style>
