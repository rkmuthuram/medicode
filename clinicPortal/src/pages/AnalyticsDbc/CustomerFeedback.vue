<template>
  <div>
    <b-row>
      <button class="back-button ml-4 mr-3" @click="$router.go(-1)" v-b-tooltip title="Back">
        <i class="fa fa-arrow-left" />
      </button>
      <h1 class="page-title">
        Customer
        <span class="fw-semi-bold">Feedback</span>
      </h1>
    </b-row>
    <b-row>
      <b-col>
        <widget>
          <b-row class="mb-2">
            <b-col>
              <h4>
                Total:
                <strong>{{totalRows}}</strong>
              </h4>
            </b-col>
            <!-- Export -->
            <export-button />
          </b-row>

          <b-row class="mb-2">
            <b-col class="my-1" lg="8">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
            <b-col class="my-1" @click="[filterOn = []];filter = null;" lg="3">
              <b-input type="search" v-model="filter" placeholder="Search" />
            </b-col>
            <b-col class="my-1" lg="2" xl="1">
              <b-form-select
                v-model="perPage"
                class="sm"
                id="perPageSelect"
                size="sm"
                :options="['5','10','15','20','30','50','100']"
              ></b-form-select>
            </b-col>
          </b-row>
          <legend />

          <b-table
            :current-page="currentPage"
            :per-page="perPage"
            sort-by="name"
            show-empty
            sort-icon-left
            :items="dataTable"
            responsive
            :fields="reportsFields"
            :filter="filter"
            :filterIncludedFields="filterOn"
            @filtered="onFiltered"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th @click="[filterOn = ['name']];filter = null;">
                  <b-input-group class="mb-2">
                    <b-input type="text" v-model="filter" placeholder="None" />
                    <b-input-group-append>
                      <div
                        :disabled="!filter"
                        @click="filter = null"
                        class="legend"
                        :class="[filterOn == 'name' ? 'bg-success' : 'bg-danger']"
                      />
                    </b-input-group-append>
                    <div class="cover" v-if="filterOn != 'name' && filterOn != null">
                      <b-input type="text" placeholder="None" v-model="cover" />
                    </div>
                  </b-input-group>
                </b-th>
                <b-th @click="[filterOn = ['centre']];filter = null;">
                  <b-input-group class="mb-2">
                    <b-select :options="filterCentre" v-model="filter" />

                    <b-input-group-append>
                      <div
                        :disabled="!filter"
                        @click="filter = null"
                        class="legend"
                        :class="[filterOn == 'centre' ? 'bg-success' : 'bg-danger']"
                      />
                    </b-input-group-append>
                    <div class="cover" v-if="filterOn != 'centre' && filterOn != null">
                      <b-input type="text" placeholder="None" v-model="cover" />
                    </div>
                  </b-input-group>
                </b-th>
                <b-th @click="[filterOn = ['physio']];filter = null;">
                  <b-input-group class="mb-2">
                    <b-input type="text" v-model="filter" placeholder="None" />
                    <b-input-group-append>
                      <div
                        :disabled="!filter"
                        @click="filter = null"
                        class="legend"
                        :class="[filterOn == 'physio' ? 'bg-success' : 'bg-danger']"
                      />
                    </b-input-group-append>
                    <div class="cover" v-if="filterOn != 'physio' && filterOn != null">
                      <b-input type="text" placeholder="None" v-model="cover" />
                    </div>
                  </b-input-group>
                </b-th>
                <b-th @click="[filterOn = ['recovery']];filter = null;">
                  <b-input-group class="mb-2">
                    <b-select :options="filterNumber" v-model="filter" />

                    <b-input-group-append>
                      <div
                        :disabled="!filter"
                        @click="filter = null"
                        class="legend"
                        :class="[filterOn == 'recovery' ? 'bg-success' : 'bg-danger']"
                      />
                    </b-input-group-append>
                    <div class="cover" v-if="filterOn != 'recovery' && filterOn != null">
                      <b-input type="text" placeholder="None" v-model="cover" />
                    </div>
                  </b-input-group>
                </b-th>
                <b-th @click="[filterOn = ['overall']];filter = null;">
                  <b-input-group class="mb-2">
                    <b-select :options="filterNumber" v-model="filter" />
                    <b-input-group-append>
                      <div
                        :disabled="!filter"
                        @click="filter = null"
                        class="legend"
                        :class="[filterOn == 'overall' ? 'bg-success' : 'bg-danger']"
                      />
                    </b-input-group-append>
                    <div class="cover" v-if="filterOn != 'overall' && filterOn != null">
                      <b-input type="text" placeholder="None" v-model="cover" />
                    </div>
                  </b-input-group>
                </b-th>
                <b-th colspan="5" class="text-center general">
                  General Experience
                  <span class="mr-2"></span>
                  <b-button @click="general = !general" variant="dark" class="mb-2">
                    <span v-if="general === false">Show</span>
                    <span v-if="general === true">Hide</span>
                  </b-button>
                  <b-row>
                    <b-col
                      colspan="3"
                      @click="[filterOn = ['general1']];filter = null;"
                      v-if="general === true"
                    >
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'general1' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'general1' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>
                    <b-col
                      @click="[filterOn = ['general2']];filter = null;"
                      v-if="general === true"
                    >
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'general2' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'general2' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>

                    <b-col
                      @click="[filterOn = ['general3']];filter = null;"
                      v-if="general === true"
                    >
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'general3' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'general3' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>

                    <b-col
                      @click="[filterOn = ['general4']];filter = null;"
                      v-if="general === true"
                    >
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'general4' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'general4' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>

                    <b-col
                      @click="[filterOn = ['general5']];filter = null;"
                      v-if="general === true"
                    >
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'general5' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'general5' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>
                  </b-row>
                </b-th>
                <!--  -->

                <!--  -->
                <b-th @click="[filterOn = ['referencing']];filter = null;">
                  <b-input-group class="mb-2">
                    <b-select :options="filterNumber" v-model="filter" />
                    <b-input-group-append>
                      <div
                        :disabled="!filter"
                        @click="filter = null"
                        class="legend"
                        :class="[filterOn == 'referencing' ? 'bg-success' : 'bg-danger']"
                      />
                    </b-input-group-append>
                    <div class="cover" v-if="filterOn != 'referencing' && filterOn != null">
                      <b-input type="text" placeholder="None" v-model="cover" />
                    </div>
                  </b-input-group>
                </b-th>
                <b-th colspan="5" class="text-center rate">
                  Physio Rating
                  <span class="mr-2"></span>
                  <b-button @click="rate = !rate" variant="dark" class="mb-2">
                    <span v-if="rate === false">Show</span>
                    <span v-if="rate === true">Hide</span>
                  </b-button>
                  <b-row>
                    <b-col
                      colspan="3"
                      @click="[filterOn = ['rate1']];filter = null;"
                      v-if="rate === true"
                    >
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'rate1' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'rate1' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>
                    <b-col @click="[filterOn = ['rate2']];filter = null;" v-if="rate === true">
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'rate2' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'rate2' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>

                    <b-col @click="[filterOn = ['rate3']];filter = null;" v-if="rate === true">
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'rate3' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'rate3' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>

                    <b-col @click="[filterOn = ['rate4']];filter = null;" v-if="rate === true">
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'rate4' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'rate4' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>

                    <b-col @click="[filterOn = ['rate5']];filter = null;" v-if="rate === true">
                      <b-input-group class="mb-2">
                        <b-select :options="filterNumber" v-model="filter" />
                        <b-input-group-append>
                          <div
                            :disabled="!filter"
                            @click="filter = null"
                            class="legend"
                            :class="[filterOn == 'rate5' ? 'bg-success' : 'bg-danger']"
                          />
                        </b-input-group-append>
                        <div class="cover" v-if="filterOn != 'rate5' && filterOn != null">
                          <b-input type="text" placeholder="None" v-model="cover" />
                        </div>
                      </b-input-group>
                    </b-col>
                  </b-row>
                </b-th>
                <b-th class="text-center">Action</b-th>
              </b-tr>
            </template>

            <template v-slot:head(general1) v-if="general === false"></template>
            <template v-slot:head(general2) v-if="general === false"></template>
            <template v-slot:head(general3) v-if="general === false"></template>
            <template v-slot:head(general4) v-if="general === false"></template>
            <template v-slot:head(general5) v-if="general === false"></template>

            <template v-slot:cell(general1) v-if="general === false"></template>
            <template v-slot:cell(general2) v-if="general === false"></template>
            <template v-slot:cell(general3) v-if="general === false"></template>
            <template v-slot:cell(general4) v-if="general === false"></template>
            <template v-slot:cell(general5) v-if="general === false"></template>

            <template v-slot:head(rate1) v-if="rate === false"></template>
            <template v-slot:head(rate2) v-if="rate === false"></template>
            <template v-slot:head(rate3) v-if="rate === false"></template>
            <template v-slot:head(rate4) v-if="rate === false"></template>
            <template v-slot:head(rate5) v-if="rate === false"></template>
            <template v-slot:cell(rate1) v-if="rate === false"></template>
            <template v-slot:cell(rate2) v-if="rate === false"></template>
            <template v-slot:cell(rate3) v-if="rate === false"></template>
            <template v-slot:cell(rate4) v-if="rate === false"></template>
            <template v-slot:cell(rate5) v-if="rate === false"></template>

            <!-- <template v-slot:cell(action)="data">
              <b-button size="sm" class variant="primary">
                <i class="fa fa-pencil" />
                {{data.item.action}}
              </b-button>
            </template> -->
          </b-table>
          <b-row>
            <b-col>
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '../../components/Widget/Widget.vue'
import ExportButton from "./exportButton.vue";
import customerFeedbackData from "./customerFeedbackData";

