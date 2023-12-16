<template>
  <div class="parent">
    <table class="table table-striped">
      <tr class="header">
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.name") }}</th>
        <th scope="col" class="td-None">{{ $t("message.email") }}</th>
        <th>{{ $t("message.photo") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody class="content">
        <tr v-for="(employee, index) in emloyeesList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.Name }}</td>
          <td class="td-None">{{ employee.Email }}</td>
          <td><img :src="employee.Photo" class="small-img" /></td>
          <td>
            <button
              @click="
                getEmployeeData(employee, index),
                  (employeeStatus = employee.Status)
              "
              v-if="employee.Status == 'Good'"
              class="btn btn-danger ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.block") }}
              <FontAwesome :icon="['fas', 'user-lock']" style="margin: 0" />
            </button>
            <button
              @click="getEmployeeData(employee, index)"
              v-else
              class="btn btn-success ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.unBlock") }}
              <FontAwesome :icon="['fas', 'unlock']" style="margin: 0" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <jw-pagination
      :items="emloyeesList"
      :pageSize="10"
      @changePage="onChangePage"
      :labels="this.$store.state.customLabels"
    >
    </jw-pagination>
    <div
      class="modal fade"
      id="staticBackdrob1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdrob1Label"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex-row-reverse">
            <button
              type="button"
              id="closed"
              class="btn-close m-0"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="close"
            ></button>
            <h5
              class="modal-title"
              id="staticBackdrob1Label"
              v-if="employeeStatus == 'Good'"
            >
              {{ $t("message.block") }}
            </h5>
            <h5 class="modal-title" id="staticBackdrob1Label" v-else>
              {{ $t("message.unBlock") }}
            </h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h4 class="text-danger" v-if="employeeStatus == 'Good'">
                {{ $t("message.blockUserEmployee") }}
              </h4>
              <h4 class="text-success" v-else>
                {{ $t("message.unBlcokEmployee") }}
              </h4>
            </div>
          </div>
          <div class="modal-footer flex-row-reverse">
            <button
              type="button"
              class="btn btn-secondary close"
              data-bs-dismiss="modal"
            >
              {{ $t("message.cancel") }}
            </button>
            <button
              @click="blockEmployee()"
              class="btn btn-danger ms-2 me-2"
              v-if="employeeStatus == 'Good'"
            >
              {{ $t("message.block") }}
              <FontAwesome :icon="['fas', 'user-lock']" style="margin: 0" />
            </button>
            <button
              @click="unBlockEmployee()"
              class="btn btn-success ms-2 me-2"
              v-else
            >
              {{ $t("message.unBlock") }}
              <FontAwesome :icon="['fas', 'unlock']" style="margin: 0" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="data-message">
      <h3 class="text-white p-3" v-if="emloyeesList.length == 0">
        {{ $t("message.noData") }}
      </h3>
    </div>
  </div>
</template>
<script>
import JwPagination from "jw-vue-pagination";
import axios from "axios";

export default {
  name: "EmployeesView",
  data() {
    return {
      blocked: false,
      emloyeesList: [],
      pageOfItems: [],
      employeeId: "",
      employeeIndex: "",
      employeeStatus: "",
    };
  },
  components: { JwPagination },
  mounted() {
    this.getAllEmployees();
  },
  methods: {
    getEmployeeData(employee, index) {
      this.employeeId = employee.id;
      this.employeeIndex = index;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAllEmployees() {
      axios
        .get(`Employees`)
        .then((response) => {
          this.emloyeesList = response.data;
        })
        .catch(() => {
          this.$toast.error("Error In Get Employees");
        });
    },
    blockEmployee() {
      axios
        .put(
          `Employees/${this.employeeId}`,
          this.emloyeesList[this.employeeIndex],
          (this.emloyeesList[this.employeeIndex].Status = "Blocked")
        )
        .then(() => {
          this.$toast.success(this.$store.state.successMessage);
          this.emloyeesList[this.employeeIndex].Status = "Blocked";
          this.$refs.close.click();
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
    unBlockEmployee() {
      axios
        .put(
          `Employees/${this.employeeId}`,
          this.emloyeesList[this.employeeIndex],
          (this.emloyeesList[this.employeeIndex].Status = "Good")
        )
        .then(() => {
          this.$toast.success(this.$store.state.successMessage);
          this.emloyeesList[this.employeeIndex].Status = "Good";
          this.$refs.close.click();
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
  },
};
</script>
