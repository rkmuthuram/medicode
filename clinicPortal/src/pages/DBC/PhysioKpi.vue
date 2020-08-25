<template>
  <div>
    <Widget title="<h4><span class='fw-semi-bold'>KPI</span> Table</h4>" customHeader>
      <div class="row-one mt-3">
        <div class="column-one">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to Search"
            class="search"
          ></b-form-input>
        </div>
        <div class="column-two">
          <b-form-select class="month" :options="monthSelect" v-model="selectedMonth"></b-form-select>
          <b-form-select class="per-page ml-3" :options="['5','10','15']" v-model="perPage"></b-form-select>
        </div>
      </div>
      <div class="pagination">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="kpi-table"
          class="mt-3"
        />
      </div>
      <br />
      <b-table
        id="kpi-table"
        :items="items"
        :fields="fields"
        responsive
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(month)="data">
          <div class="table-cell">
            <strong>{{ data.item.month }}</strong>
          </div>
        </template>
        <template v-slot:cell(fb)="data">
          <div class="table-cell">
            <strong>{{ data.item.fb }}</strong>
          </div>
        </template>
        <template v-slot:cell(perform)="data">
          <div class="table-cell">
            <strong>{{ data.item.perform }}</strong>
          </div>
        </template>
        <template v-slot:cell(quarter)="data">
          <div class="table-cell">
            <strong>{{ data.item.quarter }}</strong>
          </div>
        </template>
      </b-table>
    </Widget>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMonth: null,
      filter: null,
      monthSelect: [{ value: null, text: "-- Select Month --" }, "Jan", "Feb"],
      perPage: 5,
      currentPage: 1,
      fields: [
        { key: "Name", sortable: true, class: "text-center" },
        { key: "Centre", sortable: true, class: "text-center" },
        {
          key: "month",
          label: "monthly_KPI_(%)",
          sortable: true,
          class: "text-center"
        },
        {
          key: "fb",
          label: "feedback_Score_(%)",
          sortable: true,
          class: "text-center"
        },
        {
          key: "perform",
          label: "performance_score_(%)",
          sortable: true,
          class: "text-center"
        },
        {
          key: "quarter",
          label: "Quaterly_KPI",
          sortable: true,
          class: "text-center"
        }
      ],
      items: [
        {
          Name: "Jagjit",
          Centre: "Ampang",
          month: 60,
          fb: "80",
          perform: "60",
          quarter: "64",
          cell: "red"
        },
        {
          Name: "Jung",
          Centre: "Ampang",
          month: 1,
          fb: "50",
          perform: "49",
          quarter: "80"
        },
        {
          Name: "Jagjit",
          Centre: "Ampang",
          month: 60,
          fb: "80",
          perform: "60",
          quarter: "64",
          cell: "red"
        }
      ]
    };
  },
  methods: {
    estiloObjetivo(value) {
      return value > 0 ? "kpi-danger" : "success";
    },
    assignColors() {
      this.items = this.items.map(item => {
        let changeColor = value => {
          if (value >= 80 && value <= 100) {
            return "success";
          } else if (value < 80 && value >= 50) {
            return "warning";
          } else if (value < 50) {
            return "danger";
          } else {
            return "";
          }
        };
        let monthColor = changeColor(parseInt(item.month));
        let fbColor = changeColor(parseInt(item.fb));
        let performColor = changeColor(parseInt(item.perform));
        let quarterColor = changeColor(parseInt(item.quarter));

        item = Object.assign({}, item, {
          _cellVariants: {
            month: monthColor,
            fb: fbColor,
            perform: performColor,
            quarter: quarterColor
          }
        });
        return item;
      });
    }
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  mounted() {
    this.assignColors();
  }
  // Coloration value: 100-80 Green
  // 79-50= yellow
  // 49-0 = red
};
</script>

<style scoped>
.table-cell {
  height: 100%;
  width: 100%;
  padding: 3px;
  color: #000;
  /* text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; */
}
.red {
  background: #e74c3c;
}
.yellow {
  background: #f1c40f;
}
.green {
  background: #2ecc71;
}
.xs {
  width: 100px;
  min-width: 100px;
  max-width: 100px;
}
.row-one,
.pagination {
  width: 100%;
  height: fit-content;
  display: flex;
}
.pagination {
  justify-content: flex-end;
}
.column-one,
.column-two {
  width: 50%;
  display: flex;
}
.search {
  width: 200px;
  max-width: 250px;
}
.month {
  width: 250px;
  max-width: 250px;
}
.per-page {
  width: 100px;
  max-width: 60px;
  /* background: #bdbdbd */
}
.column-one {
  justify-content: flex-start;
}
.column-two {
  justify-content: flex-end;
}
</style>