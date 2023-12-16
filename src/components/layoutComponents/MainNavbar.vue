<template>
  <div class="col-xl-10 col-md-12 p-0">
    <header class="p-3 d-flex justify-content-between align-items-center w-100">
      <div class="burger-icon">
        <FontAwesome :icon="['fas', 'bars']" class="text-color" @click="openSidebar()" />
      </div>
      <div class="settings d-Flex">
        <div class="change-mode-icons">
          <FontAwesome
            @click="changeMode(), (dark = !dark)"
            v-if="dark == false"
            :icon="['fas', 'moon']"
            class="text-color cursor-pointer"
          />
          <FontAwesome
            @click="changeMode(), (dark = !dark)"
            v-if="dark == true"
            :icon="['fas', 'sun']"
            class="text-color cursor-pointer"
          />
        </div>
        <div class="change-language">
          <select
            v-model="language"
            @change="changeLanguage()"
            class="form-select select-language"
          >
            <option value="ar">{{ $t("message.arabic") }}</option>
            <option value="en">{{ $t("message.english") }}</option>
          </select>
        </div>
        <div class="profile-setting position-relative">
          <div @click="menu = !menu" class="d-Flex" v-if="this.$props.Manger">
            <img :src="this.$store.state.mangerData.Photo" class="cursor-pointer" />
            <h5 class="text-color m-0 d-flex d-Flex cursor-pointer">
              {{ this.$store.state.mangerData.Name }}
            </h5>
            <i class="fa-solid fa-angle-down text-color"></i>
          </div>
          <div @click="menu = !menu" class="d-Flex" v-else>
            <img :src="this.$store.state.employeeData.Photo" class="cursor-pointer" />
            <h5 class="text-color m-0 d-flex d-Flex cursor-pointer">
              {{ this.$store.state.employeeData.Name }}
            </h5>
            <i class="fa-solid fa-angle-down text-color"></i>
          </div>
          <div
            class="box-setting"
            :class="{ active: menu, 'ltr-direction': usedLanguage == 'en' }"
          >
            <h5 class="text-color text-initial ms-2 mb-3">
              {{ $t("message.userFile") }}
            </h5>
            <div v-if="this.$props.Manger">
              <h5 class="text-color mb-1">{{ this.$store.state.mangerData.Name }}</h5>
              <div class="user-info d-flex justify-content-center pb-3">
                <h5 class="text-color mb-0">{{ this.$store.state.mangerData.Email }}</h5>
                <FontAwesome :icon="['fas', 'envelope']" class="text-color ms-2 me-2" />
              </div>
            </div>
            <div v-else>
              <h5 class="text-color mb-1">{{ this.$store.state.employeeData.Name }}</h5>
              <div class="user-info d-flex justify-content-center pb-3">
                <h5 class="text-color mb-0">
                  {{ this.$store.state.employeeData.Email }}
                </h5>
                <FontAwesome :icon="['fas', 'envelope']" class="text-color ms-2 me-2" />
              </div>
            </div>
            <router-link
              v-if="this.$props.Manger"
              :to="{ name: 'MangerSettings' }"
              class="account-setting d-flex pt-2 pb-2 mt-2 align-items-center"
            >
              <FontAwesome
                @click="menu = !menu"
                :icon="['fas', 'user']"
                class="text-color ms-3 me-3"
              />
              <div @click="menu = !menu" class="content d-flex flex-column">
                <h5 class="text-color mb-2">
                  {{ $t("message.personalFile") }}
                </h5>
                <h6 class="text-color mb-1">
                  {{ $t("message.accountSetting") }}
                </h6>
              </div>
            </router-link>
            <router-link
              v-else
              :to="{ name: 'EmployeeSettingsView' }"
              class="account-setting d-flex pt-2 pb-2 mt-2 align-items-center"
            >
              <FontAwesome
                @click="menu = !menu"
                :icon="['fas', 'user']"
                class="text-color ms-3 me-3"
              />
              <div @click="menu = !menu" class="content d-flex flex-column">
                <h5 class="text-color mb-2">
                  {{ $t("message.personalFile") }}
                </h5>
                <h6 class="text-color mb-1">
                  {{ $t("message.accountSetting") }}
                </h6>
              </div>
            </router-link>
            <button @click="logOut()" class="btn-logout text-color">
              {{ $t("message.logOut") }}
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
let usedLanguage = localStorage.getItem("language");
let root = document.querySelector(":root");
let mode = window.localStorage.getItem("mode");
export default {
  name: "DashboardNavbar",
  data() {
    return {
      mode,
      root,
      dark: true,
      language: "",
      menu: false,
      usedLanguage,
    };
  },
  props: ["employee", "Manger"],
  methods: {
    openSidebar() {
      this.$store.commit("openSidebar");
    },
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
    logOut() {
      if (this.$props.Manger == true) {
        localStorage.removeItem("manger-detail");
      } else {
        localStorage.removeItem("employee-detail");
      }
      location.reload();
    },
  },
};
</script>
<style lang="scss">
header {
  background-color: var(--header-color);
  height: 100%;
  svg {
    font-size: 25px;
  }
  .settings {
    width: 350px;
  }
  .profile-setting {
    width: 150px;
    img {
      width: 65px;
      border-radius: 3px;
    }
    i {
      font-size: 15px;
      height: 24px;
      line-height: 27px;
    }
    .box-setting {
      position: absolute;
      background-color: var(--header-color);
      color: var(--text-color);
      width: 350px;
      min-height: 200px;
      top: 75px;
      opacity: 0;
      left: -16px;
      padding: 0;
      visibility: hidden;
      display: flex;
      flex-direction: column;
      padding: 15px;
      z-index: 50;
      &.active {
        opacity: 1;
        top: 59px;
        visibility: visible;
      }
    }
  }
  .link-name,
  .link-icon {
    color: var(--font-color);
    font-size: 17px;
  }
  .link-name {
    line-height: 10px;
  }
  .user-info {
    border-bottom: 1px solid var(--font-color);
  }
  .account-setting svg {
    background-color: var(--body-color);
    border-radius: 50%;
    height: 25px;
    width: 25px;
    padding: 10px;
  }
  .btn-logout {
    padding: 10px;
    background-color: var(--body-color);
    border-radius: 3px;
    font-size: 20px;
    border: none;
    box-shadow: 0px 0px 3px 1px var(--links-color);
  }
  .ltr-direction {
    left: -184px !important;
  }
  @media (max-width: 768px) {
    header {
      width: 100%;
    }
  }
}
</style>
