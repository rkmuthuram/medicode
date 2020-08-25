<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Create New Shop Product</li>
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
                label-for="title"
                description="Title of Product"
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
                description="Use the editor to stylize description / Do not upload images directly in editor,only use links"
              >
                <div slot="label">
                  Description
                </div>
               <mavon-editor id="markdown-editor" language="en" v-model="data.description"/>
               
              </b-form-group>
              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="time_taken"
                description="Approx time for vehicle to be delivered (in days)"
              >
                <div slot="label">
                  Delivery Time
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:1'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="number"
               v-model="data.time_taken"
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
                description="In SGD"
              >
                <div slot="label">
                  Price
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:1'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="number"
               v-model="data.price"
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
                 Cover Image
                </div>
              <vue-dropzone ref="myVueDropzone2" id="dropzone2" :options="dropzoneOptions2" v-on:vdropzone-success="successEvent2"></vue-dropzone>
       
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
              </b-form-group>
              
            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="price"
                description="Upto 5 images"
              >
                <div slot="label">
                 Other Images
                </div>
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-success="successEvent"></vue-dropzone>
       
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
      data:{
        title:'',
        description:'',
        time_taken:'',
        price:'',
        cover_image_url:'',
        images:[],
        availability:'',
        status:0,
      },
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      isLoading:false,
      dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/staging/shop/upload',
          thumbnailWidth: 150,
          maxFilesize: 5.0,
           maxFiles: 5,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
      dropzoneOptions2: {
          url: 'https://backend.medicodesolution.com/staging/shop/upload',
          thumbnailWidth: 150,
          maxFilesize: 5.0,
          maxFiles: 1,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      }
    };
  },
  methods: {
    navigateToList(){
        this.$router.push({name:'ShopListing'});
    },
     successEvent (file) {
        this.data.images.push(file.xhr.response);
      },
      successEvent2 (file) {
        this.data.cover_image_url =file.xhr.response;
      
      },
    onSubmit(e) {
       var self = this;
       self.isLoading = true;
      e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.medicodesolution.com/staging/shop', {
                    title: self.data.title,
                    description:self.data.description,
                    time_taken: self.data.time_taken,
                    price:self.data.price,
                    cover_image_url: self.data.cover_image_url,
                    images:self.data.images.join(),
                    availability:'',
                    status:0
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
