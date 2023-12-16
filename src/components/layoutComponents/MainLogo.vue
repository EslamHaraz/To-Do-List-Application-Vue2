<template>
  <div class="col-lg-2 col-md-3 d-md-none d-xl-block custom-col">
    <div class="logo d-flex height-100 align-items-center mb-4">
      <!-- <h3 class="m-0 siteName" v-if="language == 'ar'">{{ siteNameArabic }}</h3>
      <h3 class="m-0 siteName" v-else>{{ siteNameEnglish }}</h3> -->
      <img :src="siteLogo" class="logo-img m-auto img-fluid" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "DashboardLogo",
  computed: {
    ...mapState({
      siteLogo: (state) => state.siteLogo,
      siteNameEnglish: (state) => state.siteNameEnglish,
      siteNameArabic: (state) => state.siteNameArabic,
      language: (state) => state.language,
    }),
  },
};
</script>
<style scoped>
.logo {
  min-height: 75px;
}

.logo-img {
  width: auto;
}
.siteName {
  color: var(--links-color);
}
.custom-col {
  background-color: var(--sidebar-color);
}
@media (max-width: 1199px) {
  .logo img {
    display: none;
  }
  .custom-col {
    background-color: var(--header-color);
  }
}
@media (max-width: 768px) {
  .custom-col {
    display: none;
  }
}
</style>
