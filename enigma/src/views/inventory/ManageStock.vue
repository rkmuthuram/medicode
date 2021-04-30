


<template>
  <div id="inventory-manageStock">
    

      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap justify-between items-center">

        <!-- ITEMS PER PAGE -->
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
       
        </div>

      
      </div>

     
   <!-- COL AREA -->
        <div class="vx-row">
            <!-- COL 1 -->
            <div class="vx-col w-full lg:w-1/4">
                <!-- ABOUT CARD -->
                <vx-card :title="productData.product_name" class="mt-base"    v-bind:data-id="clinicId">
                    <!-- ACTION SLOT -->
               <!--     <template slot="actions">
                        <feather-icon icon="MoreHorizontalIcon"></feather-icon>
                    </template> -->
<input
               
                  type="hidden"
                v-model="productId"
                     id="productId"
                v-bind:data-id="productId"
                 disabled 
                />
               
                    <!-- USER BIO -->
                    <div class="mt-5"    >
                        <h6>Prescription</h6>
                        <p>{{productData.packing_type}}</p>
                    </div>

                    <!-- OTEHR DATA -->
                    <div class="mt-5">
                        <h6>Product Category</h6>
                        <p>{{productData.product_category}}</p>
                    </div>

                    <div class="mt-5">
                        <h6>Manufacturer</h6>
                        <p>{{productData.manufacturer}}</p>
                    </div>

                    <div class="mt-5">
                        <h6>Ingredient/Color</h6>
                        <p>{{productData.ingredient}}/{{productData.color}}</p>
                    </div>
                 <!--   <div class="mt-5">
                        <h6>QR Code</h6>
                        <p><qrcode :value="productData.internal_qrcode" :options="{ height:100 }"></qrcode></p>
                    </div>
                       <div class="mt-5">
                        <h6>Barcode (main)</h6>
                        <p> <barcode v-bind:value="productData.manufacturer_barcode" format="CODE128" :options="{ height:100 }" v-if="productData.manufacturer_barcode">
 Barcode render failed.
</barcode></p>
                    </div>
                          <div class="mt-5" v-if="productData.internal_barcode">
                        <h6>Barcode (alternative)</h6>
                        <p> <barcode v-bind:value="productData.internal_barcode" format="CODE128" :options="{ height:100 }" v-if="productData.internal_barcode">
 Barcode render failed.
</barcode></p>
                    </div>

                 -->
                 
                </vx-card>

              


            </div>

            <!-- COL 2 -->
            <div class="vx-col w-full lg:w-1/2">
                <vx-card class="mt-base">
                    <vs-tabs>
                <vs-tab label="Stock History">
                  <h4>Incomings</h4>
                <table class="table table-striped table-bordered table-responsive" id="myclinicinventorydatatable" style="width:100%;">
                     <thead class="thead-dark">
                 <tr>
                  <th>#</th>
                 <th>Check In </th>
                  <th>Quantity </th>
                  <th>Timestamp</th>
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody style="font-weight:bold">
             </tbody>
                 <thead class="thead-dark">
                 <tr>
                  <th>#</th>
              
                  <th>Quantity</th>
                  <th>Timestamp</th>
                  <th>Actions</th>       
               </tr>
             </thead>
           </table>
           <br>
           <h4>Outgoings</h4>
           <table class="table table-striped table-bordered table-responsive" id="myclinicinventorydatatable2" style="width:100%;">
                     <thead class="thead-dark">
                 <tr>
                  <th>#</th>
                  <th>Check Out </th>
                  <th>Quantity</th>
                  <th>Timestamp</th>
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody style="font-weight:bold">
             </tbody>
                 <thead class="thead-dark">
                  <tr>
                  <th>#</th>
              
                  <th>Quantity</th>
                  <th>Timestamp</th>
                  <th>Actions</th>       
               </tr>
             </thead>
           </table>
           <br>
             <h4>Ammends</h4>
