<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Settings</li>
    </ol>


    <b-row>

      <b-col lg='8' xs='12'>        
          <Widget
          customHeader 
        >
            <fieldset>
 
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
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  methods: {
        changeSettings(){
         var self = this;
       self.isLoading = true;
    
                self.axios.patch('https://backend.medicodesolution.com/development/coresettings/1', {
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

   async getCoreSettings() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/coresettings')
   this.settingsdata = response.data.settingsInfo[0];

 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
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
