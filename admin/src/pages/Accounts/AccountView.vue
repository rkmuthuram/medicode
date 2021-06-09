<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Account Dashboard > {{data.company_name}}</li>
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
                <h5 class="fw-normal">{{data.company_name}} </h5>
                <p><a class="btn btn-danger btn-sm mb-3" @click="navigateToUpdate()">
                  &nbsp;Update Account
                
                </a></p>
                
                <div>
                
                    
                      <i class="fa fa-lg fa-phone fa-fw mr-2" /><a>{{data.pic_tel_no}}</a> &nbsp;
                  
                      <i class="fa fa-lg fa-envelope fa-fw mr-2" />
                      <a> {{data.pic_email}}</a> &nbsp;
                
                 
                    
                   
                </div>
              </div>
              <br>
                 <fieldset>
                  <legend>
              1. Core Information
              </legend>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
              >
                <div slot="label">
                  Account ID
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="accountId"
                     id="accountId"
                v-bind:data-id="accountId"
                 disabled 
                />
              </b-form-group>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="accountname"
                description=""
              >
                <div slot="label">
                 Company Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="accountname"
                  disabled
                  :class="{ 'form-control': true, 'is-invalid': errors.has('accountname')}"
                  type="text"
                v-model="data.company_name"
                />
                <span class="text-danger" v-if="errors.has('accountname')">
                  {{ errors.first('accountname') }}
                </span>
              </b-form-group>
                  <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="accountname"
                description=""
              >
                <div slot="label">
                 MMC Number
                </div>
                <input
                  disabled
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="mmc_number"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('mmc_number')}"
                  type="text"
                v-model="data.mmc_id"
                />
                <span class="text-danger" v-if="errors.has('mmc_number')">
                  {{ errors.first('mmc_number') }}
                </span>
              </b-form-group>
                   

    <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="ref_num"
                description=""
              >
                <div slot="label">
                 Reference ID (Internal)
                </div>
                <input
                  disabled
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="ref_id"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('ref_id')}"
                  type="text"
                v-model="data.ref_id"
                />
                <span class="text-danger" v-if="errors.has('ref_id')">
                  {{ errors.first('ref_id') }}
                </span>
              </b-form-group>
            <br>
              <legend>
             2. Company Information
              </legend>
               
               <br>
                     <b-form-group
              label="Type"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                      disabled
                    class="mt-xs"
                    v-model="data.company_type"
                    :options="['ENTERPRISE','SYARIKAT SENDIRIAN BERHAD']"
                  />
                </b-col>
              </b-row>
            </b-form-group>  
             <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="comdate"
                description=""
              >
                <div slot="label">
                Date of Registration/Incorporation
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="comdate"
                    disabled
                  :class="{ 'form-control': true, 'is-invalid': errors.has('comdate')}"
                  type="date"
                v-model="data.company_date"
                />
                <span class="text-danger" v-if="errors.has('comdate')">
                  {{ errors.first('comdate') }}
                </span>
              </b-form-group>
                       <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="picname"
                description=""
              >
                <div slot="label">
                 PIC Name
                </div>
                <input
                  disabled
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="picname"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('picname')}"
                  type="text"
                v-model="data.pic_name"
                />
                <span class="text-danger" v-if="errors.has('picname')">
                  {{ errors.first('picname') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                label="PIC E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="picemail"
              >
                <input
                  v-validate="'required|email'"
                  name="picemail"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('picemail')}"
                  type="text"
                    disabled
                 v-model="data.pic_email"
                />
                <span class="text-danger" v-if="errors.has('picemail')">
                  {{ errors.first('picemail') }}
                </span>
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="pictel_no"
                description="If overseas include call code"
              >
                <div slot="label">
                PIC Telephone Number
                </div>
                <input
                  disabled
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="pictel_no"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('pictel_no')}"
                  type="text"
               v-model="data.pic_tel_no"
                />
                <span class="text-danger" v-if="errors.has('pictel_no')">
                  {{ errors.first('pictel_no') }}
                </span>
              </b-form-group>

                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="billingname"
                description=""
              >
                <div slot="label">
                Billing Name
                </div>
                <input
                  data-vv-validate-on="change"
                    disabled
                  v-validate="'required|min:5'"
                  name="billingname"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('billingname')}"
                  type="text"
                v-model="data.billing_name"
                />
                <span class="text-danger" v-if="errors.has('billingname')">
                  {{ errors.first('billingname') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                label="Billing E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="billingemail"
              >
                <input
                  v-validate="'required|email'"
                  name="billingemail"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('billingemail')}"
                  type="text"
                 v-model="data.billing_email"
                   disabled
                />
                <span class="text-danger" v-if="errors.has('billingemail')">
                  {{ errors.first('billingemail') }}
                </span>
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="billingtel_no"
                description="If overseas include call code"
              >
                <div slot="label">
               Billing Telephone Number
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                    disabled
                  name="billingtel_no"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('billingtel_no')}"
                  type="text"
               v-model="data.billing_tel_no"
                />
                <span class="text-danger" v-if="errors.has('billingtel_no')">
                  {{ errors.first('billingtel_no') }}
                </span>
              </b-form-group>

      <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="address_street"
             
              >
                <div slot="label">
              Street Address
                </div>
              <textarea-autosize
                                  v-model="data.address_street"
                                placeholder=""
                                :min-height="35"
                                  disabled
                                  v-validate="'required|min:4'"
                             :class="{ 'form-control': true}"
                                id="street_address"
                                name="street_address"
                                />
             
              </b-form-group>

              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="add"
               
              >
                <div slot="label">
               City/Town
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'"
                  name="city_address"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('city_address')}"
                  type="text"
                    disabled
               v-model="data.address_city"
                />
                <span class="text-danger" v-if="errors.has('city_address')">
                  {{ errors.first('city_address') }}
                </span>
              </b-form-group>    

         <b-form-group
              label="State"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                      disabled
                    class="mt-xs"
                    v-model="data.address_state"
                    :options="['Johor','Kedah','Kelantan','Kuala Lumpur','Labuan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Putrajaya','Sabah','Sarawak','Selangor','Terengganu']"
                  />
                </b-col>
              </b-row>
            </b-form-group>      
        <br>
         <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="address_street2"
             
              >
                <div slot="label">
              Street Address (Alternative)
                </div>
              <textarea-autosize
                                  v-model="data.address_street2"
                                placeholder=""
                                :min-height="35"
                                  v-validate="'required|min:4'"
                             :class="{ 'form-control': true}"
                                id="street_address2"
                                  disabled
                                name="street_address2"
                                />
             
              </b-form-group>

              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="add"
               
              >
                <div slot="label">
               City/Town (Alternative)
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'"
                  name="city_address2"
                    disabled
                  :class="{ 'form-control': true, 'is-invalid': errors.has('city_address2')}"
                  type="text"
               v-model="data.address_city2"
                />
                <span class="text-danger" v-if="errors.has('city_address2')">
                  {{ errors.first('city_address2') }}
                </span>
              </b-form-group>    

         <b-form-group
              label="State (Alternative)"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                      disabled
                    class="mt-xs"
                    v-model="data.address_state2"
                    :options="['Johor','Kedah','Kelantan','Kuala Lumpur','Labuan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Putrajaya','Sabah','Sarawak','Selangor','Terengganu']"
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
              </b-form-group>   <br> 
              <legend>3. Uploaded Documents</legend>   
        
               
             <ul id="example-2">
  <li v-for="item,index in data.attachments" v-if="data.attachments!=''">
   <p v-if="item!=''"> {{index+1}} ) <a :href="item" target="_blank">{{item}}</a>  </p>   </li> </ul>                  
            </fieldset>
          </b-tab>
       <!--  <b-tab title="Manage Account Admins" >
  <p><a class="btn btn-danger btn-sm mb-3" @click="navigateToCreateAccountAdmin()">
                  &nbsp;Create Account Admin
                
                </a></p>
   <div class="table-responsive">
           <table class="table table-hover" id="accadmindatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th> 
                   <th>Status</th>
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>

         </b-tab> -->
        
           <b-tab title="Manage Clinics" >
 <p><a class="btn btn-danger btn-sm mb-3" @click="navigateToCreateClinic()">
                  &nbsp;Create Clinic
                
                </a></p>
   <div class="table-responsive">
           <table class="table table-hover" id="clinicadmindatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Status</th>
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>

             
           </b-tab>
            <b-tab title="Settings">
           <fieldset>
   <legend>Account Recovery </legend>
     <b-badge variant="success" v-if="data.status==1">STATUS : ACTIVE ACCOUNT</b-badge><b-badge variant="danger" v-if="data.status==0">STATUS : ACCOUNT SUSPENDED</b-badge> <br><br>
       <b-button type="button" variant="success" class="btn-rounded" @click="activateAccount()" v-if="data.status==0">
           Activate Account    
        </b-button>      
        <b-button type="button" variant="danger" class="btn-rounded" @click="suspendAccount()" v-if="data.status==1">
          Suspend Account    
        </b-button> 
                            
            </fieldset>
          </b-tab>
           <b-tab title="History">
        
           <div class="table-responsive">
           <table class="table table-hover" id="acchistorydatatable">
             <thead>
               <tr>
                 <th>Id</th>
                  <th>Clinic</th>
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
      accountId: this.$route.params.accountId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  
  methods: {
   
    navigateToUpdate(){
        this.$router.push({name:'AccountUpdate', params: { accountId :this.accountId}});
    },
    navigateToCreateAccountAdmin(){
        this.$router.push({name:'WorkforceCreateAccountAdmin', params: { accountId :this.accountId}});
    },
    navigateToCreateClinic(){
      this.$router.push({name:'ClinicAccountCreate', params: { accountId :this.accountId}});
    },
    activateAccount(){
         var self = this;
       self.isLoading = true;
   
                self.axios.patch('https://backend.enigmedsvcs.com/development/account/status/'+this.accountId, {
                   status:1
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getAccount();
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

                self.axios.patch('https://backend.enigmedsvcs.com/development/account/status/'+this.accountId, {
                   status:0
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getAccount();
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
    async getAccount() {
     
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/account/'+ this.accountId)
   this.data = response.data.accountInfo[0];
   this.data.attachments = response.data.accountInfo[0].attachments.split(',');
 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
     this.getAccount();
        
        
        $(document).ready(function() {
        var accountId = $("#accountId").attr("data-id");

          var table =  $('#accadmindatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.enigmedsvcs.com/development/workforce/onlyAccountAdmin/admin/"+accountId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit Member'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },	{ "targets" : 3,
          "render" : function (data, type, row) {
           
            if(data == 1) return 'Active';
           else if(data !=1) return 'Suspended';
            
          },
        }	
	
  ]
  } );
  
  
      var table2 =  $('#clinicadmindatatable').DataTable( {
      
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.enigmedsvcs.com/development/onlyClinic/admin/"+accountId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit Member'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },	{ "targets" : 4,
          "render" : function (data, type, row) {
           
            if(data == 1) return 'Active';
           else if(data == 0) return 'Suspended';
            
          },
        }	
	
  ]
	} );
	
  var table3 =  $('#acchistorydatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
    "ajax": "https://backend.enigmedsvcs.com/development/admin/accountHistory/"+accountId,
    	"columnDefs": [
    {
      "targets": 0,
      "visible":false,
    }	
	
  ]
		
  } );



    $('#accadmindatatable tbody').on( 'click', '#edit', function () {
    var data = table.row( $(this).parents('tr') ).data();
    	  window.open('http://localhost:8080/app/workforce-view/' + data[0]);
	
    } );
       $('#clinicadmindatatable tbody').on( 'click', '#edit', function () {
    var data2 = table2.row( $(this).parents('tr') ).data();
    	  window.open('http://localhost:8080/app/account-view-clinic/' + data2[0]);
	
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
