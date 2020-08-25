<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Check In Dashboard </li>
    </ol>


    <b-row>
      <b-col md="8" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Information" active>
                 <fieldset>
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
                       <td>{{product.quantity}}</td>
                           <td><b-badge v-if="product.delivered_quantity" :variant="getQuantityColor(product.quantity,product.delivered_quantity)" class="text-gray-dark">{{product.delivered_quantity}}</b-badge> <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge></td>
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
                 
                  <b-button  variant="success" class="btn-rounded " @click="submit" v-if="isLoading==false && data.status!=1">
              APPROVE & INSERT TO LIVE INVENTORY
              </b-button> &nbsp;&nbsp;
               <b-button  variant="warning" class="btn-rounded " @click="reject" v-if="isLoading==false && data.status==0">
              REJECT
              </b-button>
          </b-tab>
          
        </b-tabs>
      </b-col>
      <b-col lg='8' xs='12'>
       

      
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vSelect from 'vue-select';
import mock from './mock';
import VueBarcode from 'vue-barcode-master';
import VueQrcode from 'vue-qrcode-master';
const { Messenger } = window;

/* eslint-disable */
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
  name: 'FormValidation',
  components: { Widget,vSelect,barcode: VueBarcode,qrcode:VueQrcode},
  data() {
    return {
            mock,
      data:{
        attachments:[]
      },
      checkInId: this.$route.params.checkInId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  
  methods: {
        getQuantityColor(ordered,received){
    if(received>=ordered){
      return 'success';
    }
    else{
      return 'warning';
    }
  },
   async getCheckIn() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/checkin/'+ this.checkInId)
   this.data = response.data.checkInInfo[0];
  this.data.allProducts = JSON.parse(this.data.allProducts);
 
 
  } catch (error) {
    console.error(error);
  }
},
     navigateToDashboard(){
        this.$router.push({name:'Dashboard' });
    },
  submit(){
    var self=this;
    // self.isLoading = true;
  var finalProducts = new Array();
 
  
  var index=0;var length = self.data.allProducts.length;
   self.data.allProducts.forEach(function(entry) {
   
   if(entry.delivered_quantity!=undefined && entry.delivered_quantity!=0 && entry.delivered_quantity!=''){
   

  finalProducts.push({clinicId:parseInt(self.data.clinicId),checkInId:self.data.id,productId:entry.internal_qrcode,quantity:parseInt(entry.delivered_quantity)});
   }
    index++;
});
  
     //no validation
   if(index==length){
    self.axios.post('https://backend.medicodesolution.com/staging/clinicInventory/approve/submit', {
          
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
    reject(){
    var self=this;
   self.isLoading = true;


  
    self.axios.post('https://backend.medicodesolution.com/staging/clinicInventory/approve/reject/'+self.data.id, {
          
       

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
  },
   mounted(){
     this.getCheckIn();
         
     
  
      
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
