<template>
  <div class="WaypointsAdmin">
    <h1>
      Zarządzaj punktami na trasie
    </h1>
    <div class="content">
      <button class="add" v-on:click="addWaypoint">Dodaj</button>
      <div class="waypoints_list">
        <div class="list_header">
          <div class="coordinates">
            Współrzędne X/Y
          </div>
          <div class="name">
            Nazwa punktu na trasie
          </div>
          <div class="asl">
            Wysokość NPM
          </div>
          <div class="options">
            Opcje
          </div>
        </div>
        <waypoint-item v-for="(item, index) in results" :item="item"
                       :row_style="index%2===0?'even':'odd'"
                       :key="`${item.id}${item.waypoint_name}${item.height_asl}`"
                       @reload="getWaypoints"/>
      </div>
      <AddWaypoint class="add_window"
                   v-if="showAddWindow" @cancel="showAddWindow = false"
                   @confirm="confirmAdd"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WaypointItem from '@/components/admin/WaypointItem.vue';
import AddWaypoint from '@/components/admin/AddWaypoint.vue';
import config from '@/config';

export default {
  name: 'WaypointsAdmin',
  components: {
    AddWaypoint,
    WaypointItem,
  },
  data() {
    return {
      results: [],
      showAddWindow: false,
    };
  },
  methods: {
    addWaypoint() {
      this.showAddWindow = true;
    },
    getWaypoints() {
      axios.get(config.apiPath.concat('/waypoints'))
        .then((response) => {
          this.results = response.data.json_list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmAdd() {
      this.showAddWindow = false;
      this.getWaypoints();
    },
  },
  mounted() {
    this.getWaypoints();
  },
};
</script>

<style lang="scss" scoped>

.list_header {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  align-items: center;
  border: solid gray 1px;
  background-color: #d6d6d6;
}

.waypoints_list {
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
