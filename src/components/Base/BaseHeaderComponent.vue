<template>
  <header class="d-flex justify-content-between align-items-center">
    <select
      v-model="language"
      @change="changeLanguage()"
      class="form-select select-language"
    >
      <option value="ar">{{ $t("message.arabic") }}</option>
      <option value="en">{{ $t("message.english") }}</option>
    </select>
    <h3 class="mb-0 text-color path">{{ $t("message.welcomeMessage") }}</h3>
    <FontAwesome
      @click="changeMode(), (dark = !dark)"
      v-if="dark == true"
      :icon="['fas', 'moon']"
      class="text-color text-color"
    />
    <FontAwesome
      @click="changeMode(), (dark = !dark)"
      v-if="dark == false"
      :icon="['fas', 'sun']"
      class="text-color text-color"
    />
  </header>
</template>
<script>
let root = document.querySelector(":root");
let mode = window.localStorage.getItem("mode");
export default {
  name: "BaseHeaderComponent",
  data() {
    return {
      mode,
      root,
      dark: true,
      language: "",
    };
  },
  methods: {
    changeMode() {
      if (root.getAttribute("data-theme-mode") == "dark") {
        root.setAttribute("data-theme-mode", "light");
        window.localStorage.setItem("mode", "light");
      } else {
        root.setAttribute("data-theme-mode", "dark");
        window.localStorage.setItem("mode", "dark");
      }
    },
    changeLanguage() {
      window.localStorage.setItem("language", this.language);
      location.reload();
    },
  },
};
</script>
<style scoped>
.path {
  text-transform: capitalize;
}
.container {
  background-color: var(--section-color);
  padding: 20px;
}
.bg-color {
}
.select-language {
  width: 100px;
}
svg {
  font-size: 25px;
  cursor: pointer;
}
</style>
