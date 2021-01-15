<template>
  <div class="dashboard-page">
    <h1 class="page-title">
      <strong class="mr-3">Home</strong> 
      <small>Dashboard</small>
    </h1>
    <div class="sidesWrapper">
      <div class="analyticsSide">
      
        <div class="link-container">
        
          <div class="linkD" v-for="link in links" :key="link.id" @click="navigate(link.function)"><i class="fa link-icon" :class="link.icon" :style="{color:link.color}"/><div class="link-text" :style="{color:link.color}"> <strong>{{link.name}}</strong> </div></div>
        </div>
  <b-tabs class="mb-lg">
          <b-tab title="Inventory" active>
               <div class="table-responsive">
           <table class="table table-striped table-bordered" id="inventorydatatable2">
            <thead class="text-uppercase">
                 <tr>
                 <th>Id</th>
                 <th>Manufacturer Barcode</th>
                 <th>Clinic Barcode</th>
                      <th>Manufacturer</th>
                  <th>Product Name</th>
                    <th>Prescription</th> 
                   <th>Monthly Incoming</th>  
                   <th>Monthly Outgoing</th>  
                  <th>Balance Stock</th>  
                 
                   <th>Movement</th>          
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody style="font-weight:bold">
             </tbody>
           </table>
           </div>
          </b-tab>
        <b-tab title="My Check Out Listings">
        
           <div class="table-responsive">
           <table class="table table-hover" id="checkoutdatatable2">
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

       
          </b-tab>

           <b-tab title="My Files">
        
           <div class="table-responsive">
           <table class="table table-hover" id="filesdatatable2">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Staff</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Files</th>
                   <th>Upload Date</th>   
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>

       
          </b-tab>

  </b-tabs>
      
        <!-- <b-row>
          <b-col xs="12" md="7">
            <Widget
              title="<h5>Quick Links<small class='text-muted'></small></h5>"
              customHeader
              collapse
            >
              <b-row>
                <b-col>
                  <b-button
                    variant="info"
                    class="width-120 mb-xs mr-xs"
                    @click="navigateToBookAppointment"
                  >BOOK APPOINTMENT</b-button>
                  <b-button
                    variant="info"
                    class="width-120 mb-xs mr-xs"
                    @click="navigateToMyBookings"
                  >MY BOOKINGS</b-button>
                  <b-button variant="info" class="width-120 mb-xs mr-xs">MY REPORTS</b-button>

                  <b-button
                    variant="warning"
                    class="width-120 mb-xs mr-xs"
                    @click="navigateToAccountSettings"
                  >ACCOUNT SETTINGS</b-button>
                  <b-button variant="warning" class="width-120 mb-xs mr-xs" @click="logout">LOGOUT</b-button>
                </b-col>
              </b-row>
            </Widget>
          </b-col>
        </b-row> -->
            <!--   <Widget
                title="<h5>Follow Us on Facebook<small class='text-muted'></small></h5>"
                customHeader collapse
        >
        
       <div class="fb-page" data-href="https://www.facebook.com/dbcasia" data-tabs="timeline" data-width="800" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/dbcasia" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/dbcasia">DBC Physiotherapy Malaysia</a></blockquote></div>
            </Widget>-->
        <!--     <b-row>
          <b-col xs="12" lg="6" xl="4" v-for="stat in mock.bigStat" :key="stat.id">
            <BigStat
              :product="stat.product"
              :color="stat.color"
              :total="stat.total"
              :registrations="stat.registrations"
              :bounce="stat.bounce"
            />
          </b-col>
        </b-row>-->
        <b-row>
          <b-col xs="12"></b-col>
        </b-row>
      </div>
      <div class="analyticsSide">
        <b-row>
          <!--   <b-col xs="12" md="6" xl="12" class="lastSideElement">
            <TaskContainer :data="mock.tasks"/>
          </b-col>-->
          <!--   <b-col xs="12" md="6" xl="12" class="lastSideElement">
            <Widget
              className="widget"
              bodyClass="notifications w-100 mt-lg"
              :title="`
                <h5>Notifications
                  <span class='badge badge-pill badge-success fw-normal pull-right mt-xs'>
                    ${mock.notifications.length}
                  </span>
                </h5>
              `"
              customHeader
            >
              <div v-for="notification in mock.notifications"
                class="d-flex align-items-start" :key="notification.id">
                <i :class="`la la-${notification.icon} mr text-${notification.color}`" />
                <p
                  :class="{ 'mb-0': notification.id === mock.notifications.length - 1 }"
                  v-html="notification.content"
                />
              </div>
            </Widget>
          </b-col>-->
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>

import Widget from "@/components/Widget/Widget";





export default {
  name: "Dashboard",
  components: {
    Widget,  },
  data() {
    return {
      staffId:window.localStorage.getItem('id'),
      access:window.localStorage.getItem('access'),
      links: [
      /* {
          name: 'PRE CHECK IN',
          color: '#C043D2',
          icon: 'fa-sitemap',
          function: 'navigateToPreCheckIn'
        },
        {
          name: 'CHECK IN',
          color: '#C043D2',
          icon: 'fa-sign-out',
          function: 'navigateToCheckIn'
        },
       */ {
          name: 'CHECK OUT',
          color: '#C043D2',
          icon: 'fa-sign-in',
          function: 'navigateToCheckOut'
        },
        
       /* {
          name: 'INVENTORY ',
          color: '#F8AF0B',
          icon: 'fa-database',
            function: 'navigateToClinicAccountView'
        },
        {
          name: 'ACCOUNT SETTINGS ',
          color: '#46CD5F',
          icon: 'fa-user',
          function: 'navigateToClinicAccountView'
        }, */
        {
          name: 'UPLOAD FILES',
          color: '#4A314D',
          icon: 'fa-file',
          function: 'navigateToFileUploader'
        },
        {
          name: 'LOGOUT ',
          color: '#C42323',
          icon: 'fa-power-off',
          function: 'logout'
        },
        
      ],
    };
  },
  methods: {
    navigate(function_name){
      this [function_name]() 
    },
    navigateToClinicAccountView() {
      return this.$router.push({
        name: "ClinicAccountView",
        params: { clinicId: '5' }
      });
    },
       navigateToPreCheckIn() {
      return this.$router.push({
        name: "ClinicPreCheckIn",
        params: { clinicId: '5' }
      });
    },
       navigateToCheckIn() {
      return this.$router.push({
        name: "ClinicCheckIn",
        params: { clinicId: '5' }
      });
    },
        navigateToFileUploader() {
      return this.$router.push({
        name: "ClinicFileUpload",
        params: { clinicId: '5' }
      });
    },
       navigateToCheckOut() {
      return this.$router.push({
        name: "ClinicCheckOut",
        params: { clinicId: '5' }
      });
    },


    logout() {
      var txt;
  var r = confirm("Are you sure want to logout?");
  if (r == true) {
       window.localStorage.setItem('authenticated', false);
    window.localStorage.setItem('username', false);
    window.localStorage.setItem('access',false );
      this.$router.push('/login');
  } else {
 
  }

    },
   

  },
   mounted(){
 
          if(this.access=='admin'){
           this.links= [
       {
          name: 'PRE CHECK IN',
          color: '#C043D2',
          icon: 'fa-sitemap',
          function: 'navigateToPreCheckIn'
        },
        {
          name: 'CHECK IN',
          color: '#C043D2',
          icon: 'fa-sign-out',
          function: 'navigateToCheckIn'
        },
        {
          name: 'CHECK OUT',
          color: '#C043D2',
          icon: 'fa-sign-in',
          function: 'navigateToCheckOut'
        },
        {
          name: 'INVENTORY ',
          color: '#F8AF0B',
          icon: 'fa-database',
            function: 'navigateToClinicAccountView'
        },
        {
          name: 'ACCOUNT SETTINGS ',
          color: '#46CD5F',
          icon: 'fa-user',
          function: 'navigateToClinicAccountView'
        }, 
          {
          name: 'UPLOAD FILES',
          color: '#4A314D',
          icon: 'fa-file',
          function: 'navigateToFileUploader'
        },
        {
          name: 'LOGOUT ',
          color: '#C42323',
          icon: 'fa-power-off',
          function: 'logout'
        },
        
      ];
          }
        $(document).ready(function() {
        var clinicId = 5;
        var staffId = window.localStorage.getItem('id');
        
        var table5 =  $('#inventorydatatable2').DataTable( {
		"processing": true,
		"order": [[ 9, "movementPct" ]],
        "serverSide": true,
          "dom": 'frtip',
    "ajax": "https://backend.medicodesolution.com/development/inventory/clinic/admin/"+clinicId,
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
   
      var val;
   
   if(aData[5]=='TABLETS'){
         
             //return JSON.parse(aData[8]).tablets +' tablets OR ' +JSON.parse(aData[8]).strips + ' strips';
           val = JSON.parse(aData[8]).tablets;
           if(val<50){
             $('td', nRow).css('background-color', 'Orange');
           }
       
             
         
           }


 
  if(aData[5]=='Vial / per cc' || aData[5]=='Vial / per cc' || aData[5]=='Vial / per 0.5 cc' || aData[5]=='vial per cc'){
            
             //return JSON.parse(aData[8]).tablets +' tablets OR ' +JSON.parse(aData[8]).strips + ' strips';
        val = JSON.parse(aData[8]).mls;
            if(val<50){
      $('td', nRow).css('background-color', 'Orange');
           }
          
             
           }

           if(aData[5]=='per vial' || aData[5]=='Per vial' ){
            
             //return JSON.parse(aData[8]).tablets +' tablets OR ' +JSON.parse(aData[8]).strips + ' strips';
        val = JSON.parse(aData[8]).vials;
            if(val<50){
      $('td', nRow).css('background-color', 'Orange');
           }
          
             
           }
          if(aData[5]=='per ampule'){
            
             //return JSON.parse(aData[8]).tablets +' tablets OR ' +JSON.parse(aData[8]).strips + ' strips';
               val = JSON.parse(aData[8]).ampules;
            if(val<50){
             $('td', nRow).css('background-color', 'Orange');
           }
        
             
           }
             if(aData[5]=='BOTTLE'){
            
               val = JSON.parse(aData[8]).totalunits;
           if(val<500){
           $('td', nRow).css('background-color', 'Orange');
           }
             
           }
             if(aData[5]=='TUBE'){
            
              val = JSON.parse(aData[8]).totalunits;
           if(val<500){
           $('td', nRow).css('background-color', 'Orange');
           }
      
             
           }
           if(aData[5]=='Per supp' || aData[5]=='SACHET' || aData[5]=='Sachet' || aData[5]=='box' || aData[5]=='Set' || aData[5]=='ROLLS' || aData[5]=='PIECES' || aData[5]=='pack' || aData[5]=='Diskus'){
             val = JSON.parse(aData[8]).units;
             if(val<50){
             $('td', nRow).css('background-color', 'Orange');
           }
                      
           }

        if(aData[9]>50){
           $('td', nRow).css('background-color', 'Red');
        }
   
     //   $('td', nRow).css('background-color', 'Orange');
   
    },
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='View Medicine'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
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
          "render" : function (data, type, row) {
              if(data==null){
                return '-';
              }
       
              else return data+"%";
            
          },
        },
       { "targets" : [5],
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
console.log(i);
if(data.length==i){
  return finalData;
}

}


function format2 (data) {
    // `d` is the original data object for the row
   return data;

}

  var table6 =  $('#checkoutdatatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/single/checkout/admin/"+clinicId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit'><i class='fa fa-pencil'></i></button><button class='btn' id='expand2' title='Expand'><i class='fa fa-eye'></i></button>",
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


    var table7 =  $('#filesdatatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/single/fileManager2/admin/"+clinicId+"/"+staffId,
		"columnDefs": [


	  { "targets" : 4,
          "render" : function (data, type, row) {
           var str = data.split(',');
           var i=0;
           var finalString="";
    str.forEach(function(entry) {
  
       finalString += "<b><a href='" + entry + "'>Download File " +  Number(i+1) + "</a></b><br>"
      i++;
    
});

if(str.length==i){
  return finalString;
}
            
          },
        }	
  ]
  } );

        $('#checkoutdatatable2 tbody').on( 'click', '#edit', function () {
    var data = table6.row( $(this).parents('tr') ).data();
    	  window.open('https://admin.medicodesolution.com/app/checkout-view/'+ data[0]);
	
    } );

         $('#checkoutdatatable2 tbody').on( 'click', '#expand2', function () {
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
   
     $('#inventorydatatable2 tbody').on( 'click', '#edit', function () {
    var data = table5.row( $(this).parents('tr') ).data();
    	  window.open('https://admin.medicodesolution.com/app/clinic-inventory-view/'+clinicId +'/'+ data[0]);
	
    } );
    $('#inventorydatatable2 tbody').on( 'click', '#expand', function () {
     
     var tr = $(this).closest('tr');
        var row = table5.row( tr );
    var data = table5.row( $(this).parents('tr') ).data();

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(JSON.parse(data[5])).show();
            tr.addClass('shown');
        }
	
    } );
   
	
      });
  
  
      
   },
  unmounted() {
  
  },
  computed: {

  }
};
</script>

<style scoped>
.link-container {
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.linkD{
  height: 150px;
  width: 150px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-right: 15px;
  margin-top: 15px;
  transition-duration: .5s;
  box-shadow: 1px 1px 5px #07070780;
}
.linkD:hover {
  box-shadow: 4px 4px 25px #0707078a;
  cursor: pointer;
  transition-duration: .5s;
}
.link-icon {
  font-size: 35px;
  margin-top: 10px;
}
.link-text {
  width: 100%;
  font-size: 11.5px;
  text-align: center;
  margin-top: 15px;
}
@media only screen and (max-width: 600px) {
  .link-container {
    width: 100vw;
  }
  .linkD {
    width: calc(50vw - 40px);
    height: calc(50vw - 35px);
    margin-right: 30px;
    margin-top: 30px;
  }
  .link-icon {
    font-size: 55px;
    margin-top: 20px;
  }
  .link-text {
    font-size: 15px;
    margin-top: 20px;
  }
}
</style>
