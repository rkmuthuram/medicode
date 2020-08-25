<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Staff Update Profile - {{data.username}}</li>
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
                label-for="username"
                description="Full / Nick name of member"
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
                />
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
              </b-form-group>
            <b-form-group
              label="Position"
              label-for="default-select"
              :label-cols="3"
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
                    :options="['Extra Modules (DISABLED DURING DEVELOPMENT)']"
                  />
                </b-col>
              </b-row>
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
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.tel_no"
                />
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
              </b-form-group>
              
    <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="price"
                description="1 image only"
              >
                <div slot="label">
                Profile Image
                </div>
  <ul id="example-1">
  <li v-for="item,index in cover_image" v-if="cover_image!=''">
  <img :src="item" width="100px" height="60px">   
  &nbsp;&nbsp; <b-button variant="warning" size="xs" class="mb-xs mr-xs" @click="removeCoverImage(index)">Remove Image</b-button>
  </li>
</ul>

              <vue-dropzone ref="myVueDropzone2" id="dropzone2" :options="dropzoneOptions2"  v-on:vdropzone-file-added="checkCoverImage" v-on:vdropzone-queue-complete="onDropzoneUploadComplete2"></vue-dropzone>
       
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
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
      data:{},
      workforceId: this.$route.params.workforceId,
     isLoading:false,
     locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
        dropzoneOptions2: {
          url: 'https://backend.medicodesolution.com/staging/workforce/photo/upload',
          thumbnailWidth: 150,
          maxFilesize: 5.0,
          maxFiles: 1,
          addRemoveLinks: true,
          acceptedFiles:'image/*'
          //autoProcessQueue: false
          
      },
         cover_image:[],
    };
  },
  methods: {
    navigateToView(){
        this.$router.push({name:'WorkforceView' , params:{workforceId:this.workforceId}});
    },
     removeCoverImage(i){
      this.cover_image.splice(i,1);
    },
        checkCoverImage(file){
      if(this.cover_image.length > 0){
         this.$refs.myVueDropzone2.removeAllFiles();
         return Messenger().post({ type:'error',message :"Remove existing cover image before uploading new image!"});
      }
    },
            onDropzoneUploadComplete2(file){
    //   console.log(this.cover_image);
    var myfiles2 = this.$refs.myVueDropzone2.getAcceptedFiles();
    var i = 0;
  for(i=0; i < myfiles2.length;i++){
  //console.log(myfiles2[i].xhr.response);
  this.cover_image.push(myfiles2[i].xhr.response);
  if(i == myfiles2.length){
 
  }
  }
     this.upload++;
     console.log(this.upload);
  //console.log(this.cover_image);
    },
    async getUser() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/workforce/'+ this.workforceId)
   this.data= response.data.workforceInfo[0];
      this.cover_image[0] = response.data.workforceInfo[0].photoUrl;
        var access = response.data.workforceInfo[0].access;
   this.data.access = access.split(',');
  } catch (error) {
    console.error(error);
  }
},
    onSubmit(e) {
       var self = this;
       self.isLoading = true;
      e.preventDefault();
       if(self.cover_image[0] == undefined){
       self.cover_image[0] = '';
     }
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/workforce/'+this.workforceId, {
                    username: self.data.username,
                    tel_no: self.data.tel_no,
                    position: self.data.position,
                    center:self.data.center,
                        photoUrl:self.cover_image[0],
                        access:self.data.access
                })
                .then(function (response) {
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
     this.getUser();    
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
