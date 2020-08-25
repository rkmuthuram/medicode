<template>
  <div>
    <apexchart type="bar" height="350" :options="chartOptions" :series="centreFilter" ref="chart" />
  </div>
</template>

<script>
export default {
  props: {
    barColor: {
      default: () => ["#E54D62", "#F7C60B", "#775DD0", "#008FFB", "#00E396"]
    },
    centreFilter: {}
  },
  data() {
    return {
      //
      chartOptions: {
        chart: {
          type: "bar",
          height: 350
        },
        legend: {
          labels: {
            colors: "#000"
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: "#fff",
            // fillColors: ["#E54D62", "#F7C60B", "#775DD0", "#008FFB", "#00E396"],
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
          }
        },
        tooltip: {
          theme: "dark",
          fillSeriesColor: true
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 5,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Attention & Care by physiotherapist",
            ["Explanation of your", "condition and progress"],
            ["Flexibility & Efficiency", "in booking appointments"],
            "DBC centre Hospitality",
            "DBC Centre’s cleanliness "
          ],
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
          },
          padding: {
            left: -50 // or whatever value that works
          }
        },
        fill: {
          // colors: this.barColor
        }
      }
    };
  }
};
</script>

<style scoped>
.t {
  background: #00a365;
}
</style>