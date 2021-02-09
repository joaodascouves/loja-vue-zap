<template>
  <list-body-container context="product">
    <list-item-container
      v-for="(item, index) in $store.getters['product/filtered']"
      :key="`product-${index}`"
    >
      <template v-slot:thumb>
        <image-container :src="item.image" />
      </template>
      <template v-slot:info>
        <div>
          <span>Título</span>
          <span>{{ item.title }}</span>
        </div>
        <div>
          <span>Preço</span>
          <span>{{ currencyFormat(item.effectivePrice) }}</span>
        </div>
        <div>
          <span>Peças em estoque</span>
          <span>{{ item.stock }}</span>
        </div>
      </template>
      <template v-slot:options>
        <div class="option" @click="modifyItem({ product: item })">
          Editar
        </div>
        <div class="option" @click="removeItem({ product: { _id: item._id } })">
          Remover
        </div>
        <div class="option" @click="sharePopup(item)">
          Compartilhar
        </div>
      </template>
    </list-item-container>
  </list-body-container>
</template>

<script>
import * as ListComponents from 'backend/components/_list';
import { createShareIntent } from 'shared/utils';
import store from 'backend/store';

import List from 'backend/components/_list/list';

export default {
  extends: List,
  components: {
    ...ListComponents,
  },
  methods: {
    sharePopup(item) {
      if (!('share' in navigator)) {
        return store.dispatch('spawnError', {
          message:
            'Funcionalidade presente apenas em navegadores mobile (Android, iOS) atualizados',
        });
      }

      const {
        title, slug, image, images,
      } = item;

      this.$store.dispatch('changePopup', {
        popup: {
          id: 'share',
          title: 'Escolha como prefere compartilhar esse item',
          component: 'share-product-popup',
        },
        data: {
          title,
          slug,
          images: [image, ...images],
        },
      });
    },
  },
  watch: {
    '$store.getters.popupAccepted': {
      deep: true,
      handler({ id }) {
        if (id !== 'share') {
          return;
        }

        const {
          title, slug, message, selectedImage,
        } = store.getters.popupData;

        if (!selectedImage) {
          return store.dispatch('spawnError', {
            message: 'Selecione uma imagem',
          });
        }

        createShareIntent({
          title,
          url: `${location.origin}/product/${slug}`,
          files: [selectedImage],

          ...(message ? { text: `${message}\n\n` } : {}),
        }).then(
          () => store.dispatch('closePopup'),
          (message) => store.dispatch('spawnError', { message }),
        );
      },
    },
  },
  async beforeRouteEnter(to, from, next) {
    if (store.getters['product/itemsCount'] === 0) {
      await store.dispatch('product/getAll');
    }

    next();
  },
};
</script>
