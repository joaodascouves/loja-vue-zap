<template>
  <div
    class="slideshow-container"
    v-if="featuredItems.length > 0"
    v-show="visible"
  >
    <transition name="slide" mode="in-out">
      <div class="slideshow" :key="slideStep">
        <div
          class="slide"
          v-for="(featured, index) in [featuredItems[slideStep]]"
          :key="`featured-${index}`"
          @click="goToLink(featured.link)"
        >
          <img
            class="slide__image rounded"
            :src="featured.image"
            :alt="featured.title"
          />

          <div class="slide__center">
            <div
              class="slide__title"
              v-if="featured.title && featured.title.length > 0"
            >
              {{ featured.title }}
            </div>
            <div
              class="slide__description"
              v-if="featured.description && featured.description.length > 0"
            >
              {{ featured.description }}
            </div>

            <button-base
              class="slide__button"
              v-if="featured.action && featured.action.length > 0"
              :title="featured.action"
              :sync="true"
              padding=".3em 1.2em"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    speed: {
      type: Number,
      default: 7200,
    },
  },
  data() {
    return {
      slideStep: 0,
      visible: true,
      fixTop: false,
    };
  },
  computed: {
    featuredItems() {
      return this.$store.getters['featured/items'].filter(
        (item) => item.visible === true,
      );
    },
    imagesReady() {
      this.images.filter((image) => image !== undefined).length > 0;
    },
  },
  methods: {
    goToLink(link) {
      if (/^\//.test(link)) {
        this.$router.push({ path: link });
      } else {
        window.location.href = link;
      }
    },
  },
  beforeMount() {
    this.featuredItems.forEach((item, index) => this.loadImage(item.image).then((image) => {
      this.$store.dispatch('featured/setCachedImage', {
        _id: item._id,
        image,
      });
    }));
  },
};
</script>

<style scoped src="./photo-slide.css"></style>
