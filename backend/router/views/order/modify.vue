<template>
  <div>
    <div class="section" data-title="Resumo do pedido">
      <label class="label--margin">
        <div>Itens do carrinho</div>
        <div class="cart">
          <div class="cart__list">
            <cart-item-container
              class="cart__list__item"
              v-for="(product, index) in order.cart.items"
              :key="`product-${index}`"
              :product="product"
            />
          </div>

          <div class="cart__summary">
            <div
              class="cart__coupon"
              v-if="order.discount && order.discount._id"
            >
              <div class="cart__coupon__info">
                <span>Cupom de desconto: </span>
                <span>{{ order.discount.code }} </span>
                <span>({{ order.discount.discount }}%)</span>
              </div>
              <div class="cart__coupon__expiration">
                <span>Válido até: </span>
                <span>{{ order.discount.expirationDate }}</span>
              </div>
              <div class="cart__coupon__discount">
                <span>Desconto deduzido: </span>
                <span>{{ currencyFormat(discount) }}</span>
              </div>
            </div>
            <div class="cart__payment">
              <span>Meio de pagamento: </span>
              <span>{{ order.payment.name }}</span>
              <span v-if="order.payment.baseCost > 0">
                (+{{ currencyFormat(order.payment.baseCost) }})
              </span>
              <span v-if="order.payment.tax > 0">
                (+{{ order.payment.tax }}%)
              </span>
            </div>
            <div class="cart__shipment" v-if="order.shipment.service.baseCost">
              <span>Custo do frete: </span>
              <span>{{ currencyFormat(order.shipment.service.baseCost) }}</span>
            </div>
            <div class="cart__total">
              <span>Total sem desconto: </span>
              <span>{{ currencyFormat(total) }}</span>
            </div>
            <div class="cart__price">
              <span>Valor a cobrar: </span>
              <span
                ><strong>{{ currencyFormat(finalPrice) }}</strong></span
              >
            </div>
          </div>
        </div>
      </label>
    </div>

    <form v-if="order">
      <form-model :model="orderModel" :data="order" />

      <div class="options">
        <button-base
          class="options__button"
          title="Salvar"
          bstyle="padded-1"
          @click="saveOrder({ order })"
        />

        <button-base
          class="options__button"
          title="Salvar e contactar cliente"
          bstyle="padded-1"
          @click="contactCustomer"
        />
      </div>
    </form>
  </div>
</template>

<script>
import CartItemContainer from 'backend/components/cart/item.vue';

import orderModel from 'backend/models/orderModel';
import store from 'backend/store';

import { startWhatsAppChat } from 'shared/utils';

export default {
  components: {
    CartItemContainer,
  },
  data() {
    return {
      orderModel,
    };
  },
  computed: {
    order() {
      return this.$store.getters['order/item'];
    },
    total() {
      return this.order.cart.items
        .filter((item) => !!item.item)
        .reduce(
          (a, { item: { effectivePrice }, quantity }) => a + effectivePrice * quantity,
          0,
        );
    },
    discount() {
      return this.order.discount && this.order.discount.discount
        ? (this.total * this.order.discount.discount) / 100
        : 0;
    },
    finalPrice() {
      const {
        total,
        discount,
        order: {
          shipment: { service },
          payment: { baseCost, tax },
        },
      } = this;

      let finalPrice = total - discount;

      finalPrice = service.baseCost && service.baseCost > 0
        ? finalPrice + service.baseCost
        : finalPrice;
      finalPrice = tax && tax > 0 ? finalPrice + (finalPrice * tax) / 100 : finalPrice;
      finalPrice = baseCost && baseCost > 0 ? finalPrice + baseCost : finalPrice;

      return finalPrice;
    },
  },
  methods: {
    saveOrder({ order }) {
      this.$store
        .dispatch('order/adminSave', order)
        .then(() => this.$router.push({ path: '/order/list' }));
    },
    contactCustomer() {
      this.$store.dispatch('order/adminSave', this.order).then(() => {
        let { name, phone } = this.order.customer;

        phone = /^55/.test(phone) ? phone : `55${phone}`;

        const business = this.$store.getters['client/business'];

        const {
          subtotal,
          discount,
          order: {
            shipment: {
              service: { baseCost },
            },
          },
        } = this;

        let message = `Olá, ${name}. Somos da ${business.name}. Tudo bem?\n`;
        message += `Esta mensagem é referente ao pedido _${this.order._id}_\n\n`;
        message += `Status: *${this.order.status}*\n`;
        message += `Meio de pagamento: ${this.order.payment.name}\n`;
        message += `Meio de entrega: ${this.order.shipment.service.name}\n`;
        message += `Custo do frete: ${this.currencyFormat(baseCost)}\n\n`;

        if (discount === 0) {
          message += `Total: *${this.currencyFormat(this.finalPrice)}*\n`;
        } else {
          message += `Desconto aplicado: ${this.order.discount.code} (-${this.order.discount.discount}%)\n`;
          message += `Total efetivo: *${this.currencyFormat(this.finalPrice)}*`;
        }

        startWhatsAppChat({
          phone,
          message,
        });
      });
    },
  },

  async beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      if (!store.getters['order/item']._id) {
        await store.dispatch('order/get', { _id: to.params.id });
      }
    }

    next();
  },
};
</script>

<style scoped src="./modify.css"></style>
