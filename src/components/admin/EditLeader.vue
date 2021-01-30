<template>
  <div class="edit_leader">
    <h1>
      Modyfikacja przodownika:<br>
      {{ name }} {{ surname }}<br>
    </h1>

    <div class="form">
      <div class="input_row">
        <div class="label">
          Imię:
        </div>
        <label>
          <input type="text" v-model="name" required>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Nazwisko:
        </div>
        <label>
          <input type="text" v-model="surname" required>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Email:
        </div>
        <label>
          <input type="email" v-model="email" required>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Hasło:
        </div>
        <label>
          <input type="password" v-model="password" required>
        </label>
      </div>
      <div class="input_row">
        <div class="label">
          Uprawnienia:
        </div>
        <label>
          <select multiple v-model="permissions">
            <option v-for="category in categories" :key="category.id">
              {{ category.cat_name }}
            </option>
          </select>
        </label>
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
  name: 'EditLeader',
  props: {
    item: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      name: this.item.name,
      surname: this.item.surname,
      email: this.item.email,
      password: this.item.password,
      permissions: [],
      incorrectInput: false,
      error_message: '',
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async confirm() {
      if (!this.validateData()) {
        this.incorrectInput = true;
        return;
      }
      const editedLeader = JSON.stringify({
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        permissions: this.permissions,
      });
      console.log(editedLeader);
      await axios.put(config.apiPath.concat(`/leader/${this.id}`), editedLeader, {
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
              this.error_message = 'Wprowadzono błędne dane.';
              break;
            case 404:
              this.error_message = 'Przodownik o podanym id nie istnieje.';
              break;
            case 408:
              this.error_message = 'Przodownik posiada już takie uprawnienia.';
              break;
            case 409:
              this.error_message = 'Podany email jest zajęty.';
              break;
            case 409:
              this.error_message = 'Nie można zmienić przodownikowi uprawnień';
              break;
            default:
              this.error_message = 'Wystąpił nieoczekiwany błąd.';
          }
          this.incorrectInput = true;
        });
    },
    validateData() {
      this.error_message = '';
      if (this.name === '' || this.surname === '' || this.email === '') {
        this.error_message = 'Musisz wypełnić wszystkie pola.';
        return false;
      }
      if (this.password.length < 8) {
        this.error_message += ' Hasło musi mieć co najmniej 8 znaków.';
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit_leader {
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
