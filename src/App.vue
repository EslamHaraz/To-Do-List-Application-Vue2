<template>
  <div id="app" :class="{ direction: status == true }">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return { status: "" };
  },
  mounted() {
    let language = window.localStorage.getItem("language");
    if (language == "ar") {
      this.status = true;
    } else this.status = "";
  },
};
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
.direction {
  direction: rtl;
}
</style>
