<template>
  <div class="toast" :data-message="alert.message" @click="dismiss"></div>
</template>

<script>
export default {
  props: {
    alert: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    ttl: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      timeout: undefined,
    };
  },
  methods: {
    popup() {
      this.$el.classList.remove('toast--hidden');

      // eslint-disable-next-line no-unused-expressions
      this.$el.offsetWidth;
      this.$el.classList.add('toast--visible');
    },
    dismiss() {
      this.$el.classList.remove('toast--visible');

      // eslint-disable-next-line no-unused-expressions
      this.$el.offsetWidth;
      this.$el.classList.add('toast--hidden');
    },
  },
  watch: {
    visible(isVisible) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      if (isVisible) {
        this.popup();
        this.timeout = setTimeout(() => this.dismiss(), this.ttl);
      } else {
        this.dismiss();
      }
    },
  },
};
</script>

<style scoped src="./base.css"></style>
