<template>
  <toast-base
    class="toast--loading"
    :alert="{ message: 'Carregando...' }"
    :visible="$store.getters.isLoading"
    :ttl="999999"
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

<style scoped src="./loading.css"></style>
