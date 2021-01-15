<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full lg:w-1/2 mb-base">
      <vx-card title="Patient Composition" >
                    <vue-apex-charts type="donut" height="350" :options="donutChart.chartOptions" :series="donutSeries"></vue-apex-charts>
                </vx-card>
      </div>
             

      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="UsersIcon" :statistic="checkouts" statisticTitle="Patients Today" ></statistics-card-line>
           
      </div>
      
      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="ShoppingBagIcon" :statistic="sales" statisticTitle="Sales Today(RM)"  color="warning" type="area"></statistics-card-line>
      </div>
    </div>
 <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Checkouts Today" collapse-action>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="checkoutdatatable">
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
        </vx-card>
      </div>
    </div>
    <br>
   

       

    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Fast Moving (Order Now)" collapse-action>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="stockdatatable">
             <thead>
               <tr>
                 <th>Id</th>
                 <th>Manufacturer Barcode</th>
                 <th>Clinic Barcode</th>
                  <th>Manufacturer</th>
                  <th>Product Name</th>
                    <th>Prescription</th> 
                   <th>Incoming</th>  
                   <th>Outgoing</th>  
                  <th>Balance</th>  
                   <th>Movement</th>              
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>
        </vx-card>
      </div>
    </div>
<br>
      <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Slow Moving " collapse-action>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="lowstockdatatable">
             <thead>
               <tr>
                 <th>Id</th>
                 <th>Manufacturer Barcode</th>
                 <th>Clinic Barcode</th>
                  <th>Manufacturer</th>
                  <th>Product Name</th>
                    <th>Prescription</th> 
                   <th>Incoming</th>  
                   <th>Outgoing</th>  
                  <th>Balance</th>  
                   <th>Movement</th>              
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>
        </vx-card>
      </div>
    </div>

<br>
      <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Incoming This Month" collapse-action>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="incomingstockdatatable">
             <thead>
               <tr>
                 <th>Id</th>
                 <th>Manufacturer Barcode</th>
                 <th>Clinic Barcode</th>
                  <th>Manufacturer</th>
                  <th>Product Name</th>
                    <th>Prescription</th> 
                   <th>Incoming</th>  
                   <th>Outgoing</th>  
                  <th>Balance</th>  
                   <th>Movement</th>              
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>
        </vx-card>
      </div>
    </div>


  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
//import analyticsData from './ui-elements/card/analyticsData.js'
//import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
//import VxTimeline from '@/components/timeline/VxTimeline'

export default {
  data () {
    return {
      userInfo:JSON.parse(localStorage.getItem('userInfo')),
      clinics:[],
      medicines:[],
      checkouts:0,
      sales:0,
      donutSeries: [0,0],
      donutChart: {
 
    chartOptions: {
  labels: ['New','Recurring'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  },
  showCheckout:true,
      checkpointReward: {},
      subscribersGained: {},
      ordersRecevied: {},
      salesBarSession: {},
      supportTracker: {},
      productsOrder: {},
      salesRadar: {},

      timelineData: [
        {
          color: 'primary',
          icon: 'PlusIcon',
          title: 'Client Meeting',
          desc: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time: '25 mins Ago'
        },
        {
          color: 'warning',
          icon: 'MailIcon',
          title: 'Email Newsletter',
          desc: 'Cupcake gummi bears soufflé caramels candy',
          time: '15 Days Ago'
        },
        {
          color: 'danger',
          icon: 'UsersIcon',
          title: 'Plan Webinar',
          desc: 'Candy ice cream cake. Halvah gummi bears',
          time: '20 days ago'
        },
        {
          color: 'success',
          icon: 'LayoutIcon',
          title: 'Launch Website',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.',
          time: '25 days ago'
        },
        {
          color: 'primary',
          icon: 'TvIcon',
          title: 'Marketing',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.',
          time: '28 days ago'
        }
      ],


  
      dispatchedOrders: []
    }
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
   // ChangeTimeDurationDropdown,
  //  VxTimeline
  },
  mounted () {
    this.loadDashboard();

   $(document).ready(function() {

  var userInfo = JSON.parse(localStorage.getItem('userInfo'));

function format (data) {
    // `d` is the original data object for the row
    var finalData="<b>";
  
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
  finalData +="</b>"
  return finalData;
}

}

 var inventorytable =  $('#stockdatatable').DataTable( {
		"processing": true,
		"order": [[ 9, "movementPct" ]],
        "serverSide": true,
          "dom": 'frtip',
    "ajax": "https://backend.medicodesolution.com/development/fast/inventory/clinic/admin/"+userInfo.clinicId,
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
   
      var val;
     
      if(aData[9]>=50){
  $('td', nRow).css('background-color', '#F08080');
      }
      if(aData[9]>=15 && aData[9]<50){
  $('td', nRow).css('background-color', '#F08080');
      }
   

   
    },
		"columnDefs": [

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



var incomingInventorytable =  $('#incomingstockdatatable').DataTable( {
		"processing": true,
		"order": [[ 9, "movementPct" ]],
        "serverSide": true,
          "dom": 'frtip',
    "ajax": "https://backend.medicodesolution.com/development/incoming/inventory/clinic/admin/"+userInfo.clinicId,
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



   var lowInventorytable =  $('#lowstockdatatable').DataTable( {
		"processing": true,
		"order": [[ 9, "movementPct" ]],
        "serverSide": true,
          "dom": 'frtip',
    "ajax": "https://backend.medicodesolution.com/development/slow/inventory/clinic/admin/"+userInfo.clinicId,
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
   
      var val;
   

         
        
   
    },
		"columnDefs": [

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


        var table6 =  $('#checkoutdatatable').DataTable( {
	"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'frtip',
		"ajax": "https://backend.medicodesolution.com/development/single/checkout/today/admin/"+userInfo.clinicId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button id='expand2' class='btn'><i class='fa fa-home'></i>Quick View</button></i></button>",
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
  	
      });
  },
    methods: {
      hideCheckoutTable(){
   
        this.showCheckout=false;
    
        
      },
      loadDashboard(){
          var self=this;
        this.$http.post('enigma/dashboard',{
          userInfo:this.userInfo
        })
                .then(function (response) {
             
                if(response.status == 200 && response.data.success){  
                  console.log(response.data);   
                  self.clinics = response.data.clinics;
                  self.donutSeries = response.data.patientWidget;
                  self.checkouts = response.data.checkouts;
                  self.sales = response.data.sales;
                  self.medicines = response.data.medicines;
                //  console.log(response.data.checkouts.length);
                }
                else {
                  if(response.data.error){
                 self.$vs.notify({
            title: 'Error',
            text: response.data.error,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          }) 
          
                  }
                 else {
              self.$vs.notify({
            title: 'Error',
            text: response.error,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })   
                   }
                }
                })
                .catch(function (error) {
            self.$vs.notify({
            title: 'Error',
            text: error,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })               
                });
      },
  },
  created () {
  
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
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


#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
