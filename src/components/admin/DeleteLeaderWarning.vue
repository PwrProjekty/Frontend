<template>
  <div class="delete_leader">
    <h1>
      Usuwanie przodownika:<br>{{ name }}-{{ surname }}
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
        Czy na pewno chcesz usunąć tego przodownika?
        <br>
        Operacja nie będzie możliwa, jeśli w systemie istnieje
        choć jedno powiązanie z tym przodownikiem.
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
  name: 'DeleteLeaderWarning',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      name: this.item.name,
      surname: this.item.surname,
      deleteForbidden: false,
      error_message: '',
    };
  },
  methods: {
    no() {
      this.$emit('no');
    },
    async yes() {
      await axios.delete(config.apiPath.concat(`/leader/${this.id}`))
        .then(() => {
          this.$emit('yes');
        })
        .catch((error) => {
          switch (error.response.status) {
            case 409:
              this.error_message = 'Usunięcie tego przodownika jest '
                + 'niemożliwe z powodu istniejących powiązań';
              break;
            case 404:
              this.error_message = 'Brak przodownika o tym id';
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
.delete_leader {
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
