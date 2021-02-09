<template>
  <div class="list-container">
    <topbar-container v-if="context" :context="context" />

    <div class="list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TopbarContainer from 'backend/components/utils/topbar.vue';

export default {
  props: {
    context: {
      type: String,
      required: false,
    },
  },
  components: {
    TopbarContainer,
  },
};
</script>

<style scoped src="./body.css"></style>
