<template>
  <span>
    <b-row>
      <b-col>
        <b-form-select
          v-model="perPage"
          class="sm"
          id="perPageSelect"
          size="sm"
          :options="['5','10','15','20','30','50','100']"
        />
      </b-col>
      <export-button />
    </b-row>
    <legend class="mt-3" />
    <b-row class="mb-3">
      <b-col>Total Patients : {{totalPatient}}</b-col>
      <b-col>Total Sessions : {{totalSession}}</b-col>
    </b-row>
    <legend />
    <b-table
      :current-page="currentPage"
      :items="data"
      responsive
      :fields="fields"
      :per-page="perPage"
    />
    <b-col>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
  </span>
</template>

<script>
import ExportButton from "../exportButton.vue";
export default {
  components: { ExportButton, ExportButton },

  props: {
    centreFilter: {}
  },
  data() {
    return {
       totalPatient:0,
      totalSession:0,
      perPage: 5,
      currentPage: 1,
      totalRows: 1,
    data:{

      },
      fields: [
        { key: "hospital", sortable: true },
        {
          key: "patient",
          label: "Number of Patients ",
          class: "text-center",
          sortable: true
        },
        {
          key: "patientPercent",
          label: "% ",
          class: "text-center",
          sortable: true
        },
        {
          key: "session",
          label: "Number of Sessions ",
          class: "text-center",
          sortable: true
        },
        {
          key: "sessionPercent",
          label: "% ",
          class: "text-center",
          sortable: true
        }
      ]
    };
  },
  mounted() {
    this.totalRows = this.centreFilter.length;
    this.getWidgetSix();
  },
    methods: {
    async getWidgetSix() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/dashboardAnalytics/w6')
 this.totalPatient = response.data.totalPatients;
 this.totalSession = response.data.totalSessions;
 this.data = response.data.hospitalTable;
  } catch (error) {
    console.error(error);
  }
},
    },
  computed: {
   /* totalPatient() {
      return this.centreFilter.reduce(
        (acc, centreFilter) => acc + centreFilter.patient,
        0
      );
    },
    totalSession() {
      return this.centreFilter.reduce(
        (acc, centreFilter) => acc + centreFilter.session,
        0
      );
    } */
  }
};
</script>

<style scoped>
.sm {
  max-width: 80px;
}
</style>