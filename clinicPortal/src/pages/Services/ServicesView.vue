<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Service Dashboard - {{data.title}}</li>
    </ol>


    <b-row>

      <b-col lg='8' xs='12'>
        <Widget
          customHeader 
        >
          <b-form>
            <fieldset>
   <legend> Information</legend>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
              >
                <div slot="label">
                  Service ID
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
                  Title
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.title"
                 disabled 
                />
              </b-form-group>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="price"
               
              >
                <div slot="label">
                  Description
                </div>
               <mavon-editor id="markdown-editor" language="en" v-model="data.description"  />
               
              </b-form-group>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                  Price
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.price"
                 disabled 
                />
              </b-form-group>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
               description="in minutes"
              >
                <div slot="label">
                  Time Taken
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               
                v-model="data.time_taken"
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
                  Title
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.title"
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
                  Creation Date
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
             
              <b-button type="button" variant="default" class="btn-rounded" @click="navigateToUpdate()" >
               Edit Service
              </b-button>
            </div>
          </b-form>
        </Widget>
     
 <Widget
          customHeader 
        >
   <legend>Images</legend>
<h3> Cover Image</h3>
 <b-carousel id="carousel2" indicators controls :interval="10000">
          <b-carousel-slide v-for="img in cover_image" :key="img" :img-src="img" />
        </b-carousel>
<br><br>
<h3> Other Images </h3>
   <b-carousel id="carousel2" indicators controls :interval="2000">
          <b-carousel-slide v-for="img in images" :key="img" :img-src="img" />
        </b-carousel>
        </Widget>
          <Widget
          customHeader 
        >
          <b-form>
            <fieldset>
   <legend>Service Status </legend>
     <b-badge variant="success" v-if="data.status==1">STATUS : ACTIVE SERVICE</b-badge><b-badge variant="danger" v-if="data.status==0">STATUS : SERVICE SUSPENDED</b-badge> <br><br>
       <b-button type="button" variant="success" class="btn-rounded" @click="activateService()" v-if="data.status==0">
           Activate Service    
        </b-button>      
        <b-button type="button" variant="danger" class="btn-rounded" @click="suspendService()" v-if="data.status==1">
          Suspend Service    
        </b-button> 
      &nbsp;                            
            </fieldset>
            <div class="form-action">
            
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
      serviceId: this.$route.params.serviceId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      cover_image:[],
      images:[],
    };
  },
  methods: {
    navigateToUpdate(){
        this.$router.push({name:'ServicesUpdate', params: { serviceId :this.serviceId}});
    },
    activateService(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/services/status/'+this.serviceId, {
                   status:1
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getService();
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
                  if(!result){
                    self.isLoading = false;
        	          return;
                  }
		});
    },
    suspendService(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/services/status/'+this.serviceId, {
                   status:0
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getService();
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
                  if(!result){
                    self.isLoading = false;
        	          return;
                  }
		});
    },    
    async getService() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/services/'+ this.serviceId)
   this.data = response.data.serviceInfo[0];
   this.images = response.data.serviceInfo[0].images.split(',');
   this.cover_image[0] = response.data.serviceInfo[0].cover_image_url;
 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
     this.getService();
     
  
      
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
