<template>
  <transition name="fade" mode="out-in">
    <div class="popup" v-if="$store.getters.popupVisible">
      <div class="popup__title">{{ popup.title }}</div>
      <div class="popup__content">
        <div class="popup__text" v-if="popup.message !== undefined">
          {{ popup.message }}
        </div>

        <component v-if="popup.component !== undefined" :is="popup.component" />
      </div>

      <div class="popup__options">
        <button-base
          class="popup__button"
          title="OK"
          :sync="true"
          @click="$store.dispatch('acceptPopup')"
        />
        <button-base
          class="popup__button"
          title="Cancelar"
          :sync="true"
          @click="$store.dispatch('closePopup')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    popup() {
      return this.$store.getters.currentPopup.popup;
    },
  },
};
</script>

<style scoped src="./base.css"></style>
