<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Update Banner - {{data.id}}</li>
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
                label-for="price"
                description="1 image only"
              >
                <div slot="label">
                 Cover Image
                </div>
  <ul id="example-1">
  <li v-for="item,index in cover_image">
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
  components: { Widget,vueDropzone: vue2Dropzone },
  data() {
    return {
     bannerId: this.$route.params.bannerId,
      data:{},
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      isLoading:false,

      dropzoneOptions2: {
          url: 'https://backend.medicodesolution.com/staging/banners/upload',
          thumbnailWidth: 150,
          maxFilesize: 5.0,
          maxFiles: 1,
          addRemoveLinks: true,
          autoProcessQueue: false
          
      },
      images:[],
      cover_image:[],
      upload:0,
    };
  },
  methods: {
    navigateToList(){
        this.$router.push({name:'BannersListing'});
    },
    removeCoverImage(i){
      this.cover_image.splice(i,1);
    },
    removeOtherImage(i){
      this.images.splice(i,1);
    },
    checkCoverImage(file){
      if(this.cover_image.length > 0){
         this.$refs.myVueDropzone2.removeAllFiles();
         return Messenger().post({ type:'error',message :"Remove existing cover image before uploading new image!"});
      }
    },
    checkOtherImage(file){
      console.log( this.images.length +  this.$refs.myVueDropzone.getQueuedFiles().length + 1);
      if((this.images.length +  this.$refs.myVueDropzone.getQueuedFiles().length) > 4){
         this.$refs.myVueDropzone.removeAllFiles();
         return Messenger().post({ type:'error',message :"Maximum 5 images total. Remove at least one existing image before uploading new image!"});
      }
    },
    onDropzoneUploadComplete(file){
    //    console.log(this.images);
    var myfiles = this.$refs.myVueDropzone.getAcceptedFiles();
    var i = 0;
  for(i=0; i < myfiles.length;i++){
 // console.log(myfiles[i].xhr.response);
  this.images.push(myfiles[i].xhr.response);
   if(i == myfiles.length){
  
  }
  }
    this.upload++;
         console.log(this.upload);
 // console.log(this.images);
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
    completeSubmission(){
        var self = this;
      
 self.axios.patch('https://backend.medicodesolution.com/staging/banners/'+ this.bannerId, {
                    cover_image_url:self.cover_image[0],
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
    },
    onSubmit(e) {
       var self = this;
       self.isLoading = true;
      e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
        if(self.$refs.myVueDropzone.getQueuedFiles().length > 0 ){
    self.$refs.myVueDropzone.processQueue();

        }
               if(self.$refs.myVueDropzone.getQueuedFiles().length == 0 ){
    self.upload++;

        }
                       if(self.$refs.myVueDropzone2.getQueuedFiles().length == 0 ){
    self.upload++;

        }
        if(self.$refs.myVueDropzone2.getQueuedFiles().length > 0){
            self.$refs.myVueDropzone2.processQueue();
        }
        else if (self.$refs.myVueDropzone.getQueuedFiles().length == 0 && self.$refs.myVueDropzone2.getQueuedFiles().length == 0){
          self.completeSubmission();
        }
       
		  }
                  if(!result){
                    self.isLoading = false;
        	          return;
                  }
		});
    },

async getService() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/banners/'+ this.bannerId)
   this.data = response.data.bannerInfo[0];
   this.cover_image[0] = response.data.bannerInfo[0].cover_image_url;
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
  watch : {
              upload:function(val) {
                 if(val == 2){
                   this.completeSubmission();
                 }
               },
            }
};
</script>
