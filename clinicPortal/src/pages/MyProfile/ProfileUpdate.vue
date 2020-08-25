<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Update Profile - {{data.username}}</li>
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
               v-if="data.provider!='Email & Password'"
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="email"
                description="Contact Email"
              >
                <div slot="label">
                Email
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                  type="text"
                  v-model="data.email"
                />
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </span>
              </b-form-group>
             
              
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
                description="Full name of member"
              >
                <div slot="label">
                  Name 
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="name"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                  type="text"
                  v-model="data.username"
                />
                <span class="text-danger" v-if="errors.has('name')">
                  {{ errors.first('name') }}
                </span>
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
                  name="tel"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('tel')}"
                  type="text"
               v-model="data.tel_no"
                />
                <span class="text-danger" v-if="errors.has('tel')">
                  {{ errors.first('tel') }}
                </span>
              </b-form-group>
               <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
          
              >
                <div slot="label">
                 Address
                </div>
          <textarea-autosize
                  v-model="data.address"
                  class="form-control"
                  :min-height="75"
                  id="autosize-textarea"
                
                />
               
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
       memberId:window.localStorage.getItem('memberId'),
     isLoading:false,
     locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  methods: {
    navigateToView(){
        this.$router.push({name:'AccountView'});
    },
    async getUser() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/members/'+ this.memberId)
   this.data= response.data.memberInfo[0];
 
  } catch (error) {
    console.error(error);
  }
},
    onSubmit(e) {
       var self = this;
       self.isLoading = true;
      e.preventDefault();
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/members/'+this.memberId, {
                    username: self.data.username,
                    tel_no: self.data.tel_no,
                    address:self.data.address,
                    email:self.data.email
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                  window.localStorage.setItem('verified', 1);
                Messenger().post("Account updated successfully!");
                return self.navigateToView();
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