<table class="table table-striped table-bordered table-responsive" id="myclinicinventorydatatable3" style="width:100%;">
                     <thead class="thead-dark">
               <tr>
                 <th>Before</th>
                  <th>After</th>
                   <th>Remarks</th>
                  <th>Timestamp</th>
                     
               </tr>
             </thead>
             <tbody style="font-weight:bold">
             </tbody>
                 <thead class="thead-dark">
                 <tr>
                 <th>Before</th>
                  <th>After</th>
                   <th>Remarks</th>
                  <th>Timestamp</th>
                     
               </tr>
             </thead>
           </table>
                </vs-tab>
               
            
            </vs-tabs>
                </vx-card>
            </div>

            <!-- COL 3 -->
            <div class="vx-col w-full lg:w-1/4">

               <vx-card title="Balance Stock" class="mt-base">
                    <!-- ACTION SLOT -->
               <!--     <template slot="actions">
                        <feather-icon icon="MoreHorizontalIcon"></feather-icon>
                    </template> -->

                    <!-- USER BIO -->
                    <div class="mt-5">
                      
                        <h6>Balance</h6>
                        <p>{{stockData.actualQuantity}} ({{stockData.prescription}})</p>
                    </div>

                    <!-- OTEHR DATA -->
                    <div class="mt-5">
                        <h6>{{thisMonth}} Incoming</h6>
                        <p v-if="stockData.incomingQuantity==null"> -</p>
                        <p v-if="stockData.incomingQuantity!=null"> {{stockData.incomingQuantity}} ({{stockData.prescription}})</p>
                    </div>

                    <div class="mt-5">
                        <h6> {{thisMonth}} Outgoing</h6>
                        <p v-if="stockData.outgoingQuantity==null">-</p>
                        <p v-if="stockData.outgoingQuantity!=null">{{stockData.outgoingQuantity}} ({{stockData.prescription}})</p>
                    </div>

                    <div class="mt-5">
                        <h6>Movement Percentage %</h6>
                        <p v-if="stockData.movementPct==null">-</p>
                        <p v-if="stockData.movementPct!=null">{{stockData.movementPct}}</p>
                    </div>

           
                   

                 
                 
                </vx-card>
                   <vx-card title="Suggestions" class="mt-base">
                    <!-- ACTION SLOT -->
               <!--     <template slot="actions">
                        <feather-icon icon="MoreHorizontalIcon"></feather-icon>
                    </template> -->

                    <!-- USER BIO -->
                    <div class="mt-5">
                      
                   
                           <p >   <vs-button size="small" :color="stockCountColor">{{suggestion.stockCount}}</vs-button></p>
                           <p >   <vs-button size="small" :color="movementPctColor">{{suggestion.movementPct}}</vs-button></p>
                    </div>

                 
                   
                   

                 
                 
                </vx-card>

        
            </div>
        </div>
  
  </div>
</template>

<script>

import VueBarcodeScanner from 'vue-barcode-scanner';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueBarcode from 'vue-barcode';
import moment from 'moment';

