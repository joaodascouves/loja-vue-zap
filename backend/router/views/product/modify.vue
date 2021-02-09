<template>
  <form>
    <form-model :model="productModel" :data="product" @input="updateFields" />

    <div class="section" data-title="Imagens">
      <label class="label">
        <div>Imagem principal</div>
        <upload-container
          :current="product.image"
          @fileChanged="$store.dispatch('product/setFile', $event)"
          @fileRemoved="
            removeImage({
              product: {
                _id: product._id,
                remove: product.image,
                images: undefined,
                image: product.image
              }
            })
          "
        />
      </label>
      <label class="label label--images">
        <div class="optional">Imagens complementares</div>

        <button-base
          title="Adicionar"
          margin=".5em 0 0 0"
          bstyle="padded-1"
          :disabled="false"
          @click="addImage"
        />

        <div class="images">
          <upload-container
            v-for="(image, index) in product.images"
            :key="`image-${index}`"
            :current="image"
            @fileChanged="
              $store.dispatch('product/setExtraFile', { file: $event, index })
            "
            @fileRemoved="
              removeImage({
                product: {
                  _id: product._id,
                  remove: product.images[index],
                  images: product.images,
                  image: undefined
                }
              })
            "
          />
        </div>
      </label>
    </div>

    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="saveProduct"
    />
  </form>
</template>

<script>
import UploadContainer from 'backend/components/utils/upload.vue';
import store from 'backend/store';

import productModel from 'backend/models/productModel';

export default {
  components: {
    UploadContainer,
  },
  data() {
    const product = this.$store.getters['product/item'];

    return {
      price: product.price,
      discount: product.discount,
    };
  },
  beforeMount() {
    const variations = Object.values(
      this.$store.getters['client/variations'],
    ).reduce(
      (a, { name }) => ({
        ...a,
        [name]:
          (
            (typeof this.product.variations === 'array'
              && this.product.variations.find(
                (variation) => variation.name === name,
              ))
            || {}
          ).value || [],
      }),
      {},
    );

    this.$store.commit('product/ITEM_GET', {
      ...this.product,
      variations,
      categories:
        this.product.categories && Array.isArray(this.product.categories)
          ? this.product.categories
            .filter((category) => !!category)
            .map(({ _id }) => _id)
          : [],
    });
  },
  computed: {
    productModel,
    product() {
      return this.$store.getters['product/item'];
    },
    computedPrice() {
      const { price, discount } = this;
      const total = price - (price / 100) * discount;

      // eslint-disable-next-line no-restricted-globals
      return parseFloat(!isNaN(total) ? 0 : total)
        .toFixed(2)
        .toString()
        .replace('.', ',');
    },
  },
  methods: {
    updateFields({ target: { name, value, checked } }) {
      if (name === 'categories') {
        if (checked) {
          this.product.categories.push(value);
        } else {
          this.product.categories = this.product.categories.filter(
            (category) => category !== value,
          );
        }
      }
    },
    addImage() {
      if (this.product.images.length < 4) {
        this.$store.dispatch('product/addImage');
      }
    },
    saveProduct() {
      this.saveItem({
        product: {
          ...this.product,
          file: this.$store.getters['product/file'],
          files: this.$store.getters['product/files'],

          variations: Object.entries(this.product.variations).map(
            ([key, value]) => ({
              name: key,
              value,
            }),
          ),
        },
      });
    },
  },

  async beforeRouteEnter(to, from, next) {
    if (store.getters['category/itemsCount'] === 0) {
      await store.dispatch('category/getAll');
    }

    if (to.params.slug) {
      if (!store.getters['product/item']._id) {
        await store.dispatch('product/get', { slug: to.params.slug });
      }
    }

    next();
  },
};
</script>

<style scoped src="./modify.css"></style>
