<template>
  <div class="container">
    <div class="row">
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
let root = document.querySelector(":root");
let employee = JSON.parse(localStorage.getItem("employee-detail"));
export default {
  name: "EndUserLayout",
  data() {
    return {
      root,
      employee,
      employeeStatus: false,
      mangerStatus: false,
    };
  },
  components: {
    MainNavbar,
    MainLogo,
    MainSidebar,
    MainFooter,
  },
  mounted() {
    this.$store.commit("getSiteData");
    if (employee) {
      root.setAttribute("data-theme-mode", employee.Mode);
    }
    this.checkIfEmployee();
    if (this.$route.fullPath == "/") {
      this.$router.push({ name: "HomeView" });
    } else return;
  },
  methods: {
    checkIfEmployee() {
      if (!this.$store.state.employee) {
        this.$router.push({ name: "SignInUserView" });
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
