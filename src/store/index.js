import translator from "@/locales/translator";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  language: localStorage.getItem("language"),
  manger: localStorage.getItem("manger-detail"),
  employee: localStorage.getItem("employee-detail"),
  mangerId: "",
  employeeId: "",
  successMessage: translator.messages.en.message.successMessage,
  ErrorMessage: translator.messages.en.message.errorMessage,
  signInMessage: translator.messages.en.message.signInMessage,
  notDeliveredMessage: translator.messages.en.message.notDeliveredMessage,
  sidebarActive: false,
  langugae: "",
  customLabels: {
    first: "<<",
    last: ">>",
    previous: "<",
    next: ">",
  },
  allSiteData: "",
  siteNameEnglish: "",
  siteNameArabic: "",
  siteLogo: "",
  siteIcon: "",
  mangerData: "",
  employeeData: "",
  allEmployeesData: "",
  allMangersData: [],
};
const mutations = {
  openSidebar(state) {
    state.sidebarActive == true
      ? (state.sidebarActive = false)
      : (state.sidebarActive = true);
  },
  editSiteData(state, payload) {
    state.siteNameEnglish = payload.englishName;
    state.siteNameArabic = payload.arabicName;
    state.siteLogo = payload.siteLogo;
    state.siteIcon = payload.siteIcon;
    document.querySelector("link[rel*='icon']").href = state.siteIcon;
  },
  getSiteData(state) {
    axios.get(`SiteSettings/1`).then((response) => {
      state.allSiteData = response.data;
      state.siteNameEnglish = response.data.SiteNameEnglish;
      state.siteNameArabic = response.data.SiteNameArabic;
      state.siteLogo = response.data.SiteLogo;
      state.siteIcon = response.data.SiteIcon;

      document.querySelector("link[rel*='icon']").href = state.siteIcon;
    });
  },
  getMangerData(state) {
    axios.get(`Mangers/${state.mangerId}`).then((response) => {
      state.mangerData = response.data;
    });
  },
  getAllMangersData(state) {
    axios.get(`Mangers`).then((response) => {
      state.allMangersData = response.data;
    });
  },
  getEmployeeData(state) {
    axios.get(`Employees/${state.employeeId}`).then((response) => {
      state.employeeData = response.data;
    });
  },
  getAllEmployeesData(state) {
    axios.get(`Employees`).then((response) => {
      state.allEmployeesData = response.data;
    });
  },
};
export default new Vuex.Store({
  state: state,
  getters: {},
  mutations: mutations,
  actions: {},
  modules: {},
});
window.onload = function () {
  if (state.manger) {
    state.mangerId = JSON.parse(state.manger).id;
    mutations.getMangerData(state);
  }
  if (state.employee) {
    state.employeeId = JSON.parse(state.employee).id;
    mutations.getEmployeeData(state);
  }
  mutations.getAllMangersData(state);
  mutations.getAllEmployeesData(state);
  state.langugae = localStorage.getItem("language");
  if (state.language == "ar") {
    state.customLabels = {
      first: ">>",
      last: "<<",
      previous: ">",
      next: "<",
    };
    state.successMessage = translator.messages.ar.message.successMessage;
    state.ErrorMessage = translator.messages.ar.message.errorMessage;
    state.signInMessage = translator.messages.ar.message.signInMessage;
    state.notDeliveredMessage =
      translator.messages.ar.message.notDeliveredMessage;
  }
};
