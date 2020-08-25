<template>
  <div>
    <b-row>
      <b-col>
        <Widget title="<h6> Settings </h6>" customHeader collapse>
          <b-form>
            <legend />
            <b-row>
              <b-col>
                <b-form-group
                  label="Date"
                  label-for="date"
                  label-class="text-md-right px-3"
                  label-cols="2"
                  breakpoint="md"
                >
                  <DatePicker
                    lang="en"
                    range
                    format="DD/MMM/YYYY"
                    input-class="form-control"
                    v-model="date"
                    id="datetimepicker"
                  >
                    <i class="glyphicon glyphicon-th" slot="calendar-icon" />
                  </DatePicker>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Centre"
                  label-for="centre"
                  label-class="text-md-right px-3"
                  label-cols="2"
                  breakpoint="md"
                >
                  <b-select
                    :options="filterCentre"
                    class="md"
                    id="centre-internal"
                    v-model="centreFilter"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="6">
        <Widget title="Exposure " collapse>
          <legend />
          <div id="chart" class="mt-0">
            <apexchart
        
              type="pie"
              height="280"
              :options="data.option"
              :series="data.pie"
            ></apexchart>
          </div>
        </Widget>
      </b-col>
      <b-col class="mb-5">
        <b-tabs nav-class="bg-tranparent">
          <b-tab title="Doctors" active>
            <internal-doc :centreFilter="centreFilter.doc" />
          </b-tab>

          <b-tab title="Hospital">
            <internal-hosp :centreFilter="centreFilter.hosp" />
          </b-tab>

          <b-tab title="Case Manager">
            <internal-case :centreFilter="centreFilter.doc" />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
    <b-row style="margin-bottom: 400px;">
      <b-col>
        <b-row class="mb-3">
          <h2 class="ml-4">Patients Feedback</h2>
          <!-- Replace name with name/path given in route for CustomerFeedback.vue  -->
          <b-button
            variant="primary"
            class="ml-3"
            @click="$router.push({ name: 'Customer Feedback' })"
          >Customer Feedback</b-button>
          <div class="centre-select">
            <b-form-group
              label="Centre"
              label-for="centre"
              label-class="text-md-right px-3"
              label-cols="5"
              breakpoint
            >
              <b-select :options="filterCentre" class="fit" v-model="centreFilter" />
            </b-form-group>
          </div>
        </b-row>

        <legend />
        <div class="tabss mb-0">
          <div
            variant="inverse"
            v-for="tab in tabs"
            :key="tab.id"
            class="tabs-button"
            :class="[ { active: currentTab === tab.component }]"
            @click="currentTab = tab.component"
          >{{tab.name}}</div>
        </div>
        <div class="tabs-content">
          <total-feedback v-if="currentTab == 'TotalFeedback'" />
          <internal-recovery
            :centreFilter="centreFilter.recovery"
            v-if="currentTab == 'InternalRecovery'"
          />
          <internal-overall
            :centreFilter="centreFilter.overall"
            v-if="currentTab =='InternalOverall'"
          />
          <internal-referencing
            :centreFilter="centreFilter.referencing"
            v-if="currentTab =='InternalReferencing'"
          />
          <internal-general
            :centreFilter="centreFilter.general"
            v-if="currentTab =='InternalGeneral'"
          />
          <internal-physio
            :centreFilter="centreFilter.physio"
            v-if="currentTab =='InternalPhysio'"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '../../components/Widget/Widget.vue'
import InternalPhysio from "./Internal/InternalPhysio.vue";
import InternalGeneral from "./Internal/InternalGeneral.vue";
import InternalReferencing from "./Internal/InternalReferencing.vue";
import InternalOverall from "./Internal/InternalOverall.vue";
import InternalRecovery from "./Internal/InternalRecovery.vue";
import TotalFeedback from "./Internal/TotalFeedback.vue";
import InternalCase from "./Internal/InternalCase.vue";
import InternalHosp from "./Internal/InternalHosp.vue";
import InternalDoc from "./Internal/InternalDoc.vue";
import ExportButton from "./exportButton.vue";
import exposure from "./script/exposureOption";