export default {
  components: {
barcode: VueBarcode,qrcode:VueQrcode
  },
  data () {
    return {
      stockCountColor:'green',
      movementPctColor:'green',
    productId: this.$route.params.productId,
    clinicId: this.$route.params.clinicId,
    productData:{},
    stockData:{},
    thisMonth:moment().format("MMMM"),
    suggestion:{
      stockCount:'',
      movementPct:'',
    }
    }
  },
  watch: {
 
  },
  computed: {

  },
  methods: {
    async getMedicine() {
  try {
      
   const response = await this.$http({ url: 'medicine/'+ this.productId });
   this.productData= response.data.medicineInfo[0];

 
  } catch (error) {
    console.error(error);
  }
},
    async getBalanceStock() {
  try {
      
   const response = await this.$http({ url: 'stock-medicine/'+ this.productId + '/' +this.clinicId });
   this.stockData= response.data.stockInfo;

   if(this.stockData.movementPct<=15){
     this.suggestion.movementPct = 'LOW MOVING STOCK!';
     this.movementPctColor = 'red';
   }
    if(this.stockData.movementPct>15 && this.stockData.movementPct<50){
     this.suggestion.movementPct = 'NORMAL/INTERMEDIATE MOVING STOCK!';
   }
     if(this.stockData.movementPct>=50){
     this.suggestion.movementPct = 'FAST MOVING STOCK!';
      this.movementPctColor = 'red';
   }

   if(this.stockData.actualQuantity<=20){
this.suggestion.stockCount  = 'SUFFICIENT BALANCE STOCK';
   }
  if(this.stockData.prescription=='TABLETS' && this.stockData.actualQuantity<=50){
     this.suggestion.stockCount = 'LOW BALANCE.ORDER NOW!';
     this.stockCountColor = 'red';
   }
    if(this.stockData.prescription=='per ampule' && this.stockData.actualQuantity<=15){
     this.suggestion.stockCount = 'LOW BALANCE.ORDER NOW!'
      this.stockCountColor = 'red';
   }
    if(this.stockData.prescription=='TUBE' && parseInt(JSON.parse(this.stockData.balanceQuantity).unittotal/JSON.parse(this.stockData.balanceQuantity).pertube)<=20){
     this.suggestion.stockCount = 'LOW BALANCE.ORDER NOW!'
      this.stockCountColor = 'red';
   }
    if(this.stockData.prescription=='BOTTLE' && parseInt(JSON.parse(this.stockData.balanceQuantity).unittotal/JSON.parse(this.stockData.balanceQuantity).perbottle)<=20){
     this.suggestion.stockCount = 'LOW BALANCE.ORDER NOW!'
      this.stockCountColor = 'red';
   }
    if(this.stockData.prescription=='per vial' || this.stockData.prescription=='Per vial'){
      if(this.stockData.actualQuantity<=15){
          this.suggestion.stockCount = 'LOW BALANCE.ORDER NOW!'
           this.stockCountColor = 'red';
      }
    }
     if(this.stockData.prescription=='Vial / per cc' || this.stockData.prescription=='Vial / per cc' || this.stockData.prescription=='Vial / per 0.5 cc' || this.stockData.prescription=='vial per cc'){

       if(parseInt(JSON.parse(this.stockData.balanceQuantity).mls/JSON.parse(this.stockData.balanceQuantity).mlpervial)<=15){
   this.suggestion.stockCount = 'LOW BALANCE.ORDER NOW!'
    this.stockCountColor = 'red';
       }

       else {
          this.suggestion.stockCount = 'SUFFICIENT BALANCE STOCK!'
       }
  
   }

  } catch (error) {
    console.error(error);
  }
},
  },
  mounted () {
      this.getMedicine();
      this.getBalanceStock();
      $(document).ready(function() {
         var userInfo = JSON.parse(localStorage.getItem('userInfo'));
       var clinicId = userInfo.clinicId;
      var productId = $("#productId").attr("data-id");
 
      
   var table5 =  $('#myclinicinventorydatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'frtip',
		"ajax": "https://backend.enigmedsvcs.com/development/inventory/clinic/checkins/"+clinicId+"/"+productId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button id='edit' class='btn'><i class='fa fa-home'></i>View</button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
        {
   
      "targets": 1,
       "searchable":true,
      "visible": false,
    }
	
  ]
  } );


    var table6 =  $('#myclinicinventorydatatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'frtip',
		"ajax": "https://backend.enigmedsvcs.com/development/inventory/clinic/checkouts/"+clinicId+"/"+productId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button id='edit' class='btn'><i class='fa fa-home'></i>View</button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
        {
   
      "targets": 1,
       "searchable":true,
      "visible": false,
    }
	
  ]
  } );


      var table7 =  $('#myclinicinventorydatatable3').DataTable( {
		"processing": true,
        "serverSide": true,
          "dom": 'frtip',
		"ajax": "https://backend.enigmedsvcs.com/development/inventory/clinic/product3/admin/"+clinicId+"/"+productId,
	
  } );


    $('#myclinicinventorydatatable tbody').on( 'click', '#edit', function () {
		var data = table5.row( $(this).parents('tr') ).data();
		 window.open('https://enigma.enigmedsvcs.com/view-check-in/' + data[1]);
    } );

        $('#myclinicinventorydatatable2 tbody').on( 'click', '#edit', function () {
		var data = table6.row( $(this).parents('tr') ).data();
		 window.open('https://enigma.enigmedsvcs.com/view-check-out/' + data[1]);
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
<style lang="scss">
@import "@/assets/scss/vuexy/pages/profile.scss";
</style>