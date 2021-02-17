<template>
  <div class="login-page">
    <b-container>
      <Widget class="mx-auto" title="<h3 class='mt-0 fw-normal text-center'>Login to Admin Portal</h3>" customHeader>
       <p class="text-center login-info mb-0 mt">
     <!--      Use Facebook, Twitter or your email to sign in.  -->
        </p>  
       
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <b-form-group label="Username" label-for="username-input">
            <b-input-group class="input-group-transparent">
              <b-input-group-text slot="prepend"><i class="fa fa-user text-white"></i></b-input-group-text>
              <b-form-input id="username-input"
                            class="input-transparent pl-0"
                            type="text"
                            v-model="form.email"
                            required
                            placeholder="Your Username" />
            </b-input-group>
          </b-form-group>
          <b-form-group label="Password" label-for="password-input">
            <b-input-group class="input-group-transparent">
              <b-input-group-text slot="prepend"><i class="fa fa-lock text-white"></i></b-input-group-text>
              <b-form-input id="password-input"
                            class="input-transparent pl-0"
                            type="password"
                             minlength="6"
                            v-model="form.password"
                            required
                            placeholder="Your Password" />
            </b-input-group>
          </b-form-group>
          <div class="widget-middle-overflow bg-widget mt-4 px-4 py-3">
            <b-button class="btn-block btn-lg fs-normal" type="submit" variant="success" v-if="isLoading==false">
              <span class="login-circle"><i class="fa fa-caret-right"></i></span>
              Sign in
            </b-button>
            <br>
             
          </div>
          <div class="widget-bottom-overflow">
         <!--  <b-button class="btn-block btn-lg fs-normal" type="cancel" variant="primary">
              <i class="fa fa-facebook-square mr-2 fa-lg"></i>
              Login with Facebook
            </b-button> --> 
          </div>
        </form>
      </Widget>
    </b-container>
    <footer class="footer">
     Medicode Solutions  - Powered by <a href="https://www.sunrisers.com.my" target="_blank">Sunrisers Tech Solutions</a>
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
  components: { Widget},
  
  data() {
   
    return {
      errorMessage: null,
      form: {
        email: '',
        password: '',
      },
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
     
    };
  },
  methods: {
    
    login() {
      const email = this.form.email;
      const password = this.form.password;

      if (email.length !== 0 && password.length !== 0) {
       var self = this;
       self.isLoading = true;
       if(self.form.email=='admin' && self.form.password=='medicodeAdmin2021'){
             self.isLoading = false;
    Messenger().post('Administrator login success!');
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', 'ENIGMA Administrator');
    window.localStorage.setItem('access','admin' );
    window.localStorage.setItem('id',1 );
    return self.$router.push('/app/dashboard');
                 
       }
       /*      if(self.form.email=='development' && self.form.password=='development2020'){
             self.isLoading = false;
    Messenger().post('Administrator login success!');
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', 'Medicode Dev');
    window.localStorage.setItem('access','admin' );
    window.localStorage.setItem('id','DEVELOPER' );
    return self.$router.push('/app/dashboard');
                 
       }
    if(self.form.email=='sarah' && self.form.password=='n7aju1'){
             self.isLoading = false;
    Messenger().post('Staff login success!');
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', 'Sarah');
    window.localStorage.setItem('access','staff' );
    window.localStorage.setItem('id','SARAH' );
    return self.$router.push('/app/dashboard');
       }
          if(self.form.email=='afifah' && self.form.password=='ggwp2091'){
             self.isLoading = false;
    Messenger().post('Staff login success!');
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', 'Afifah');
    window.localStorage.setItem('access','staff' );
    window.localStorage.setItem('id','AFIFAH' );
    return self.$router.push('/app/dashboard');
       }
        if(self.form.email=='biela' && self.form.password=='lupfvl'){
             self.isLoading = false;
    Messenger().post('Staff login success!');
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', 'Biela');
    window.localStorage.setItem('access','staff' );
    window.localStorage.setItem('id','BIELA' );
    return self.$router.push('/app/dashboard');
       }
        if(self.form.email=='ummi' && self.form.password=='4y3mxl'){
             self.isLoading = false;
    Messenger().post('Staff login success!');
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', 'Ummi');
    window.localStorage.setItem('access','staff' );
    window.localStorage.setItem('id','UMMI' );
    return self.$router.push('/app/dashboard');         
       }

       */
         
       else {

     self.isLoading = false;
        return Messenger().post({ type:'error',message :'Incorrect credentials! Try again.'});
       }
  


      }
    },
  
  },
     mounted(){

 
   },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true' && window.localStorage.getItem('SUPERADMIN') === 'true' ) {
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
