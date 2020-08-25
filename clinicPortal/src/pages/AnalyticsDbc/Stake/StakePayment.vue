<template>
  <b-col xl="6">
    <Widget title="Payment Modes " collapse>
      <div class="filter-mode">
        <b-select :options="['Patient']" v-model="filterMode" />
      </div>
      <legend />
      <div id="chart" class="mt-0">
        <apexchart type="pie" height="280" :options="options" :series="series"></apexchart>
      </div>
    </Widget>
  </b-col>
</template>

<script>
import Widget from '../../../components/Widget/Widget.vue'
export default {
  components: { Widget },

  props: {
    series: {
      default: () => []
    },
    options: {}
  },
  data() {
    return {
      filterMode: "Patient",
      all: {
        tooltip: {
          theme: "dark"
        },
        labels: [],
        legend: {
          labels: {
            colors: "#000"
          }
        },
        stroke: {
          show: false,
          width: 0
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10
            }
          }
        },
        colors: [
          "#008FFB",
          "#FF4560",
          "#00E396",
          "#FEB019",
          "#775DD0",
          "#1483B6"
        ],
        dataLabels: {
          enabled: true
        },
        chart: {
          width: "10%",
          toolbar: {
            show: true,
            offsetX: -20,
            offsetY: -53,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            }
          }
        }
      },
      allpanel: {
        tooltip: {
          theme: "dark"
        },
        labels: ["AIA", "Tricare", "Takaful", "PNS", "PNB"],
        legend: {
          labels: {
            colors: "#fff"
          }
        },
        stroke: {
          show: false,
          width: 0
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10
            }
          }
        },
        colors: [
          "#008FFB",
          "#FF4560",
          "#00E396",
          "#FEB019",
          "#775DD0",
          "#1483B6"
        ],
        dataLabels: {
          enabled: true
        },
        chart: {
          width: "10%",
          toolbar: {
            show: true,
            offsetX: -20,
            offsetY: -53,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            }
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.filter-mode {
  position: absolute;
  top: 10px;
  left: 180px;
}
</style>