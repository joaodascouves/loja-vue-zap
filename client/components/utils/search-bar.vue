<template>
  <div class="searchbar">
    <input-text
      class="searchbar__input"
      type="text"
      name="search"
      borderColor="transparent"
      placeholder="O que você procura?"
      v-model="query"
    />
    <i class="searchbar__icon fas fa-search" @click="toggleSearch" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    };
  },
  methods: {
    toggleSearch() {
      this.$el.querySelector('.searchbar__input').classList.toggle('show');

      this.$emit('searchToggled');
    },
  },
  watch: {
    query: {
      handler(event) {
        this.$router.push({ path: `/products/all?search=${this.query}` });
      },
    },
  },
};
</script>

<style scoped src="./search-bar.css"></style>
