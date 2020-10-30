<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Upload New Files</li>
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
       
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="title"
                description=""
              >
                <div slot="label">
                 Title
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="title"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('title')}"
                  type="text"
                v-model="data.title"
                />
                <span class="text-danger" v-if="errors.has('title')">
                  {{ errors.first('title') }}
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
               Description (optional)
                </div>
                <input

                  name="desc"
                  :class="{ 'form-control': true}"
                  type="text"
                v-model="data.desc"
                />
           
              </b-form-group>
              
  
             
                <b-form-group
             horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="image"
                description=""
              >
                <div slot="label">
                 Supporting Documents
                </div>
                <label for="myvueDropZone">
                   </label>
             <label for="myvueDropZone"> *upto 15 items, max 10MB size*</label>
  <ul id="example-2">
  <li v-for="item,index in data.attachments" v-if="data.attachments!=''">
   <p v-if="item!=''"> {{index+1}})<a :href="item" target="_blank">{{item}}</a>  </p>   
  &nbsp;&nbsp; <b-button variant="warning" size="xs" class="mb-xs mr-xs" @click="removeOtherImage(index)" v-if="item!=''">Remove Attachment</b-button>
  </li>
</ul>
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-file-added="checkOtherImage" v-on:vdropzone-queue-complete="onDropzoneUploadComplete"></vue-dropzone>
       
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
      clinicId: this.$route.params.clinicId,
      staffId:window.localStorage.getItem('id'),
      data:{
       title:'',
       desc:'',
       attachments:[],

      },
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      isLoading:false,
          dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/development/fileManager/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 15,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
    };
  },
  methods: {

        removeOtherImage(i){
      this.data.attachments.splice(i,1);
    },
       removeImage(){
      this.data.photoUrl='';
    },
        checkOtherImage(file){
  
      if((this.data.attachments.length +  this.$refs.myVueDropzone.getQueuedFiles().length) > 14){
         this.$refs.myVueDropzone.removeAllFiles();
         return Messenger().post({ type:'error',message :"Maximum 15 items total. Remove at least one existing attachment before uploading new document!"});
      }
    },
        onDropzoneUploadComplete(file){
    //    console.log(this.images);
    var myfiles = this.$refs.myVueDropzone.getAcceptedFiles();
    var i = 0;
  for(i=0; i < myfiles.length;i++){
 // console.log(myfiles[i].xhr.response);
  this.data.attachments.push(myfiles[i].xhr.response);
   if(i == myfiles.length){
  
  }
  }
    this.upload++;
     //    console.log(this.upload);
 // console.log(this.images);
    },
    navigateToDashboard(){
        this.$router.push({name:'Dashboard'});
    },
           successEvent2 (file) {
        this.data.photoUrl =file.xhr.response;
      
      },
    onSubmit(e) {
         e.preventDefault();
       var self = this;
       if(self.data.attachments.length===0){
      return Messenger().post({ type:'error',message:'Upload supporting documents to continue..', hideAfter: 3,showCloseButton:true});
       }
    
       self.isLoading = true;
   
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.medicodesolution.com/development/fileManager', {
        title:self.data.title,
        staffId:self.staffId,
        clinicId:self.clinicId,
        desc:self.data.desc,
        attachments:self.data.attachments.join(),
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                return self.$router.push({name:'Dashboard'});
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
