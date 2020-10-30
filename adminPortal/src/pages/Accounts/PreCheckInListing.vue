<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title"><span class="fw-semi-bold"></span></h2>
        
            <br><br>
    <Widget
      title="<h4><span class='fw-semi-bold'>Pre Check In Listing</span></h4>"
      collapse customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="checkdatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Purchase Order Number</th>
                  <th>Attachments</th>
                  <th>Comments</th>
                  <th>Status</th> 
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

  },
  mounted(){

      $(document).ready(function() {
     
          var table =  $('#checkdatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/precheckin/admin",
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
	{ "targets" : 4,
          "render" : function (data, type, row) {
            if(data == 0) return 'Awaiting Delivery';
           else if(data == 1) return 'Delivered';
           else if(data == -1) return 'Cancelled';
            
          },
        }	
  ]
	} );
	




    $('#checkdatatable tbody').on( 'click', '#edit', function () {
		var data = table.row( $(this).parents('tr') ).data();
		window.location.href = 'precheckin-view/' + data[0] ;
    } );
	
      });
  }
};
</script>

<style src="./AccountListing" lang="scss" scoped />
