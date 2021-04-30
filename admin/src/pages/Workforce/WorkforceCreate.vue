<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Create New Staff</li>
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
              <legend>
               
              </legend>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
                description="Full / Nick name of staff"
              >
                <div slot="label">
                  Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="username"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('username')}"
                  type="text"
                v-model="data.username"
                />
                <span class="text-danger" v-if="errors.has('username')">
                  {{ errors.first('username') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                label="E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="email"
                description="Primary login / Must be unique for every staff"
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                  type="text"
                 v-model="data.email"
                />
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </span>
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                description="Contact number / If overseas include call code"
              >
                <div slot="label">
                  Telephone Number
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="tel_no"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('tel_no')}"
                  type="text"
               v-model="data.tel_no"
                />
                <span class="text-danger" v-if="errors.has('tel_no')">
                  {{ errors.first('tel_no') }}
                </span>
              </b-form-group>
      <b-form-group
              label="Position"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                    
                    class="mt-xs"
                    v-model="data.position"
                    :options="['SuperAdmin', 'Account Admin','Branch Admin','Front Desk Staff']"
                  />
                </b-col>
              </b-row>
            </b-form-group>
              <b-form-group
              label="Additional Access"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                    multiple
                    class="mt-xs"
                    v-model="data.access"
                    :options="['Staffs Management','Clinic Management']"
                  />
                </b-col>
              </b-row>
            </b-form-group>

             <b-form-group
              label="Account"
              label-for="default-select"
              :label-cols="3"
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    
                    class="mt-xs"
                    v-model="data.center"
                    :options="['Mediviron','Pantai','Alam Medic']"
               
                  />
                </b-col>
              </b-row>
            </b-form-group>
           <b-form-group
                horizontal
                label="Password"
                :label-cols="3"
                label-breakpoint="md"
                label-for="password"
                description="Dummy password auto-generated, send password reset link after creation"
              >
                <input
                  v-validate="'required|min:6'"
                  name="password"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('password')}"
                  type="password"
                  id="password"
                  v-model="data.password"
                  ref="password"
                />
                <span class="text-danger" v-if="errors.has('password')">
                  {{ errors.first('password') }}
                </span>
              </b-form-group>
       
               
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="image"
                description="1 image only"
              >
                <div slot="label">
                 Profile Image
                </div>
              <vue-dropzone ref="myVueDropzone2" id="dropzone2" :options="dropzoneOptions2" v-on:vdropzone-success="successEvent2"></vue-dropzone>
       
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
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
      data:{
        username:'',
        email:'',
        tel_no:'',
        password:'123456',
        position:'',
        center:'',
        photoUrl:''
      },
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      isLoading:false,
       dropzoneOptions2: {
          url: 'https://backend.enigmedsvcs.com/development/workforce/photo/upload',
          thumbnailWidth: 150,
          maxFilesize: 5.0,
          maxFiles: 1,
          addRemoveLinks: true,
          acceptedFiles:'image/*'
          //autoProcessQueue: false
          
      },
    };
  },
  methods: {
    navigateToList(){
        this.$router.push({name:'WorkforceListing'});
    },
           successEvent2 (file) {
        this.data.photoUrl =file.xhr.response;
      
      },
    onSubmit(e) {
       var self = this;
       self.isLoading = true;
      e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.enigmedsvcs.com/development/workforce', {
                    username: self.data.username,
                    email:self.data.email,
                    tel_no: self.data.tel_no,
                    password:self.data.password,
                    position:self.data.position,
                    center:self.data.center,
                     photoUrl:self.data.photoUrl,
                     access:self.data.access
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
