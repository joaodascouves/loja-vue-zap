<template>
  <div class="quantity-container" v-if="item">
    <div class="quantity">
      <i class="quantity__button fa fa-plus" @click="changeQuantity(1)" />
      <i class="quantity__button fa fa-minus" @click="changeQuantity(-1)" />
      <input
        class="quantity__value"
        type="number"
        v-model="item.quantity"
        min="1"
        @change="controlQuantity"
      />
    </div>
    <div class="quantity__error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      errorMessage: undefined,
    };
  },
  computed: {
    cartError() {
      return this.$store.getters['cart/error'];
    },
  },
  methods: {
    changeQuantity(value) {
      const {
        index,
        item: { quantity },
      } = this;

      this.$store.dispatch('cart/changeQuantity', {
        index,
        value: quantity + value,
      });
    },
    controlQuantity(event) {
      if (event.target.value > this.item.stock) {
        event.preventDefault();
        this.item.quantity = this.item.stock;
      }

      if (event.target.value <= 0) {
        event.preventDefault();
        this.item.quantity = 1;
      }
    },
  },
  watch: {
    cartError: {
      deep: true,
      handler(event) {
        if (event.ref && event.ref.index === this.index) {
          this.errorMessage = event.message;
        }
      },
    },
  },
};
</script>

<style scoped src="./quantity.css"></style>
