<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title"><span class="fw-semi-bold"></span></h2>
    <!--    <b-button variant="primary" class="btn-rounded-f width-100 mb-xs mr-xs" @click="navigateToCreate()">
             Add New Accidents Listing
              </b-button>
            <br><br>-->
    <Widget
      title="<h4><span class='fw-semi-bold'>Accidents Listing</span></h4>"
      collapse customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="datatable4">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Location</th>
                  <th>Reg Num</th>
                  <th>Injuries</th>
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
  methods:{
    navigateToCreate(){
        this.$router.push({name:'BookingsCreate'});
    }
  },
  mounted(){

      $(document).ready(function() {
     
          var table =  $('#datatable4').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
    "ajax": "https://backend.medicodesolution.com/staging/accidents/admin",
    	"columnDefs": [
	{ "targets" : 5,
          "render" : function (data, type, row) {
            if(data == 0) return 'Received';
           else if(data == 1) return 'Approved';             
          },
        }	
	
  ]
	} );
	



	
      });
  }
};
</script>

<style src="./AccidentsListing" lang="scss" scoped />