export default {
  components: { ExportButton,Widget },

  data() {
    return {
      customerFeedbackData: customerFeedbackData,
      dataTable: customerFeedbackData.data,
      filter: null,
      filterOn: [],

      cover: null,

      currentPage: 1,
      perPage: 10,
      totalRows: 1,

      filterNumber: [{ value: null, text: "None" }, "1", "2", "3", "4", "5"],
      filterCentre: [{ value: null, text: "None" }, "ampang", "ttdi", "bangi"],
      general: false,
      rate: false,

      reportsFields: [
        { key: "name", label: "name", sortable: true, stickyColumn: true },
        { key: "centre", label: "CENTRE", sortable: true },
        { key: "physio", label: "PHYSIO", sortable: true },
        {
          key: "recovery",
          label: "RECOVERY FEEDBACK",
          sortable: true,
          class: "text-center"
        },
        {
          key: "overall",
          label: "OVERALL EXPERIENCE",
          sortable: true,
          class: "text-center"
        },
        {
          key: "general1",
          label: "Attention & Care by physiotherapist",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "general2",
          label: "Explanation of your condition and progress",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "general3",
          label: "Flexibility & Efficiency in booking appointments",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "general4",
          label: "DBC centre Hospitality",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "general5",
          label: "DBC Centre’s cleanliness ",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "referencing",
          label: "Likely of Refrencing",
          class: "text-center",
          sortable: true
        },
        {
          key: "rate1",
          label: "Listened to your views",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "rate2",
          label: "Discussed your diagnosis & treatment outcomes",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "rate3",
          label:
            "Explained the reasons for treatment in a way you can understand",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "rate4",
          label: "Explained the benefits and risks of treatment ",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        {
          key: "rate5",
          label: "quality of your treatment",
          class: "text-center",
          sortable: true,
          variant: "inverse"
        },
        { key: "action", label: "", class: "text-center", sortable: true }
      ]
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  mounted() {
    this.totalRows = this.customerFeedbackData.data.length;
  }
};
</script>

<style scoped>
.rate {
  background-color: #ffd000;
  color: black;
}
.general {
  background-color: #ffd000;
  color: black;
}
.cover {
  position: absolute;
  left: 0;
  height: fit-content;
  width: 100%;
}
.legend {
  height: 100%;
  width: 5px;
  z-index: 1;
}
.sm {
  max-width: 80px;
}
.back-button {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(25%);
}
</style>