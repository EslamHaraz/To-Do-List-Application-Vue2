<template>
  <div class="parent">
    <StatisticsCompoenent
      staticOne="employees"
      :staticOneLength="employeesLength"
      iconOne="users"
      staticTwo="mangers"
      :staticTwoLength="mangersLength"
      iconTwo="user-tie"
      staticThree="taskes"
      :staticThreeLength="taskesLength"
      iconThree="list-check"
      staticFour="comments"
      iconFour="message"
      chartStatus="true"
    ></StatisticsCompoenent>
    <LineChartComponent></LineChartComponent>
  </div>
</template>
<script>
import StatisticsCompoenent from "@/components/Dashboard/StatisticsCompoenent.vue";
import LineChartComponent from "@/components/Dashboard/LineChartComponent.vue";
import axios from "axios";
export default {
  name: "DashboardHomeView",
  data() {
    return {
      employeesLength: "",
      mangersLength: "",
      taskesLength: "",
      commentsLength: "",
    };
  },
  mounted() {
    this.getEmployeesLength();
    this.getMangersLength();
    this.getTaskesLength();
    // this.getCommentsLength();
  },
  components: { StatisticsCompoenent, LineChartComponent },
  methods: {
    getEmployeesLength() {
      axios
        .get(`Employees`)
        .then((response) => {
          this.employeesLength = response.data.length;
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
    getMangersLength() {
      axios
        .get(`Mangers`)
        .then((response) => {
          this.mangersLength = response.data.length;
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
    getTaskesLength() {
      axios
        .get(`Tasks`)
        .then((response) => {
          this.taskesLength = response.data.length;
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
    // getCommentsLength() {
    //   axios
    //     .get(`Comments`)
    //     .then((response) => {
    //       this.commentsLength = response.data.length;
    //       console.log("Done");
    //     })
    //     .catch(() => {
    //       this.$toast.error(this.$store.state.ErrorMessage);
    //     });
    // },
  },
};
</script>