import internalBangi from "./internalBangi";
import internalAmpang from "./internalAmpang";
import internalTtdi from "./internalTtdi";

import DatePicker from "vue2-datepicker";

export default {
  components: {
    DatePicker,
    ExportButton,
    InternalDoc,
    InternalHosp,
    InternalCase,
    TotalFeedback,
    InternalRecovery,
    InternalOverall,
    InternalReferencing,
    InternalGeneral,
    InternalPhysio, Widget
  },
  data() {
    return {
      data:{
      option: {
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
        // colors: ["#FF4560", "#FEB019"],
        plotOptions: {
            pie: {
                donut: {
                    size: "80%"
                }
            }
        },
        dataLabels: {
            enabled: true,
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
        pie:[]
      },
      currentTab: "TotalFeedback",
      tabs: [
        {
          name: "Total Feedback",
          component: "TotalFeedback"
        },
        {
          name: "Recovery Feedback",
          component: "InternalRecovery"
        },
        {
          name: "Overall Experience",
          component: "InternalOverall"
        },
        {
          name: "Referencing",
          component: "InternalReferencing"
        },
        {
          name: "General Feedback",
          component: "InternalGeneral"
        },
        {
          name: "Physio Feedback",
          component: "InternalPhysio"
        }
      ],

      date: null,
      centreFilter: internalAmpang,

      exposure: exposure,
      internalAmpang: internalAmpang,
      internalBangi: internalBangi,
      internalTtdi: internalTtdi,

      pie: [],
      doc: [],
      hosp: [],
      internalAll: {},

      filterCentre: [
        { value: internalAmpang, text: "Ampang" },
        { value: internalBangi, text: "Bangi" },
        { value: internalTtdi, text: "Ttdi" }
      ],
      //

      reportsFields: [
        "name",
        { key: "center", class: "text-center" },
        { key: "time", label: "time left", class: "text-center" },
        { key: "action", class: "text-center" }
      ],
      reports: [
        { name: "Roy", center: "Ampang", time: "2 min" },
        { name: "Vin", center: "Ampang", time: "3 h" },
        { name: "Diesel", center: "Ampang", time: "24 h" },
        { name: "Jerax", center: "Ampang", time: "32 h" },
        { name: "Topson", center: "Ampang", time: "48 h" }
      ]
    };
  },
  methods: {
       async getWidgetFour() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/dashboardAnalytics/w4')
  this.data.pie = response.data.values;
  
  this.data.option = {
    labels : response.data.labels
  };
  } catch (error) {
    console.error(error);
  }
},
    mergeArrays() {
      let pie1 = this.internalBangi.pie;
      let pie2 = this.internalAmpang.pie;

      for (let i = 0; i < pie1.length; i++) {
        this.pie.push(pie1[i] + pie2[i]);
      }

      this.doc = this.internalBangi.doc.concat(this.internalAmpang.doc);
      this.hosp = this.internalBangi.hosp.concat(this.internalAmpang.hosp);

      this.internalAll = {
        pie: this.pie,
        hosp: this.hosp,
        doc: this.doc
      };
      this.filterCentre.push({ value: this.internalAll, text: "All" });
    }
  },
  mounted() {
    this.mergeArrays();
    this.getWidgetFour();
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    }
  }
};
</script>

<style scoped>
.md {
  width: 322px;
  max-width: 322px;
}
.origin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.fit {
  width: fit-content;
}
.sm {
  max-width: 80px;
}
.centre-select {
  height: fit-content;
  width: fit-content;
  position: absolute;
  right: 30px;
}
.tabss {
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
}
.tabs-content {
  padding: 25px;
  background: url('./../../assets/bg-pattern.svg'), radial-gradient(farthest-side ellipse at 10% 0,#ffffffe3, #feffffad);
  border-radius: 0 0 10px 10px;
}
.tabs-button {
  height: fit-content;
  width: fit-content;
  padding: 10px 15px;
  background: none;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
}
.active.tabs-button {
  background: url('./../../assets/bg-pattern.svg'), radial-gradient(farthest-side ellipse at 10% 0,#ffffffe3, #feffffad);
}
</style>