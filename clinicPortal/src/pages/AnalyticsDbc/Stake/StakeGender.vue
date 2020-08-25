<template>
  <b-col xl="6">
    <Widget title="Gender" collapse>
      <legend />
      <div id="chart" class="mt-0">
        <apexchart type="pie" height="280" :options="chartOption" :series="series"></apexchart>
      </div>
    </Widget>
  </b-col>
</template>

<script>
import Widget from "../../../components/Widget/Widget.vue";
export default {
  components: { Widget },

  props: {
    series: {
      default: () => []
    }
  },
  data() {
    return {
      //   series: [120, 60],
      chartOption: {
        tooltip: {
          theme: "dark"
        },
        labels: ["Male", "Female"],
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
        },
        colors: ["#F7C60B", "#E54D62"]
      }
    };
  }
};
</script>

<style scoped>
</style>