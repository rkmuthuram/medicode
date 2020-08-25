<template>
  <div>
    <b-row>
      <b-col>
        <h1 class="page-title">
          Dashboard
          <span class="fw-semi-bold"></span>
        </h1>
      </b-col>
    </b-row>
     <b-row>
      <b-col>
       <div class="link-container">
          <div class="linkD" v-for="link in links" :key="link.id" @click="navigate(link.function)"><i class="fa link-icon" :class="link.icon" :style="{color:link.color}"/><div class="link-text" :style="{color:link.color}"> <strong>{{link.name}}</strong> </div></div>
        </div>
      </b-col>
    </b-row>
     <br>
    <b-row>
      <b-col xl="4">
        <Widget title="Live Inventory" collapse>
          <div class="d-flex justify-content-between align-items-center mb-lg mb-5">
            <p class="value0 text-primary mt-n-xs mr-n-xs">
              <animated-number
                :value="data.w1_thisMonthBookings"
                :duration="300"
                round="1"
                :formatValue="formatTo"
              />
              <!-- {{sessionsFilter}} -->
            </p>
          </div>
          <div class="d-flex flex-wrap justify-content-between">
            <div class="mt">
              <h6>{{data.w1_lastMonthBookings}}</h6>
              <p class="text-muted mb-0 mr">
                <small>Last Month</small>
              </p>
            </div>
            <div class="mt-4">
              <h6>{{data.w1_highestBookings}}</h6>
              <p class="text-muted mb-0 mr">
                <small>Highest</small>
              </p>
            </div>
            <div class="headerPlace" v-if="viewAs == 'Center Admin'">
              <b-select :options="sessionAdmin" class="mb-2" v-model="sessionsFilter" size="sm" />
            </div>
            <div class="headerPlace" v-if="viewAs == 'Super User'">
              <b-select :options="sessionSuper" class="mb-2" v-model="sessionsFilter" size="sm" />
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col xl="4" sm="6">
        <Widget title="Patients " collapse>
          <div id="chart" class="mt-0">
            <apexchart
              type="donut"
              height="180"
              width="100%"
              :options="patientsOption.option"
              :series="data.w2"
            ></apexchart>
          </div>
          <div class="mt headerPlace patient" v-if="viewAs == 'Center Admin'">
            <b-select :options="patientsAdmin" class="mb-2" v-model="patientsFilter" size="sm" />
          </div>
          <div class="mt headerPlace patient" v-if="viewAs == 'Super User'">
            <b-select :options="patientsSuper" class="mb-2" v-model="patientsFilter" size="sm" />
          </div>
        </Widget>
      </b-col>
      <b-col xl="4" sm="6">
        <Widget title="KPI" collapse>
          <div class="d-flex justify-content-between align-items-center mb-lg mb-5">
            <p class="value0 mt-n-xs mr-n-xs" :class="changeColor()">
              <animated-number
                :value="kpiFilter"
                :duration="300"
                round="1"
                :formatValue="formatTo"
              />%
            </p>
          </div>
          <div class="d-flex flex-wrap justify-content-between">
            <div class="mt">
              <h6>{{kpiLastMonth}}%</h6>
              <p class="text-muted mb-0 mr">
                <small>Last Month</small>
              </p>
            </div>
            <div class="mt-4">
              <h6>{{kpiHighest}}%</h6>
              <p class="text-muted mb-0 mr">
                <small>Highest</small>
              </p>
            </div>
            <div class="headerPlace" v-if="viewAs == 'Center Admin'">
              <b-select :options="kpiAdmin" class="mb-2" v-model="kpiFilter" size="sm" />
            </div>
            <div class="headerPlace" v-if="viewAs == 'Super User'">
              <b-select :options="kpiSuper" class="mb-2" v-model="kpiFilter" size="sm" />
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <Widget title="Incoming/Outgoing" :fields="dailyFields" collapse>
          <b-row>
            <export-button />
          </b-row>
          <b-table :items="daily" :fields="dailyFields" responsive>
            <template v-slot:cell(action)="data">
              <b-button size="sm" class variant="primary">
                <i class="fa fa-pencil" />
                <!-- {{data.item.action}} -->
              </b-button>
            </template>
          </b-table>
        </Widget>
      </b-col>
      <b-col sm="6">
        <Widget title="Weekly Reports " collapse>
          <b-row>
            <export-button />
          </b-row>
          <b-table :items="reports" responsive :fields="reportsFields">
            <template v-slot:cell(action)="data">
              <b-button size="sm" class variant="primary">
                <i class="fa fa-pencil" />
                <!-- {{data.item.action}} -->
              </b-button>
            </template>
          </b-table>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Widget title="Completed Checkout" collapse>
          <div id="chart">
            <div class="toolbar">
              <b-button
                variant="inverse"
                class="mr-2"
                id="monthly"
                @click="updateData('monthly')"
                :class="{active: selection==='monthly'}"
              >Monthly</b-button>

              <b-button
                variant="inverse"
                class="mr-2"
                id="weekly"
                @click="updateData('weekly')"
                :class="{active: selection==='weekly'}"
              >Weekly</b-button>

              <b-button
                variant="inverse"
                class="mr-2"
                id="daily"
                @click="updateData('daily')"
                :class="{active: selection==='daily'}"
              >Daily</b-button>
            </div>

            <div class="completedUser" v-if="viewAs == 'Center Admin'">
              <b-select
                :options="sessionAdminFilter"
                class="mb-2"
                v-model="selectCompletedData"
                size="sm"
              />
            </div>
            <div class="completedUser" v-if="viewAs == 'Super User'">
              <b-select
                :options="sessionSuperFilter"
                class="mb-2"
                v-model="selectCompletedData"
                size="sm"
              />
            </div>

            <div id="completed-sessions">
              <apexchart
                type="area"
                height="350"
                :options="completedOption"
                :series="selectCompletedData"
                ref="chart"
              />
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "../../components/Widget/Widget.vue";

