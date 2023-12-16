<template>
  <div
    class="col-lg-2 custom-col"
    :class="{ active: sidebarStatus, 'ltr-direction': language == 'en' }"
  >
    <div class="logo d-flex height-100 align-items-center mb-4 d-md-none">
      <img :src="this.$store.state.siteLogo" class="logo-img m-auto" />
    </div>
    <div class="d-flex flex-column">
      <ul class="ul-links p-0" v-if="this.$props.Manger">
        <li
          class="w-100 mb-3 p-2 li-link mb-3"
          v-for="(link, index) in dashboardLinksObject"
          :key="index"
        >
          <router-link
            exact
            :to="{ name: link.linkPath }"
            class="d-flex align-items-center justify-content-between"
          >
            <div class="d-flex">
              <FontAwesome
                :icon="['fas', link.linkIcon]"
                class="text-color link-icon link-color"
              />
              <h6 class="mb-0 link-name ms-3 me-3 text-color link-color">
                {{ $t(`message.${link.linkName}`) }}
              </h6>
            </div>
            <FontAwesome
              v-if="link.collapse == true"
              @click="link.when = !link.when"
              :icon="['fas', 'angle-down']"
              class="text-color link-icon link-color angle-down"
            />
          </router-link>
          <p
            class="text-color bullet d-none"
            :class="{ 'rtl-direction': language == 'ar' }"
          >
            {{ $t(`message.${link.linkName}`) }}
          </p>
          <Collapse v-if="link.collapse == true" :when="link.when">
            <li class="w-100 mb-3 li-link mb-3 mt-4">
              <router-link
                :to="{ name: link.collapseLink }"
                class="d-flex align-items-center justify-content-between"
              >
                <div class="d-flex">
                  <FontAwesome
                    :icon="['fas', 'plus']"
                    class="text-color link-icon link-color"
                  />
                  <h6 class="mb-0 link-name ms-3 me-3 text-color link-color">
                    {{ $t(`message.${link.collapseName}`) }}
                  </h6>
                </div>
              </router-link>
              <p class="text-color bullet d-none">
                {{ $t(`message.${link.collapseName}`) }}
              </p>
            </li>
          </Collapse>
        </li>
      </ul>
      <ul class="ul-links p-0" v-else>
        <li
          class="w-100 mb-3 p-2 li-link position-relative mb-3 link"
          v-for="(link, index) in endUserLinks"
          :key="index"
        >
          <router-link
            exact
            :to="{ name: link.linkPath }"
            class="d-flex align-items-center justify-content-between"
          >
            <div class="d-flex">
              <FontAwesome
                :icon="['fas', link.linkIcon]"
                class="text-color link-icon link-color"
              />
              <h6 class="mb-0 link-name ms-3 me-3 text-color link-color">
                {{ $t(`message.${link.linkName}`) }}
              </h6>
            </div>
          </router-link>
          <p
            class="text-color bullet d-none"
            :class="{ 'rtl-direction': language == 'ar' }"
          >
            {{ $t(`message.${link.linkName}`) }}
          </p>
        </li>
        <li
          class="w-100 mb-3 p-2 li-link position-relative mb-3 link"
          v-for="(page, index) in pagesList"
          :key="index + 12"
        >
          <router-link
            exact
            :to="{ name: 'PageView', params: { pageId: page.id } }"
            class="d-flex align-items-center justify-content-between"
          >
            <div class="d-flex" v-if="language == 'ar'">
              <FontAwesome
                :icon="['fas', 'file']"
                class="text-color link-icon link-color"
              />
              <h6 class="mb-0 link-name ms-3 me-3 text-color link-color">
                {{ page.ArabicName }}
              </h6>
            </div>
            <div class="d-flex" v-else>
              <FontAwesome
                :icon="['fas', 'file']"
                class="text-color link-icon link-color"
              />
              <h6 class="mb-0 link-name ms-3 me-3 text-color link-color">
                {{ page.EnglishName }}
              </h6>
            </div>
          </router-link>
          <p
            v-if="language == 'ar'"
            class="text-color bullet d-none"
            :class="{ 'rtl-direction': language == 'ar' }"
          >
            {{ page.ArabicName }}
          </p>
          <p
            v-else
            class="text-color bullet d-none"
            :class="{ 'rtl-direction': language == 'ar' }"
          >
            {{ page.EnglishName }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import { mapState } from "vuex";
import axios from "axios";
const addManger = ref(false);
const addEmployee = ref(false);
const addTask = ref(false);
const addPage = ref(false);
export default {
  name: "DashboardSidebar",
  data() {
    return {
      addManger,
      addEmployee,
      addTask,
      pagesList: [],
      mangerStatus: this.$props.Manger,
      dashboardLinksObject: [
        {
          linkPath: "DashboardHomeView",
          linkIcon: "house",
          linkName: "home",
          collapse: false,
        },
        {
          linkPath: "MangersView",
          linkIcon: "user-tie",
          linkName: "mangers",
          collapse: true,
          when: addManger,
          collapseLink: "AddMangerComponent",
          collapseName: "addManger",
        },
        {
          linkPath: "EmployeesView",
          linkIcon: "users",
          linkName: "employees",
          collapse: true,
          when: addEmployee,
          collapseLink: "AddEmployeeComponent",
          collapseName: "addEmployees",
        },
        {
          linkPath: "TasksView",
          linkIcon: "list-check",
          linkName: "taskes",
          collapse: true,
          when: addTask,
          collapseLink: "AddTaskComponent",
          collapseName: "addTask",
        },
        {
          linkPath: "PagesView",
          linkIcon: "file",
          linkName: "pages",
          collapse: true,
          when: addPage,
          collapseLink: "AddPageComponent",
          collapseName: "addPage",
        },
        {
          linkPath: "CommentsView",
          linkIcon: "message",
          linkName: "comments",
          collapse: false,
        },
        {
          linkPath: "SettingsView",
          linkIcon: "gear",
          linkName: "settings",
          collapse: false,
        },
      ],
      endUserLinks: [
        {
          linkPath: "HomeView",
          linkIcon: "house",
          linkName: "home",
          collapse: false,
        },
        {
          linkPath: "EmployeeTasksView",
          linkIcon: "list-check",
          linkName: "taskes",
          collapse: false,
        },
        {
          linkPath: "EmployeeCommentsView",
          linkIcon: "comments",
          linkName: "comments",
          collapse: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      sidebarStatus: (state) => state.sidebarActive,
      language: (state) => state.langugae,
    }),
  },
  props: ["employee", "Manger"],
  mounted() {
    this.getAllPages();
  },
  components: { Collapse },
  methods: {
    getAllPages() {
      axios
        .get(`Pages`)
        .then((response) => {
          this.pagesList = response.data;
        })
        .catch(() => {
          this.$toast.error("Error In Get Pages");
        });
    },
  },
};
</script>
<style scoped lang="scss">
.logo {
  min-height: 75px;
}

.custom-col,
.ul-links {
  background-color: var(--sidebar-color);
}

.custom-col {
  z-index: 500;
}

.logo-img {
  width: 120px;
}

.li-link:hover {
  background-color: var(--hover-bg-color);

  h6,
  svg {
    color: var(--main-color);
  }
}

.li-link i,
.li-link h6 {
  font-size: 18;
}

@media (min-width: 768px) and (max-width: 1199px) {
  .custom-col {
    width: 70px;
  }

  .link-name,
  .angle-down {
    opacity: 0;
  }

  .link-icon {
    margin-right: 8px;
  }

  .li-link .bullet {
    content: "";
    background-color: var(--sidebar-color);
    width: 100px;
    height: 20px;
    position: absolute;
    left: 90px;
    top: 8px;
    line-height: 0px;
    color: var(--links-color);
    padding: 15px;
  }

  .li-link .bullet::after {
    content: "";
    border-color: transparent var(--sidebar-color) transparent transparent;
    border-width: 15px;
    border-style: solid;
    position: absolute;
    left: -30px;
    top: 0px;
  }

  .li-link:hover .bullet {
    display: block !important;
  }
}

@media (max-width: 768px) {
  .custom-col {
    position: fixed;
    width: 220px;
    right: -100%;
    top: 76px;
    min-height: 60vh !important;
  }

  .link-name {
    opacity: 1;
  }

  .link-icon {
    margin-right: 0;
  }

  .custom-col.active {
    right: 0px;
  }

  .custom-col.ltr-direction.active {
    left: 0px !important;
  }
}
.ltr-direction {
  left: -100% !important;
}

.rtl-direction {
  right: 80px;
  border-color: transparent var(--sidebar-color) transparent transparent;
}

.rtl-direction::after {
  left: 100px !important;
  border-color: transparent transparent transparent var(--sidebar-color) !important;
}
</style>
