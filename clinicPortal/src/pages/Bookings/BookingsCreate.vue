<template>
  <b-row>
    <b-col xl='8' lg='16'>
      <Widget
        title="
        <div>
          <h4>
            Book New Appointment&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'>Follow these 4 simple steps to complete booking!</p>
        </div>"
        customHeader  collapse
      >
         <form-wizard
          shape="tab"
          color="#3498db"
          title=""
          subtitle=""
       @on-validate="handleValidation"
      
                  @on-loading="setLoading"
                  @on-error="handleErrorMessage"
        >
          <b-progress class="progress-xs" variant="gray-light" :value="progress" :max="4" />
          <b-button slot="prev" variant="primary">
            <i class="fa fa-caret-left" /> Previous
          </b-button>
          <b-button slot="next" variant="primary">
            Next <i class="fa fa-caret-right" />
          </b-button>
          <b-button  slot="finish" variant="success" @click="submit" v-if="isLoading==false" >
            Proceed  <i class="fa fa-check" />
          </b-button>
            <tab-content title="1. DBC Center"  :before-change="validBranch">
              <b-form>
              
             <b-form-group
                  label="Select User"
                >
           
               <v-select :options="memberInfo"    v-model="data.member" label="username" >
    <template slot="option" slot-scope="option">
        {{ option.username }} - #{{option.id}}
    </template>
  </v-select>
        </b-form-group>
   


                
              </b-form>
              <b-form-group
                  label="Select Branch"
                >
           
                  <v-select
                        
                    v-model="data.branch"
                    @change="checkBranch"
                 :options="['TTDI', 'Ampang','Jalan Kuching','Bangi']"
              
                  />
        </b-form-group>
   


                
              </b-form>
            </tab-content>
            <tab-content title="2. Appointment Date" :before-change="validDate">
              <b-form>
              
                        <b-form-group
                  label="Select Appointment Date"
                  label-for="description"
                  description="Booking has to be made one day in advance "
                >
     <input type="date" placeholder="Start" v-model="data.date"  @change="checkSession" :max="maxDate" class="form-control">
                  </b-form-group>

                              
     
              </b-form>
            </tab-content>
            <tab-content title="3. Select Session Time" :before-change="validTime">
              <b-form>
                <p>Select Preferable Session Time</p>
                  <b-form-group class="radio abc-radio" v-for="(session,index) in sessions" :key="session.value">
                      <input
                        type="radio"
                        name="radio"
                        :id="'diagn'+index"
                        v-model="data.time"
                        :value="session.value"
                        :disabled="session.capacity<1"
                      />
                      <label  :for="'diagn'+index">{{session.text}} ~ {{session.capacity}} slots left</label>
                    </b-form-group>
     
     
              </b-form>

    
            </tab-content>
            <tab-content title="4. Review & Confirmation">
                <b-form-group>
           <label for="myvueDropZone">Upload Attachments (Relevant medical documents:- MRI/Xray Report, Dr Referral, Insurance Card(GL), etc)</label>
             <label for="myvueDropZone"> *upto 15 items, max 10MB size*</label>
            
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-success="successEvent"></vue-dropzone>
       
              </b-form-group>
        <b-form-group >
            <label for="otherActive">Additional Comments/Requests</label>
            <textarea-autosize 
              v-model="data.comments"
            placeholder="eg: I am looking for knee treatment."
            :min-height="35"
            class="form-control"
            id="otherActive"
            />
            
        </b-form-group>
            </tab-content>
            <div class="loader" v-if="loadingWizard"></div>
    <div v-if="errorMsg">
      <span class="error">{{errorMsg}}</span>
    </div>
        </form-wizard>
      </Widget>
    </b-col>
  </b-row>
</template>
<style>
span.error{
  color:#e74c3c;
  font-size:20px;
  display:flex;
  justify-content:center;
}
</style>
<script>

