<template>
  <div
    class="centered instagram"
    v-if="business.instagram && business.instagram.length > 0 && photos.length > 0"
  >
    <div class="header3">Instagram</div>
    <div class="grid">
      <div class="grid__photo" v-for="(photo, index) in photos" :key="index">
        <image-container class="rounded" :src="photo.display_url" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photos: [],
    };
  },

  computed: {
    business() {
      return this.$store.getters['client/business'];
    },
  },

  mounted() {
    fetch(`https://www.instagram.com/${this.business.instagram}/`)
      .then((response) => response.text())
      .then((response) => {
        let unparsedJson = response.match(
          /window\._sharedData = (.*?)(?=<\/script>)/,
        );

        if (unparsedJson) {
          // eslint-disable-next-line prefer-destructuring
          unparsedJson = unparsedJson[1];
          unparsedJson = unparsedJson.substr(0, unparsedJson.length - 1);
        } else {
          Promise.reject();
        }

        const data = JSON.parse(unparsedJson);

        if (data.is_private === true) {
          Promise.reject();
        }

        const { user } = data.entry_data.ProfilePage[0].graphql;
        this.photos = user.edge_owner_to_timeline_media.edges
          .slice(0, 9)
          .map((photo) => photo.node);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.warn({ err }));
  },
};
</script>

<style scoped src="./photo-grid.css"></style>
<style scoped src="./instagram-grid.css"></style>
