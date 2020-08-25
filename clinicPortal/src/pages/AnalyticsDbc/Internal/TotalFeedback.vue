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
    <b-table
      :current-page="currentPage"
      :items="totalFeedback"
      responsive
      :fields="fields"
      sort-by="name"
      :per-page="perPage"
    >
      <template v-slot:cell(responsive)>
          <!-- {{data.value.responsive}} -->
          %
      </template>
    </b-table>
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

  data() {
    return {
      perPage: 5,
      currentPage: 1,
      totalRows: 1,

      fields: [
        { key: "centres", sortable: true },
        {
          key: "sent",
          label: "Total Feedback Sent out ",
          class: "text-center",
          sortable: true
        },
        {
          key: "filled",
          label: "Total Feedback Form Filled",
          class: "text-center",
          sortable: true
        },
        {
          key: "no",
          label: "No Replies ",
          class: "text-center",
          sortable: true
        },
        {
          key: "responsive",
          label: "Responsive % ",
          class: "text-center",
          sortable: true
        }
      ],
      totalFeedback: [
        {
          centres: "Bangi",
          sent: 500,
          filled: 300,
          no: 200,
          responsive: 60
        },
        {
          centres: "Ampang",
          sent: 300,
          filled: 150,
          no: 150,
          responsive: 50
        },
        {
          centres: "TTDI",
          sent: 200,
          filled: 120,
          no: 80,
          responsive: 60
        },
      ]
    };
  },
  mounted() {
    this.totalRows = this.totalFeedback.length;
  },
  computed: {
    totalPatient() {
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
    }
  }
};
</script>

<style scoped>
.sm {
  max-width: 80px;
}
</style>