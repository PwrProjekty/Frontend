<template>
  <br>{{name}}<br>{{x}}/{{y}}<br>{{height_asl}}<br>
</template>

<script>
export default {
  name: 'WaypointItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      name: this.item.waypoint_name,
      x: this.item.coordinate_x,
      y: this.item.coordinate_y,
      height_asl: this.item.height_asl,
    };
  },
};
</script>

<style scoped>

</style>
