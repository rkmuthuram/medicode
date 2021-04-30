<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title"><span class="fw-semi-bold"></span></h2>
        <b-button variant="primary" class="btn-rounded-f width-100 mb-xs mr-xs" @click="navigateToCreate()">
             Add New Vendor
              </b-button>
            <br><br>
    <Widget
      title="<h4><span class='fw-semi-bold'>Vendor Listing - Privately Acessible</span></h4>"
      collapse customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="vendordatatable2">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>PIC</th>
                  <th>City</th>
                    <th>Clinic Id</th>
                  <th>Actions</th>       
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
        this.$router.push({name:'VendorCreate'});
    }
  },
  mounted(){

      $(document).ready(function() {
     
          var table =  $('#vendordatatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.enigmedsvcs.com/development/vendor-private/admin",
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    }
  ]
	} );
	




    $('#vendordatatable2 tbody').on( 'click', '#edit', function () {
		var data = table.row( $(this).parents('tr') ).data();
		window.location.href = 'vendor-update/' + data[0] ;
    } );
	
      });
  }
};
</script>


