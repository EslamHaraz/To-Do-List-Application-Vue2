import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import VueEllipseProgress from "vue-ellipse-progress";
import JwPagination from "jw-vue-pagination";
import i18n from "./locales/translator";
import { Collapse } from "vue-collapsed";
Vue.config.productionTip = false;
import Vuelidate from "vuelidate";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { VueEditor } from "vue2-editor";
import axios from "axios";
import "@/main.css";
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 2,
  newestOnTop: true,
  position: "top-right",
  timeout: 2400,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});
library.add(fas, far, fab);
axios.defaults.baseURL = "http://localhost:3000/";
Vue.use(Vuelidate, "jw-pagination", JwPagination);
Vue.component(
  "FontAwesome",
  FontAwesomeIcon,
  "jw-pagination",
  JwPagination,
  VueEllipseProgress,
  "Collapse",
  Collapse,
  VueEditor
);
new Vue({
  router,
  store,
  i18n,

  render: (h) => h(App),
}).$mount("#app");
const activePage = window.location.pathname;
const allLis = document.querySelectorAll("li", "a");
const allLinks = document.querySelectorAll(" a");
let links = document.querySelectorAll("li.link");
allLis.forEach((link) => {
  link.onclick = function () {
    allLis.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
    console.log(link);
  };
});
allLinks.forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.parentElement.classList.add("active");
  }
});
links.forEach((ele) => {
  ele.classList.remove("active");
});
