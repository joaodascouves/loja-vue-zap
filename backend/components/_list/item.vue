<template>
  <div class="item">
    <div class="item__float-left" v-if="$slots.thumb">
      <div class="item__thumb">
        <slot name="thumb"></slot>
      </div>
    </div>
    <div class="item__right-info">
      <slot name="info"></slot>
    </div>

    <i
      class="item__options-icon fa fa-ellipsis-v"
      @click="showOptions = !showOptions"
      v-on-clickaway="hideOptions"
    />

    <div class="item__options" :class="{ 'item__options--show': showOptions }">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    hideOptions(event) {
      const {
        path: [wrapper, element],
      } = event;

      if (!element.classList
      || !element.classList.contains('item__options-icon')) {
        event.preventDefault();
        this.showOptions = false;
      }
    },
  },
};
</script>

<style scoped src="./item.css"></style>
