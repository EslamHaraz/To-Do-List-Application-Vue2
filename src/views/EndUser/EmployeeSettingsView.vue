<template>
  <div class="parent">
    <nav class="d-Flex justify-content-evenly nav-links flex-wrap">
      <li
        v-for="(link, index) in allLinks"
        :key="index"
        class="p-2 link position-relative"
      >
        <router-link :to="{ name: link.link }" class="text-color d-block">
          {{ $t(`message.${link.name}`) }}
        </router-link>
      </li>
    </nav>
    <div class="col-lg-12 content-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmployeeSettingsView",
  data() {
    return {
      allLinks: [
        {
          name: "about",
          link: "AboutEmployeeComponent",
        },
        {
          name: "PersonalSetting",
          link: "PersonalEmployeeSettingComponent",
        },
        {
          name: "GeneralSetting",
          link: "GeneralEmployeeSettingComponent",
        },
        {
          name: "SecuritySetting",
          link: "SecurityEmployeeSettingComponent",
        },
      ],
    };
  },
  mounted() {
    this.redirectUserToAbout();
    this.$store.commit('getAllEmployeeData')
  },
  methods: {
    redirectUserToAbout() {
      if (this.$route.fullPath == "/EmployeeSettings") {
        this.$router.push({ name: "AboutEmployeeComponent" });
      }
    },
  },
};
</script>
<style scoped>
.nav-links {
  background-color: var(--header-color);
  padding: 15px;
  border-bottom: 1px solid #7d7d7d85;
}
.nav-links a {
  width: 130px;
  position: relative;
}
.link::before {
  content: "";
  position: absolute;
  height: 2px;
  width: 0px;
  background-color: var(--main-color);
  left: 0;
  bottom: -10px;
  transition: 0.5s;
  z-index: 500;
}
.link.active {
  color: var(--main-color);
  border-radius: 2px;
}
.link:hover::before,
.link.active::before {
  width: 100%;
}
.content-view {
  background-color: var(--header-color);
}
</style>
