<template>
  <div class="WaypointsAdmin">
    <waypoint-item v-for="item in results" :item="item" :key="item.id"></waypoint-item>
  </div>
</template>

<script>
import axios from 'axios';
import WaypointItem from '@/components/WaypointItem.vue';

const Api = 'http://127.0.0.1:5000/waypoints';

export default {
  name: 'WaypointsAdmin',
  components: { WaypointItem },
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    axios.get(Api)
      .then((response) => {
        this.results = response.data.json_list;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>

</style>
