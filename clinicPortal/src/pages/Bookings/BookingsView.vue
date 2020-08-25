<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">View Booking - #{{data.token}}</li>
    </ol>


    <b-row>

      <b-col lg='8' xs='12'>
          <b-tabs class="mb-lg">
          <b-tab title="Profile" active>
       <b-form>
         
            <fieldset>
              
   <legend>Booking Information</legend>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
              >
                <div slot="label">
                  Booking Reference ID
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.token"
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
               Member
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.user_name"
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
                 Member ID
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.user_id"
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
                  Branch
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.branch"
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
                Appointment Date
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.date"
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
                 Appointment Time
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.time"
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
                  Comments
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.comments"
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
                  Physio Assigned
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.physio_name"
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
                  Registration Date
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
               <b-form-group >
            <label for="otherActive">Additional Comments/Requests</label>
            <textarea-autosize 
              v-model="data.comments"
            placeholder="eg: I am looking for knee treatment."
            :min-height="35"
            class="form-control"
            id="otherActive"
            disabled
            />
        
        </b-form-group> 
               <b-form-group
             
              >
                <div slot="label">
           Uploaded Attachments (Relevant medical documents:- MRI/Xray Report, Dr Referral, Insurance Card(GL), etc)
                </div>
  <ul id="example-2" v-if="data.attachments!=''">
  <li v-for="item,index in data.attachments">
 <p> {{index+1}})<a :href="item" target="_blank">{{item}}</a>  </p>  

  </li>
</ul>
<span  v-if="data.attachments==''" >None</span>
  
              </b-form-group>                                      
            </fieldset>
           
          </b-form>
          </b-tab>
          </b-tabs>
     

          <Widget
          customHeader 
        >
    
            <fieldset>
   <legend>Booking Management </legend>
     <b-badge variant="success" v-if="data.status==0">STATUS : UPCOMING</b-badge><b-badge variant="success" v-if="data.status==1">STATUS : SESSION COMPLETED</b-badge><b-badge variant="danger" v-if="data.status==-1">STATUS : SESSION CANCELLED</b-badge><b-badge variant="danger" v-if="data.status==-2">STATUS : SESSION NO SHOW</b-badge><br><br>
     <b-badge variant="danger" v-if="data.checkIn==0">CHECK IN : INCOMPLETE</b-badge> <b-badge variant="success" v-if="data.checkIn==1">CHECK IN : COMPLETE</b-badge><br>
                         
            </fieldset>
           <br><br>
             <b-button type="submit" variant="secondary" class="btn-rounded float" v-if="isLoading==false && data.status==0 && data.checkIn==0" @click="completeCheckIn">
             Complete Check In
              </b-button>  &nbsp;
                 <b-button type="submit" variant="secondary" class="btn-rounded float" v-if="isLoading==false && data.status==0 && data.checkIn==1" @click="cancelCheckIn">
             Cancel Check In
              </b-button>  &nbsp;
               <b-button type="submit" variant="success" class="btn-rounded float" v-if="isLoading==false && data.status==0" @click="completeBooking">
              Session Complete
              </b-button>  &nbsp;
                  <b-button type="submit" variant="danger" class="btn-rounded float" v-if="isLoading==false && data.status==0" @click="noShowBooking">
              No Show
              </b-button>  &nbsp;
           <b-button type="submit" variant="warning" class="btn-rounded float" v-if="isLoading==false && data.status==0" @click="displayPanel">
             Edit Booking Preferences 
              </b-button>  &nbsp;
           <b-button type="submit" variant="primary" class="btn-rounded float" v-if="isLoading==false && data.status==0" @click="displayPanel2">
             Assign Physio
              </b-button>
               &nbsp;
           
           <b-button type="submit" variant="primary" class="btn-rounded float" v-if="isLoading==false && data.status==0" @click="displayPanel3">
             Assign Programme
              </b-button> &nbsp;<br><br>
               <b-button type="submit" variant="primary" class="btn-rounded float" v-if="isLoading==false && data.status==0 && data.user_name=='OFFLINE / MANUAL BOOKING'" @click="displayPanel4">
             Re-Assign Member
              </b-button>
               &nbsp;<br><br>
                     
         
        </Widget>
          <Widget
          v-if="panel==true"
        title="
        <div>
          <h4>
            Edit Booking Preferences&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'></p>
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
     <input type="date" placeholder="Start" v-model="data.date"  @change="checkSession" :min="minDate" :max="maxDate" class="form-control">
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
                <b-form-group
            
              >
                <label for="myvueDropZone">Upload Attachments (Relevant medical documents:- MRI/Xray Report, Dr Referral, Insurance Card(GL), etc)</label>
             <label for="myvueDropZone"> *upto 15 items, max 10MB size*</label>
  <ul id="example-2">
  <li v-for="item,index in data.attachments" v-if="data.attachments!=''">
   <p> {{index+1}})<a :href="item" target="_blank">{{item}}</a>  </p>   
  &nbsp;&nbsp; <b-button variant="warning" size="xs" class="mb-xs mr-xs" @click="removeOtherImage(index)">Remove Attachment</b-button>
  </li>
