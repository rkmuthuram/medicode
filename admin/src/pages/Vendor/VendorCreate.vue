<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Create New Vendor</li>
    </ol>


    <b-row>

      <b-col lg='8' xs='12'>
        <Widget
          title="<h5>        
            <small> Fill up & click Submit</small>
          </h5>"
          customHeader 
        >
          <b-form @submit="onSubmit">
            <fieldset>
              <br>
              <legend>
              1. Core Information
              </legend>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="accountname"
                description=""
              >
                <div slot="label">
                 Company Name
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
              <legend>
             2. Contact Information
              </legend>
               
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
 <input
       
         @change="copyPIC"
          v-model="data2.copyPIC"
          type="checkbox"
          id="aform"
        />
        <label for="aform"> Same as PIC</label>
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
        <br>


 <input
       
         @change="copyAddress"
          v-model="data2.copyAddress"
          type="checkbox"
          id="aform2"
        />
        <label for="aform2"> Same as Main Address</label>
         <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="address_street2"
             
              >
                <div slot="label">
              Street Address (Alternative)
                </div>
              <textarea-autosize
                                  v-model="data.address_street2"
                                placeholder=""
                                :min-height="35"
                                  v-validate="'required|min:4'"
                             :class="{ 'form-control': true}"
                                id="street_address2"
                                name="street_address2"
                                />
             
              </b-form-group>

              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="add"
               
              >
                <div slot="label">
               City/Town (Alternative)
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'"
                  name="city_address2"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('city_address2')}"
                  type="text"
               v-model="data.address_city2"
                />
                <span class="text-danger" v-if="errors.has('city_address2')">
                  {{ errors.first('city_address2') }}
                </span>
              </b-form-group>    

         <b-form-group
              label="State (Alternative)"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                    
                    class="mt-xs"
                    v-model="data.address_state2"
                    :options="['Johor','Kedah','Kelantan','Kuala Lumpur','Labuan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Putrajaya','Sabah','Sarawak','Selangor','Terengganu']"
                  />
                </b-col>
              </b-row>
            </b-form-group>      
 
            </fieldset>
            <div class="form-action">
              <b-button type="submit" variant="danger" class="btn-rounded float-right" v-if="isLoading==false">
                Submit
              </b-button>
              <b-button type="button" variant="default" class="btn-rounded" @click="navigateToList()" >
                Cancel
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
      data2:{
        copyPIC:false,
        copyAddress:false
      },
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
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      isLoading:false,
    };
  },
  methods: {
    copyAddress(){
      if(this.data2.copyAddress!=''){
        this.data.address_street2 = this.data.address_street;
        this.data.address_city2= this.data.address_city;
        this.data.address_state2 = this.data.address_state;
      }
      else {
          this.data.address_street2 = '';
        this.data.address_city2= '';
        this.data.address_state2 = '';
      }
    },
    copyPIC(){
   if(this.data2.copyPIC!=''){
        this.data.billing_name = this.data.pic_name;
        this.data.billing_email= this.data.pic_email;
        this.data.billing_tel_no = this.data.pic_tel_no;
      }
      else {
             this.data.billing_name = '';
        this.data.billing_email= '';
        this.data.billing_tel_no = '';
      }
    },
    navigateToList(){
        this.$router.push({name:'VendorListingPublic'});
    },

    onSubmit(e) {
       var self = this;
       self.isLoading = true;
      e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.enigmedsvcs.com/development/vendor', {
                
        name:self.data.name,
        pic_name:self.data.pic_name,
        pic_email:self.data.pic_email,
        pic_tel_no:self.data.pic_tel_no,
        billing_name:self.data.billing_name,
        billing_email:self.data.billing_email,
        billing_tel_no:self.data.billing_tel_no,
        address_street:self.data.address_street,
        address_city:self.data.address_city,
        address_state:self.data.address_state,
         address_street2:self.data.address_street2,
        address_city2:self.data.address_city2,
        address_state2:self.data.address_state2,
        submittedId:'ADMIN'
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                return self.navigateToList();
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
