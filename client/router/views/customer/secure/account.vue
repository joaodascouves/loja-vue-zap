<template>
  <form>
    <form-model
      :model="signupModel"
      :data="$store.getters['user/currentUser']"
    />
  </form>
</template>

<script>
import signupModel from 'client/models/signupModel';

export default {
  data() {
    return {
      signupModel,
    };
  },
};
</script>
