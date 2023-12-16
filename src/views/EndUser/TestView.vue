<template>
  <div
    class="col-lg-2 custom-col"
    :class="{ active: sidebarStatus, 'ltr-direction': language == 'en' }"
  >
    <div class="logo d-flex height-100 align-items-center mb-4 d-md-none">
      <img :src="this.$store.state.siteLogo" class="logo-img m-auto" />
    </div>
    <div class="d-flex flex-column">
      <ul class="ul-links p-0">
        <li
          class="w-100 mb-3 p-2 li-link mb-3"
          v-for="(link, index) in linksObject"
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
          <FontAwesome
            v-if="link.collapse == true"
            @click="link.when = !link.when"
            :icon="['fas', 'angle-down']"
            class="text-color link-icon link-color angle-down"
          />
          <p
            class="text-color bullet d-none"
            :class="{ 'rtl-direction': language == 'ar' }"
          >
            {{ $t(`message.${link.linkName}`) }}
          </p>
          <Collapse v-if="link.collapse == true" :when="link.when">
            <li class="w-100 mb-3 p-2 li-link mb-3">
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
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import { mapState } from "vuex";
const addManger = ref(false);
const addEmployee = ref(false);
const addTask = ref(false);

export default {
  name: "DashboardSidebar",
  data() {
    return {
      addManger,
      addEmployee,
      addTask,
      mangerStatus: this.$props.Manger,
      linksObject: [
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
    };
  },
  computed: {
    ...mapState({
      sidebarStatus: (state) => state.sidebarActive,
      language: (state) => state.langugae,
    }),
  },
  props: ["employee", "Manger"],
  mounted() {},
  components: { Collapse },
};
</script>
<style scoped lang="scss"></style>
