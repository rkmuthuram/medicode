<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Check Out Dashboard </li>
    </ol>


    <b-row>
      <b-col md="8" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Information" active>
                 <fieldset>
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

               <b-button type="submit" variant="danger" class="btn-rounded" v-if="isLoading==false && data.rollback!='true'" @click="rollbackStock">
              Rollback Completely
              </b-button>
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
                        <td v-if="product.packing_type=='TABLETS'"> {{product.quantity_strips}} strips  &amp; {{product.quantity_tablets}} loose tablets</td>
                                       <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'"> {{product.quantity_mls}} loose ML | {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'">  {{product.quantity_unittotal}}{{product.quantity_unitperbottle}}/ loose | {{product.quantity_bottles}} bottles </td>
                                            <td v-if="product.packing_type=='TUBE'">  {{product.quantity_unittotal}}{{product.quantity_unitpertube}}/ loose | {{product.quantity_tubes}} tubes </td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                   
                </tr>
              </tbody>
            </table> 
          
          
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
  components: { Widget,vSelect },
  data() {
    return {
            mock,
      data:{
        attachments:[]
      },
      allProducts:new Array(),
      checkOutId: this.$route.params.checkOutId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  
  methods: {
      navigateToDashboard(){
        this.$router.push({name:'Dashboard' });
    },
   async getCheckOut() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/checkout/'+ this.checkOutId)
   this.data = response.data.checkOutInfo[0];
  this.allProducts = JSON.parse(this.data.allProducts);
 
 
  } catch (error) {
    console.error(error);
  }
},
 async rollbackStock() {
  var self=this;
      var finalProducts = new Array();

  var index=0;var length = self.allProducts.length;
 
//  console.log(this.allSelectedProducts);
   self.allProducts.forEach(function(entry) {
   
   
    
 if(entry.packing_type=='TABLETS'){
  var quantity = {
     tablets:Number(entry.quantity_tablets),
     strips:Number(entry.quantity_strips),
     totaltablets:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.data.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
    if(entry.packing_type=='Per vial' || entry.packing_type=='per vial' || entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
  var quantity = {
    
     vials:Number(entry.quantity_vials),
     mls:Number(entry.quantity_mls),
    totalmls:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.data.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
     if(entry.packing_type=='per ampule'){
  var quantity = {
    ampules:Number(entry.quantity_ampules),
    totalampules:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.data.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
        if(entry.packing_type=='BOTTLE'){
  var quantity = {

     bottles:Number(entry.quantity_bottles),
     unittotal:Number(entry.quantity_unittotal),
    totalunits:Number(entry.dispensed_total)
   };
  finalProducts.push({clinicId:self.data.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
     if(entry.packing_type=='TUBE'){
  var quantity = {
    tubes:Number(entry.quantity_tubes),
     unittotal:Number(entry.quantity_unittotal),
    totalunits:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.data.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }

      if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){
  var quantity = {
     units:Number(entry.quantity_units),
    totalunits:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.data.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }




 

  
    index++;
});

 if(index==length){
try {
   const response = await this.axios.post('https://backend.medicodesolution.com/development/rollback/checkout/'+ this.checkOutId, {
          finalProducts:finalProducts,
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
 
 
 
  } catch (error) {
    console.error(error);
  }
 }
  
}
  },
   mounted(){
     this.getCheckOut();
         
     
  
      
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
