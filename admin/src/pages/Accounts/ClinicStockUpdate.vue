<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Update Stock - {{data.name}}</li>
    </ol>


    <b-row>
      <b-col lg='8' xs='12'>
           <Widget
          title="<h5>        
            <small>Stock Ammend Guide </small>
          </h5>"
          customHeader 
        ><br>
          TABLETS : -> "tablets": 2480.0,"tabletsperstrip": 10  &nbsp; = 2480/10 = 2480 tab (248 strips)  <br>
          TUBES : -> "unittotal": 1000.0,"unitpertube": "g","pertube":10  &nbsp; = 1000/10 = 1000 g (100 tubes)  <br>
          BOTTLES : -> "unittotal": 2000.0,"unitperbottle": "ml","perbottle":50 &nbsp; = 2000/50 = 2000 ml (400 bottles)  <br>
          PER VIAL : -> "vials": 20.0 &nbsp; = 20 vials  <br>
          VIAL PER CC : -> "mls": 200.0,"mlpervial": "5" &nbsp; = 200/5 = 200 CC/ML (40 vials)  <br>
          PER AMPULE | AMPULE : -> "ampules": 20.0 &nbsp; = 20 ampules  <br>
          PER SUPP | SACHET | Sachet | box | Set | ROLLS | PIECES | pack | Diskus : -> "units": 20.0 &nbsp; = 20 units  <br>
        
        </Widget>

      
        <Widget
          title="<h5>        
            <small>Edit & Click Update </small>
          </h5>"
          customHeader 
        >
          <b-form @submit="onSubmit">
            <fieldset>
              <legend>
               
              </legend>
               
       <b-form-group
                  label="Select Medicine OR Start Scanning (QR / Barcode)"
                >
            <v-select label="product_name" :filterable="false" :options="medicineInfo"  @search="onSearch"  v-model="selectedMedicine" change="" >
    <template slot="no-options">
    type to search medicine by name / category / manufacturer / any barcodes..
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
       <b-card class="mb-xlg border-0"  v-if="selectedMedicine!=null" :key="componentKey">
          <span class="fw-semi-bold text-success">{{selectedMedicine.product_category}}</span>
          <span class="fw-semi-bold text-muted ml-sm">{{selectedMedicine.product_name}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Manufacturer :  {{selectedMedicine.manufacturer}} | Distributor : {{selectedMedicine.company_name}}</small></span><br>
            
          </div>
          <div class="mb-lg">
            <h3 class="text-success mb-0">{{selectedMedicine.packing_type}} | {{selectedMedicine.packing_quantity}} | {{selectedMedicine.color}}</h3>
          </div>
             <!-- <div class="mb-lg">
            <h3 class="text-success mb-0">Available Stock : {{selectedMedicine.quantity}} units</h3>
          </div> -->
      
                   <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="address_street"
             
              >
                <div slot="label">
              Quantity Info
                </div>
              <textarea-autosize
                                  v-model="selectedMedicine.quantity"
                                placeholder=""
                                :min-height="60"
                             :class="{ 'form-control': true}"
                              
                                />
             
              </b-form-group>  
                   
  
          
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="address_street"
             
              >
                <div slot="label">
            Remarks
                </div>
              <textarea-autosize
                                  v-model="remarks"
                                placeholder=""
                                :min-height="35"
                              
                             :class="{ 'form-control': true}"
                                id="street_address"
                                name="street_address"
                                />
             
              </b-form-group>
      
       

                        
        </b-card>
        </b-form-group>

            </fieldset>
            <div class="form-action">
             
              <b-button type="button" variant="default" class="btn-rounded" @click="navigateToView()" >
               Back
              </b-button>
              <b-button type="submit" variant="danger" class="btn-rounded float-right" v-if="isLoading==false">
                Update
              </b-button>
            </div>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vSelect from 'vue-select';

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
  components: { Widget,vSelect},
  data() {
    return {
         componentKey:0,
         remarks:'',
      data:{},
        medicineInfo:[],
        postChange:'',
         selectedMedicine:null,
      clinicId: this.$route.params.clinicId,
     isLoading:false,
     locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
     
    };
  },
   watch: {
  selectedMedicine: function (medicine) {
      
     // this.selectedMedicine.quantity = JSON.parse(medicine.quantity);
      this.preChange = this.selectedMedicine;
 
  }
},
  methods: {
    navigateToView(){
        this.$router.push({name:'ClinicAccountView' , params:{clinicId:this.clinicId}});
    },
  
    async getAccount() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/clinic/'+ this.clinicId)
   this.data= response.data.accountInfo[0];
 
    
  } catch (error) {
    console.error(error);
  }
},
    onSubmit(e) {
      var self = this;
      e.preventDefault();
  
      self.$validator.validateAll().then((result) => {
		  if (result) {
  
                self.axios.patch('https://backend.medicodesolution.com/development/clinic/liveInventory/'+ self.data.id, {     
                postChange:JSON.stringify(self.selectedMedicine),
                remarks:this.remarks
                })
                .then(function (response) {
                  console.log(response);
                if(response.status == 200 && response.data.success){
                Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                return self.navigateToView();
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });   
		  }
                  if(!result){
                    self.isLoading = false;
        	          return;
                  }
		});
    },
    async onSearch(search, loading) {
  if(escape(search)=='' || escape(search)==null || escape(search)==undefined){
   return this.medicineInfo;
  }
    loading(true);
    const response = await this.axios.get(`https://backend.medicodesolution.com/development/search/liveInventory/`+ this.clinicId +`/${escape(search)}`);
    this.medicineInfo = response.data.medicineInfo;
   // console.log(this.medicineInfo)
    loading(false);
    },
  },
   mounted(){
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
