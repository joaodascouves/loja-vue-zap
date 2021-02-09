<template>
  <div class="dashboard">
    <div class="dashboard__panel dashboard__panel--chart">
      <sales-chart-container class="dashboard__chart" />
    </div>

    <div class="dashboard__panel dashboard__panel--stats">
      <div class="header2">
        Sua loja em números
      </div>

      <div class="stats">
        <div
          class="stats__stat"
          v-for="(stat, index) in stats"
          :key="`stat-${index}`"
        >
          <div class="stat__value">{{ stat.value }}</div>

          <div class="stat__label">
            <span
              class="clickable"
              @click="$router.push({ path: stat.listRoute })"
            >
              {{ stat.label }}
            </span>

            <span
              class="stat__add clickable fa fa-plus"
              v-if="stat.addRoute"
              @click="$router.push({ path: stat.addRoute })"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SalesChartContainer from 'backend/components/dashboard/sales-chart.vue';
import store from 'backend/store';

export default {
  components: {
    SalesChartContainer,
  },
  computed: {
    stats() {
      const listRoutes = {
        product: '/product/list',
        category: '/category/list',
        featured: '/customization/featured/list',
        discount: '/product/discount/list',
        customer: '/user/list',
        order: '/order/list',
      };

      const addRoutes = {
        product: '/product/add',
        category: '/category/add',
        featured: '/customization/featured/add',
        discount: '/product/discount/add',
      };

      return Object.entries(this.$store.getters['client/stats']).map(
        ([key, value]) => {
          const name = key.replace('Count', '');

          return {
            label: this.statLabel(key),
            value,

            ...(listRoutes[name] ? { listRoute: listRoutes[name] } : {}),
            ...(addRoutes[name] ? { addRoute: addRoutes[name] } : {}),
          };
        },
      );
    },
  },
  methods: {
    statLabel(key) {
      const name = key.replace('Count', '');

      switch (name) {
      case 'product':
        return 'produtos cadastrados';
      case 'category':
        return 'categorias cadastradas';
      case 'featured':
        return 'destaques cadastrados';
      case 'discount':
        return 'descontos em vigência';
      case 'customer':
        return 'clientes cadastrados';
      case 'order':
        return 'pedidos computados';

      default:
        return `${name} cadastrados`;
      }
    },
  },

  async beforeRouteEnter(to, from, next) {
    const stats = store.getters['client/stats'];

    if (!stats || Object.keys(stats).length === 0) {
      await store.dispatch('client/getStats');
    }

    next();
  },
};
</script>

<style scoped src="./dashboard.css"></style>
