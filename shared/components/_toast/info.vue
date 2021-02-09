<template>
  <toast-base
    class="toast--info"
    :alert="$store.getters.info"
    :visible="$store.getters.infoExists"
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

<style scoped src="./info.css"></style>
