<template>
  <div>
    <h1>
      Zarządzaj przodownikami
    </h1>
    <div class="content">
      <button class="add" v-on:click="addLeader">Dodaj</button>
      <div class="leaders_list">
        <div class="list_header">
          <div class="name">
            Imię
          </div>
          <div class="surname">
            Nazwisko
          </div>
          <div class="email">
            E-mail
          </div>
          <div class="password">
            Hasło
          </div>
          <div class="birth_date">
            Data urodzenia
          </div>
          <div class="permissions">
            Uprawnienia
          </div>
          <div class="options">
            Opcje
          </div>
        </div>
        <leader-item v-for="(item, index) in results" :item="item"
                     :row_style="index%2===0?'even':'odd'"
                     :key="`${item.id}${item.name}${item.surname}
                       ${item.email}`"
                     @reload="getLeaders" :categories="categories"/>
      </div>
      <add-leader class="add_window" v-if="showAddWindow" @cancel="showAddWindow = false"
                  @confirm="confirmAdd" :categories="categories"/>
    </div>
  </div>
</template>

<script>
import LeaderItem from '@/components/admin/LeaderItem.vue';
import AddLeader from '@/components/admin/AddLeader.vue';
import axios from 'axios';
import config from '@/config';

export default {
  name: 'LeadersAdmin',
  components: {
    AddLeader,
    LeaderItem,
  },
  data() {
    return {
      results: [],
      showAddWindow: false,
      categories: [],
    };
  },
  methods: {
    addLeader() {
      this.showAddWindow = true;
    },
    getLeaders() {
      axios.get(config.apiPath.concat('/leaders'))
        .then((response) => {
          this.results = response.data.json_list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmAdd() {
      this.showAddWindow = false;
      this.getLeaders();
    },
  },
  mounted() {
    this.getLeaders();
    axios.get(config.apiPath.concat('/categories'))
      .then((response) => {
        this.categories = response.data.json_list;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>

.list_header {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 2fr 1fr;
  align-items: center;
  border: solid gray 1px;
  background-color: #d6d6d6;
}

.leaders_list {
  margin: 0.3rem 0;
  border: solid black 2px;
}

.content {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
}

.add {
  align-self: flex-end;
  width: 5rem;
  padding: 2px;
  border-radius: 5px;
}

.add_window {
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
