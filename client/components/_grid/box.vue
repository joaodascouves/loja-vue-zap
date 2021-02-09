<template>
  <div
    class="box"
    :data-title="title"
    :style="
      `
            --min-height: ${minHeight};
            --max-width: ${maxWidth};
            --flex-basis: ${flexBasis};
        `
    "
  >
    <div class="box__content">
      <slot name="content"></slot>
    </div>

    <div
      class="box__bottom"
      v-if="$slots.bottom"
      :style="
        `
            --bottom-background-color: ${bottomBackgroundColor};
            --bottom-padding: ${bottomPadding};
          `
      "
    >
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    minHeight: {
      type: String,
      default: '0',
    },
    maxWidth: {
      type: String,
      default: 'auto',
    },
    flexBasis: {
      type: String,
      default: '45%',
    },
    bottomBackgroundColor: {
      type: String,
      default: 'transparent',
    },
    bottomPadding: {
      type: String,
      default: '0 1em',
    },
  },
};
</script>

<style scoped src="./box.css"></style>
