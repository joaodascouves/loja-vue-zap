<template>
  <toast-base
    class="toast--error"
    :alert="$store.getters.error"
    :visible="$store.getters.errorExists"
  />
</template>

<script>
import ToastBase from './base.vue';

export default {
  components: {
    ToastBase,
  },
};
</script>

<style scoped src="./error.css"></style>
