<template>
  <div class="login-page">
    <b-container>
      <Widget class="mx-auto" title="<h3 class='mt-0 fw-normal text-center'>Login to KKA Portal</h3>" customHeader>
       <p class="text-center login-info mb-0 mt">
     <!--      Use Facebook, Twitter or your email to sign in.  -->
        </p>  
        <p class="text-center login-info">
          <a :href="whatsappLink" target="_blank">Trouble logging in? Click to Contact Admin through Whatsapp.</a>
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <b-form-group label="Email" label-for="username-input">
            <b-input-group class="input-group-transparent">
              <b-input-group-text slot="prepend"><i class="fa fa-user text-white"></i></b-input-group-text>
              <b-form-input id="username-input"
                            class="input-transparent pl-0"
                            type="text"
                            v-model="form.email"
                            required
                            placeholder="Your Email" />
            </b-input-group>
          </b-form-group>
          <b-form-group label="Password" label-for="password-input">
            <b-input-group class="input-group-transparent">
              <b-input-group-text slot="prepend"><i class="fa fa-lock text-white"></i></b-input-group-text>
              <b-form-input id="password-input"
                            class="input-transparent pl-0"
                            type="password"
                            v-model="form.password"
                            required
                            placeholder="Your Password" />
            </b-input-group>
          </b-form-group>
          <div class="widget-middle-overflow bg-widget mt-4 px-4 py-3">
            <b-button class="btn-block btn-lg fs-normal" type="submit" variant="danger" v-if="isLoading==false">
              <span class="login-circle"><i class="fa fa-caret-right"></i></span>
              Sign in
            </b-button>
            <a href="#" class="text-center text-gray w-100 d-block mt-4" @click="forgotPassword"  v-if="isLoading==false">Forgot Password?</a>
          </div>
          <div class="widget-bottom-overflow">
         <!--   <b-button class="btn-block btn-lg fs-normal" type="cancel" variant="primary">
              <i class="fa fa-facebook-square mr-2 fa-lg"></i>
              Login with Facebook
            </b-button> -->
          </div>
        </form>
      </Widget>
    </b-container>
    <footer class="footer">
         KKA Clinic Portal - Powered by <a href="https://www.sunrisers.com.my/" target="_blank">Sunrisers TS</a>
    </footer>
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
  name: 'LoginPage',
  components: { Widget },
  
  data() {
   
    return {
      errorMessage: null,
      form: {
        email: '',
        password: '',
      },
      whatsappLink:'',
      settingsdata:{},
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
    mounted(){
     this.getCoreSettings();      
   },
  methods: {
    
   async getCoreSettings() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/coresettings')
   this.settingsdata = response.data.settingsInfo[0];
   this.whatsappLink =  'https://api.whatsapp.com/send?phone='+ this.settingsdata.whatsapp +'&text=Hello';
  } catch (error) {
    console.error(error);
  }
},
    login() {
      const email = this.form.email;
      const password = this.form.password;

      if (email.length !== 0 && password.length !== 0) {
       var self = this;
       self.isLoading = true;
     // e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.medicodesolution.com/staging/workforce/login', {
                    email:self.form.email,
                    password:self.form.password
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
           //     console.log('token:'+response.data.token + '| staffInfo ' + response.data.staffInfo)
                Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                window.localStorage.setItem('authenticated', true);
                window.localStorage.setItem('workforceUsername', response.data.staffInfo.username);
                window.localStorage.setItem('workforcePosition', response.data.staffInfo.position);
                window.localStorage.setItem('workforceId', response.data.staffInfo.id);
                window.localStorage.setItem('workforceCenter', response.data.staffInfo.center);
                if( response.data.staffInfo.photoUrl!= null &&  response.data.staffInfo.photoUrl!=''){
               window.localStorage.setItem('workforcePhotoUrl', response.data.staffInfo.photoUrl);
                }
                     if( response.data.staffInfo.access!= null &&  response.data.staffInfo.access!=''){
               window.localStorage.setItem('workforceAccess', response.data.staffInfo.access);
                }
               
                return self.$router.push('/app/dashboard');
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


      }
    },
      forgotPassword() {
      const email = this.form.email;
      if (email.length == 0 ) {
         return Messenger().post({ type:'error',message :'Fill up email field to request Reset Password link.'});
      }

     else if (email.length !== 0 ) {
    var self = this;
       self.isLoading = true;
      self.axios.post('https://backend.medicodesolution.com/staging/workforce/forgot-password/'+this.form.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
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
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/dashboard');
    }
       initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.locationClasses,
      theme: 'air',
      showCloseButton: true,
    };
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