</ul>
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-file-added="checkOtherImage" v-on:vdropzone-queue-complete="onDropzoneUploadComplete"></vue-dropzone>
       
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
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
         <Widget
          v-if="panel2==true"
        title="
        <div>
          <h4>
           Assign Physio&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'></p>
        </div>"
        customHeader  collapse
      >
       <b-form-group
              label="Physio"
              label-for="search-select"
              :label-cols="3"
              description="Search & Select Physio"
            >
              <b-row>
                <b-col md='9'>
               <v-select :options="physioInfo"    v-model="data.physio_name" label="username" :value="id">
    <template slot="option" slot-scope="option">
        {{ option.username }} - {{option.position}}
    </template>
  </v-select>
                </b-col>
              </b-row>
            </b-form-group>

  <b-button type="submit" variant="primary" class="btn-rounded float" v-if="isLoading==false" @click="assignPhysio">
             Assign Physio
              </b-button>
      </Widget>
       <Widget
          v-if="panel3==true"
        title="
        <div>
          <h4>
           Assign Programme&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'></p>
        </div>"
        customHeader  collapse
      >
       <b-form-group
              label="Programme"
              label-for="search-select"
              :label-cols="3"
              description="Search & Select Programme"
            >
              <b-row>
                <b-col md='9'>
               <v-select :options="programmeInfo"    v-model="data.programmeId" label="id" :value="id">
    <template slot="option" slot-scope="option">
        #{{option.id}} -{{ option.title }} - {{option.description}} 
    </template>
  </v-select>
                </b-col>
              </b-row>
            </b-form-group>

  <b-button type="submit" variant="primary" class="btn-rounded float" v-if="isLoading==false" @click="assignProgramme">
             Assign Programme
              </b-button>
      </Widget>
               <Widget
          v-if="panel4==true"
        title="
        <div>
          <h4>
           Re-Assign Member&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'></p>
        </div>"
        customHeader  collapse
      >
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

  <b-button type="submit" variant="primary" class="btn-rounded float" v-if="isLoading==false" @click="assignMember">
             Re-Assign Member
              </b-button>
      </Widget>
      </b-col>
    </b-row>
    
  </div>
