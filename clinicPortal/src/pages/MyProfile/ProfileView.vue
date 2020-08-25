<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Profile Settings - {{data.username}} </li>
    </ol>


    <b-row>

      <b-col lg='8' xs='12'>
        <Widget
          customHeader 
        >
          <b-form>
            <fieldset>
   <legend> Information </legend>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
              >
                <div slot="label">
                  Profile ID
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.id"
                 disabled 
                />
              </b-form-group>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                  Name 
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.username"
                 disabled 
                />
              </b-form-group>
                <b-form-group
                horizontal
                label="E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="email"
                
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                  type="text"
                 v-model="data.email"
                  disabled 
                />
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                description=""
              >
                <div slot="label">
                  Telephone Number
                </div>
                <input
                 disabled 
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.tel_no"
                />
              </b-form-group>  
              
                        
            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                description=""
              >
                <div slot="label">
                  Registration Date
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.create_time"
                disabled 
                />
              </b-form-group>
<b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="last_updated"
                description=""
              >
                <div slot="label">
                  Last Updated
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.update_time"
                disabled 
                />
              </b-form-group>                         
            </fieldset>
            <div class="form-action">
             
             
            </div>
          </b-form>
        </Widget>
     

        
          <Widget
          customHeader 
        >
    
            <fieldset>
   <legend>Account Recovery </legend>
     <b-badge variant="success" v-if="data.status==1">STATUS : ACTIVE ACCOUNT</b-badge><b-badge variant="warning" v-if="data.status==0">STATUS : EMAIL NOT VERIFIED</b-badge><b-badge variant="danger" v-if="data.status==-1">STATUS : ACCOUNT SUSPENDED</b-badge> <br>
                                
            </fieldset>
              <b-form @submit="resetPassword"    v-if="position=='SuperAdmin'">
            <fieldset>
          <b-form-group
                horizontal
                label="Old Password"
                :label-cols="3"
                label-breakpoint="md"
                label-for="password"
                description="Enter Current Password"
          
              >
                <input
                  v-validate="'required|min:6'"
                  name="password"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('password')}"
                  type="password"
                  id="password"
                  ref="password"
                   v-model="oldPassword"
                />
                <span class="text-danger" v-if="errors.has('password')">
                  {{ errors.first('password') }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="New Password"
                :label-cols="3"
                label-breakpoint="md"
                label-for="password"
                description="Enter New Password"
          
              >
                <input
                  v-validate="'required|min:6'"
                  name="password"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('password')}"
                  type="password"
                  id="password"
                  ref="password"
                   v-model="password"
                />
                <span class="text-danger" v-if="errors.has('password')">
                  {{ errors.first('password') }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="password_repeat"
                 description="Confirm New Password "
              >
                <input
                  v-validate="'required|min:6|confirmed:password'"
                  name="password_repeat"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('password_repeat')}"
                  type="password"
                  id="password_repeat"
                />
                <span class="text-danger" v-if="errors.has('password_repeat')">
                  {{errors.first('password_repeat')}}
                </span>
              </b-form-group>
             

            </fieldset>
            <div class="form-action">
              <b-button type="submit" variant="danger" class="btn-rounded float-right" v-if="isLoading==false">
              Change Password
              </b-button>
            
            </div>
          </b-form>
         
         
        </Widget>


         
          <Widget
          customHeader 
        >
    
            <fieldset>
   <legend>Core Settings</legend>
    <br>
                                
            </fieldset>
              <b-form>
            <fieldset>
         <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="settings_whatsapp"
                description=""
              >
                <div slot="label">
                  Whatsapp Contact
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="settings_whatsapp"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('settings_whatsapp')}"
                  type="text"
               v-model="settingsdata.whatsapp"
               
                />
              </b-form-group>    
            </fieldset>
            <div class="form-action">
              <b-button  variant="danger" class="btn-rounded float-right" @click="changeSettings" v-if="isLoading==false">
              Change Whatsapp Number
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
  components: { Widget },
  data() {
    return {
      data:{},
      settingsdata:{},
      workforceId:window.localStorage.getItem('workforceId'),
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
          password:'',
         oldPassword:'',
             position: window.localStorage.getItem("workforcePosition"),
    };
  },
  methods: {
     resetPassword(e) {
     var self = this;
       self.isLoading = true;
      e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
     
                self.axios.patch('https://backend.medicodesolution.com/staging/workforce/personal/reset-password/'+this.data.token+'/'+this.data.email, {
                 newPassword:self.password,
                 oldPassword:self.oldPassword,
                 workforceId:self.workforceId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                   self.isLoading = false;
                  self.completed=true;
                return Messenger().post(response.data.success);
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error});                
                });   
		  }
                  if(!result){
                    self.isLoading = false;
        	          return;
                  }
		});
    },
    forgotPassword(){
       var self = this;
       self.isLoading = true;
      self.axios.post('https://backend.medicodesolution.com/staging/members/forgot-password/'+this.data.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              
               return Messenger().post(response.data.success);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error});                
                });   
    },
    activationEmail(){
      var self = this;
       self.isLoading = true;
      self.axios.post('https://backend.medicodesolution.com/staging/members/activation-email/'+this.data.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              
               return Messenger().post(response.data.success);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error});                
                });
    },
    navigateToUpdate(){
        this.$router.push({name:'AccountUpdate'});
    },
    activateAccount(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/members/status/'+this.workforceId, {
                   status:1
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getUser();
               return Messenger().post(response.data.success);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error});                
                });   
		  }
                  if(!result){
                    self.isLoading = false;
        	          return;
                  }
		});
    },
    suspendAccount(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/members/status/'+this.workforceId, {
                   status:-1
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getUser();
               return Messenger().post(response.data.success);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error});                
                });   
		  }
                  if(!result){
                    self.isLoading = false;
        	          return;
                  }
		});
    },  
        changeSettings(){
         var self = this;
       self.isLoading = true;
    
                self.axios.patch('https://backend.medicodesolution.com/staging/coresettings/1', {
                   whatsapp:self.settingsdata.whatsapp
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getCoreSettings();
               return Messenger().post(response.data.success);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error});                
                });   
	
	
    },    
    async getUser() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/workforce/'+ this.workforceId)
   this.data = response.data.workforceInfo[0];
 
  } catch (error) {
    console.error(error);
  }
},
   async getCoreSettings() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/coresettings')
   this.settingsdata = response.data.settingsInfo[0];
 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
     this.getUser();
     this.getCoreSettings();
  
      
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
