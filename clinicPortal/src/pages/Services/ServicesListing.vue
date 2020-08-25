<template>
  <div class="dynamic-tables">
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Tables Dynamic</b-breadcrumb-item>
    </b-breadcrumb>
    -->
    <h2 class="page-title"><span class="fw-semi-bold"></span></h2>
        <b-button variant="primary" class="btn-rounded-f width-100 mb-xs mr-xs" @click="navigateToCreate()">
             Add New Services
              </b-button>
            <br><br>
    <Widget
      title="<h4><span class='fw-semi-bold'>Services Listing</span></h4>"
      collapse customHeader
    >
    <br>
    <!--  <p>
        Fully customizable Table. Built with <a href="https://www.npmjs.com/package/vue-tables-2"
          target="_blank" rel="noopener noreferrer">vue-tables-2</a>
      </p> -->
         <div class="table-responsive">
           <table class="table table-hover" id="datatable5">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Cover Image</th>
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
        this.$router.push({name:'ServicesCreate'});
    }
  },
  mounted(){

      $(document).ready(function() {
     
          var table =  $('#datatable5').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/staging/services/admin",
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='View'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },{
"targets" : 3 ,
"data": "img",
       "searchable": false,
      "orderable": false,
"render" : function ( url, type, full) {
return '<img height="50px" width="100px" src="'+full[3]+'"/>';
}},
	{ "targets" : 4,
          "render" : function (data, type, row) {
            if(data == 0) return 'Suspended';
           else if(data == 1) return 'Active';          
          },
        }	

  ]
	} );
	

    $('#datatable5 tbody').on( 'click', '#edit', function () {
		var data = table.row( $(this).parents('tr') ).data();
		window.location.href = 'servicesview/' + data[0] ;
    } );
	
      });
  }
};
</script>

<style src="./ServicesListing" lang="scss" scoped />
