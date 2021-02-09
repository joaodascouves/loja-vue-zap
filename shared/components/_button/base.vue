<template>
  <div
    :class="`button ${computedStyles}`"
    :style="`--margin: ${margin}; --padding: ${padding}; --border: ${border}`"
    @click="click"
  >
    <div class="button__content">
      <div :class="{
        'button__text': true,
        'button__text--icon': !!icon
      }">
        <slot v-if="$slots.default"></slot>
        <span v-else>{{ title }}</span>
      </div>

      <i v-if="icon" :class="`button__icon ${icon}`" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    sync: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    bstyle: {
      type: String,
      default: 'default',
    },
    margin: {
      type: String,
      default: '0',
    },
    padding: {
      type: String,
      default: '0',
    },
    border: {
      type: String,
      default: '1px solid #ccc',
    },
    icon: {
      type: String,
      required: false,
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    computedStyles() {
      let style = this.bstyle;
      if (style === 'default') {
        style = this.$root.$c_buttonStyle || style;
      }

      return style
        .split(' ')
        .map((name) => `button--${name}`)
        .join(' ');
    },
  },
  methods: {
    click(event) {
      event.preventDefault();

      if ((!this.isLoading || !this.sync) && !this.disabled) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style scoped src="./base.css"></style>
<style scoped src="./styles.css"></style>
