<template>
  <b-row>
    <b-col xl='8' lg='16'>
      <Widget
        title="
        <div>
          <h4>
            New Check In&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'>Follow these 4 simple steps to complete Check In!</p>
        </div>"
        customHeader  collapse
      >
         <form-wizard
          shape="tab"
          color="#3498db"
          title=""
          subtitle=""
       @on-validate="handleValidation"
      
                  @on-loading="setLoading"
                  @on-error="handleErrorMessage"
        >
          <b-progress class="progress-xs" variant="gray-light" :value="progress" :max="3" />
          <b-button slot="prev" variant="primary">
            <i class="fa fa-caret-left" /> Previous
          </b-button>
          <b-button slot="next" variant="primary">
            Next <i class="fa fa-caret-right" />
          </b-button>
          <b-button  slot="finish" variant="success" @click="submit" v-if="isLoading==false" >
            Proceed  <i class="fa fa-check" />
          </b-button>
          <tab-content title="Invoice Info" :before-change="validOne"> 
    
              <b-form>
              
             <b-form-group
                  label="Select Pre Check In Record"
                >
           
               <v-select :options="preInfo"    v-model="selectedPreCheckIn" label="orderId" >
    <template slot="option" slot-scope="option">
        {{option.orderId}} - {{ option.vendorName}} - Created {{option.created}}
    </template>
  </v-select>
        </b-form-group>
         <b-card class="mb-xlg border-0"  v-if="selectedPreCheckIn!=null">
          <span class="fw-semi-bold text-success">Vendor : {{selectedVendorInfo.name}}</span>
          <span class="fw-semi-bold text-muted ml-sm">{{selectedPreCheckIn.orderId}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Comments:  {{selectedPreCheckIn.comments}} | Attachments : {{selectedPreCheckIn.attachments}}</small></span>
          </div>
          <div class="mb-lg">
           <table  class="table table-bordered table-lg mt-lg mb-0" >
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                   <th class="hidden-sm-down">Color</th>
                  <th class="">Purchase Order Qty</th>
                  
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in selectedPreCheckIn.allProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                        <td>{{product.color}}</td>
                       <td>{{product.quantity}}</td>
                           
                     
                </tr>
              </tbody>
            </table> 
          </div>
          
                        
        </b-card>

          <b-form-group
                  label="Invoice Number"
                >
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'"       
                  name="invoiceId"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('invoiceId')}"
                  type="text"
               v-model="data.invoiceId"
                />
        </b-form-group>
            
           <b-form-group
                  label="Total Amount (RM)"
                >
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:2'"
                  
                  name="totalAmount"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('totalAmount')}"
                  type="number"
               v-model="data.totalAmount"
                />
        </b-form-group> 
          <b-form-group>
           <label for="myvueDropZone">Upload Invoice </label>
             <label for="myvueDropZone"> *upto 3 items, max 10MB size*</label>
            
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-success="successEvent"></vue-dropzone>
       
              </b-form-group>
            <b-form-group
                  label="Additional Comments (optional)"
                >
              <textarea-autosize
                                  v-model="data.comments"
                                placeholder=""
                                :min-height="45"
                               
                                  v-validate="'required|min:4'"
                             :class="{ 'form-control': true}"
                                id="comments"
                                name="comments"
                                />
        </b-form-group>
   


                
              </b-form>
            </tab-content>
           <tab-content title="Scan Products" :before-change="validTwo"> 
            
              <b-form>
              
                  <b-card class="mb-xlg border-0"  v-if="selectedPreCheckIn!=null">
          <span class="fw-semi-bold text-success">Vendor : {{selectedVendorInfo.name}}</span>
          <span class="fw-semi-bold text-muted ml-sm">#{{selectedPreCheckIn.orderId}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Comments:  {{selectedPreCheckIn.comments}} | Attachments : {{selectedPreCheckIn.attachments}}</small></span>
          </div>
          <div class="mb-lg">
            <table  class="table table-bordered table-lg mt-lg mb-0" >
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                    <th class="">Color</th>
                  <th class="">Purchase Order Qty</th>
                  <th class="">Delivered Qty</th>
                  <th class="">Expiry Date</th>
                   <th class="">Batch Number</th>
                  
                   <th class="">Manufacturer Barcode</th>
                    <th class="">Internal QR Code</th>
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in selectedPreCheckIn.allProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                      <td>{{product.color}}</td>
                       <td>{{product.quantity}}</td>
                         
                           <td><input type="number" v-model="product.delivered_quantity" v-if="product.delivered_quantity>0"><!--<b-badge v-if="product.delivered_quantity" :variant="getQuantityColor(product.quantity,product.delivered_quantity)" class="text-gray-dark">{{product.delivered_quantity}}</b-badge>--> <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge></td>


                               <td><input type="date" v-model="product.expiry_date" v-if="product.delivered_quantity>0"> <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge></td>
                                <td><input type="text" v-model="product.batch_number" v-if="product.delivered_quantity>0"> <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge></td>
                                   
                                       <td><barcode v-bind:value="product.manufacturer_barcode" format="CODE128" :options="{ height:100 }" v-if="product.manufacturer_barcode">
  Show this if the rendering fails.
