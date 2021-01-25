<template>
  <div class="trail_row" :class="row_style">
    <div class="coordinates">
      {{ x }}/{{ y }}
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div class="asl">
      {{ height_asl }}
    </div>
    <div class="options">
      <button class="edit" :onclick="editButtonClick">Edytuj</button>
      <button class="delete" :onclick="deleteButtonClick">Usuń</button>
    </div>
    <edit-waypoint class="window"
                   v-if="showEditWindow" @cancel="showEditWindow = false"
                   @update="update" :item="item"/>
    <delete-waypoint-warning class="window"
                   v-if="showDeleteWindow" @no="showDeleteWindow = false"
                   @yes="update" :item="item"/>
  </div>
</template>

<script>
import EditWaypoint from '@/components/admin/EditWaypoint.vue';
import DeleteWaypointWarning from '@/components/admin/DeleteWaypointWarning.vue';

export default {
  name: 'WaypointItem',
  components: {
    DeleteWaypointWarning,
    EditWaypoint,
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
  },
  data() {
    return {
      name: this.item.waypoint_name,
      x: this.item.coordinate_x,
      y: this.item.coordinate_y,
      height_asl: this.item.height_asl,
      showEditWindow: false,
      showDeleteWindow: false,
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
  grid-template-columns: 2fr 2fr 1fr 1fr;
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
