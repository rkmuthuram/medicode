<template>
  <div>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="recoveryFeedback"
      ref="chart"
    />
  </div>
</template>

<script>
export default {
  props: {
    barColor: {
      default: "#EB548C"
    }
  },
  data() {
    return {
      recoveryFeedback: [
        {
          name: "Feedback",
          data: [44, 55, 57, 56, 61]
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350
        },
        legend: {
          labels: {
            colors: "#000"
          }
        },
        tooltip: {
          theme: "dark"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "25%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5],
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: true,
            style: {
              colors: "#000"
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: "#000"
            }
          }
        },
        fill: {
          opacity: 1
        },
        grid: {
          show: true,
          borderColor: "#00000059",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          },
          row: {
            opacity: 0.5
          }
        },
        // colors: this.barColor
      }
    };
  }
};
</script>

<style scoped>
</style>