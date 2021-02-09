<template>
  <div class="item" @click="click">
    {{ item.name }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async click() {
      if (this.item.action) {
        await this.item.action();
      }

      if (this.item.path) {
        this.$router.push({ path: this.item.path });
      }
    },
  },
};
</script>

<style scoped src="./item.css"></style>
