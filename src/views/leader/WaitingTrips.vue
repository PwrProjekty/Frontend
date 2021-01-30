<template>
  <div class="WaitingTrips">
    <h1>
      Zgłoszone wycieczki
    </h1>
    <div class="content">
      <div class="trips_list" v-if="results.length > 0">
        <div class="list_header">
          <div class="tourist_name">
            Imię i nazwisko turysty
          </div>
          <div class="end_date">
            Data zakończenia wycieczki
          </div>
          <div class="status">
            Status wycieczki
          </div>
        </div>
        <waiting-trip-item v-for="(item, index) in results" :item="item"
                           :row_style="index%2===0?'even':'odd'"
                           :key="item.id+item.status"
                           @reload="getWaitingTrips"/>
      </div>
      <img v-else-if="waiting"
           src="../../assets/BitterEarnestBeardeddragon-small.gif"/>
      <h2 v-else>
        Brak zgłoszonych wycieczek oczekujących na zatwierdzenie
      </h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';
import WaitingTripItem from '@/components/leader/WaitingTripItem.vue';

export default {
  name: 'WaitingTrips',
  components: {
    WaitingTripItem,
  },
  data() {
    return {
      results: [],
      waiting: true,
    };
  },
  methods: {
    getWaitingTrips() {
      this.results = [];
      this.waiting = true;
      axios.get(config.apiPath.concat('/trips/waiting/2'))
        .then((response) => {
          this.results = response.data.json_list;
          this.waiting = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getWaitingTrips();
  },
};
</script>

<style lang="scss" scoped>

.list_header {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  align-items: center;
  border: solid #808080 1px;
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

img {
  width: 4rem;
  height: 4rem;
  margin: auto;
}
</style>
