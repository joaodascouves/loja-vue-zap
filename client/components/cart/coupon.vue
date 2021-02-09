<template>
  <div class="coupon">
    <label class="coupon__label">
      <div class="coupon__text">Você possui um cupom de desconto?</div>
      <input-text
        class="coupon__input"
        type="text"
        name="coupon"
        icon="fa fa-gift"
        v-model="currentCoupon.newCode"

        :mask="{ mask: '*{2,20}', casing: 'upper' }"
      />
    </label>
    <button-base
      class="coupon__button"
      title="Aplicar"
      @click="$store.dispatch('discount/get', { code: currentCoupon.newCode })"
    />
    <div class="coupon__current" v-if="currentCoupon._id">
      <span>{{ currentCoupon.code }}: </span>
      <span>-{{ currentCoupon.discount }}%</span>
      <span class="coupon__remove" @click="$store.dispatch('discount/clear')">
        Remover
      </span>
    </div>
    <div class="coupon__message" v-if="$store.getters['discount/anyMessage']">
      {{ $store.getters["discount/anyMessage"] }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentCoupon() {
      return this.$store.getters['discount/item'];
    },
  },
};
</script>

<style scoped src="./coupon.css"></style>
