<template>
  <form>
    <div class="images">
      <label v-for="(image, index) in popupData.images" :key="`image-${index}`">
        <input type="checkbox" :value="image" @input="imageSelected" />
        <div class="images__image">
          <img :src="image" />
        </div>
      </label>
    </div>
    <label class="message">
      <div>Mensagem</div>
      <textarea class="message__textarea" v-model="popupData.message" />
    </label>
  </form>
</template>

<script>
export default {
  computed: {
    popupData() {
      return this.$store.getters.popupData;
    },
  },
  methods: {
    async imageSelected({ target: { checked, value } }) {
      if (checked) {
        const name = value.replace(/.*\//, '');
        const blob = await fetch(value).then(
          (response) => response.blob(),
          (error) => this.$store.dispatch('spawnError', {
            message: error,
          }),
        );

        this.popupData.selectedImage = new File([blob], name, {
          type: blob.type,
        });
      }
    },
  },
};
</script>

<style scoped src="./share-product.css"></style>
