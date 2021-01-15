


<template>
  <div id="inventory-tableview">
    

    

      <div class="demo-alignment">

            <vs-button color="primary" type="filled" icon-pack="feather" icon="icon-download" @click="downloadInventory2">EXPORT PDF</vs-button>
     

        </div>
        

     

     <table class="table table-striped table-bordered table-responsive" id="inventorytable2" style="width:100%;">
       <caption> <b><u>LEGEND</u></b>   <ul class="demo-alignment text-white">
          
          
            <li class="bg-danger">
             STOCK SHORTAGE
            </li>
            <li class="bg-warning">
             LOW STOCK COUNT 
            </li> 
         
        </ul> 
         <ul> 
 <li><b>{{thisMonth}} Incoming</b> - Addition to stock count this month.</li>
  <li><b>{{thisMonth}} Outgoing</b> - Stock sold this month.</li>
    <li><b>Balance</b> - Remaining number of goods in stock.</li>
 <li><b>Movement %</b> - Stock sorted from HIGH-LOW to Monitor stock levels & recommend optimal ordering policies using mathematical models.</li>
           </ul> 
           
           
       
     
        
         
       </caption>
                   <thead class="thead-dark">
                 <tr>
                 <th>Id</th>
                 <th>Manufacturer Barcode</th>
                 <th>Clinic Barcode</th>
                  <th>Manufacturer</th>
                  <th>Product Name</th>
                    <th>Prescription</th> 
                   <th>{{thisMonth}} Incoming</th>  
                   <th>{{thisMonth}} Outgoing</th>  
                  <th>Balance</th>  
                   <th>Movement</th>          
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody style="font-weight:bold">
             </tbody>
                 <thead class="thead-dark">
                 <tr>
                 <th>Id</th>
                
                      <th>Manufacturer</th>
                  <th>Product Name</th>
                    <th>Prescription</th> 
                   <th>{{thisMonth}} Incoming</th>  
                   <th>{{thisMonth}} Outgoing</th>  
                  <th>Balance</th>  
                   <th>Movement</th>          
                  <th>Actions</th>       
               </tr>
             </thead>
           </table>

  
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
     downloadInventory2(){
      var self=this;
    
         self.$http.post('clinic/download/reportInventory2/'+self.userInfo.clinicId, {
           
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
        
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                   
          
                  }
                 else {
                 
                   }
                }
                })
                .catch(function (error) {
                            
                });  
    },
  },
  mounted () {
    
    $(document).ready(function() {
      
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      var inventorytable2 =  $('#inventorytable2').DataTable( {
		"processing": true,
		"order": [[ 9, "movementPct" ]],
        "serverSide": true,
          "dom": 'frtip',
    "ajax": "https://backend.medicodesolution.com/development/inventory/clinic/admin/"+ userInfo.clinicId,
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
   
      var val;
      if(aData[9]>=50){
  $('td', nRow).css('background-color', '#F08080');
      }
      if(aData[9]>=15 && aData[9]<50){
  $('td', nRow).css('background-color', 'orange');
      }
   
    },
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button id='edit' class='btn'><i class='fa fa-home'></i>Manage</button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
     {
        "targets": [4],
        "width": "25%",
    },
    {
        "targets": [1],
        "visible": false,
        "searchable": true
    },{
         "targets": [2],
          "visible": false,
           "searchable": true
     },
       { "targets" : [9],
        "width": "5%",
          "render" : function (data, type, row) {
              if(data==null){
                return '-';
              }
       
              else return data+"%";
            
          },
        },
       { "targets" : [5],
         "width": "7%",
     
          "render" : function (data, type, row) {
            
           if(data=='TABLETS'){
      
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
            
             return "<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/pills.png?alt=media&token=70eb9961-0de4-4554-95fb-d8cad97a5d79' />"+data;
           }
           if(data=='Vial / per cc' || data=='Vial / per cc' || data=='Vial / per 0.5 cc' || data=='per vial' || data=='Per vial' || data=='vial per cc'){
          
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
         return "<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/injection.png?alt=media&token=d415a06a-ccaf-4c5d-88cc-2df1afbb6b51' />"+data;
           }
               if(data=='per vial' || data=='Per vial'){
            
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           return "<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' />"+data;
           }
          if(data=='per ampule'){
            
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             return "<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' />"+data;
           }
             if(data=='BOTTLE'){
          return "<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/bottles.png?alt=media&token=784f4166-e1d3-4e53-b7e5-de05b90a20e1' />"+data;
           }
             if(data=='TUBE'){
          //     console.log(JSON.parse(data))
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           
    return "<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/tubes.png?alt=media&token=be09cc67-f444-4e0e-8b09-226b3ecd3558' />"+data;
           }
           else {
      return "<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/units.png?alt=media&token=17211f17-6705-47e8-8cfe-e005409e5194' />"+data;
           }
            
          },
        },
    { "targets" : [8],
    "width": "15%",
          "render" : function (data, type, row) {
            
           if(row[5]=='TABLETS'){
      
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             var strips = Math.ceil(parseInt(JSON.parse(data).tablets/JSON.parse(data).tabletsperstrip)).toFixed(0);
             return JSON.parse(data).tablets+" tablets("+ strips+" strips)";
           }
           if(row[5]=='Vial / per cc' || row[5]=='Vial / per cc' || row[5]=='Vial / per 0.5 cc' || row[5]=='vial per cc'){
              var vials = Math.ceil(parseInt(JSON.parse(data).mls)/JSON.parse(data).mlpervial).toFixed(0);
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             return JSON.parse(data).mls + " CC ("+vials+" vials)";
           }
               if(row[5]=='per vial' || row[5]=='Per vial'){
            
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             return Math.ceil(JSON.parse(data).vials).toFixed(0) + " vials";
           }
          if(row[5]=='per ampule'){
            
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             return Math.ceil(JSON.parse(data).ampules).toFixed(0) + " ampules";
           }
             if(row[5]=='BOTTLE'){
          var bottles = Math.ceil(parseInt(JSON.parse(data).unittotal/JSON.parse(data).perbottle)).toFixed(0);
             return JSON.parse(data).unittotal+JSON.parse(data).unitperbottle+" ("+ bottles+" bottles)";
           }
             if(row[5]=='TUBE'){
          //     console.log(JSON.parse(data))
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           
              var tubes = Math.ceil(parseInt(JSON.parse(data).unittotal/JSON.parse(data).pertube)).toFixed(0);
             return JSON.parse(data).unittotal+JSON.parse(data).unitpertube+" ("+ tubes+" tubes)";
           }
           else {
             return JSON.parse(data).units + " units";
           }
            
          },
        },
          { "targets" : [7],
             "width": "15%",
          "render" : function (data, type, row) {
            
              var data2 = row[8];
            var val = data;
            if(data=='' || data==null) { val = 0;}
               if(row[5]=='TABLETS'){
               var strips = Math.floor(val/JSON.parse(data2).tabletsperstrip).toFixed(0);
             return val+" tablets("+ strips+" strips)";
           }
               if(row[5]=='Vial / per cc' || row[5]=='Vial / per cc' || row[5]=='Vial / per 0.5 cc'  || row[5]=='vial per cc'){
               var vials = Math.floor(val/JSON.parse(data2).mlpervial).toFixed(0);
             return val+" CC ("+ vials+" vials)";
           }
              if(row[5]=='per vial' || row[5]=='Per vial'){
            
             return val+" vials";
           }
                    if(row[5]=='per ampule'){
             return val+" ampules";
           }
              if(row[5]=='BOTTLE'){
          var bottles = Math.floor(val/JSON.parse(data2).perbottle).toFixed(0);
             return val+JSON.parse(data2).unitperbottle+" ("+ bottles+" bottles)";
           }
  
             if(row[5]=='TUBE'){
          //     console.log(JSON.parse(data))
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           
              var tubes = Math.floor(val/JSON.parse(data2).pertube).toFixed(0);
             return val+JSON.parse(data2).unitpertube+" ("+ tubes+" tubes)";
           }
       
                    if(row[5]=='Per supp' || row[5]=='SACHET' || row[5]=='Sachet' || row[5]=='box' || row[5]=='Set' || row[5]=='ROLLS' || row[5]=='PIECES' || row[5]=='pack' || row[5]=='Diskus'){
             return val+" units";
           }
          
            
          },
        },
          { "targets" : [6],
             "width": "15%",
          "render" : function (data, type, row) {
            var data2 = row[8];
            var val = data;
            if(data=='' || data==null) { val = 0;}
               if(row[5]=='TABLETS'){
               var strips = parseInt(val/JSON.parse(data2).tabletsperstrip);
             return val+" tablets("+ strips+" strips)";
           }
               if(row[5]=='Vial / per cc' || row[5]=='Vial / per cc' || row[5]=='Vial / per 0.5 cc'  || row[5]=='vial per cc'){
               var vials = parseInt(val/JSON.parse(data2).mlpervial);
             return val+" CC ("+ vials+" vials)";
           }
              if(row[5]=='per vial' || row[5]=='Per vial'){
            
             return val+" vials";
           }
                    if(row[5]=='per ampule'){
             return val+" ampules";
           }
              if(row[5]=='BOTTLE'){
          var bottles = parseInt(val/JSON.parse(data2).perbottle);
             return val+JSON.parse(data2).unitperbottle+" ("+ bottles+" bottles)";
           }
  
             if(row[5]=='TUBE'){
          //     console.log(JSON.parse(data))
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           
              var tubes = parseInt(val/JSON.parse(data2).pertube);
             return val+JSON.parse(data2).unitpertube+" ("+ tubes+" tubes)";
           }
             if(data=='' || data==null) { val = 0;}
                    if(row[5]=='Per supp' || row[5]=='SACHET' || row[5]=='Sachet' || row[5]=='box' || row[5]=='Set' || row[5]=='ROLLS' || row[5]=='PIECES' || row[5]=='pack' || row[5]=='Diskus'){
             return val+" units";
           }
          
           
         
            
          },
        }			
	
  ]
  } );


  $('#inventorytable2 tbody').on( 'click', '#edit', function () {
    var data = inventorytable2.row( $(this).parents('tr') ).data();
    	  window.open('https://enigma.medicodesolution.com/manage-stock/'+ userInfo.clinicId +'/'+ data[0]);
	
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