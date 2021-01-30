<template>
  <div class="TrailsAdmin">
    <h1>
      Zarządzaj odcinkami
    </h1>
    <div class="content">
      <button class="add" v-on:click="addTrail">Dodaj</button>
      <div class="leaders_list">
        <div class="list_header">
          <div class="start_point">
            Punkt startowy
          </div>
          <div class="end_point">
            Punkt końcowy
          </div>
          <div class="points">
            Punkty
          </div>
          <div class="active">
            Trasa czynna
          </div>
          <div class="area">
            Obszar
          </div>
          <div class="options">
            Opcje
          </div>
        </div>
        <trail-item v-for="(item, index) in results" :item="item"
                    :row_style="index%2===0?'even':'odd'"
                    :key="`${item.id}${item.start_name}${item.end_name}
                       ${item.points}${item.area_id}${item.is_active}`"
                    @reload="getTrails" :areas="areas"
                    :index="index" :last="index===results.length-1"/>
      </div>
      <AddTrail class="add_window"
                v-if="showAddWindow" @cancel="showAddWindow = false"
                @confirm="confirmAdd" :areas="areas" :waypoints="waypoints"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TrailItem from '@/components/admin/TrailItem.vue';
import AddTrail from '@/components/admin/AddTrail.vue';
import config from '@/config';

export default {
  name: 'TrailsAdmin',
  components: {
    AddTrail,
    TrailItem,
  },
  data() {
    return {
      results: [],
      showAddWindow: false,
      areas: [],
      waypoints: [],
    };
  },
  methods: {
    addTrail() {
      this.showAddWindow = true;
    },
    getTrails() {
      axios.get(config.apiPath.concat('/trails'))
        .then((response) => {
          this.results = response.data.json_list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmAdd() {
      this.showAddWindow = false;
      this.getTrails();
    },
  },
  mounted() {
    this.getTrails();
    axios.get(config.apiPath.concat('/areas'))
      .then((response) => {
        this.areas = response.data.json_list;
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(config.apiPath.concat('/waypoints'))
      .then((response) => {
        this.waypoints = response.data.json_list;
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
  grid-template-columns: 2fr 2fr 1fr 1fr 2fr 1fr;
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
