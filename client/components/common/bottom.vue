<template>
  <div class="centered bottom-section">
    <div class="section section--info soft" data-name="">
      <div>
        <image-container
          class="logo"
          :src="$root.$c_cachedLogo"
          @click.native="$router.push({ path: '/' })"
        />
      </div>

      <div class="business">
        <div
          class="business__info clickable"
          v-if="$root.$c_business.instagram && $root.$c_business.instagram.length > 0"
          @click="
            openExternalLink(
              `https://instagram.com/${$root.$c_business.instagram}`
            )
          "
        >
          <i class="business__icon fab fa-instagram" />
          <span>@{{ $root.$c_business.instagram }}</span>
        </div>
        <div
          class="business__info clickable"
          @click="openExternalLink(`tel: ${$root.$c_business.phone}`)"
        >
          <i class="business__icon fab fa-whatsapp" />
          <span>{{ $root.$c_business.phone }}</span>
        </div>
        <div class="business__info" v-if="$root.$c_business.physical === true">
          <i class="business__icon fas fa-map-marker-alt" />
          <span>{{ location.street }},</span>
          <span>{{ location.number }},</span>
          <span>{{ location.district }},</span>
          <span>{{ location.city }} - {{ location.state }},</span>

          <span v-if="location.complement">{{ location.complement }},</span>
          <span>{{ location.zipcode }}</span>
        </div>
      </div>
    </div>
    <div class="section" data-name="Navegação">
      <ul>
        <li
          v-for="(route, index) in $router.options.routes.filter(route =>
            isRoutePublic(route)
          )"
          :key="`route-${index}`"
        >
          <router-link :to="route.path">
            <span class="soft">{{ route.meta.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="section" data-name="Meios de pagamento">
      <ul>
        <li
          class="soft"
          v-for="({ name }, index) in $store.getters['client/paymentMethods']"
          :key="`method-${index}`"
        >
          {{ name }}
        </li>
      </ul>
    </div>

    <div class="section" data-name="Meios de entrega">
      <ul>
        <li
          class="soft"
          v-for="({ name }, index) in $store.getters['client/shipmentServices']"
          :key="`service-${index}`"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: this.$root.$c_business.location,
    };
  },
};
</script>

<style scoped src="static/styles/shared/bottom.css"></style>
<style scoped src="./bottom.css"></style>
