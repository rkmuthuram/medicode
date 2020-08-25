<template>
  <b-col class="right">
    <div class="toolbar" align-self="end">
      <b-button variant="inverse" class="mr-2" @click="copy">Copy</b-button>
      <b-button variant="inverse" class="mr-2" @click="excel">Excel</b-button>
      <b-button variant="inverse" class="mr-2" @click="csv">CSV</b-button>
      <b-button variant="inverse" class="mr-2" @click="pdf">PDF</b-button>
      <b-button variant="inverse" class="mr-2" @click="print">Print</b-button>
    </div>
  </b-col>
</template>

<script>
export default {
  methods: {
    copy() {
      alert("Copy");
    },
    excel() {
      alert("Excel");
    },
    csv() {
      alert("CSV");
    },
    pdf() {
      alert("PDF");
    },
    print() {
      alert("Print");
    },
  }
};
</script>

<style scoped>
.right {
  display: flex;
  justify-content: flex-end;
}
</style>