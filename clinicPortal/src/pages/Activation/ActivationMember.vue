<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Member Account Activation</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
   
      <b-col  md='12'>
        <b-card class="mb-xlg border-0">

          <a href="#" class="fw-semi-bold text-muted ml-sm" v-if="isLoading==false">Activating Account....</a>
          <hr />
 
       
          <b-button class="btn-rounded-f" variant="success" v-if="activation=='true'">ACCOUNT ACTIVATION SUCCESS. PROCEED TO LOGIN!</b-button>
          <b-button class="btn-rounded-f" variant="danger" v-if="activation=='failed'">ACCOUNT ACTIVATION FAILED. TRY AGAIN OR CONTACT ADMIN FOR HELP!</b-button>
        </b-card>
     
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
     locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
     token: this.$route.params.token,
     email: this.$route.params.email,
     isLoading:false,
     activation:'',
    };
  },
  methods: {
   async activateMember() {
  var self = this;
       self.isLoading = true;
        self.axios.post('https://backend.medicodesolution.com/staging/members/activate/'+this.token+'/'+this.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
          
                    self.activation='true';
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                       self.activation='failed';
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                  self.activation='failed';
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                 self.activation='failed';
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });   


},
   
  },
  mounted(){
     this.activateMember(); 
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