import AnimatedNumber from "animated-number-vue";

import ExportButton from "./exportButton.vue";
import completedSession from "./completedSession";

import patientsOption from "./script/patientsOption";
import patientsData from "./patientsData";

export default {
  components: { ExportButton, AnimatedNumber, Widget },

  data() {
    return {
        links: [
        {
          name: 'PRE CHECK-IN',
          color: '#F8AF0B',
          icon: 'fa-paste',
        },
        {
          name: 'CHECK-IN',
          color: '#593FCD',
          icon: 'fa-sign-in',
        },
        {
          name: 'CHECK OUT',
          color: '#C043D2',
          icon: 'fa-sign-out',
        },
        {
          name: 'INVENTORY',
          color: '#C043D2',
          icon: 'fa-database',
        },
        {
          name: 'ACCOUNTS',
          color: '#46CD5F',
          icon: 'fa-user',
          function: 'navigateToAccountListings'
        },
        {
          name: 'LOGOUT ',
          color: '#C42323',
          icon: 'fa-power-off',
          function: 'logout'
        },
        
      ],
      viewAs: "Super User",
      selection: "one_year",
      sessionsLastMonth: 66,
      sessionsHighest: 110,
      kpiLastMonth: 83,
      kpiHighest: 96,
      kpiFilter: 43,
      sessionsFilter: 33,
      completedSession: completedSession,
      patientsOption: patientsOption,
      patientsData: patientsData,
      patientsFilter: patientsData.myPatient,
      selectCompletedData: completedSession.my,

      patientsAdmin: [
        { value: patientsData.myPatient, text: "My" },
        { value: patientsData.centrePatient, text: "Centre" }
      ],
      patientsSuper: [
        { value: patientsData.myPatient, text: "My" },
        { value: patientsData.centrePatient, text: "Alam Medic" },
        { value: patientsData.ttdiPatient, text: "Pantai" },
        { value: patientsData.totalPatient, text: "Total" }
      ],

      sessionAdmin: [
        { value: 33, text: "My" },
        { value: 55, text: "Centre" }
      ],
      sessionSuper: [
        { value: 33, text: "My" },
        { value: 55, text: "Alam Medic" },
        { value: 66, text: "Pantai" },
        { value: 120, text: "Total" }
      ],

      kpiAdmin: [
        { value: 43, text: "My" },
        { value: 89, text: "Centre" }
      ],
      kpiSuper: [
        { value: 43, text: "My" },
        { value: 89, text: "Alam Medic" },
        { value: 60, text: "Pantai" },
        { value: 83, text: "Total" }
      ],

      sessionAdminFilter: [
        { value: completedSession.my, text: "My" },
        { value: completedSession.ampang, text: "Centre" }
      ],
      sessionSuperFilter: [
        { value: completedSession.my, text: "My" },
        { value: completedSession.ampang, text: "Alam Medic" },
        { value: completedSession.ttdi, text: "Pantai" },
        { value: completedSession.total, text: "Total" }
      ],

      //

      dailyFields: [
        "name",
        { key: "center", class: "text-center" },
        { key: "time", class: "text-center" },
        { key: "action", class: "text-center" }
      ],
      daily: [
        { name: "Roy", center: "Alam Medic", time: "9 AM" },
        { name: "Vin", center: "Alam Medic", time: "9 AM" },
        { name: "Diesel", center: "Alam Medic", time: "9 AM" },
        { name: "Jerax", center: "Mediviron", time: "9 AM" },
        { name: "Topson", center: "Mediviron", time: "9 AM" }
      ],

      reportsFields: [
        "name",
        { key: "center", class: "text-center" },
        { key: "time", label: "time left", class: "text-center" },
        { key: "action", class: "text-center" }
      ],
      reports: [
        { name: "Roy", center: "Mediviron", time: "2 min" },
        { name: "Vin", center: "Mediviron", time: "3 h" },
        { name: "Diesel", center: "Mediviron", time: "24 h" },
        { name: "Jerax", center: "Mediviron", time: "32 h" },
        { name: "Topson", center: "Mediviron", time: "48 h" }
      ],
      //option data for completed sessions graph
      completedOption: {
        tooltip: {
          theme: "dark"
        },
        legend: {
          labels: {
            colors: "#fff"
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: "datetime",
          min: new Date("01 Mar 2012").getTime(),
          labels: {
            style: {
              colors: "#000"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
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
        colors: ["#FF4560", "#1870DC"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.5,
            opacityFrom: 0.1,
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            offsetX: -15,
            offsetY: -38,
            autoSelected: "zoom"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          }
        }
      },
      data:{
        w1_thisMonthBookings:0,
        w1_lastMonthBookings:0,
        w1_highestBookings:0
      }
    };
  },
mounted(){
        
    this.getWidgetOne();
    this.getWidgetTwo();
  
  },
  methods: {
    async getWidgetOne() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/dashboardAnalytics/w1')
   this.data.w1_highestBookings = response.data.highestBookings;
   this.data.w1_thisMonthBookings = response.data.thisMonthBookings;
   this.data.w1_lastMonthBookings = response.data.lastMonthBookings;
 
  } catch (error) {
    console.error(error);
  }
},
 async getWidgetTwo() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/dashboardAnalytics/w2')
   this.data.w2 = [response.data.newProgrammes,response.data.recurringProgrammes];
 
 
  } catch (error) {
    console.error(error);
  }
},
    changeColor() {
      if (this.kpiFilter >= 80 && this.kpiFilter <= 100) {
        return "text-success";
      } else if (this.kpiFilter < 80 && this.kpiFilter >= 50) {
        return "text-warning";
      } else if (this.kpiFilter < 50) {
        return "text-danger";
      } else {
        return "";
      }
    },
    
    updateData(timeline) {
      this.selection = timeline;
var date = new Date();
var start = new Date();
start.setHours(0,0,0,0);

var end = new Date();
end.setHours(23,59,59,999);
      switch (timeline) {
        case "monthly":
          this.$refs.chart.zoomX(
           new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
         new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
          );
          break;
        case "weekly":
          this.$refs.chart.zoomX(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + (date.getDay() == 0?-6:1)- date.getDay()).getTime(),
         new Date(date.getFullYear(), date.getMonth(), date.getDate() + (date.getDay() == 0?0:7)- date.getDay()).getTime()
          );
          break;
        case "daily":
          this.$refs.chart.zoomX(
           start.getTime(),
           end.getTime()
          );
          break;
        default:
      }
    },
    formatTo(sessionsFilter) {
      return ` ${Number(sessionsFilter).toFixed(0)}`;
    }
  }
};
</script>