</template>
<script>
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vSelect from 'vue-select';
import moment from 'moment';
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
  components: { Widget,vSelect,vueDropzone: vue2Dropzone  },
  data() {
    return {
      data:{
            attachments:[],
      },
      bookingId: this.$route.params.bookingId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
        data:{},
      bookingId: this.$route.params.bookingId,
      isLoading:false,
          memberInfo:[],
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
         panel:false,
         panel2:false,
         panel3:false,
         panel4:false,
          loadingWizard: false,
         errorMsg: null,
         count: 0,
      minDate:'',
      maxDate:'',
      sessions:[],
    progress:1,
    physioInfo:[],
     programmeInfo:[],
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
      removeOtherImage(i){
      this.data.attachments.splice(i,1);
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
         console.log(this.upload);
 // console.log(this.images);
    },
     displayPanel(){

      if(this.panel==true){
      return this.panel = false;
      }
      else if(this.panel==false){
       return this.panel = true;
      }
    
    },
        displayPanel2(){
   
      if(this.panel2==true){
      return this.panel2 = false;
      }
      else if(this.panel2==false){
       return this.panel2 = true;
      }
    
    },
            displayPanel3(){
   
      if(this.panel3==true){
      return this.panel3 = false;
      }
      else if(this.panel3==false){
       return this.panel3 = true;
      }
    
    },
                displayPanel4(){
   
      if(this.panel4==true){
      return this.panel4 = false;
      }
      else if(this.panel4==false){
       return this.panel4 = true;
      }
    
    },
         navigateToDashboard(){
        this.$router.push({name:'Dashboard' });
    },
    cancelBooking(){
            var self = this;
            self.isLoading=true;
    self.axios.post('https://backend.medicodesolution.com/staging/members/bookings/cancellation', {
        bookingId:self.bookingId,
        status:'-1',
        memberId:self.data.user_id,
        date:self.data.date,
        time:self.data.time,
        branch:self.data.branch,
        token:self.data.token

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                     self.isLoading = false;
               self.getBooking();
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                }
                else {
                  if(response.data.error){
                   self.isLoading=false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                    self.isLoading=false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                 self.isLoading=false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
    async getBooking() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/bookings/'+ this.bookingId)
   this.data = response.data.bookingInfo[0];
 
  } catch (error) {
    console.error(error);
  }
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
      
         if(this.data.branch=='' || this.data.branch==null){
        
         	reject('Select branch to continue..')
         }else{
         
          resolve(true)
         }   
     
     })
    },
          validDate:function() {
     return new Promise((resolve, reject) => {
      
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

   //no validation
    var self = this;
     self.isLoading = true;
     


    self.axios.patch('https://backend.medicodesolution.com/staging/members/bookings/change', {
        branch:self.data.branch,
        date:self.data.date,
        time:self.data.time,
        comments:self.data.comments,
        token:self.data.token,
        memberId:self.data.user_id,
        bookingId:self.bookingId,
              attachments:self.data.attachments.join(),

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                             self.isLoading = false;
                             self.getBooking();
                             self.displayPanel();
               
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
         
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

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.sessions = response.data.sessions;
                //  console.log(self.sessions)
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
     console.log(self.data.date)
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
    navigateToUpdate(){
        this.$router.push({name:'BookingsUpdate', params: { bookingId :this.bookingId}});
    },
    approveBooking(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/schedule/status/'+this.bookingId, {
                   status:1,
                   username:'Rkram',
                   email:'rkram016@gmail.com'
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
    suspendBooking(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/schedule/status/'+this.bookingId, {
                   status:-1,
                     username:'Rkram',
                   email:'rkram016@gmail.com'
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
        bookingReminder(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.medicodesolution.com/staging/schedule/reminder/'+this.bookingId, {
                   status:-1,
                     username:'Rkram',
                   email:'rkram016@gmail.com',
                   title:self.data.title,
                   start:self.data.start,
                   type:'reminder'
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
            followUpReminder(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.post('https://backend.medicodesolution.com/staging/schedule/reminder/'+this.bookingId, {
                   status:-1,
                     username:'Rkram',
                   email:'rkram016@gmail.com',
                   title:self.data.title,
                   start:self.data.start,
                   type:'checkup'
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
        noShowBooking(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/schedule/status/'+this.bookingId, {
                   status:-2,
                   
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
        completeBooking(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/schedule/status/'+this.bookingId, {
                   status:1,
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
         cancelCheckIn(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/schedule/checkin/'+this.bookingId, {
                   status:0,
                   
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
        completeCheckIn(){
         var self = this;
       self.isLoading = true;
      self.$validator.validateAll().then((result) => {
		  if (result) {
                self.axios.patch('https://backend.medicodesolution.com/staging/schedule/checkin/'+this.bookingId, {
                   status:1,
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBooking();
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
        assignPhysio(){
         var self = this;
       self.isLoading = true;


                self.axios.patch('https://backend.medicodesolution.com/staging/admin/bookings/change/physio', {
                 physio_name:self.data.physio_name.username,
                 physio_id:self.data.physio_name.id,
                 bookingId:self.bookingId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              self.displayPanel2();
               self.getBooking();
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
	
    },
    
            assignMember(){
         var self = this;
       self.isLoading = true;
                self.axios.patch('https://backend.medicodesolution.com/staging/admin/bookings/change/user', {
              
             user_id:self.data.member.id,
        user_name:self.data.member.username,
                 bookingId:self.bookingId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              self.displayPanel4();
               self.getBooking();
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
	
    },
     async getMembers() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/physio/members')
   this.memberInfo = response.data.memberInfo;
   
 
  } catch (error) {
    console.error(error);
  }
},
          assignProgramme(){
         var self = this;
       self.isLoading = true;


                self.axios.patch('https://backend.medicodesolution.com/staging/admin/bookings/change/programme', {
                
                 programmeId:self.data.programmeId.id,
                 bookingId:self.bookingId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              self.displayPanel3();
               self.getBooking();
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
	
    },    
    async getBooking() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/bookings/'+ this.bookingId)
   this.data = response.data.bookingInfo[0];
    this.data.attachments = response.data.bookingInfo[0].attachments.split(',');
   this.getPhysio();
   this.getProgramme();
 
  } catch (error) {
    console.error(error);
  }
},
   async getPhysio() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/physio/branch/'+ this.data.branch)
   this.physioInfo = response.data.physioInfo;
   
 
  } catch (error) {
    console.error(error);
  }
},
   async getProgramme() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/programme/'+ this.data.user_id)
   this.programmeInfo = response.data.programmeInfo;
   
 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
     this.getBooking();
     
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
