<template>
  <div class="parent">
    <div class="col-lg-12 bg-profile position-relative">
      <div class="container center-container">
        <div class="user-details position-relative">
          <img :src="this.$store.state.mangerData.Photo" class="user-img-border" />
        </div>
        <div class="user-info d-Flex">
          <div>
            <h4 class="text-color">{{ this.$store.state.mangerData.Name }}</h4>

            <h6 class="text-color">
              {{ this.$store.state.mangerData.Address }}
            </h6>
            <h6 class="text-color" v-if="this.$store.state.mangerData.Type == 'male'">
              {{ $t("message.type") }} : {{ $t("message.male") }}
            </h6>
            <h6 class="text-color" v-else>
              {{ $t("message.type") }} : {{ $t("message.feMale") }}
            </h6>
          </div>
          <div>
            <router-link :to="{}" class="d-Flex edit-setting">
              {{ $t("message.editSetting") }}
              <FontAwesome :icon="['fas', 'gear']" class="me-2 ms-2" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
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
import { mapState } from "vuex";
let mangerDetails = JSON.parse(localStorage.getItem("manger-detail"));
export default {
  name: "UserSettingsView",
  data() {
    return {
      allLinks: [
        {
          name: "about",
          link: "AboutUserComponent",
        },
        {
          name: "PersonalSetting",
          link: "PersonalSettingComponent",
        },
        {
          name: "GeneralSetting",
          link: "GeneralSettingComponent",
        },
        {
          name: "SecuritySetting",
          link: "SecuritySettingComponent",
        },
      ],
      mangerDetails,
      mangerPhoto: "",
      mangerName: "",
    };
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
    }),
  },
  mounted() {
    this.redirectUserToAbout();
  },
  methods: {
    redirectUserToAbout() {
      if (this.$route.fullPath == "/Dashboard/MangerSettings") {
        this.$router.push({ name: "AboutUserComponent" });
      }
    },
  },
};
</script>
<style scoped>
.user-details {
  width: 150px;
}
.bg-profile {
  background-image: url(@/assets/bg-profile.jpg);
  height: 300px;
  background-size: cover;
  background-position: center;
}
.user-img-border {
  max-width: 100px;
  position: absolute;
  top: -60px;
}
.center-container {
  bottom: -80px;
  text-align: initial;
  background-color: var(--header-color);
  padding: 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-height: 130px;
  border: 1px solid #7d7d7d85;
}
.user-info {
  margin-top: 45px;
}
.edit-setting {
  background-color: var(--red-color);
  padding: 10px;
  color: var(--danger-color);
  border-radius: 3px;
}
.edit-setting:hover {
  background-color: var(--danger-color);
  color: white;
}
.nav-links {
  margin-top: 100px;
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
