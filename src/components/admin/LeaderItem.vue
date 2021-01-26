<template>
  <div class="leader_row" :class="row_style">
    <div class="name">
      {{ name }}
    </div>
    <div class="surname">
      {{ surname }}
    </div>
    <div class="email">
      {{ email }}
    </div>
    <div class="password">
      {{ password }}
    </div>
    <div class="birth_date">
      {{ birth_date }}
    </div>
    <div class="permissions">
      <div v-for="permission in permissions" :key="permission.id">
        {{ permission.category_id }}. {{ permission.cat_name }}
      </div>
    </div>
    <div class="options">
      <button class="edit" :onclick="editButtonClick">Edytuj</button>
      <button class="delete" :onclick="deleteButtonClick">Usuń</button>
    </div>
    <edit-leader class="window"
                 v-if="showEditWindow" @cancel="showEditWindow = false"
                 @update="update" :item="item" :categories="categories"/>
    <delete-leader-warning class="window"
                           v-if="showDeleteWindow" @no="showDeleteWindow = false"
                           @yes="update" :item="item"/>
  </div>
</template>

<script>
import EditLeader from '@/components/admin/EditLeader.vue';
import DeleteLeaderWarning from '@/components/admin/DeleteLeaderWarning.vue';
import axios from 'axios';
import config from '@/config';

export default {
  name: 'LeaderItem',
  components: {
    DeleteLeaderWarning,
    EditLeader,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    row_style: {
      type: String,
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
      birth_date: this.item.birth_date,
      email: this.item.email,
      password: this.item.password,
      permissions: this.item.permissions,
      showDeleteWindow: false,
      showEditWindow: false,
    };
  },
  methods: {
    update() {
      this.showEditWindow = false;
      this.showDeleteWindow = false;
      this.$emit('reload');
    },
    editButtonClick() {
      this.showEditWindow = true;
    },
    deleteButtonClick() {
      this.showDeleteWindow = true;
    },
    getPermissions() {
      axios.get(config.apiPath.concat(`/permissions/${this.id}`))
        .then((response) => {
          this.permissions = response.data.json_list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getPermissions();
    this.birth_date = this.birth_date.substring(5, 17);
  },
};
</script>

<style lang="scss" scoped>
.leader_row {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 2fr 1fr;
  align-items: center;
  border: solid gray 1px;
}

.even {
  background-color: #f5f5f5;
  color: #000000;
}

.odd {
  background-color: #8a8a8a;
  color: #ffffff;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button {
  width: 5rem;
  margin: 5px auto;
  padding: 2px;
  border-radius: 5px;
}

.window {
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
