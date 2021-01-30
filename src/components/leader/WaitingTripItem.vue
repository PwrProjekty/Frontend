<template>
  <div class="trip_row" :class="row_style">
    <div class="tourist_name">
      {{tourist_name}} {{tourist_surname}}
    </div>
    <div class="end_date">
      {{ end_date }}
    </div>
    <div class="status">
      {{ status }}
      <button class="choose" :onclick="chooseButtonClick">Wybierz</button>
    </div>
    <waiting-trip-details class="window" :item="item" v-if="showDetailsWindow"
                          @cancel="cancel" @update="update"/>
  </div>
</template>

<script>
import WaitingTripDetails from '@/components/leader/WaitingTripDetails.vue';

export default {
  name: 'WaitingTripItem',
  components: {
    WaitingTripDetails,
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
      tourist_name: this.item.tourist_name,
      tourist_surname: this.item.tourist_surname,
      end_date: this.item.end_date,
      status: this.item.status,
      showDetailsWindow: false,
    };
  },
  methods: {
    cancel() {
      this.showDetailsWindow = false;
    },
    update() {
      this.showDetailsWindow = false;
      this.$emit('reload');
    },
    chooseButtonClick() {
      this.showDetailsWindow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.trip_row {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
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
  left: 50%;
  top: 10%;
  transform: translate(-50%);
}

.status {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
