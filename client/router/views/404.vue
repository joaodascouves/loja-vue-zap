<template>
  <div class="notfound">
    <div class="content-centered">
      <div class="notfound__big">
        404
      </div>
      <div class="notfound__small">
        Precisa de um mapa? :p
      </div>

      <button-base
        title="Continuar comprando"
        padding="1em 2em"
        margin="2.5em 0"
        @click="$router.push({ path: '/products' })"
      />
    </div>
  </div>
</template>

<style scoped src="./404.css"></style>
