<template>
  <div class="parent">
    <table class="table table-striped">
      <tr class="header">
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.task") }}</th>
        <th scope="col">{{ $t("message.date") }}</th>
        <th scope="col">{{ $t("message.agree") }}</th>
      </tr>
      <tbody>
        <tr v-for="(task, index) in employeeTasks" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="{ name: 'TaskView', params: { taskId: task.id } }"
              ><p class="m-0">{{ $t("message.show") }}</p>
            </router-link>
          </td>
          <td>{{ task.Date }}</td>
          <td
            class="pinding text-white w-150"
            v-if="task.Agree == '' && task.Status == 'pinding'"
          >
            {{ $t("endUser.notDelivered") }}
          </td>
          <td class="refused text-white w-150" v-else-if="task.Agree == 'refused'">
            {{ $t("message.refused") }}
          </td>
          <td class="bg-Success w-150" v-else-if="task.Agree == 'acceptance'">
            {{ $t("message.done") }}
          </td>
        </tr>
      </tbody>
    </table>
    <jw-pagination
      :items="Array(employeeTasks)"
      :pageSize="10"
      @changePage="onChangePage"
      :labels="this.$store.state.customLabels"
    >
    </jw-pagination>
  </div>
</template>
<script>
import axios from "axios";
import JwPagination from "jw-vue-pagination";
let employeeData = JSON.parse(localStorage.getItem("employee-detail"));
let date = new Date();
export default {
  name: "EmployeeTasksView",
  data() {
    return {
      date,
      dailyDate: "",
      employeeData,
      employeeTasks: [],
      pageOfItems: [],
      dateArray: [],
    };
  },
  mounted() {
    this.checkDate();
    this.getEmployeeTasks();
    this.watchDeliveryValidaty();
  },
  components: { JwPagination },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    checkDate() {
      if (date.getDate() < 10) {
        this.day = "0" + date.getDate();
      } else {
        this.day = date.getDate();
      }
      this.dailyDate =
        date.getUTCFullYear() + "-" + Number(date.getMonth() + 1) + "-" + this.day;
    },
    getEmployeeTasks() {
      axios
        .get(`Tasks?employeeId=${employeeData.id}`)
        .then((response) => {
          this.employeeTasks = response.data;
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
    watchDeliveryValidaty() {
      this.dateArray.push(this.dailyDate);
      for (let i = 0; i < this.dateArray.length; i++) {
        axios
          .get(`Tasks?Date=${this.dateArray[i]}&&DeliveryValidaty=true`)
          .then((response) => {
            if (response.data.length > 0) {
              for (let x = 0; x < response.data.length; x++) {
                axios
                  .put(
                    `Tasks/${response.data[x].id}`,
                    response.data[x],
                    (response.data[x].DeliveryValidaty = false)
                  )
                  .then(() => {
                    console.log("Done");
                  })
                  .catch(() => {
                    console.log("Error");
                  });
              }
            }
          })
          .catch(() => {
            console.log("No Data Found");
          });
      }
      if ((this.dateArray.length = 30)) {
        this.dateArray = [];
      }
    },
  },
};
</script>
