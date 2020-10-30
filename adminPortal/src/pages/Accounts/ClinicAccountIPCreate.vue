<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Approve New IPv4</li>
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
                label-for="ipv4"
                description=""
              >
                <div slot="label">
                 IPv4 Address
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:8'"
                  name="ipv4"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('ipv4')}"
                  type="text"
                v-model="data.ipv4"
                />
                <span class="text-danger" v-if="errors.has('ipv4')">
                  {{ errors.first('ipv4') }}
                </span>
              </b-form-group>
                   

    <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="alias"
                description=""
              >
                <div slot="label">
                 Alias
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="alias"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('alias')}"
                  type="text"
                v-model="data.alias"
                />
                <span class="text-danger" v-if="errors.has('alias')">
                  {{ errors.first('alias') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="desc"
                description=""
              >
                <div slot="label">
                 Description
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="desc"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('desc')}"
                  type="text"
                v-model="data.description"
                />
                <span class="text-danger" v-if="errors.has('desc')">
                  {{ errors.first('desc') }}
                </span>
              </b-form-group>
       
               
               <br>
                     
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
  components: { Widget,vSelect },
  data() {
    return {
      clinicId: this.$route.params.clinicId,
      data:{
        ipv4:'',
        alias:'',
        description:'',
       
      },
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      isLoading:false,
    };
  },
  methods: {
    navigateToList(){
    this.$router.push({name:'ClinicAccountView', params: { clinicId :this.clinicId}});
    },
    onSubmit(e) {
       var self = this;
       self.isLoading = true;
      e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.medicodesolution.com/development/clinic_ipv4', {
                  
        clinicId:self.clinicId,
        ipv4:self.data.ipv4,
        alias:self.data.alias,
        description:self.data.description,
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