<style scoped>
.sm {
  max-width: fit-content;
}
.headerPlace {
  position: absolute;
  top: 0%;
  right: 50px;
  margin-top: 10px;
  font-size: 12px;
  height: 20px;
}
.headerPlace.patient {
  right: 80px;
}
.completedUser {
  position: absolute;
  top: 0%;
  right: 50px;
  margin-top: 10px;
}
.page-title{
  color: white;
}

.link-container {
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.linkD{
  height: 150px;
  width: 150px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-right: 15px;
  margin-top: 15px;
  transition-duration: .5s;
  box-shadow: 1px 1px 5px #07070780;
}
.linkD:hover {
  box-shadow: 4px 4px 25px #0707078a;
  cursor: pointer;
  transition-duration: .5s;
}
.link-icon {
  font-size: 35px;
  margin-top: 10px;
}
.link-text {
  width: 100%;
  font-size: 11.5px;
  text-align: center;
  margin-top: 15px;
}
@media only screen and (max-width: 600px) {
  .link-container {
    width: 100vw;
  }
  .linkD {
    width: calc(50vw - 40px);
    height: calc(50vw - 35px);
    margin-right: 30px;
    margin-top: 30px;
  }
  .link-icon {
    font-size: 55px;
    margin-top: 20px;
  }
  .link-text {
    font-size: 15px;
    margin-top: 20px;
  }
}
</style>
