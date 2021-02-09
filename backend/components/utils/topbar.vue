<template>
  <div class="list topbar">
    <input-text
      class="topbar__input"
      type="text"
      name="search"
      icon="fa fa-search"
      placeholder="Pesquisar"

      v-model="value"
      :lazy="false"
    />

    <button-base
      class="topbar__button"
      title="Adicionar"
      bstyle="padded-1"
      @click="$router.push({ path: 'add' })"
    />

    <div
      class="topbar__count"
      :data-content="$store.getters[`${context}/filteredCount`]"
    >
      Itens cadastrados:
    </div>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    filterItems(value) {
      const items = this.$store.getters[`${this.context}/items`];
      if (!items || items.length === 0) {
        return;
      }

      const { name, title } = items[0];
      const prop = (Object.keys(name ? { name } : title ? { title } : {})
        || [])[0];

      if (!prop) {
        return;
      }

      this.$store.dispatch(`${this.context}/filter`, {
        [prop]: {
          value,
        },
      });
    },
  },
  watch: {
    value(value) {
      this.filterItems(value);
    }
  }
};
</script>

<style scoped src="./topbar.css"></style>
