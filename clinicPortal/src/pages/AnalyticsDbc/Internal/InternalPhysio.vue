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
      recoveryFeedback: [
        {
          name: "1",
          data: [44, 55, 57, 56, 61]
        },
        {
          name: "2",
          data: [76, 85, 101, 98, 87]
        },
        {
          name: "3",
          data: [35, 41, 36, 26, 45]
        },
        {
          name: "4",
          data: [22, 21, 78, 32, 89]
        },
        {
          name: "5",
          data: [33, 55, 23, 76, 43]
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
          fillSeriesColor: true,
          marker: {
            show: true
          }
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
            ["Listened", "to your views"],
            ["Discussed your diagnosis", "& treatment outcomes"],
            [
              "Explained the reasons",
              "for treatment in a way",
              "you can understand"
            ],
            ["Explained the benefits", "and risks of treatment"],
            ['Quality of your treatment']
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