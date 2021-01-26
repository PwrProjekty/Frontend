<template>
  <div class="add_leader">
    <h1>
      Dodawanie przodownika:
    </h1>

    <div class="form">
      <div class="input_row">
        <div class="label">
          Imię:
        </div>
        <label>
          <input type="text" v-model="name"/>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Nazwisko:
        </div>
        <label>
          <input type="text" v-model="surname"/>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Email:
        </div>
        <label>
          <input type="email" v-model="email"/>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Hasło:
        </div>
        <label>
          <input type="password" v-model="password"/>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Data urodzenia:
        </div>
        <label>
          <input type="date" v-model="birth_date"/>
        </label>
      </div>
  <!--    <div class="input_row">
        <div class="label">
          Uprawnienia:
        </div>
        <label>
          <select multiple v-model="permissions">
            <option v-for="category in categories" :key="category.id">
              {{ category.id }}. {{ category.cat_name }}
            </option>
          </select>
        </label>
      </div>-->
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
  name: 'AddLeader',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      surname: '',
      birth_date: '',
      email: '',
      password: '',
      incorrectInput: false,
      error_message: '',
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async confirm() {
      const newLeader = JSON.stringify({
        name: this.name,
        surname: this.surname,
        birth_date: this.birth_date,
        email: this.email,
        password: this.password,
      });
      await axios.post(config.apiPath.concat('/leader'), newLeader, {
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
.add_leader {
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
