import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/EndUser/HomeView.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import SignUpUserView from "@/views/EndUser/SignUpUserView.vue";
import SignInUserView from "@/views/EndUser/SignInEmployeeView.vue";
import SignInAdminView from "@/views/Dashboard/SignInAdminView.vue";
import ForgetPassowordView from "@/views/ForgetPassowordView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EndUserLayout from "@/layouts/EndUserLayout.vue";
import DashboardHomeView from "@/views/Dashboard/DashboardHomeView";
import MangersView from "@/views/Dashboard/MangersView.vue";
import EmployeesView from "@/views/Dashboard/EmployeesView.vue";
import CommentsView from "@/views/Dashboard/CommentsView.vue";
import TasksView from "@/views/Dashboard/TasksView.vue";
import SettingsView from "@/views/Dashboard/SettingsView.vue";
import PagesView from "@/views/Dashboard/PagesView.vue";
import MangerSettingsView from "@/views/Dashboard/MangerSettingsView.vue";
import AddEmployeeComponent from "@/components/Dashboard/AddEmployeeComponent.vue";
import AddMangerComponent from "@/components/Dashboard/AddMangerComponent.vue";
import AddTaskComponent from "@/components/Dashboard/AddTaskComponent.vue";
import AddPageComponent from "@/components/Dashboard/AddPageComponent.vue";
import AboutUserComponent from "@/components/Dashboard/AboutMangerComponent.vue";
import PersonalSettingComponent from "@/components/Dashboard/PersonalSettingComponent.vue";
import GeneralSettingComponent from "@/components/Dashboard/GeneralSettingComponent.vue";
import SecuritySettingComponent from "@/components/Dashboard/SecuritySettingComponent.vue";
import EmployeeTasksView from "@/views/EndUser/EmployeeTasksView.vue";
import TaskView from "@/views/EndUser/TaskView.vue";
import EmployeeCommentsView from "@/views/EndUser/EmployeeCommentsView.vue";
import PageView from "@/views/EndUser/PageView.vue";
import TestView from "@/views/EndUser/TestView.vue";
import EmployeeSettingsView from "@/views/EndUser/EmployeeSettingsView.vue";
import AboutEmployeeComponent from "@/components/EndUser/AboutEmployeeComponent.vue";
import GeneralEmployeeSettingComponent from "@/components/EndUser/GeneralEmployeeSettingComponent.vue";
import PersonalEmployeeSettingComponent from "@/components/EndUser/PersonalEmployeeSettingComponent.vue";
import SecurityEmployeeSettingComponent from "@/components/EndUser/SecurityEmployeeSettingComponent.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Base",
    name: "BaseLayout",
    component: BaseLayout,
    children: [
      // {
      //   path: "SignUp",
      //   name: "SignUpUserView",
      //   component: SignUpUserView,
      // },
      {
        path: "SignIn",
        name: "SignInUserView",
        component: SignInUserView,
      },
      {
        path: "SignIn-Amdin-Dashboard",
        name: "SignInAdminView",
        component: SignInAdminView,
      },
      {
        path: "ForgetPassoword",
        name: "ForgetPassowordView",
        component: ForgetPassowordView,
      },
    ],
  },
  {
    path: "/Dashboard",
    name: "DashboardLayout",
    component: DashboardLayout,
    children: [
      {
        path: "Home",
        name: "DashboardHomeView",
        component: DashboardHomeView,
      },
      {
        path: "Mangers",
        name: "MangersView",
        component: MangersView,
      },
      {
        path: "Employees",
        name: "EmployeesView",
        component: EmployeesView,
      },
      {
        path: "Comments",
        name: "CommentsView",
        component: CommentsView,
      },
      {
        path: "Tasks",
        name: "TasksView",
        component: TasksView,
      },
      {
        path: "SettingsView",
        name: "SettingsView",
        component: SettingsView,
      },
      {
        path: "Pages",
        name: "PagesView",
        component: PagesView,
      },
      {
        path: "MangerSettings",
        name: "MangerSettings",
        component: MangerSettingsView,
        children: [
          {
            path: "AboutUser",
            name: "AboutUserComponent",
            component: AboutUserComponent,
          },
          {
            path: "PersonalSetting",
            name: "PersonalSettingComponent",
            component: PersonalSettingComponent,
          },
          {
            path: "GeneralSetting",
            name: "GeneralSettingComponent",
            component: GeneralSettingComponent,
          },
          {
            path: "SecuritySetting",
            name: "SecuritySettingComponent",
            component: SecuritySettingComponent,
          },
        ],
      },
      {
        path: "AddManger",
        name: "AddMangerComponent",
        component: AddMangerComponent,
      },
      {
        path: "AddEmployee",
        name: "AddEmployeeComponent",
        component: AddEmployeeComponent,
      },
      {
        path: "AddTask",
        name: "AddTaskComponent",
        component: AddTaskComponent,
      },
      {
        path: "addPage",
        name: "AddPageComponent",
        component: AddPageComponent,
      },
    ],
  },
  {
    path: "/",
    name: "EndUserLayout",
    component: EndUserLayout,
    children: [
      {
        path: "/home",
        name: "HomeView",
        component: HomeView,
      },
      {
        path: "EmployeeTasks",
        name: "EmployeeTasksView",
        component: EmployeeTasksView,
      },
      {
        path: "Task/:taskId",
        name: "TaskView",
        component: TaskView,
      },
      {
        path: "EmployeeComments",
        name: "EmployeeCommentsView",
        component: EmployeeCommentsView,
      },
      {
        path: "Page/:pageId",
        name: "PageView",
        component: PageView,
      },
      {
        path: "Test",
        name: "TestView",
        component: TestView,
      },
      {
        path: "EmployeeSettings",
        name: "EmployeeSettingsView",
        component: EmployeeSettingsView,
        children: [
          {
            path: "AboutEmployee",
            name: "AboutEmployeeComponent",
            component: AboutEmployeeComponent,
          },
          {
            path: "GeneralEmployeeSettings",
            name: "GeneralEmployeeSettingComponent",
            component: GeneralEmployeeSettingComponent,
          },
          {
            path: "PersonalEmployeeSetting",
            name: "PersonalEmployeeSettingComponent",
            component: PersonalEmployeeSettingComponent,
          },
          {
            path: "SecurityEmployeeSettingComponent",
            name: "SecurityEmployeeSettingComponent",
            component: SecurityEmployeeSettingComponent,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
