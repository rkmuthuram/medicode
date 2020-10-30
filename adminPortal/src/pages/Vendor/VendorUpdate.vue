<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Update Account - {{data.name}}</li>
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
                label-for="accountname"
                description=""
              >
                <div slot="label">
                 Account Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="accountname"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('accountname')}"
                  type="text"
                v-model="data.name"
                />
                <span class="text-danger" v-if="errors.has('accountname')">
                  {{ errors.first('accountname') }}
                </span>
              </b-form-group>
                    

       
               
               <br>
                       <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="picname"
                description=""
              >
                <div slot="label">
                 PIC Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="picname"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('picname')}"
                  type="text"
                v-model="data.pic_name"
                />
                <span class="text-danger" v-if="errors.has('picname')">
                  {{ errors.first('picname') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                label="PIC E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="picemail"
              >
                <input
                  v-validate="'required|email'"
                  name="picemail"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('picemail')}"
                  type="text"
                 v-model="data.pic_email"
                />
                <span class="text-danger" v-if="errors.has('picemail')">
                  {{ errors.first('picemail') }}
                </span>
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="pictel_no"
                description="If overseas include call code"
              >
                <div slot="label">
                PIC Telephone Number
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="pictel_no"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('pictel_no')}"
                  type="text"
               v-model="data.pic_tel_no"
                />
                <span class="text-danger" v-if="errors.has('pictel_no')">
                  {{ errors.first('pictel_no') }}
                </span>
              </b-form-group>

                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="billingname"
                description=""
              >
                <div slot="label">
                Billing Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="billingname"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('billingname')}"
                  type="text"
                v-model="data.billing_name"
                />
                <span class="text-danger" v-if="errors.has('billingname')">
                  {{ errors.first('billingname') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                label="Billing E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="billingemail"
              >
                <input
                  v-validate="'required|email'"
                  name="billingemail"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('billingemail')}"
                  type="text"
                 v-model="data.billing_email"
                />
                <span class="text-danger" v-if="errors.has('billingemail')">
                  {{ errors.first('billingemail') }}
                </span>
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="billingtel_no"
                description="If overseas include call code"
              >
                <div slot="label">
               Billing Telephone Number
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="billingtel_no"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('billingtel_no')}"
                  type="text"
               v-model="data.billing_tel_no"
                />
                <span class="text-danger" v-if="errors.has('billingtel_no')">
                  {{ errors.first('billingtel_no') }}
                </span>
              </b-form-group>

      <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="address_street"
             
              >
                <div slot="label">
              Street Address
                </div>
              <textarea-autosize
                                  v-model="data.address_street"
                                placeholder=""
                                :min-height="35"
                                  v-validate="'required|min:4'"
                             :class="{ 'form-control': true}"
                                id="street_address"
                                name="street_address"
                                />
             
              </b-form-group>

              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="add"
               
              >
                <div slot="label">
               City/Town
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'"
                  name="city_address"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('city_address')}"
                  type="text"
               v-model="data.address_city"
                />
                <span class="text-danger" v-if="errors.has('city_address')">
                  {{ errors.first('city_address') }}
                </span>
              </b-form-group>    

         <b-form-group
              label="State"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                    
                    class="mt-xs"
                    v-model="data.address_state"
                    :options="['Johor','Kedah','Kelantan','Kuala Lumpur','Labuan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Putrajaya','Sabah','Sarawak','Selangor','Terengganu']"
                  />
                </b-col>
              </b-row>
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
        data:{
        name:'',
        pic_name:'',
        pic_email:'',
        pic_tel_no:'',
        billing_name:'',
        billing_email:'',
        billing_tel_no:'',
        address_street:'',
        address_city:'',
        address_state:'',
         address_street2:'',
        address_city2:'',
        address_state2:'',
      },
      vendorId: this.$route.params.vendorId,
     isLoading:false,
     locationClasses: 'messenger-fixed messenger-on-top messenger-on-right'
    };
  },
  methods: {
    navigateToView(){
        this.$router.push({name:'VendorListingPublic' });
    },
    async getAccount() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/vendor/'+ this.vendorId)
   this.data= response.data.vendorInfo[0];
    
  } catch (error) {
    console.error(error);
  }
},
    onSubmit(e) {
       var self = this;
       
      e.preventDefault();
    
      self.$validator.validateAll().then((result) => {
		  if (result) {
     
                self.axios.patch('https://backend.medicodesolution.com/development/vendor/'+ self.data.id, {
              
        name:self.data.name,
        ref_id:self.data.ref_id,
        pic_name:self.data.pic_name,
        pic_email:self.data.pic_email,
        pic_tel_no:self.data.pic_tel_no,
        billing_name:self.data.billing_name,
        billing_email:self.data.billing_email,
        billing_tel_no:self.data.billing_tel_no,
        address_street:self.data.address_street,
        address_city:self.data.address_city,
        address_state:self.data.address_state,
        submittedId:'ADMIN'

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
