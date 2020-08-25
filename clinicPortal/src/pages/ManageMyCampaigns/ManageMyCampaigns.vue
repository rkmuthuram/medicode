<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title">Manage My Campaigns <span class="fw-semi-bold"></span></h2>
    <Widget
      title="<h4><span class='fw-semi-bold'>Campaign Listing</span></h4>"
      collapse close customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="datatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Tel</th>
                  <th>Status</th>
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>


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
     dataTable:null,
  
    };
  },
  mounted(){

      $(document).ready(function() {
        $("#datatable").DataTable({
          processing: true,
          serverSide: true,
          ajax: "https://backend.medicodesolution.com/staging/members/admin",
          dom: 'Bfrtip'
        });
      });
  }
};
</script>

<style src="./ManageMyCampaigns" lang="scss" scoped />
