<template>
  <div class="p-0 position-relative">
    <footer>
      <h5 class="text-color p-0 mb-0 cobyright">
        {{ date.getUTCFullYear() }} © Grand - Theme by Eslam
      </h5>
    </footer>
  </div>
</template>
<script>
let date = new Date();
export default {
  name: "DashboardFooter",
  data() {
    return {
      date,
    };
  },
  mounted() {

  },
};
</script>
<style scoped lang="scss">
footer {
  background-color: var(--sidebar-color);
  padding: 10px;

  .cobyright {
    color: var(--links-color);
  }
  @media (max-width: 768px) {
    & {
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
}
</style>
