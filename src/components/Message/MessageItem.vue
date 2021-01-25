<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
