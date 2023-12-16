<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 custom-col">
        <BaseHeaderComponent></BaseHeaderComponent>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import BaseHeaderComponent from "@/components/Base/BaseHeaderComponent.vue";
let root = document.querySelector(":root");
export default {
  name: "BaseLayout",
  data() {
    return { root };
  },
  components: { BaseHeaderComponent },
  mounted() {
    root.setAttribute("data-theme-mode", "light");
  },
  methods: {},
};
</script>
<style scoped>
.custom-col {
  background-color: var(--section-color);
  padding: 20px;
}
.row {
  height: 100vh;
  align-items: center;
  position: relative;
}
</style>
