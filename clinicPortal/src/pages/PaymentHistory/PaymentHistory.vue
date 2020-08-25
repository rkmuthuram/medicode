<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title">Payment History<span class="fw-semi-bold"></span></h2>
    <Widget
      title="<h4><span class='fw-semi-bold'>Campaign Listing</span></h4>"
      collapse close customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
      <v-client-table :data="dataDatatable" :columns="columnsDatatable" :options="optionsDatatable">
        <div slot="info" slot-scope="props">
          <small>
            Type:&nbsp;<span class="fw-semi-bold">{{props.row.info.type}}</span>
          </small>
          <br />
          <small>
            Dimensions:&nbsp;<span class="fw-semi-bold">{{props.row.info.dimensions}}</span>
          </small>
        </div>
        <a slot="description" slot-scope="props" href="#">{{props.row.description}}</a>
        <b-progress slot="status" slot-scope="props"
          :variant="props.row.status.type" :value="Number(props.row.status.progress)" :max="100" />
          <a slot="actions" slot-scope="props" :href="props.row.uri">INVOICE|RECEIPT</a>
      </v-client-table>
    </Widget>
  
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { vueTableData, vueDatatableData } from './data';

export default {
  name: 'Dynamic',
  components: { Widget },
  data() {
    return {
      columnsDatatable: ['id', 'title', 'date', 'package','amount','actions'],
      
      dataDatatable: vueDatatableData(),
      optionsDatatable: {
        perPage: 10,
        pagination: { chunk: 10, dropdown: false },
        texts: { filter: '', count: '', limit: '' },
        columnsClasses: { id: 'width-100' },
        skin: 'table table-striped',
        sortIcon: {
          base: 'fa text-muted', up: 'fa-chevron-up', down: 'fa-chevron-down', is: 'fa-sort',
        },
      },
  
    };
  },
};
</script>

<style src="./PaymentHistory" lang="scss" scoped />
