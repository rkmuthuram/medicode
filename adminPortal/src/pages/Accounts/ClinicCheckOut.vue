<template>
  <b-row>
    <b-col xl='8' lg='16'>
      <Widget
        title="
        <div>
          <h4>
            New Check Out&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'>Follow these 4 simple steps to complete Check Out!</p>
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
         <!--  <tab-content title="Customer Info" :before-change="validOne"> -->
        <tab-content title="Customer Info" > 
          <b-form-group
                  label="  Patient Identification Number (MRN Number)"
                >
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'" 
                  name="patientId"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('patientId')}"
                  type="text"
               v-model="data.patientId"
                />
        </b-form-group>
            <b-form-group
                  label="Total Amount (RM)"
                >
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:2'"
                  name="total_amount"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('total_amount')}"
                  type="number"
               v-model="data.total_amount"
                />
        </b-form-group>
       <!--   <b-form-group>
           <label for="myvueDropZone">Upload Purchase Order</label>
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
        </b-form-group> -->
   


                
              </b-form>
            </tab-content>
         <!--  <tab-content title="Add Products" :before-change="validTwo"> -->
             <tab-content title="Add Products" > 
            
              <b-form>
              
                  <b-form-group
                  label="Select Medicine"
                >
            <v-select label="product_name" :filterable="false" :options="medicineInfo"  @search="onSearch"  v-model="selectedMedicine" change="" >
    <template slot="no-options">
      type to search medicine by name / category / manufacturer..
    </template>
    <template slot="option" slot-scope="option">
      <div class="d-center">
        {{ option.product_name }} - {{ option.manufacturer }} - {{option.color}}
        </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div class="selected d-center">
        {{ option.product_name }}
      </div>
    </template>
  </v-select>
            <!--   <v-select    v-model="data2.medicine" label="name" >
    <template slot="option" slot-scope="option">
         {{ option.product_name }} - {{ option.product_category }} - {{ option.company_name }}
    </template>
  </v-select>-->
        </b-form-group>
  
  <b-card class="mb-xlg border-0"  v-if="selectedMedicine!=null">
          <span class="fw-semi-bold text-success">{{selectedMedicine.product_category}}</span>
          <span class="fw-semi-bold text-muted ml-sm">{{selectedMedicine.product_name}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Manufacturer :  {{selectedMedicine.manufacturer}} | Distributor : {{selectedMedicine.company_name}}</small></span><br>
            
          </div>
          <div class="mb-lg">
            <h3 class="text-success mb-0">{{selectedMedicine.packing_type}} | {{selectedMedicine.packing_quantity}} | {{selectedMedicine.color}}</h3>
          </div>
              <div class="mb-lg">
            <h3 class="text-success mb-0">Available Stock : {{selectedMedicine.stock_quantity}} units</h3>
          </div>
           <b-form-group
                  :label="'Dispense Quantity ('+ selectedMedicine.packing_type+')'"
                >
          
   <v-select
      v-if="selectedMedicine.packing_type=='TABLETS'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['STRIPS','LOOSE TABLETS - WHOLE','LOOSE TABLETS - HALF']"
      />
        <v-select
     v-if="selectedMedicine.packing_type=='Vial / per cc'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE VIAL','BY CC']"
      />
              <v-select
     v-if="selectedMedicine.packing_type=='Vial / per 0.5 cc'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE VIAL','BY 0.5CC']"
      />
             <v-select
     v-if="selectedMedicine.packing_type=='Per vial'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE']"
      />
            <v-select
     v-if="selectedMedicine.packing_type=='per ampule'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE']"
      />
           <v-select
     v-if="selectedMedicine.packing_type=='Sachet'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE']"
      />
        <v-select
     v-if="selectedMedicine.packing_type=='Diskus'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE']"
      />
         <v-select
     v-if="selectedMedicine.packing_type=='Per supp'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE']"
      />
          <v-select
     v-if="selectedMedicine.packing_type=='TUBE'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE','BY GRAMS']"
      />
          <v-select
     v-if="selectedMedicine.packing_type=='BOTTLE'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE','BY ML']"
      />
        <v-select
     v-if="selectedMedicine.packing_type=='BOX/BAR'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE','BY GRAMS']"
      />
       <v-select
     v-if="selectedMedicine.packing_type=='box'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE BOX','PIECES']"
      />
       <v-select
     v-if="selectedMedicine.packing_type=='set'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE']"
      />
         <v-select
     v-if="selectedMedicine.packing_type=='ROLLS'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE ROLL','HALF ROLL']"
      />
            <v-select
     v-if="selectedMedicine.packing_type=='PIECES'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['BY PIECE']"
      />
             <v-select
     v-if="selectedMedicine.packing_type=='pack'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE PACK','BY PIECE','BY BALLS']"
      />
         <v-select
     v-if="selectedMedicine.packing_type=='Gauze'" 
      v-model="selectedMedicine.dispensed_type"
      class="mt-xs"
      :options="['WHOLE']"
      />

<br>
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|max_value:'+selectedMedicine.stock_quantity"
                  name="qty"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('qty')}"
                  type="number"
               v-model="selectedMedicine.dispensed_quantity"
                />
        </b-form-group>
         <b-button type="button" variant="success" class="btn-rounded" @click="addToList()" >
             Verify & Add to List
              </b-button> &nbsp;&nbsp;
               <b-button type="button" variant="danger" class="btn-rounded" @click="removeFromList()" >
             Remove Item
              </b-button>

                        
        </b-card>

       

     <table  class="table table-bordered table-lg mt-lg mb-0" v-if="allSelectedProducts.length!=0">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                  <th class="">Packing Type</th>
                  <th class="">Dispensed Qty</th>
                   <th class="">Actions</th>
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in allSelectedProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                    <td>{{product.packing_type}}</td>
                       <td>{{product.dispensed_quantity}} ({{product.dispensed_type}})</td>
                       <td><b-button type="button" variant="danger" class="btn-rounded" @click="removeFromAllProducts(index)"> Remove Item </b-button></td>
                </tr>
              </tbody>
            </table> 
     
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
                   <th class="">Packing Type</th>
                  <th class="">Dispensed Qty</th>
                 
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in allSelectedProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                       <td>{{product.packing_type}} ({{product.dispensed_type}})</td>
                  <td>{{product.dispensed_quantity}}</td>
                   
                </tr>
              </tbody>
            </table> 

       <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.patientId}}</h3>
          Patient Identification Number (MRN Number)
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.total_amount}}</h3>
           Total Amount
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
  components: { Widget, vSelect,vueDropzone: vue2Dropzone},
  data() {
    return {
      allSelectedProducts:[],
        clinicId: this.$route.params.clinicId,
        loadingWizard: false,
         errorMsg: null,
         count: 0,
      isLoading:false,
       data:{
        vendor:'',
        order_number:'',
       attachments:[],
        comments:''
 
      },
      accept:false,
    progress:1,
    vendorInfo:[],
    medicineInfo:[],
    data2:{

    },
    selectedMedicine:null,
    data3:{

    },
    
            dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/staging/precheckin/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 3,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
    };
  },
  watch: {
  selectedMedicine: function (medicine) {
  }
},
  methods: {
    removeFromList(){
      this.selectedMedicine=null;
      return Messenger().post({type:'success',message:'Item removed!',hideAfter: 3,showCloseButton:true});
    },
      removeFromAllProducts(index){
      this.allSelectedProducts.splice(index);
      return Messenger().post({type:'success',message:'Item removed!',hideAfter: 3,showCloseButton:true});
    },
    addToList(){
        var id=this.selectedMedicine.productId;
      var i=0;var fail=false;
               this.allSelectedProducts.forEach(function(entry) {
    if(entry.productId==id){
       fail=true;
    }
    i++;
});
    if(fail==true && i==this.allSelectedProducts.length){
 return Messenger().post({type:'error',message:'Product already added to the list!',hideAfter: 3,showCloseButton:true});
    }
      if(this.selectedMedicine.dispensed_quantity==null || this.selectedMedicine.dispensed_quantity==undefined || this.selectedMedicine.dispensed_quantity=='' || this.selectedMedicine.dispensed_quantity==0){
       return Messenger().post({type:'error',message:'Valid dispensed quantity required!',hideAfter: 3,showCloseButton:true});
      }
        if(this.selectedMedicine.dispensed_quantity>this.selectedMedicine.stock_quantity ){
       return Messenger().post({type:'error',message:'Dispense quantity must not be higher than stock quantity!',hideAfter: 3,showCloseButton:true});
      }
  
   if(fail==false && i==this.allSelectedProducts.length){
      this.allSelectedProducts.push(this.selectedMedicine);
      this.selectedMedicine=null;
      return Messenger().post({type:'success',message:'Item added to list!',hideAfter: 3,showCloseButton:true});
    }
    
    
   
    },
async onSearch(search, loading) {
  if(escape(search)=='' || escape(search)==null || escape(search)==undefined){
   return this.medicineInfo;
  }
    loading(true);
    const response = await this.axios.get(`https://backend.medicodesolution.com/staging/search/liveInventory/`+ this.clinicId +`/${escape(search)}`);
    this.medicineInfo = response.data.medicineInfo;
    console.log(this.medicineInfo)
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
           if(this.data.vendor=='' || this.data.vendor==null){
        
         	reject('Select vendor to continue..')
         }
             if(this.data.order_number=='' || this.data.order_number==null){
        
         	reject('Key in order number to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Purchase Order to continue..')
         }
              
       
       else{
        //  console.log('vendor:'+this.data.vendor.name+'--- order number:'+this.data.order_number+'--- attachments:'+ JSON.stringify(this.data.attachments) + '--- comments:'+this.data.comments);
          resolve(true)
         }   
     
     })
    },
      validTwo:function() {
     return new Promise((resolve, reject) => {
           if(this.data.vendor=='' || this.data.vendor==null){
        
         	reject('Select vendor to continue..')
         }
             if(this.data.order_number=='' || this.data.order_number==null){
        
         	reject('Key in order number to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Purchase Order to continue..')
         }
             if(this.allSelectedProducts.length==0 ){
        
         	reject('Add at least 1 (one) product to continue..')
         }
             /* if(this.data.subtotal=='' || this.data.subtotal==null){
        
         	reject('Key in Subtotal (RM) to continue..')
         }
           if(this.data.tax_rate=='' || this.data.tax_rate==null){
        
         	reject('Key in Tax Rate (RM) to continue..')
         }

      if(this.data.total_amount=='' || this.data.total_amount==null){
        
         	reject('Key in Total Amount (RM) to continue..')
         }
           if(this.data.comments=='' || this.data.comments==null){
        
         	reject('Key in Comments..')
         } */

       
       
       else{
        //  console.log('vendor:'+this.data.vendor.name+'--- order number:'+this.data.order_number+'--- attachments:'+ JSON.stringify(this.data.attachments) + '--- comments:'+this.data.comments);
          resolve(true)
         }   
     
     })
    },

  submit(){
    var self=this;
     self.isLoading = true;
    if(self.accept==false){
       self.isLoading = false;
      return Messenger().post({type:'error',message:'Tick confirmation checkbox to continue!',hideAfter: 3,showCloseButton:true});
    }
  /* console.log('vendorId:'+self.data.vendor.id);
    console.log('orderId:'+self.data.order_number);
    console.log('attachments:'+self.data.attachments.join());
     console.log('comments:'+self.data.comments);
     console.log('allProducts'+ JSON.stringify(self.allSelectedProducts)); */

   //no validation
    // self.isLoading = true;
  var finalProducts = new Array();
 
  
  var index=0;var length = self.allSelectedProducts.length;
   self.allSelectedProducts.forEach(function(entry) {
   console.log(entry)
   if(entry.dispensed_quantity!=undefined && entry.dispensed_quantity!=0 && entry.dispensed_quantity!=''){
   

  finalProducts.push({productId:entry.productId,quantity:parseInt(entry.dispensed_quantity)});
   }
    index++;
});
  
    if(index==length){

 self.axios.post('https://backend.medicodesolution.com/staging/checkout/submit', {
          clinicId:self.clinicId,
          patientId:self.data.patientId,
          total_amount:self.data.total_amount,
          allProducts:JSON.stringify(self.allSelectedProducts),
          finalProducts:finalProducts

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


    }
   
  },
  },
     mounted(){
 
 
 
   },
    created() {
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.locationClasses,
      theme: 'air',
      showCloseButton: true,
    };
  
  },
};
</script>

<style src="./ClinicPreCheckIn.scss" lang="scss" />
