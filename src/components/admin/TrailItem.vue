<template>
  <div class="trail_row" :class="row_style">
    <div class="start_point">
      {{ start_x }}/{{ start_y }}<br>
      {{ start_name }}
    </div>
    <div class="end_point">
      {{ end_x }}/{{ end_y }}<br>
      {{ end_name }}
    </div>
    <div class="points">
      {{ points }}
    </div>
    <div class="active">
      {{ is_active }}
    </div>
    <div class="area">
      {{ area_name }} {{ area_code }}
    </div>
    <div class="options">
      <button class="edit" :onclick="editButtonClick">Edytuj</button>
      <button class="delete" :onclick="deleteButtonClick">Usuń</button>
    </div>
    <edit-trail class="window"
                v-if="showEditWindow" @cancel="showEditWindow = false"
                @update="update" :item="item" :areas="areas"/>
    <delete-trail-warning class="window"
                          v-if="showDeleteWindow" @no="showDeleteWindow = false"
                          @yes="update" :item="item"/>
  </div>
</template>

<script>
import EditTrail from '@/components/admin/EditTrail.vue';
import DeleteTrailWarning from '@/components/admin/DeleteTrailWarning.vue';

export default {
  name: 'TrailItem',
  components: {
    DeleteTrailWarning,
    EditTrail,
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
    areas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      is_active: this.item.is_active,
      points: this.item.points,
      area_code: this.item.area_code,
      area_name: this.item.area_name,
      start_x: this.item.start_x,
      start_y: this.item.start_y,
      start_name: this.item.start_name,
      end_x: this.item.end_x,
      end_y: this.item.end_y,
      end_name: this.item.end_name,
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
  },
};
</script>

<style lang="scss" scoped>
.trail_row {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 2fr 1fr;
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
