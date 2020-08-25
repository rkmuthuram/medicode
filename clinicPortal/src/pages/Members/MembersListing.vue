<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title"><span class="fw-semi-bold"></span></h2>
        <b-button variant="primary" class="btn-rounded-f width-100 mb-xs mr-xs" @click="navigateToCreate()">
             Add New Patient
              </b-button>
            <br><br>
    <Widget
      title="<h4><span class='fw-semi-bold'>Patients Listing</span></h4>"
      collapse customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="membersdatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Tel</th>
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
    navigateToCreate(){
        this.$router.push({name:'MembersCreate'});
    }
  },
  mounted(){
      console.log();
      $(document).ready(function() {
     
          var table =  $('#membersdatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/staging/members/admin",
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit Member'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },	{ "targets" : 4,
          "render" : function (data, type, row) {
            if(data == 0) return 'Not Verified';
           else if(data == 1) return 'Active';
           else if(data == -1) return 'Suspended';
            
          },
        }	
	
  ]
	} );
	




    $('#membersdatatable tbody').on( 'click', '#edit', function () {
		var data = table.row( $(this).parents('tr') ).data();
		window.location.href = 'membersview/' + data[0] ;
    } );
	
      });
  }
};
</script>

<style src="./MembersListing" lang="scss" scoped />
