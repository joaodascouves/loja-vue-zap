<template>
  <div />
</template>

<script>
export default {
  /* eslint-disable unused-vars */
  beforeRouteEnter(to, from, next) {
    window.location.href = '/?refreshCache=true';
  },
};
</script>
