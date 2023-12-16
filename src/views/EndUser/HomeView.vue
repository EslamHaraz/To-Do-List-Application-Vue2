<template>
  <div class="container">
    <StatisticsCompoenent
      staticOne="allTaskes"
      staticOneLength="10"
      iconOne="list-check"
      staticTwo="fisnishTaskes"
      staticTwoLength="5"
      iconTwo="check"
      staticThree="pindingTaskes"
      staticThreeLength="7"
      iconThree="arrows-rotate"
      staticFour="refusedTaskes"
      iconFour="xmark"
    ></StatisticsCompoenent>
    <LineChartComponent></LineChartComponent>
  </div>
</template>

<script>
import StatisticsCompoenent from "@/components/Dashboard/StatisticsCompoenent.vue";
import LineChartComponent from "@/components/Dashboard/LineChartComponent.vue";
export default {
  name: "HomeView",
  components: { StatisticsCompoenent,LineChartComponent },
};
</script>
<style lang="scss" scoped></style>
