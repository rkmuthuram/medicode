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
              <div class="mb-lg">
            <h3 class="text-success mb-0">Available Stock : {{selectedMedicine.quantity}} units</h3>
          </div>
            <div v-if="selectedMedicine.packing_type=='TABLETS'" :key="componentKey">

     <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                   
                  <tr>
                  
                  <td>       <b-form-group
              label="Strips"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
            <input type="number" v-model="selectedMedicine.quantity.strips" >
           
            <!--  <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent" type="number"  v-model="selectedMedicine.quantity_strips"></b-form-input>
    </b-input-group> -->
            </b-form-group></td>
                   <td>       <b-form-group
              label="Tablets"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
                <input type="number" v-model="selectedMedicine.quantity.tablets" >
          <!--    <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent" type="number"    v-model="selectedMedicine.quantity_tablets"></b-form-input>
              </b-input-group> -->
            </b-form-group></td>
                                              
            </tr>
              
                    
                
              </tbody>
            </table> 
                 
  
                </div>
                  <div v-if=" selectedMedicine.packing_type=='Per vial' || selectedMedicine.packing_type=='per vial'" :key="componentKey">
 <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
         
            
                <td> <b-form-group
              label="Vial"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
                <input type="number" v-model="selectedMedicine.quantity.vials" >
            <!--
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_vials"></b-form-input>
              </b-input-group>-->
            </b-form-group>  </td>  
                                      
            </tr>
                         <tr>
                 
            
              <td> <b-form-group
              label="BY ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
            
        <input type="number" v-model="selectedMedicine.quantity.mls" >
            </b-form-group>  </td>     
                   
          <!--  <td> <b-form-group
              label="ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="per dose">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_mlperdose"></b-form-input>
              </b-input-group>
            </b-form-group> </td>      -->  
         <!--   <td> <b-form-group
              label="Doses"
              label-for="append-field6"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field6" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
           <div v-if="selectedMedicine.packing_type=='Vial / per cc' || selectedMedicine.packing_type=='Vial / per 0.5 cc' || selectedMedicine.packing_type=='vial per cc'" :key="componentKey">
<table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                     <tr>
              
               
              <td> <b-form-group
              label="Vial"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
             <input type="number" v-model="selectedMedicine.quantity.vials" >
            </b-form-group> </td>  
                                      
            </tr>
                         <tr>
                 
            
              <td> <b-form-group
              label="BY ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <input type="number" v-model="selectedMedicine.quantity.mls" >
            </b-form-group> </td>     
                   
          <!--  <td> <b-form-group
              label="ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="per dose">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_mlperdose"></b-form-input>
              </b-input-group>
            </b-form-group> </td>      -->  
         <!--   <td> <b-form-group
              label="Doses"
              label-for="append-field6"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field6" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
  
                </div>
      <div v-if="selectedMedicine.packing_type=='per ampule'" :key="componentKey">
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
             
             
                       <td> <b-form-group
              label="Ampules"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
            <input type="number" v-model="selectedMedicine.quantity.ampules" >
       
            </b-form-group> </td>      
                          
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
                        <div v-if="selectedMedicine.packing_type=='BOTTLE'" :key="componentKey">
       <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
             <!--    <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number" @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Bottles"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_bottleperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td> -->  </tr><tr> 
                       <td> <b-form-group
              label="Bottles"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
              
            >
            <input type="number" v-model="selectedMedicine.quantity.bottles" >
             <!-- <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_bottles"></b-form-input>
              </b-input-group> -->
            </b-form-group> </td>    
                    
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="selectedMedicine.quantity.unitperbottle" 
                      disabled/>
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
         <input type="number" v-model="selectedMedicine.quantity.unittotal" >
           <!--   <b-input-group class="input-group-transparent" id="append-field3" append="per tube">
                <b-form-input class="input-transparent"  type="number" @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_perbottle" ></b-form-input>
              </b-input-group> -->
            </b-form-group> </td>                      
            </tr>               
              </tbody>
            </table> 
                   
  
                </div>

                 <div v-if="selectedMedicine.packing_type=='TUBE'" :key="componentKey">
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
              
             <tr> 
                       <td> <b-form-group
              label="Tubes"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <input type="number" v-model="selectedMedicine.quantity.tubes" >  </b-form-group> </td>    
                  
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="selectedMedicine.quantity.unitpertube" 
                      disabled/>
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="per tube">
                <b-form-input class="input-transparent"  type="number" @change="getTubeValue(index)"  v-model="selectedMedicine.quantity_pertube" ></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
            <tr>
                <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="selectedMedicine.quantity_unitperbottle" 
                      disabled/>
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
               <input type="number" v-model="selectedMedicine.quantity.unittotal" >
           <!--   <b-input-group class="input-group-transparent" id="append-field3" append="per tube">
                <b-form-input class="input-transparent"  type="number" @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_perbottle" ></b-form-input>
              </b-input-group> -->
            </b-form-group> </td>    
              </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>

                  <div v-if="selectedMedicine.packing_type=='Per supp' || selectedMedicine.packing_type=='SACHET' || selectedMedicine.packing_type=='Sachet' || selectedMedicine.packing_type=='box' || selectedMedicine.packing_type=='Set' || selectedMedicine.packing_type=='ROLLS' || selectedMedicine.packing_type=='PIECES' || selectedMedicine.packing_type=='pack' || selectedMedicine.packing_type=='Diskus' "  :key="componentKey">
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                 
                 
                       <td> <b-form-group
              label="Units"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
             <input type="number" v-model="selectedMedicine.quantity.units" >
          <!--    <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"   @change="getWholeValue(index)"  v-model="selectedMedicine.quantity_units"></b-form-input>
              </b-input-group> -->
            </b-form-group> </td>      
                            
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div> 
          
          
      
       

                        
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
      
      this.selectedMedicine.quantity = JSON.parse(medicine.quantity);
      this.preChange = this.selectedMedicine;
 
  }
},
  methods: {
    navigateToView(){
        this.$router.push({name:'ClinicAccountView' , params:{clinicId:this.clinicId}});
    },
  
    async getAccount() {
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/clinic/'+ this.clinicId)
   this.data= response.data.accountInfo[0];
 
    
  } catch (error) {
    console.error(error);
  }
},
    onSubmit(e) {
       var self = this;
       e.preventDefault();
       self.postChange = self.selectedMedicine;
      
      self.$validator.validateAll().then((result) => {
		  if (result) {
     
                self.axios.patch('https://backend.enigmedsvcs.com/development/clinic/liveInventory/'+ self.data.id, {
             
                postChange:JSON.stringify(self.postChange),
        
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
    const response = await this.axios.get(`https://backend.enigmedsvcs.com/development/search/liveInventory/`+ this.clinicId +`/${escape(search)}`);
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