</barcode><span v-if="!product.manufacturer_barcode">No record</span></td>
 <td><qrcode :value="product.internal_qrcode+''+product.product_name" :options="{ height:100 }" v-if="product.internal_qrcode"></qrcode> <span v-if="!product.internal_qrcode">No record</span></td>
                     
                </tr>
              </tbody>
            </table> 
            
                  <b-modal v-model="showModal"  ref="modal" id="small" size="sm" body-class="bg-white" @ok="processManual" title="Cannot find barcode for product you just scanned. Manually select the product from dropdown below, or Click Ignore button to close." cancel-title="Ignore" ok-title="Submit">
                        <v-select :options="unselectedProducts"  :value="Index"  v-model="manualSelection" placeholder="Select Product" label="label"  >
    <template slot="option" slot-scope="option">
        {{ option.label }}
    </template>
  </v-select>
    </b-modal>
          </div>
          
                        
        </b-card>
  


       

    
              </b-form>
            </tab-content>
            <tab-content title="Review & Confirmation">
            
          

           <table  class="table table-bordered table-lg mt-lg mb-0" v-if="allSelectedProducts.length!=0">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                  <th class="">Qty</th>
                 
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in allSelectedProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                       <td>{{product.quantity}}</td>
                   
                </tr>
              </tbody>
            </table> 

        <div class="mb-lg" v-if="selectedPreCheckIn!=null">
            <h3 class="text-success mb-0">{{selectedPreCheckIn.preId}}</h3>
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


      
              <b-form-group>
                  <input
                    type="checkbox"
                    id="checkbox-default"
                    v-model="accept"
                  />
                   <label for="checkbox-default">I have reviewed the contents and am ready to proceed</label>
                </b-form-group>
            </tab-content>
            <div class="loader" v-if="loadingWizard"></div>
    <div v-if="errorMsg">
      <span class="error">{{errorMsg}}</span>
    </div>
        </form-wizard>
      </Widget>
    </b-col>
  </b-row>
</template>
<style>
span.error{
  color:#e74c3c;
  font-size:20px;
  display:flex;
  justify-content:center;
}
</style>
<script>

import Vue from 'vue';
import vSelect from 'vue-select';
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { select2CountriesData, select2ShipmentData, cardTypesData } from './data';
import rns from '../../assets/cards/rns.png';
import moment from 'moment';
import VueBarcode from 'vue-barcode-master';
import VueQrcode from 'vue-qrcode-master';

