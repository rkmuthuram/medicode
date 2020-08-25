<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title"><span class="fw-semi-bold"></span></h2>
        <b-button variant="primary" class="btn-rounded-f width-100 mb-xs mr-xs" @click="navigateToCreate()">
             Add New Booking
              </b-button>
            <br><br>
    <Widget
      title="<h4><span class='fw-semi-bold'>Bookings Listing</span></h4>"
      collapse customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="datatable3">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Branch</th>
                   <th>Physio Assigned</th>
                  <th>Status</th>
                    <th>Check-In</th>
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
        this.$router.push({name:'BookingsCreate'});
    }
  },
  mounted(){

      $(document).ready(function() {
  
          var table =  $('#datatable3').DataTable( {
		"order": [[ 0, "id" ]],
   
         	"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
    "ajax": "https://backend.medicodesolution.com/staging/schedule/admin",
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit Advert'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
	{ "targets" : 6,
          "render" : function (data, type, row) {
             if(data == 0) return 'Upcoming';
           else if(data == 1) return 'Completed';
             else if(data == -2) return 'No Show';
           else if(data == -1) return 'Cancelled';     
          },
        },
        	{ "targets" : 7,
          "render" : function (data, type, row) {
             if(data == 0) return 'Incomplete';
           else if(data == 1) return 'Complete';
           
          },
        }		
	
  ],
   
	} );
	

    $('#datatable3 tbody').on( 'click', '#edit', function () {
		var data = table.row( $(this).parents('tr') ).data();
		window.location.href = 'bookingsview/' + data[0] ;
    } );
	
      });
  }
};
</script>


<style src="./BookingsListing" lang="scss" scoped />
