<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Staff Dashboard - {{data.username}}</li>
    </ol>


    <b-row>
      <b-col md="8" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Profile" active>
               
              <div class="profileContactContainer">
                <span class="thumb-xl mb-3">
                  <img v-if="data.photoUrl" class="profileAvatar rounded-circle"
                    v-bind:src="data.photoUrl" alt="..." />
                         <img v-if="!data.photoUrl" class="profileAvatar rounded-circle"
                    src="https://storage.cloud.google.com/dbc-asia/resources/user.png" alt="..." />
                   
                </span>
                <h5 class="fw-normal">{{data.username}} </h5>
                <p>{{data.position}} &nbsp;&nbsp;<a class="btn btn-danger btn-sm mb-3" @click="navigateToUpdate()">
                  &nbsp;Manage Profile
                  <i class="fa fa-pencil ml-2" />&nbsp;
                </a></p>
                
                <div>
                
                    
                      <i class="fa fa-lg fa-phone fa-fw mr-2" /><a>{{data.tel_no}}</a> &nbsp;
                  
                      <i class="fa fa-lg fa-envelope fa-fw mr-2" />
                      <a> {{data.email}}</a> &nbsp;
                
                 
                    
                   
                </div>
              </div>
              <br>
                 <fieldset>
   <legend>Complete Information</legend>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
              >
                <div slot="label">
                  Workforce ID
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="workforceId"
                     id="workforceId"
                v-bind:data-id="workforceId"
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
                  Name 
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.username"
                 disabled 
                />
              </b-form-group>
                <b-form-group
                horizontal
                label="E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="email"
                
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                  type="text"
                 v-model="data.email"
                  disabled 
                />
              </b-form-group>
  <b-form-group
              label="Position"
              label-for="default-select"
              :label-cols="3"
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    
                    class="mt-xs"
                    v-model="data.position"
                   :options="['Account Admin','Clinic Admin (Doctor)','Clinic Admin (Management)','Nurse']"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
              
             
            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                description=""
              >
                <div slot="label">
                  Telephone Number
                </div>
                <input
                 disabled 
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.tel_no"
                />
              </b-form-group>             
            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
                  Provider
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.provider"
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
            </fieldset>
          </b-tab>
         
        
        <!--   <b-tab title="KPI">
        
                <table class="table table-lg mb-0 table-striped">
                  <thead>
                    <tr class="text-muted">
                      <th>YEAR</th>
                      <th>QUARTER</th>
                      <th>ACTION</th>                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2O20</td>
                      <td>Q1</td>
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success"
                        >
                     Submit
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning" 
                        >
                        Ammend
                        </b-button>
                      </td>
                    </tr>
                     <tr>
                      <td>2020</td>
                      <td>Q2</td>
                       <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success"
                        >
                     Submit
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning" 
                        >
                        Ammend
                        </b-button>
                      </td>
                    </tr>
                     <tr>
                      <td>2020</td>
                      <td>Q3</td>
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success"
                        >
                     Submit
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning" 
                        >
                        Ammend
                        </b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
       
          </b-tab> -->
            <b-tab title="Actions">
           <fieldset>
   <legend>Account Recovery </legend>
     <b-badge variant="success" v-if="data.status==1">STATUS : ACTIVE ACCOUNT</b-badge><b-badge variant="danger" v-if="data.status==-1">STATUS : ACCOUNT SUSPENDED</b-badge> <br><br>
       <b-button type="button" variant="success" class="btn-rounded" @click="activateAccount()" v-if="data.status==-1">
           Activate Account    
        </b-button>      
        <b-button type="button" variant="danger" class="btn-rounded" @click="suspendAccount()" v-if="data.status!= -1">
          Suspend Account    
        </b-button> 
   <!--   &nbsp;  <b-button type="button" variant="primary" class="btn-rounded" @click="forgotPassword()" >
         Forgot Password / Send Password Reset E-mail
        </b-button>   --> 
      &nbsp;<!--  <b-button type="button" variant="info" class="btn-rounded" @click="activationEmail()" >
         Send Account Activation Email
        </b-button>      -->                         
            </fieldset>
          </b-tab>
           <b-tab title="History">
        
             <div class="table-responsive">
           <table class="table table-hover" id="staffhistorydatatable">
             <thead>
               <tr>
                 <th>Id</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Author</th> 
                   <th>Time</th>
                
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>
       
          </b-tab>
        </b-tabs>
      </b-col>
      <b-col lg='8' xs='12'>
       

      
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vSelect from 'vue-select';
import mock from './mock';
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
            mock,
      data:{},
      workforceId: this.$route.params.workforceId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  
  methods: {
      forgotPassword(){
       var self = this;
       self.isLoading = true;
      self.axios.post('https://backend.enigmedsvcs.com/development/workforce/forgot-password/'+this.data.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              
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
    activationEmail(){
      var self = this;
       self.isLoading = true;
      self.axios.post('https://backend.enigmedsvcs.com/development/workforce/activation-email/'+this.data.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              
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
    navigateToUpdate(){
        this.$router.push({name:'WorkforceUpdate', params: { workforceId :this.workforceId}});
    },
    activateAccount(){
         var self = this;
       self.isLoading = true;
   
                self.axios.patch('https://backend.enigmedsvcs.com/development/workforce/status/'+this.workforceId, {
                   status:1,
                     accountId:self.data.accountId,
                    clinicId:self.data.clinicId,
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getUser();
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
    suspendAccount(){
         var self = this;
       self.isLoading = true;

                self.axios.patch('https://backend.enigmedsvcs.com/development/workforce/status/'+this.workforceId, {
                   status:-1,
                           accountId:self.data.accountId,
                    clinicId:self.data.clinicId,
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getUser();
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
    async getUser() {
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/workforce/'+ this.workforceId)
   this.data = response.data.workforceInfo[0];
   var access = response.data.workforceInfo[0].access;
   this.data.access = access.split(',');
 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
     this.getUser();
         
      $(document).ready(function() {
       var workforceId = $("#workforceId").attr("data-id");
      console.log(workforceId)
	 var table3 =  $('#staffhistorydatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
    "ajax": "https://backend.enigmedsvcs.com/development/admin/staffHistory/"+workforceId,
    	"columnDefs": [
    {
      "targets": 0,
      "visible":false,
    }	
	
  ]
		
  } );

  
	
      });
  
      
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
