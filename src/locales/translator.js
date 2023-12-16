import VueI18n from "vue-i18n";
import Vue from "vue";
import ar from "./ar/index";
import en from "./en/index";

Vue.use(VueI18n);
const messages = {
  en: en,
  ar: ar,
};

// Create VueI18n instance with options
export default new VueI18n({
  locale: window.localStorage.getItem("language"), // set locale
  messages, // set locale messages
});
