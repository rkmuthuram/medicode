<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Pre Check In Dashboard </li>
    </ol>


    <b-row>
      <b-col md="8" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Information" active>
                 <fieldset>
   <legend>Complete Information</legend>

      <div class="mb-lg">
            <h3 class="text-success mb-0">{{clinicName}}</h3>
           Clinic
          </div>

       <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.vendorId}}</h3>
            Vendor
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.orderId}}</h3>
            Purchase Order Number 
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.comments}}</h3>
            Comments
          </div>
             <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.attachments}}</h3>
            Attachments
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
                  <th class="">Qty</th>
                 
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
                   
                </tr>
              </tbody>
            </table> 
               <b-button type="submit" variant="danger" class="btn-rounded" @click="deleteRecord">
               Delete Record (This action is permanent & not reversible)
              </b-button>
          
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
      clinicId: this.$route.params.clinicId,
      clinicName:'',
      preCheckInId: this.$route.params.preCheckInId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  
  methods: {
    async deleteRecord(){
  try {
   const response = await this.axios.delete('https://backend.enigmedsvcs.com/development/precheckin/'+ this.preCheckInId)

  if(response.data.success){
          return this.$router.push({
        name: "ClinicAccountView",
        params: { clinicId:this.clinicId }
      });
  }
 
  } catch (error) {
    console.error(error);
  }
    },
       async getAccount() {
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/clinic/'+ this.clinicId)
   this.clinicName= response.data.accountInfo[0].name;
    
  } catch (error) {
    console.error(error);
  }
},
   async getPreCheckIn() {
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/precheckin/'+ this.preCheckInId)
   this.data = response.data.preCheckInInfo[0];
  this.data.allProducts = JSON.parse(this.data.allProducts);
 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
     this.getPreCheckIn();
         
        this.getAccount();  
      
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
