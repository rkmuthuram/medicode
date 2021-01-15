


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
            <h3 class="text-success mb-0">{{data.patientId}}</h3>
            Patient Identification number
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.total_amount}}</h3>
          Total Amount (RM)
          </div>
              <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.staffId}}</h3>
          Staff Id
          </div>
            <div class="mb-lg" v-if="data.rollback=='true'">
            <h3 class="text-success mb-0">ROLLED BACK</h3>
          On {{data.update_time}}
          </div>

              
                 </fieldset>
          </b-tab>
         
        
          
          <table  class="table table-bordered table-lg mt-lg mb-0" v-if="data.allProducts.length!=0">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                   <th class="">Packing Type</th>
                  <th class="">Dispensed Qty</th>
                 
                </tr>
              </thead>
                  <tbody>
               <tr v-for="(product,index) in allProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                    <td>{{product.packing_type}}</td>
                        <td v-if="product.packing_type=='TABLETS'"> 
                          <span v-if="product.quantity_strips==0 && product.quantity_tablets!=0">{{product.quantity_tablets}} tablets</span>
                         <span v-if="product.quantity_strips!=0 && product.quantity_tablets==0">{{product.quantity_strips}} strips</span>
                  <span v-if="product.quantity_strips!=0 && product.quantity_tablets!=0">  {{product.quantity_strips}} strips  &amp; {{product.quantity_tablets}} loose tablets</span>
                          
                        </td>
                  <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'">
                   <span v-if="product.quantity_mls==0 && product.quantity_vials!=0">{{product.quantity_vials}} vials</span>
                         <span v-if="product.quantity_mls!=0 && product.quantity_vials==0">{{product.quantity_mls}} loose ML</span>
                  <span v-if="product.quantity_mls!=0 && product.quantity_vials!=0"> {{product.quantity_mls}} loose ML &amp; {{product.quantity_vials}} vials</span>
                
                   
                   </td>
                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_ampules}} ampules</td>

                                         <td v-if="product.packing_type=='BOTTLE'"> 
                                              <span v-if="product.quantity_unittotal==0 && product.quantity_bottles!=0">{{product.quantity_bottles}} bottles</span>
                         <span v-if="product.quantity_unittotal!=0 && product.quantity_bottles==0">{{product.quantity_unittotal}}{{product.quantity_unitperbottle}}/ loose</span>
                  <span v-if="product.quantity_unittotal!=0 && product.quantity_bottles!=0"> {{product.quantity_unittotal}}{{product.quantity_unitperbottle}}/ loose &amp; {{product.quantity_bottles}} bottles</span>
                                           
                                           
                                             </td>
                                                           <td v-if="product.packing_type=='TUBE'"> 
                                              <span v-if="product.quantity_unittotal==0 && product.quantity_tubes!=0">{{product.quantity_tubes}} tubes</span>
                         <span v-if="product.quantity_unittotal!=0 && product.quantity_tubes==0">{{product.quantity_unittotal}}{{product.quantity_unitpertube}}/ loose</span>
                  <span v-if="product.quantity_unittotal!=0 && product.quantity_tubes!=0"> {{product.quantity_unittotal}}{{product.quantity_unitpertube}}/ loose &amp; {{product.quantity_tubes}} tubes</span>
                                           
                                           
                                             </td>
                                           
                                            
                                            
                                            
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                   
                </tr>
              </tbody>
            </table> 
          
          
                 
              
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
      allProducts:new Array(),
      checkOutId: this.$route.params.checkOutId,
      isLoading:false,
    }
  },
  watch: {
 
  },
  computed: {

  },
  methods: {
    async getCheckOut() {
  try {
   const response = await this.$http.get('checkout/'+ this.checkOutId)
   this.data = response.data.checkOutInfo[0];
  this.allProducts = JSON.parse(this.data.allProducts);
 
 
  } catch (error) {
    console.error(error);
  }
},
  },
  mounted () {
      this.getCheckOut();
   

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