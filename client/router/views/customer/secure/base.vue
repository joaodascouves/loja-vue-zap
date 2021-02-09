<template>
  <fullpage-container>
    <template v-slot:header>
      <div class="header2">
        Área do cliente
      </div>
    </template>
    <template v-slot:content>
      <menu-body-container>
        <menu-item-container
          v-for="(item, index) in menuItems"
          :key="`item-${index}`"
          :item="item"
        />
      </menu-body-container>

      <grid-container>
        <grid-box-container class="box" :title="$route.meta.title">
          <template v-slot:content>
            <router-view />
          </template>
        </grid-box-container>
      </grid-container>
    </template>
  </fullpage-container>
</template>

<script>
import * as FullpageComponents from 'client/components/_fullpage';
import * as MenuComponents from 'client/components/_menu';
import * as GridComponents from 'client/components/_grid';

export default {
  components: {
    ...FullpageComponents,
    ...MenuComponents,
    ...GridComponents,
  },
  data() {
    return {
      menuItems: [
        {
          name: 'Resumo da conta',
          path: '/customer/secure/me',
        },
        {
          name: 'Dados cadastrais',
          path: '/customer/secure/account',
        },
        {
          name: 'Histórico de pedidos',
          path: '/customer/secure/orders',
        },
        {
          name: 'Sair',
          action: () => this.$store
            .dispatch('user/logout')
            .then(() => this.$router.push({ path: '/' })),
        },
      ],
    };
  },
};
</script>

<style scoped src="./base.css"></style>