const { Messenger } = window;
function initializationMessengerCode() {
  (function () {
    let $,
      FlatMessage,
      spinner_template,
      __hasProp = {}.hasOwnProperty,
      __extends = function (child, parent) {
        for (const key in parent) {
          if (__hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      };

    $ = jQuery;

    spinner_template = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';

    FlatMessage = (function (_super) {
      __extends(FlatMessage, _super);

      function FlatMessage() {
        return FlatMessage.__super__.constructor.apply(this, arguments);
      }

      FlatMessage.prototype.template = function (opts) {
        let $message;
        $message = FlatMessage.__super__.template.apply(this, arguments);
        $message.append($(spinner_template));
        return $message;
      };

      return FlatMessage;
    }(Messenger.Message));

    Messenger.themes.air = {
      Message: FlatMessage,
    };
  }).call(window);
}
/* eslint-enable */
export default {
  name: 'FormWizardPage',
  components: { Widget, vSelect,vueDropzone: vue2Dropzone,barcode: VueBarcode,qrcode:VueQrcode},
  data() {
    return {

      showModal:false,
      selectedVendorInfo:{},
      unselectedProducts:[],
      allSelectedProducts:[],
      unselectedBarcode:null,
      selectedPreCheckIn:null,
      manualSelection:{},
        clinicId: this.$route.params.clinicId,
        loadingWizard: false,
         errorMsg: null,
         count: 0,
      isLoading:false,
       data:{
        vendor:'',
       
       preCheckIn:'',
       invoiceId:'',
       totalAmount:'',
       attachments:[],
        comments:''
 
      },
      accept:false,
    progress:1,
    preInfo:[],
    medicineInfo:[],
    data2:{

    },
    selectedMedicine:null,
    data3:{

    },
    
            dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/staging/checkin/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 3,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
    };
  },
  watch: {
  selectedPreCheckIn: function (preCheckIn) {
  this.selectedPreCheckIn.allProducts = JSON.parse(this.selectedPreCheckIn.allProducts);
  this.getPreSelectedVendor(this.selectedPreCheckIn.vendorId)
  }
},
  methods: {
    processManual(){ 
      const self=this;   
      if(self.manualSelection==null || self.manualSelection==''){
          return Messenger().post({type:'error',message:'Scanned barcode not tagged to any product!',hideAfter: 3,showCloseButton:true});
      }
  
        var selectedIndex = self.manualSelection.Index;
        console.log(selectedIndex);
        self.selectedPreCheckIn.allProducts[selectedIndex].manufacturer_barcode = self.unselectedBarcode;
           if(self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==undefined || self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==''){
     self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity= 1;
   }
   else {
     self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity++;
   }
  return  Messenger().post({message:self.selectedPreCheckIn.allProducts[selectedIndex].product_name+' scanned!', hideAfter: 3,showCloseButton:true});
        console.log(self.manualSelection.Index);
    
    },
    removeFromList(){
      this.selectedMedicine=null;
      return Messenger().post({type:'success',message:'Item removed!',hideAfter: 3,showCloseButton:true});
    },
      removeFromAllProducts(index){
      this.allSelectedProducts.splice(index);
      return Messenger().post({type:'success',message:'Item removed!',hideAfter: 3,showCloseButton:true});
    },
    addToList(){
      if(this.selectedMedicine.quantity==null || this.selectedMedicine.quantity==undefined || this.selectedMedicine.quantity==''){
       return Messenger().post({type:'error',message:'Quantity required!',hideAfter: 3,showCloseButton:true});
      }
      this.allSelectedProducts.push(this.selectedMedicine);
      this.selectedMedicine=null;
         console.log(this.allSelectedProducts);
      return Messenger().post({type:'success',message:'Item added to list!',hideAfter: 3,showCloseButton:true});
   
    },
async onSearch(search, loading) {
  if(escape(search)=='' || escape(search)==null || escape(search)==undefined){
   return this.medicineInfo;
  }
    loading(true);
    const response = await this.axios.get(`https://backend.medicodesolution.com/staging/search/medicines/${escape(search)}`);
    this.medicineInfo = response.data.medicineInfo;
    loading(false);
    },
     successEvent (file) {
        this.data.attachments.push(file.xhr.response);
      },
 onComplete: function(){
          submit()
        },
        setLoading: function(value) {
            this.loadingWizard = value
        },
        handleValidation: function(isValid, tabIndex){
       //    console.log('Tab: '+tabIndex+ ' valid: '+isValid)
        },
        handleErrorMessage: function(errorMsg){
          this.errorMsg = errorMsg
        },
        navigateToDashboard(){
        this.$router.push({name:'Dashboard' });
    },
      validOne:function() {
     return new Promise((resolve, reject) => {
           if(this.selectedPreCheckIn=='' || this.selectedPreCheckIn==null){
        
         	reject('Select Pre Check In to continue..')
         }
             if(this.data.invoiceId=='' || this.data.invoiceId==null){
        
         	reject('Key in invoice number to continue..')
         }
            if(this.data.totalAmount=='' || this.data.totalAmount==null){
        
         	reject('Key in Total Amount (RM) to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Invoice to continue..')
         }
              
       
       else{
      /*   console.log('precheckin:'+this.data.preCheckIn.id+'--- invoice number:'+this.data.invoiceId+'--- total amount:'+this.data.totalAmount+'--- attachments:'+ JSON.stringify(this.data.attachments) + '--- comments:'+this.data.comments); */
          resolve(true)
         }   
     
     })
    },
      validTwo:function() {
     return new Promise((resolve, reject) => {
        var minimumProductAdded=false;
            this.selectedPreCheckIn.allProducts.forEach(function(entry) {
    if(entry.delivered_quantity!=null && entry.delivered_quantity!=undefined){
      minimumProductAdded=true;
    }
});
                if(this.selectedPreCheckIn=='' || this.selectedPreCheckIn==null){
        
         	reject('Select Pre Check In to continue..')
         }
             if(this.data.invoiceId=='' || this.data.invoiceId==null){
        
         	reject('Key in invoice number to continue..')
         }
            if(this.data.totalAmount=='' || this.data.totalAmount==null){
        
         	reject('Key in Total Amount (RM) to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Invoice to continue..')
         }
             if(minimumProductAdded==false){
        
         	reject('Add at least one product to continue..')
         }
         else {
            resolve(true);
         }
        
     
     
     })
    },
  getQuantityColor(ordered,received){
    if(received>=ordered){
      return 'success';
    }
    else{
      return 'warning';
    }
  },
  submit(){
    var self=this;
     self.isLoading = true;
    if(self.accept==false){
       self.isLoading = false;
      return Messenger().post({type:'error',message:'Tick confirmation checkbox to continue!',hideAfter: 3,showCloseButton:true});
    }
 

   //no validation
 
    
    self.axios.post('https://backend.medicodesolution.com/staging/checkin/submit', {
        clinicId:self.clinicId,
          preCheckInId:self.selectedPreCheckIn.preId,
          invoiceId:self.data.invoiceId,
          totalAmount:self.data.totalAmount,
          comments:self.data.comments,
          attachments:self.data.attachments.join(),
          allProducts:JSON.stringify(self.selectedPreCheckIn.allProducts)

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                                   self.isLoading = false;
                   Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                   return self.navigateToDashboard();
         
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                 Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
              return self.navigateToDashboard();
                  }
                 else {
                   self.isLoading = false;
               Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   return self.navigateToDashboard();
                   }
                }
                })
                .catch(function (error) {
                self.isLoading = false;
                 Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true}); 
                     return self.navigateToDashboard();               
                }); 
  },
 async getPreCheckIns() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/precheckins/'+this.clinicId);

   this.preInfo = response.data.preInfo;
   
 
  } catch (error) {
    console.error(error);
  }
},
 async getPreSelectedVendor(id) {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/vendor/'+id);
   this.selectedVendorInfo = response.data.vendorInfo[0];
 
   
 
  } catch (error) {
    console.error(error);
  }
},

 onBarcodeScanned (barcode) {
       var index = 0; var selectedIndex;
       var self=this;
       self.unselectedProducts = [];
     this.selectedPreCheckIn.allProducts.forEach(function(entry) {
    if(entry.manufacturer_barcode==barcode){
    selectedIndex = index;
    }
    if(entry.manufacturer_barcode=='' || entry.manufacturer_barcode==null || entry.manufacturer_barcode==undefined){
      self.unselectedProducts.push({
        label:entry.product_name,
        Index:index
      });
    }
    index++;
});

if(selectedIndex!=null && selectedIndex!=undefined){
   if(this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==undefined || this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==''){
     this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity= 1;
   }
   else {
     this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity++;
   }
  return  Messenger().post({message:this.selectedPreCheckIn.allProducts[selectedIndex].product_name+' scanned!', hideAfter: 3,showCloseButton:true});
}
else {
    this.unselectedBarcode = barcode;
    this.showModal=true;
    return  Messenger().post({type:'error',message:'Item not found', hideAfter: 3,showCloseButton:true});
}
      },

  },
     mounted(){
  this.getPreCheckIns();
 
 
   },
    created() {
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.locationClasses,
      theme: 'air',
      showCloseButton: true,
    };
   this.$barcodeScanner.init(this.onBarcodeScanned);
  },
};
</script>

<style src="./ClinicPreCheckIn.scss" lang="scss" />