import Vue from 'vue';
import vSelect from 'vue-select';
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { select2CountriesData, select2ShipmentData, cardTypesData } from './data';
import rns from '../../assets/cards/rns.png';
import moment from 'moment';
const { Messenger } = window;
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
  name: 'FormWizardPage',
  components: { Widget, vSelect,vueDropzone: vue2Dropzone},
  data() {
    return {
        loadingWizard: false,
         errorMsg: null,
         count: 0,
      isLoading:false,
      minDate:'',
      maxDate:'',
      sessions:[],
    progress:1,
    memberInfo:[],
      data:{
        branch:'',
        date:'',
        time:'',
        comments:'',
        attachments:[]
      },
            dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/staging/bookings/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 15,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
    };
  },
  methods: {
     successEvent (file) {
        this.data.attachments.push(file.xhr.response);
      },
 onComplete: function(){
          submit()
        },
        setLoading: function(value) {
            this.loadingWizard = value
        },
        handleValidation: function(isValid, tabIndex){
           console.log('Tab: '+tabIndex+ ' valid: '+isValid)
        },
        handleErrorMessage: function(errorMsg){
          this.errorMsg = errorMsg
        },
        navigateToDashboard(){
        this.$router.push({name:'Dashboard' });
    },
      validBranch:function() {
     return new Promise((resolve, reject) => {
           if(this.data.member=='' || this.data.member==null){
        
         	reject('Select user to continue..')
         }
         if(this.data.branch=='' || this.data.branch==null){
        
         	reject('Select branch to continue..')
         }else{
         
          resolve(true)
         }   
     
     })
    },
          validDate:function() {
     return new Promise((resolve, reject) => {
           if(this.data.member=='' || this.data.member==null){
        
         	reject('Select user to continue..')
         }
         if(this.data.branch=='' || this.data.branch==null){
        
         	reject('Select branch to continue..')
         }
            if(this.data.date=='' || this.data.date==null){
        
         	reject('Select valid date to continue..')
         }
         else{
         
          resolve(true)
         }   
     
     })
    },
              validTime:function() {
     return new Promise((resolve, reject) => {
           if(this.data.member=='' || this.data.member==null){
        
         	reject('Select user to continue..')
         }
         if(this.data.branch=='' || this.data.branch==null){
        
         	reject('Select branch to continue..')
         }
            if(this.data.date=='' || this.data.date==null){
        
         	reject('Select valid date to continue..')
         }
               if(this.data.time=='' || this.data.time==null){
        
         	reject('Select valid time to continue..')
         }
         else{
         
          resolve(true)
         }   
     
     })
    },
  submit(){
    var self=this;
  
   //no validation
    var self = this;
     self.isLoading = true;
    self.axios.post('https://backend.medicodesolution.com/staging/members/bookings/submit', {
        branch:self.data.branch,
        date:self.data.date,
        time:self.data.time,
        comments:self.data.comments,
        user_id:self.data.member.id,
        user_name:self.data.member.username,
          attachments:self.data.attachments.join(),

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                                   self.isLoading = false;
                   Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                   return self.navigateToDashboard();
         
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                 Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
              return self.navigateToDashboard();
                  }
                 else {
                   self.isLoading = false;
               Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   return self.navigateToDashboard();
                   }
                }
                })
                .catch(function (error) {
                self.isLoading = false;
                 Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true}); 
                     return self.navigateToDashboard();               
                }); 
  },
 async checkSession(){
    var self = this;
    self.axios.post('https://backend.medicodesolution.com/staging/members/booking/checkSession', {
        branch:self.data.branch,
        date:self.data.date,
        source:'PHYSIO PORTAL'

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.sessions = response.data.sessions;
                  //console.log(self.sessions)
                  return  Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
         
                }
                else {
                  if(response.data.error){
                         self.data.date = '';
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                        self.data.date = '';
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                     self.data.date = '';
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
  },
 async checkEligibility(){
      var self = this;

      self.axios.post('https://backend.medicodesolution.com/staging/members/booking/checkEligibility/'+self.memberId, {})
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                  return  Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
         
                }
                else {
                  if(response.data.error){
                      
                 Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
                   console.log(response.data)
                 if(response.data.code=='002'){
              
                 return self.$router.push({name:'AccountUpdate'});
                 }
           return self.navigateToDashboard();
                  }
                 else {
                  
                Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                 return self.navigateToDashboard();
                   }
                }
                })
                .catch(function (error) {
               
                   Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});    
                    return self.navigateToDashboard();            
                }); 
                
  },
   async checkBranch(){
     
      var self = this;
      self.data.date='';
      if(self.data.branch==''){return false;}
      self.axios.post('https://backend.medicodesolution.com/staging/members/booking/checkBranch/'+self.data.branch, {})
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                
                 self.minDate =  response.data.minDate;
                 self.maxDate = response.data.maxDate;
                  return  Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
         
                }
                else {
                  if(response.data.error){
                   
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                  
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
               
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
                
  },
 async getMembers() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/physio/members')
   this.memberInfo = response.data.memberInfo;
   
 
  } catch (error) {
    console.error(error);
  }
}
  },
     mounted(){
  this.getMembers();
 
 
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

<style src="./BookingsCreate.scss" lang="scss" />
