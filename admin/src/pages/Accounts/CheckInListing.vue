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
      title="<h4><span class='fw-semi-bold'>Check In Listing</span></h4>"
      collapse customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="checkindatatable">
             <thead>
               <tr>
                  <th>ID</th>
                   <th>Clinic Id</th>
                  <th>Clinic Name</th>
                  <th>Invoice Number</th>
                  <th>Attachments</th>
                  <th>Total Amount(RM)</th>
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
     
          var table =  $('#checkindatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.enigmedsvcs.com/development/checkin/admin",
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
	{ "targets" : 6,
          "render" : function (data, type, row) {
            if(data == 0) return 'Awaiting Manager Confirmation';
           else if(data == 1) return 'Confirmed & Added to Inventory';
           else if(data == -1) return 'Rejected/Pending Clarification';
            
          },
        }	
  ]
	} );
	




    $('#checkindatatable tbody').on( 'click', '#edit', function () {
		var data = table.row( $(this).parents('tr') ).data();
		window.location.href = 'checkin-view/' + data[0] + '/' + data[1] ;
    } );
	
      });
  }
};
</script>

<style src="./AccountListing" lang="scss" scoped />
