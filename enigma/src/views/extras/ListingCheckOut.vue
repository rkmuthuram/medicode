


<template>
  <div id="checkout-tableview">
    

    

    
   <div class="table-responsive">
            <table class="table table-striped table-bordered table-responsive" id="checkoutdatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Patient Id</th>
                  <th>Medicine(s)</th>
                  <th>Total Amount (RM)</th>
                  <th>Date</th>
                   <th>Staff</th> 
                  <th>Rollback Status</th> 
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
      
      function format (data) {
    // `d` is the original data object for the row
    var finalData="";
  
    var i=0;
     data.forEach(function(entry) {
  
       if(entry.packing_type=='TABLETS'){
            if(entry.quantity_strips==0 && entry.quantity_tablets!=0){
   finalData +=  i+1+") "+ entry.product_name + "->" + entry.quantity_tablets + "tablets  <br> ";
            }

            else if(entry.quantity_strips!=0 && entry.quantity_tablets==0){
   finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_strips+" strips <br> ";
            }

            else if(entry.quantity_strips!=0 && entry.quantity_tablets!=0){
   finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_strips+" strips & " + entry.quantity_tablets + " tablets  <br> ";
            }
         
           }
           if(entry.packing_type=='per vial' || entry.packing_type=='Per vial'){
            finalData += i+1+") "+ entry.product_name + "->" + entry.quantity_vials + "vials <br> ";
           }
               if(entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
                 
          
                   if(entry.quantity_mls==0 && entry.quantity_vials!=0){
  finalData += i+1+") "+ entry.product_name + "->"+ entry.quantity_vials + "vials <br> ";
            }

            else if(entry.quantity_mls!=0 && entry.quantity_vials==0){
  finalData += i+1+") "+ entry.product_name + "-> "+entry.quantity_mls+" loose ML <br> ";
            }

            else if(entry.quantity_mls!=0 && entry.quantity_vials!=0){
  finalData += i+1+") "+ entry.product_name + "-> "+entry.quantity_mls+" loose ML  & " + entry.quantity_vials + "vials <br> ";
            }
           }
          if(entry.packing_type=='per ampule'){    
          finalData += i+1+") "+ entry.product_name + "-> "+entry.quantity_ampules+" ampules | ";
           }
             if(entry.packing_type=='BOTTLE'){
               
                     if(entry.quantity_unittotal==0 && entry.quantity_bottles!=0){
      finalData +=  i+1+") "+ entry.product_name + "-> "+ entry.quantity_bottles + " bottles <br> " ;
            }

            else if(entry.quantity_unittotal!=0 && entry.quantity_bottles==0){
     finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_unittotal + entry.quantity_unitperbottle + " loose<br> " ;
            }

            else if(entry.quantity_unittotal!=0 && entry.quantity_bottles!=0){
     finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_unittotal + entry.quantity_unitperbottle + " loose & " + entry.quantity_bottles + " bottles <br> " ;
            }
            
        
           }
             if(entry.packing_type=='TUBE'){
                    if(entry.quantity_unittotal==0 && entry.quantity_tubes!=0){
      finalData +=  i+1+") "+ entry.product_name + "-> "+ entry.quantity_tubes + " tubes <br> " ;
            }

            else if(entry.quantity_unittotal!=0 && entry.quantity_tubes==0){
     finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_unittotal + entry.quantity_unitpertube + " loose<br> " ;
            }

            else if(entry.quantity_unittotal!=0 && entry.quantity_tubes!=0){
     finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_unittotal + entry.quantity_unitpertube + " loose & " + entry.quantity_tubes + " tubes <br> " ;
            }  
           }
           else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus') {
             finalData += i+1+") "+ entry.product_name + "-> "+entry.quantity_units+" units<br> ";
           }
      i++;
    
});

if(data.length==i){
  return finalData;
}

}
        


       var table6 =  $('#checkoutdatatable').DataTable( {
	"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
         "dom": 'frtip',
		"ajax": "https://backend.enigmedsvcs.com/development/single/checkout/admin/"+ userInfo.clinicId,
		"columnDefs": [
       {
        "targets": [0],
        "visible": false,
        "searchable": true
    },
    {
      "data": null,
      "defaultContent": "<button id='edit' class='btn'><i class='fa fa-home'></i>Manage</button><button id='expand2' class='btn'><i class='fa fa-home'></i>Quick View</button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
     {
        "targets": [2],
        "visible": false,
        "searchable": true
    },
	  { "targets" : 6,
          "render" : function (data, type, row) {
        if(data == 'true') return 'ROLLED BACK';
           else return '-';
            
          },
        }	
  ]
  } );


     $('#checkoutdatatable tbody').on( 'click', '#expand2', function () {
         var tr = $(this).closest('tr');
        var row = table6.row( tr );
    var data = table6.row( $(this).parents('tr') ).data();

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(JSON.parse(data[2]))).show();
            tr.addClass('shown');
        }
	
    } );

  $('#checkoutdatatable tbody').on( 'click', '#edit', function () {
		var data = table6.row( $(this).parents('tr') ).data();
		 window.open('https://enigma.enigmedsvcs.com/view-check-out/'+ data[0]);
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