


<template>
  <div id="checkin-tableview">
    

    

    
   <div class="table-responsive">
            <table class="table table-striped table-bordered table-responsive" id="checkindatatable">
             <thead>
               <tr>
                  <th>ID</th>
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
     

  

  
  </div>
</template>

<script>

import moment from 'moment';


export default {
  components: {

  },
  data () {
    return {
      thisMonth:moment().format("MMMM"),
      userInfo:JSON.parse(localStorage.getItem('userInfo')),
    }
  },
  watch: {
 
  },
  computed: {

  },
  methods: {
  
  },
  mounted () {
    
    $(document).ready(function() {
      
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      var table4 =  $('#checkindatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'frtip',
    "ajax": "https://backend.medicodesolution.com/development/single/checkin/admin/"+ userInfo.clinicId,
      "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
   
      var val;
  if(aData[4]==0){
         
       $('td', nRow).css('background-color', 'Orange');
         
         }
          if(aData[4]==1){
         
       $('td', nRow).css('background-color', 'Green');
         
         }
               if(aData[4]==-1){
         
       $('td', nRow).css('background-color', 'Red');
         
         }
          
      
   
     //   $('td', nRow).css('background-color', 'Orange');
   
    },
		"columnDefs": [
       {
        "targets": [0],
        "visible": false,
        "searchable": true
    },
    {
      "data": null,
      "defaultContent": "<button id='edit' class='btn'><i class='fa fa-home'></i>View</button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
	{ "targets" : 4,
          "render" : function (data, type, row) {
            if(data == 0) return 'Awaiting Manager Confirmation';
           else if(data == 1) return 'Confirmed & Added to Inventory';
           else if(data == -1) return 'Rejected/Pending Clarification';
            
          },
        }	
  ]
	} );

  $('#checkindatatable tbody').on( 'click', '#edit', function () {
		var data = table4.row( $(this).parents('tr') ).data();
		 window.open('https://enigma.medicodesolution.com/view-check-in/'+ data[0]);
    } );

  	
      });

  }
}

</script>
<style lang="scss">


.btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 6px 8px;
  font-size: 12px;
  cursor: pointer;
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}
</style>