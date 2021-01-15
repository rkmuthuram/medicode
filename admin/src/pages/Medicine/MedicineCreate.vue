<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Add New Medicine</li>
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
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="internalbar"
                description=""
              >
                <div slot="label">
               Internal Bar Code
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="internalbar"
                  :class="{ 'form-control': true}"
                  type="text"
                v-model="data.internal_barcode"
                />
               
              </b-form-group>
                  <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="manufacturerbar"
                description=""
              >
                <div slot="label">
              Manufacturer Bar Code
                </div>
                <input
                 
                  name="manufacturerbar"
                  :class="{ 'form-control': true}"
                  type="text"
                v-model="data.manufacturer_barcode"
                />
              
              </b-form-group>
                   <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="packing_qty"
                description=""
              >
                <div slot="label">
                Packing Quantity
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="packing_qty"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('packing_qty')}"
                  type="text"
                v-model="data.packing_quantity"
                />
                <span class="text-danger" v-if="errors.has('packing_qty')">
                  {{ errors.first('packing_qty') }}
                </span>
              </b-form-group>


               <b-form-group
              label="Packing Type"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                    <v-select
                    taggable
                        id="insuranceSelect2"
                        class="mt-xs"
                        v-model="data.packing_type"
                        :options="packingTypes" 
                    />
                 
                </b-col>
              </b-row>
            </b-form-group>     

     <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="product_category"
                description=""
              >
                <div slot="label">
                Product Category
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="product_category"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('product_category')}"
                  type="text"
                v-model="data.product_category"
                />
                <span class="text-danger" v-if="errors.has('product_category')">
                  {{ errors.first('product_category') }}
                </span>
              </b-form-group>
                  <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="product_name"
                description=""
              >
                <div slot="label">
                Product Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="product_name"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('product_name')}"
                  type="text"
                v-model="data.product_name"
                />
                <span class="text-danger" v-if="errors.has('product_name')">
                  {{ errors.first('product_name') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="ingredient"
                description=""
              >
                <div slot="label">
                Ingredient
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="ingredient"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('ingredient')}"
                  type="text"
                v-model="data.ingredient"
                />
                <span class="text-danger" v-if="errors.has('ingredient')">
                  {{ errors.first('ingredient') }}
                </span>
              </b-form-group>
                       
               <b-form-group
              label="Manufacturer"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                    <v-select
                    taggable
                        id="insuranceSelect2"
                        class="mt-xs"
                        v-model="data.manufacturer"
                        :options="manufacturerTypes" 
                    />
                 
                </b-col>
              </b-row>
            </b-form-group>     
                  <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="company_name"
                description=""
              >
                <div slot="label">
              Distributor
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:3'"
                  name="company_name"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('company_name')}"
                  type="text"
                v-model="data.company_name"
                />
                <span class="text-danger" v-if="errors.has('company_name')">
                  {{ errors.first('company_name') }}
                </span>
              </b-form-group>
         
                   <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="color"
                description=""
              >
                <div slot="label">
            Color
                </div>
                <input
                
                  name="color"
                  :class="{ 'form-control': true}"
                  type="text"
                v-model="data.color"
                />
               
              </b-form-group>
         

         



            </fieldset>
            <div class="form-action">
             
              <b-button type="button" variant="default" class="btn-rounded" @click="navigateToView()" >
               Back
              </b-button>
              <b-button type="submit" variant="danger" class="btn-rounded float-right" v-if="isLoading==false">
              Submit
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
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
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
  components: { Widget,vSelect,vueDropzone: vue2Dropzone },
  data() {
    return {
      packingTypes:[],
      manufacturerTypes:[],
        data:{
         company_name:'',
         product_category:'',
         manufacturer:'',
         product_name:'',
         ingredient:'',
         color:'',
         packing_type:'',
         packing_quantity:'',
         manufacturer_barcode:'',
         internal_barcode:''
      },
     isLoading:false,
     locationClasses: 'messenger-fixed messenger-on-top messenger-on-right'
    };
  },
  methods: {
    navigateToView(){
        this.$router.push({name:'MedicineListing' });
    },
    async getPackingTypes() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/packingTypes')
   this.packingTypes = response.data.packingTypes;
   console.log(this.packingTypes);
 
  } catch (error) {
    console.error(error);
  }
},
 async getManufacturerTypes() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/manufacturerTypes')
   var list = response.data.manufacturerTypes;
    this.manufacturerTypes = ['Favorex (Switzerland) / Thailand','Duopharma / Malaysia','Sanofi Aventis / France','Prime / Malaysia','Beaufour-Ipsen / France','Abbott / USA','DHA / Singapore','Pharmaniaga / Malaysia','Atlantic / Thailand','Arab Pharma / Jordan','Sanofi Aventis / UK','Aspen / Sweden','Glenmark / India','Galenium / Indonesia','GlaxoSmithKline / Philippines','Leo / Denmark','Hoe / Malaysia','GluStitch / Canada','Takeda / Germany','Novartis / Switzerland','Abbott / Australia','Pahang Pharmacy / Malaysia','Aspen / Holland','Pfizer / Belgium','LBS / Thailand','Bayer / Mexico','KRKA / Slovenia','Shin Poong / Korea','MSD / Belgium','LBS /  Thailand','Sandoz / Austria','Roche / Switzerland','Novartis / Italy','Serum Institute / India','Sanofi Pasteur / France','Japan BCG Lab / Japan','GlaxoSmithKline / Belgium','MSD / USA','Sanofi Pasteur / Korea','Abbott / Holland','GlaxoSmithKline / Italy','Pfizer / USA','Pfizer / Australia','Aspen / Australia','Aspen / France','Boehringer Ingelheim / Canada','Boehringer Ingelheim / Germany','GlaxoSmithKline / UK','AstraZeneca / Sweden','Cipla / India','GlaxoSmithKline / France','GlaxoSmithKline / Spain','GlaxoSmithKline / Australia','Abbott / Pakistan','Johnson & Johnson / Sweden','Roche / Germany','Roche / USA','Intercare / Korea','Johnson & Johnson / USA','Acro / USA','Allen Healthcare Products / Malaysi','Pahang Pharmacy / China','Becton Dickinson / USA','Intercare / Malaysia','Schmidt / China','Intercare / China','Xepa / Malaysia','Reckitt Benckiser / UK','Janssen / Belgium','Kotra / Malaysia','Sunward / Malaysia','iNova/India','iNova/Italy','iNova/Australia','Rowa / Ireland','DDD / UK','Reckitt Benckiser / Thailand','Biosis / Malaysia','MPI / Malaysia','CCM/DUOPHARMA/Malaysia','Prime/Malaysia','Hovid / Malaysia','Pfizer / UK','Menarini / Thailand','Torrent / India','Abbott / Malaysia','Sanofi Aventis / Italy','CCM/DUOPHARMA / Malaysia','Intas /  India','Eisai / Japan','Ranbaxy / Malaysia','Apotex / Canada','GlaxoSmithKline / China','Abbott / France','Abbott / Japan','DHA / Indonesia','Mayoly Spindler / France','Janssen / France','Sunward / Singapore','Sanofi Aventis / Germany','Meda / Germany','Kabi / Austria','Remedica/Cyprus','Biosis/Malaysia','Merck / Germany','Novo Nordisk / Denmark','Servier / France','Astra Zeneca / USA','Alphapharm / Australia','Actavis / Greece','Bayer / Germany','Merck / France','Merck  / France','MSD / Italy','Unam / Philippines','Pharmaton / Switzerland','Procter & Gamble / Austria','Pharmaton / Germany','Sanofi Aventis / Thailand','Pfizer / China','Novartis / UK','null','Abbott / Indonesia','Procter & Gamble / Indonesia','Reckitt Benkinser / UK','Actavis / Malta','Sandoz / India','Sanofi Aventis / Spain','Daiichi / Japan','Actavis / UK','Topridge / China','Aspen / Germany','SM Pharma / Malaysia','Janssen / Italy','Himalaya / India','Sanofi Aventis / Canada','AstraZeneca / Philippines','Roche / Italy','AstraZeneca / China','Menarini / UK','AstraZeneca / UK','Intas / India','Sandoz / Slovenia','Tanabe / Japan','Tanabe / Indonesia','Medochemie / Cyprus','Menarini / Sweden','Servier / Ireland','MSD / UK','MSD / Korea','Novartis / Spain','Sandoz / Iceland','Xepa  / Malaysia','Xepa /  Malaysia','SanofiAventis / Turkey','Boehringer Ingelheim / India','Sanofi Aventis/Czechoslavakia','AstraZeneca / USA','Pfizer / Ireland','Sanofi Aventis / Czechoslavakia','MSD / Singapore','GlaxoSmithKline / Switzerland','Rohto-Mentholatum / Australia','MSD / Canada','GlaxoSmithKline / Philipines','Galderma / USA','Reckitt Benckiser / Singapore','Sanofi Aventis / Vietnam','GlaxoSmithKline / Poland','Tena / Holland','Merz / Germany','Smith & Nephew / UK','Menarini / Switzerland','GlaxoSmithKline / Ireland','Almirall / Germany','Pfizer / Canada','Lilly / USA','GlaxoSmithKline / Germany','MSD / Australia','Shire / Italy','MSD / Holland','Bayer  / Germany','Gedeon Richter / Hungary','Remedica / Cyprus','Bayer / France','Pfizer / Italy','Bayer / Brazil','MSD / Ireland','Actavis / Singapore','Sandoz / Romania','Sandoz / Bangladesh','Ranbaxy/India','Pfizer / France','Abbott / UK','CCM/DUOPHARMA Duopharma / Malaysia','Hovid / Turkey','Pfizer / Japan','Unichem / India','Ain Medicare / Malaysia','B.Braun / Malaysia','Novartis / Turkey','Pfizer/ USA','Sandoz / Germany','Atnahs / Spain','Atnahs/Spain','Mylan / Ireland','Rohto-Mentholatum / China','Macro Phar / Thailand','Menarini / Italy','Actavis / Indonesia','iNova / India','Takeda / Thailand','Takeda / Spain','MSD / Spain','Walter Ritter / Germany','Medochemie/Cyprus','Cadila / India','Janssen / Korea','Pfizer / Germany','Zim Lab / India','GlaxoSmithKline / Malaysia','Boehringer Ingelheim/Italy','Boehringer Ingelheim/UK','Boehringer Ingelheim / UK','Sandoz / Turkey','AstraZeneca / Australia','Bayer / Belgium','Bayer/ Belgium','Sanofi Aventis / USA','Sanofi Aventis / Brazil','Mylan / Portugal','Bayer / Indonesia','Procter & Gamble / Germany','Alcon / Belgium','Alcon Cusi / Spain','Alcon / France','SMPharma / Malaysia','OM / Switzerland','Ursapharm / Germany','Pfizer / Indonesia','Madras Pharma / India','Prime / China','3M / USA','Urgo / France','Supermax / Malaysia','B.Braun / Vietnam','Terumo / China','Becton Dickinson / Singapore','Novo Nordisk / Japan','Terumo / Phillipines','Terumo / Korea','Terumo / Sweden','Banta / USA','Pal / UK','Sunbelt USA','B.Braun / Germany','Sunbelt / USA','YSP'];
 
  } catch (error) {
    console.error(error);
  }
},
    onSubmit(e) {
       var self = this;
       
      e.preventDefault();
   
      self.$validator.validateAll().then((result) => {
		  if (result) {
      console.log(self.data)
                self.axios.post('https://backend.medicodesolution.com/development/medicine/', {
              
    company_name: self.data.company_name,
         product_category:self.data.product_category,
         manufacturer:self.data.manufacturer,
         product_name:self.data.product_name,
         ingredient:self.data.ingredient,
         color:self.data.color,
         packing_type:self.data.packing_type,
         packing_quantity:self.data.packing_quantity,
         manufacturer_barcode:self.data.manufacturer_barcode,
         internal_barcode:self.data.internal_barcode,
        //  internal_qrcode:self.data.internal_qrcode

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
  },
   mounted(){
     this.getPackingTypes();
     this.getManufacturerTypes();
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
