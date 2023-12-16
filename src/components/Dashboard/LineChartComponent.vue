<template>
  <div class="container d-block mt-5" >
    <canvas id="myChart" class="w-100"></canvas>
    <!-- <canvas id="myChart2" class="w-50"></canvas> -->
  </div>
</template>

<script>
let language = localStorage.getItem("language");
import Chart from "chart.js/auto";
import { Bar } from "vue-chartjs";
import translator from "@/locales/translator";
export default {
  data() {
    return {
      statistics: "",
    };
  },
  name: "LineChartComponent",
  components: { Bar },
  props: ["chartStatus"],
  mounted() {
    let labels;
    if (language == "ar") {
      this.statistics = translator.messages.ar.message.Statistics;
      labels = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو"];
    } else {
      this.statistics = translator.messages.en.message.Statistics;
      labels = ["January", "February", "March", "April", "May", "June", "July"];
    }
    const ctx = document.getElementById("myChart");
    // const chart2 = document.getElementById("myChart2");
    // new Chart(chart2, {
    //   type: "bar",
    //   data: {
    //     labels: ["Employees", "Products", "Categories", "Clints"],
    //     datasets: [
    //       {
    //         label: "Statistics",
    //         data: [45, 6, 30, 3],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //     backgroundColor: ["#5d87ff", "#13deb9", "#ffae1f", "#fa9075"],
    //   },
    // });

    const data = {
      labels: labels,
      datasets: [
        {
          label: this.statistics,
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100,
          },
        },
      },
    };
    new Chart(ctx, config);
  },
};
</script>
<style scoped>
canvas {
  height: auto !important;
}
</style>
