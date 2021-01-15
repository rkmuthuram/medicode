


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
        

            <!-- COL 2 -->
          
                <vx-card class="mt-base">
                 
               <legend>Complete Information</legend>
 <div class="mb-lg">
            <h3 class="text-success mb-0"><span v-if="data.status==0">Awaiting Manager Confirmation</span><span v-if="data.status==1">Confirmed & Added to Inventory</span><span v-if="data.status==-1">Rejected/Pending Clarification</span></h3>
            Status
          </div>
     <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.preCheckInId}}</h3>
            Pre Check In Record
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.invoiceId}}</h3>
            Invoice Number 
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.totalAmount}}</h3>
            Total Amount (RM)
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.comments}}</h3>
            Comments
          </div>
            <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.attachments}}</h3>
            Attachments
          </div>


        
          <table  class="table table-bordered table-lg mt-lg mb-0" >
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                  <th class="">Purchase Order Qty</th>
                  <th class="">Delivered Qty</th>
                  <th class="">Expiry Date</th>
                  <th class="">Batch Number</th>
                   <th class="">Manufacturer Barcode</th>
                    <th class="">Internal QR Code</th>
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in data.allProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                   <td v-if="product.packing_type=='TABLETS'"> {{product.quantity_strips}} strips ({{product.quantity_tabletsperstrip}} per strip) | {{product.quantity_tablets}} tablets</td>
                                       <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'"> {{product.quantity_mlpervial}} ML/vial | {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_mlperampule}} ML/ampule | {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'">  {{product.quantity_perbottle}}{{product.quantity_unitperbottle}}/bottle | {{product.quantity_bottles}} bottles | {{product.quantity_unittotal}}{{product.quantity_unitperbottle}} </td>
                                            <td v-if="product.packing_type=='TUBE'">  {{product.quantity_pertube}}{{product.quantity_unitpertube}}/tube | {{product.quantity_tubes}} tubes | {{product.quantity_unittotal}}{{product.quantity_unitpertube}} </td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                                          

                                            <td v-if="product.packing_type=='TABLETS'"> {{product.quantity_strips}} strips ({{product.quantity_tabletsperstrip}} per strip) | {{product.quantity_tablets}} tablets</td>
                                       <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'"> {{product.quantity_mlpervial}} ML/vial | {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_mlperampule}} ML/ampule | {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'">  {{product.quantity_perbottle}}{{product.quantity_unitperbottle}}/bottle | {{product.quantity_bottles}} bottles | {{product.quantity_unittotal}}{{product.quantity_unitperbottle}} </td>
                                            <td v-if="product.packing_type=='TUBE'">  {{product.quantity_pertube}}{{product.quantity_unitpertube}}/tube | {{product.quantity_tubes}} tubes | {{product.quantity_unittotal}}{{product.quantity_unitpertube}} </td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                        <!--   <td><b-badge v-if="product.delivered_quantity" :variant="getQuantityColor(product.quantity,product.delivered_quantity)" class="text-gray-dark">{{product.delivered_quantity}}</b-badge> <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge></td> -->
                              <td>{{product.expiry_date}}</td>
                                    <td>{{product.batch_number}}</td>
                                       <td><barcode v-bind:value="product.manufacturer_barcode" format="CODE128" :options="{ height:100 }" v-if="product.manufacturer_barcode">
  Show this if the rendering fails.
</barcode><span v-if="!product.manufacturer_barcode">No record</span></td>
 <td><qrcode :value="product.internal_qrcode" :options="{ height:100 }" v-if="product.internal_qrcode"></qrcode> <span v-if="!product.internal_qrcode">No record</span></td>
                     
                </tr>
              </tbody>
            </table> 
                 </fieldset>
                 <br>
                 
              
                </vx-card>
        

         
        </div>
  
  </div>
</template>

<script>

import VueBarcodeScanner from 'vue-barcode-scanner';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueBarcode from 'vue-barcode';
import moment from 'moment';
import vSelect from 'vue-select';

export default {
  components: {
barcode: VueBarcode,qrcode:VueQrcode,vSelect
  },
  data () {
    return {
    data:{
        attachments:[]
      },
      checkInId: this.$route.params.checkInId,
      isLoading:false,
    }
  },
  watch: {
 
  },
  computed: {

  },
  methods: {
     async getCheckIn() {
  try {
   const response = await this.$http.get('checkin/'+ this.checkInId)
   this.data = response.data.checkInInfo[0];
  this.data.allProducts = JSON.parse(this.data.allProducts);

 
 
  } catch (error) {
    console.error(error);
  }
},
  },
  mounted () {
      this.getCheckIn();
   

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