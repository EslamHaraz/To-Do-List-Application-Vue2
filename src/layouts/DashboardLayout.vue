<template>
  <div class="container">
    <div class="row position-relative">
      <MainLogo></MainLogo>
      <MainNavbar :employee="employeeStatus" :Manger="mangerStatus"></MainNavbar>
      <MainSidebar :employee="employeeStatus" :Manger="mangerStatus"></MainSidebar>
      <div class="main-content col-md-10 col-lg-10 pt-3 mb-5">
        <router-view></router-view>
      </div>
      <MainFooter></MainFooter>
    </div>
  </div>
</template>
<script>
import MainNavbar from "@/components/layoutComponents/MainNavbar.vue";
import MainLogo from "@/components/layoutComponents/MainLogo.vue";
import MainSidebar from "@/components/layoutComponents/MainSidebar.vue";
import MainFooter from "@/components/layoutComponents/MainFooter.vue";
let manger = localStorage.getItem("manger-detail");
let root = document.querySelector(":root");
export default {
  name: "DashboardLayout",
  data() {
    return { manger, employeeStatus: false, mangerStatus: true, root };
  },
  components: {
    MainNavbar,
    MainLogo,
    MainSidebar,
    MainFooter,
  },
  mounted() {
    this.checkIfNotManger();
    if (this.$route.fullPath == "/dashboard" || this.$route.fullPath == "/Dashboard") {
      this.$router.push({ name: "DashboardHomeView" });
    }
    if (manger) {
      root.setAttribute("data-theme-mode", JSON.parse(manger).Mode);
    }
    this.$store.commit("getSiteData");
  },
  methods: {
    checkIfNotManger() {
      if (!manger) {
        this.$router.push({ name: "SignInAdminView" });
      }
    },
  },
};
</script>
<style scoped>
.main-content {
  min-height: 100vh;
}
</style>
