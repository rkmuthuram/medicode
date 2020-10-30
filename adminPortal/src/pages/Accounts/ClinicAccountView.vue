<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Clinic Dashboard - {{data.name}}</li>
    </ol>


    <b-row>
      <b-col md="12" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Inventory Listings" active>
                   <b-button  variant="danger" class="btn-rounded " @click="navigateToAmmendStock" >
              Ammend Stock
              </b-button>
              <div class="table-responsive">
            <table class="table table-striped table-bordered" id="inventorydatatable">
            <thead class="text-uppercase">
                 <tr>
                 <th>Id</th>
                 <th>Manufacturer Barcode</th>
                 <th>Clinic Barcode</th>
                      <th>Manufacturer</th>
                  <th>Product Name</th>
                    <th>Prescription</th> 
                   <th>Monthly Incoming</th>  
                   <th>Monthly Outgoing</th>  
                  <th>Current Stock</th>  
                 
                   <th>Movement</th>          
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody style="font-weight:bold">
             </tbody>
           </table>
           </div>


          </b-tab>
           <b-tab title="Actions">
            <b-row>
      <b-col>
       <div class="link-container">
          <div class="linkD" v-for="link in links" :key="link.id" @click="navigate(link.function)"><i class="fa link-icon" :class="link.icon" :style="{color:link.color}"/><div class="link-text" :style="{color:link.color}"> <strong>{{link.name}}</strong> </div></div>
        </div>
      </b-col>
    </b-row>

        </b-tab>
            <b-tab title="Pre Check In Listings">
        
           <div class="table-responsive">
           <table class="table table-bordered" id="precheckdatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Purchase Order Number</th>
                  <th>Attachments</th>
                  <th>Comments</th>
                  <th>Status</th> 
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>

       
          </b-tab>
              <b-tab title="Check In Listings">
        
              <div class="table-responsive">
           <table class="table table-bordered" id="checkindatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Invoice Number</th>
                  <th>Attachments</th>
                  <th>Total Amount(RM)</th>
                  <th>Status</th> 
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>


          </b-tab>
              
          <b-tab title="Check Out Listings">
        
           <div class="table-responsive">
         <table class="table table-bordered" id="checkoutdatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Patient Id</th>
                  <th>Medicine(s)</th>
                  <th>Total Amount (RM)</th>
                  <th>Date</th>
                   <th>Staff</th> 
                  <th>Status</th> 
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>

       
          </b-tab>
          <b-tab title="Profile" >
               
              <div class="profileContactContainer">
                <span class="thumb-xl mb-3">
                  <img v-if="data.photoUrl" class="profileAvatar rounded-circle"
                    v-bind:src="data.photoUrl" alt="..." />
                         <img v-if="!data.photoUrl" class="profileAvatar rounded-circle"
                    src="https://storage.cloud.google.com/dbc-asia/resources/user.png" alt="..." />
                   
                </span>
                <h5 class="fw-normal">{{data.name}} </h5>
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
   <legend>Complete Information</legend>
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
                v-model="data.id"
                     id="clinicId"
                v-bind:data-id="clinicId"
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
                 Account Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="accountname"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('accountname')}"
                  type="text"
                v-model="data.name"
                 disabled 
                />
                <span class="text-danger" v-if="errors.has('accountname')">
                  {{ errors.first('accountname') }}
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
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="ref_id"
                   disabled 
                  :class="{ 'form-control': true, 'is-invalid': errors.has('ref_id')}"
                  type="text"
                v-model="data.ref_id"
                />
                <span class="text-danger" v-if="errors.has('ref_id')">
                  {{ errors.first('ref_id') }}
                </span>
              </b-form-group>
       
               
               <br>
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
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="picname"
                   disabled 
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
                   disabled 
                  :class="{ 'form-control': true, 'is-invalid': errors.has('picemail')}"
                  type="text"
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
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                   disabled 
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
                   disabled 
                  name="city_address"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('city_address')}"
                  type="text"
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
         <b-tab title="Manage Staffs" >
  <p><a class="btn btn-danger btn-sm mb-3" @click="navigateToCreateAccountAdmin()">
                  &nbsp;Create Staff Account
                
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

         </b-tab>
        
         
            <b-tab title="Settings">
           <fieldset>
         <b-form>
            <fieldset>
         <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="settings_staffCount"
                description=""
              >
                <div slot="label">
                 Maximum Staff Count
                </div>
                <input
                  name="settings_staffCount"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('settings_whatsapp')}"
                  type="text"
               v-model="settingsData.staffCount"           
                />
              </b-form-group>   
              
         <b-form-group
              label="IP Restricted Access"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                   
                   
                    class="mt-xs"
                    v-model="settingsData.ip_status"
                    :options="['Enabled','Disabled']"
                  />
                </b-col>
              </b-row>
            </b-form-group>    
            </fieldset>
            <br>
            <div class="form-action">
              <b-button  variant="danger" class="btn-rounded " @click="changeSettings" v-if="isLoading==false">
              Update Settings
              </b-button>
            
            </div>
          </b-form>
          <br><br><br>
     <b-badge variant="success" v-if="data.status==1">STATUS : ACTIVE ACCOUNT</b-badge><b-badge variant="danger" v-if="data.status==0">STATUS : ACCOUNT SUSPENDED</b-badge> <br><br>
       <b-button type="button" variant="success" class="btn-rounded" @click="activateAccount()" v-if="data.status==0">
           Activate Account    
        </b-button>      
        <b-button type="button" variant="danger" class="btn-rounded" @click="suspendAccount()" v-if="data.status==1">
          Suspend Account    
        </b-button> 
                            
            </fieldset>
          </b-tab>
            <b-tab title="IPv4 Restrictions Listing" >
  <p><a class="btn btn-danger btn-sm mb-3" @click="navigateToCreateAccountIPRecord()">
                  &nbsp;Add New IPv4 Record
                
                </a></p>
   <div class="table-responsive">
           <table class="table table-hover" id="ipdatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>IP</th>
                  <th>Alias</th> 
                    <th>Description</th> 
                   <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>

         </b-tab>
       
          
            <b-tab title="All Files">
        
           <div class="table-responsive">
           <table class="table table-hover" id="filesdatatable">
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Staff</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Files</th>
                   <th>Upload Date</th>   
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>

       
          </b-tab>
             <b-tab title="Reporting">
 

 <table class="table table-lg mb-0 table-striped">
                  <thead>
                    <tr class="text-muted">
                      <th>TYPE</th>
                    
                      <th>ACTION</th>
                     
                                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>INVENTORY</td>
                   
                      <td>
                        <b-button  @click="downloadInventory" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD ALL TIME
                        </b-button> &nbsp;  <b-button  @click="downloadInventory2" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD MONTHLY
                        </b-button> </td>
                           
                      
                             
                      
                    </tr>  

                       <tr>
                      <td>CHECKOUT</td>
                   
                      <td>
                        <b-button  @click="downloadCheckout('daily')" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD DAILY
                        </b-button> &nbsp;
                        
                        <b-button  @click="downloadCheckout('weekly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD WEEKLY
                        </b-button>&nbsp;
                        
                        <b-button  @click="downloadCheckout('monthly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD MONTHLY
                        </b-button> &nbsp;
                        <b-button  @click="downloadCheckout('alltime')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD ALL TIME
                        </b-button></td>&nbsp;
                             
                      
                    </tr>               
                    <!--   <tr>
                      <td>CHECK IN's</td>
                   
                      <td>
                        <b-button  @click="downloadCheckout('daily')" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD DAILY
                        </b-button> &nbsp;
                        
                        <b-button  @click="downloadCheckout('weekly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD WEEKLY
                        </b-button>&nbsp;
                        
                        <b-button  @click="downloadCheckout('monthly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD MONTHLY
                        </b-button> &nbsp;
                        <b-button  @click="downloadCheckout('alltime')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD ALL TIME
                        </b-button></td>&nbsp;
                             
                      
                    </tr>  
                          <tr>
                      <td>PRE CHECK IN's</td>
                   
                      <td>
                        <b-button  @click="downloadCheckout('daily')" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD DAILY
                        </b-button> &nbsp;
                        
                        <b-button  @click="downloadCheckout('weekly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD WEEKLY
                        </b-button>&nbsp;
                        
                        <b-button  @click="downloadCheckout('monthly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD MONTHLY
                        </b-button> &nbsp;
                        <b-button  @click="downloadCheckout('alltime')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD ALL TIME
                        </b-button></td>&nbsp;
                             
                      
                    </tr>    
                          <tr>
                      <td>STAFF ACTIVITY </td>
                   
                      <td>
                        <b-button  @click="downloadCheckout('daily')" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD DAILY
                        </b-button> &nbsp;
                        
                        <b-button  @click="downloadCheckout('weekly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD WEEKLY
                        </b-button>&nbsp;
                        
                        <b-button  @click="downloadCheckout('monthly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD MONTHLY
                        </b-button> &nbsp;
                        <b-button  @click="downloadCheckout('alltime')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD ALL TIME
                        </b-button></td>&nbsp;
                             
                      
                    </tr>              
                     <tr>
                      <td>CLINIC ACTIVITY </td>
                   
                      <td>
                        <b-button  @click="downloadCheckout('daily')" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD DAILY
                        </b-button> &nbsp;
                        
                        <b-button  @click="downloadCheckout('weekly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD WEEKLY
                        </b-button>&nbsp;
                        
                        <b-button  @click="downloadCheckout('monthly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD MONTHLY
                        </b-button> &nbsp;
                        <b-button  @click="downloadCheckout('alltime')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD ALL TIME
                        </b-button></td>&nbsp;
                             
                      
                    </tr>        
                     <tr>
                      <td>ACCOUNT ACTIVITY </td>
                   
                      <td>
                        <b-button  @click="downloadCheckout('daily')" class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD DAILY
                        </b-button> &nbsp;
                        
                        <b-button  @click="downloadCheckout('weekly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD WEEKLY
                        </b-button>&nbsp;
                        
                        <b-button  @click="downloadCheckout('monthly')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD MONTHLY
                        </b-button> &nbsp;
                        <b-button  @click="downloadCheckout('alltime')"  class="p-1 px-3 btn-xs" variant="success">
                       DOWNLOAD ALL TIME
                        </b-button></td>&nbsp;
                             
                      
                    </tr>                -->
                  </tbody>
                </table>       
    
              
          </b-tab>
           <b-tab title="History">
        
              <div v-for="notification in mock.notifications"
                class="d-flex align-items-start" :key="notification.id">
                <i :class="`la la-${notification.icon} mr text-${notification.color}`" />
                <p
                  :class="{ 'mb-0': notification.id === mock.notifications.length - 1 }"
                  v-html="notification.content"
                />
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
      settingsData:{},
      clinicId: this.$route.params.clinicId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
        links: [
        {
          name: 'PRE CHECK-IN',
          color: '#F8AF0B',
          icon: 'fa-paste',
          function: 'navigateToPreCheckIn'
        },
        {
          name: 'CHECK-IN',
          color: '#593FCD',
          icon: 'fa-sign-in',
          function: 'navigateToCheckIn'
        },
        {
          name: 'CHECK-OUT',
          color: '#FF0000',
          icon: 'fa-sign-out',
          function: 'navigateToCheckOut'
        },{
          name: 'UPLOAD FILES',
          color: '#4A314D',
          icon: 'fa-file',
          function: 'navigateToFileUploader'
        },
        
      ],
    };
  },
  
  methods: {
     navigate(function_name){
      this [function_name]() 
    },
    navigateToUpdate(){
        this.$router.push({name:'ClinicAccountUpdate', params: { clinicId :this.clinicId}});
    },
     navigateToAmmendStock(){
        this.$router.push({name:'ClinicStockUpdate', params: { clinicId :this.clinicId}});
    },
    navigateToCreateAccountAdmin(){
        this.$router.push({name:'WorkforceCreateAccountClinic', params: {accountId:this.data.accountId, clinicId :this.clinicId}});
    },
    navigateToCreateAccountIPRecord(){
    this.$router.push({name:'ClinicAccountCreateIP', params: { clinicId :this.clinicId}});
    },
    navigateToPreCheckIn(){
    this.$router.push({name:'ClinicPreCheckIn', params: { clinicId :this.clinicId}});
    },
    navigateToCheckOut(){
    this.$router.push({name:'ClinicCheckOut', params: { clinicId :this.clinicId}});
    },
    navigateToCheckIn(){
    this.$router.push({name:'ClinicCheckIn', params: { clinicId :this.clinicId}});
    },
      navigateToFileUploader(){
    this.$router.push({name:'ClinicFileUpload', params: { clinicId :this.clinicId}});
    },
    activateAccount(){
         var self = this;
       self.isLoading = true;
   
                self.axios.patch('https://backend.medicodesolution.com/development/clinic/status/'+this.clinicId, {
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

                self.axios.patch('https://backend.medicodesolution.com/development/clinic/status/'+this.clinicId, {
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
     changeSettings(){
         var self = this;
       self.isLoading = true;

                self.axios.patch('https://backend.medicodesolution.com/development/clinic_settings/'+this.clinicId, {
                  staffCount:self.settingsData.staffCount,
                  ip_status:self.settingsData.ip_status
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getSettings();
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
        downloadInventory(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/development/clinic/download/reportInventory/'+self.clinicId, {
           
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
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
      downloadInventory2(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/development/clinic/download/reportInventory2/'+self.clinicId, {
           
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
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
     downloadCheckout(type){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/development/clinic/download/reportCheckout/'+self.clinicId, {
           type:type
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
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
   const response = await this.axios.get('https://backend.medicodesolution.com/development/clinic/'+ this.clinicId)
   this.data = response.data.accountInfo[0];
 
  } catch (error) {
    console.error(error);
  }
}
,    
    async getSettings() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/clinic_settings/'+ this.clinicId)
   this.settingsData = response.data.settingsInfo[0];
 
  } catch (error) {
    console.error(error);
  }
}
  },
   mounted(){
     this.getAccount();
     this.getSettings(); 
        
        $(document).ready(function() {
        var clinicId = $("#clinicId").attr("data-id");
function format (data) {
    // `d` is the original data object for the row
    var finalData="";
  
    var i=0;
     data.forEach(function(entry) {
  
       if(entry.packing_type=='TABLETS'){
            finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_strips+" strips & " + entry.quantity_tablets + "loose tablets  <br> ";
           }
           if(entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='per vial' || entry.packing_type=='Per vial' || entry.packing_type=='vial per cc'){
            finalData += i+1+") "+ entry.product_name + "-> "+entry.quantity_mls+" loose ML  & " + entry.quantity_vials + "vials <br> ";
           }
          if(entry.packing_type=='per ampule'){    
          finalData += i+1+") "+ entry.product_name + "-> "+entry.quantity_ampules+" ampules | ";
           }
             if(entry.packing_type=='BOTTLE'){
             finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_unittotal + entry.quantity_unitperbottle + " loose & " + entry.quantity_bottles + " bottles <br> " ;
           }
             if(entry.packing_type=='TUBE'){
                       finalData +=  i+1+") "+ entry.product_name + "-> "+entry.quantity_unittotal + entry.quantity_unitpertube + " loose & " + entry.quantity_tubes + " tubes <br> " ;     
           }
           else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus') {
             finalData += i+1+") "+ entry.product_name + "-> "+entry.quantity_units+" units<br> ";
           }
      i++;
    
});

if(data.length==i){
  return finalData;
}

}
        
          var table =  $('#accadmindatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/workforce/clinic/admin/"+clinicId,
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
           else if(data == 0) return 'Suspended';
            
          },
        }	
	
  ]
  } );



        var table2 =  $('#ipdatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/clinic/approvedId/admin/"+clinicId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Delete'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },	
	
  ]
  } );
  
   var table3 =  $('#precheckdatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/single/precheckin/admin/"+clinicId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
	{ "targets" : 4,
          "render" : function (data, type, row) {
            if(data == 0) return 'Awaiting Delivery';
           else if(data == 1) return 'Delivered';
           else if(data == -1) return 'Cancelled';
            
          },
        }	
  ]
	} );
	

  var table4 =  $('#checkindatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
    "ajax": "https://backend.medicodesolution.com/development/single/checkin/admin/"+clinicId,
      "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
   
      var val;
  if(aData[4]==0){
         
       $('td', nRow).css('background-color', 'Orange');
         
         }
          if(aData[4]==1){
         
       $('td', nRow).css('background-color', 'Green');
         
         }
               if(aData[4]==-1){
         
       $('td', nRow).css('background-color', 'Red');
         
         }
          
      
   
     //   $('td', nRow).css('background-color', 'Orange');
   
    },
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
	{ "targets" : 4,
          "render" : function (data, type, row) {
            if(data == 0) return 'Awaiting Manager Confirmation';
           else if(data == 1) return 'Confirmed & Added to Inventory';
           else if(data == -1) return 'Rejected/Pending Clarification';
            
          },
        }	
  ]
	} );


      var table5 =  $('#inventorydatatable').DataTable( {
		"processing": true,
		"order": [[ 9, "movementPct" ]],
        "serverSide": true,
          "dom": 'frtip',
    "ajax": "https://backend.medicodesolution.com/development/inventory/clinic/admin/"+clinicId,
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
   
      var val;
   
  if(aData[5]=='TABLETS'){
         
             //return JSON.parse(aData[8]).tablets +' tablets OR ' +JSON.parse(aData[8]).strips + ' strips';
           val = JSON.parse(aData[8]).tablets;
           if(val<10){
          $('td', nRow).css('background-color', 'Red');
           }
           if(val<50 && val>9){
                   $('td', nRow).css('background-color', 'Orange');
              
           }
             
         
           }
           if(aData[5]=='Vial / per cc' || aData[5]=='Vial / per cc' || aData[5]=='Vial / per 0.5 cc' || aData[5]=='per vial' || aData[5]=='Per vial' || aData[5]=='vial per cc'){
            
             //return JSON.parse(aData[8]).tablets +' tablets OR ' +JSON.parse(aData[8]).strips + ' strips';
        val = JSON.parse(aData[8]).vials;
            if(val<10){
          $('td', nRow).css('background-color', 'Red');
           }
           if(val<50 && val>9){
                   $('td', nRow).css('background-color', 'Orange');
              
           }
             
           }
          if(aData[5]=='per ampule'){
            
             //return JSON.parse(aData[8]).tablets +' tablets OR ' +JSON.parse(aData[8]).strips + ' strips';
               val = JSON.parse(aData[8]).ampules;
            if(val<10){
          $('td', nRow).css('background-color', 'Red');
           }
           if(val<50 && val>9){
                   $('td', nRow).css('background-color', 'Orange');
              
           }
             
           }
             if(aData[5]=='BOTTLE'){
            
            val = JSON.parse(aData[8]).ampules;
           if(val<10){
          $('td', nRow).css('background-color', 'Red');
           }
           if(val<50 && val>9){
                   $('td', nRow).css('background-color', 'Orange');
              
           }
             
           }
             if(aData[5]=='TUBE'){
            
              val = JSON.parse(aData[8]).tubes;
           if(val<10){
          $('td', nRow).css('background-color', 'Red');
           }
           if(val<50 && val>9){
                   $('td', nRow).css('background-color', 'Orange');
              
           }
             
           }
           else {
             val = JSON.parse(aData[8]).units;
             if(val<10){
          $('td', nRow).css('background-color', 'Red');
           }
           if(val<50 && val>9){
                   $('td', nRow).css('background-color', 'Orange');
              
           }
             
           }
      
   
     //   $('td', nRow).css('background-color', 'Orange');
   
    },
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='View Medicine'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
    {
        "targets": [1],
        "visible": false,
        "searchable": true
    },{
         "targets": [2],
          "visible": false,
           "searchable": true
     },
    { "targets" : [8],
          "render" : function (data, type, row) {
            
           if(row[5]=='TABLETS'){
      
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             var strips = parseInt(JSON.parse(data).tablets/JSON.parse(data).tabletsperstrip);
             return JSON.parse(data).tablets+" tablets("+ strips+" strips)";
           }
           if(row[5]=='Vial / per cc' || row[5]=='Vial / per cc' || row[5]=='Vial / per 0.5 cc' || row[5]=='per vial' || row[5]=='Per vial' || row[5]=='vial per cc'){
              var vials = parseInt(JSON.parse(data).mls)/JSON.parse(data).mlpervial;
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             return JSON.parse(data).mls + " CC ("+vials+" vials)";
           }
               if(row[5]=='per vial' || row[5]=='Per vial'){
            
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             return JSON.parse(data).vials + " vials";
           }
          if(row[5]=='per ampule'){
            
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
             return JSON.parse(data).ampules + " ampules";
           }
             if(row[5]=='BOTTLE'){
          var bottles = parseInt(JSON.parse(data).unittotal/JSON.parse(data).perbottle);
             return JSON.parse(data).unittotal+JSON.parse(data).unitperbottle+" ("+ bottles+" bottles)";
           }
             if(row[5]=='TUBE'){
          //     console.log(JSON.parse(data))
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           
              var tubes = parseInt(JSON.parse(data).unittotal/JSON.parse(data).pertube);
             return JSON.parse(data).unittotal+JSON.parse(data).unitpertube+" ("+ tubes+" tubes)";
           }
           else {
             return JSON.parse(data).units + " units";
           }
            
          },
        },
          { "targets" : [7],
          "render" : function (data, type, row) {
            
              var data2 = row[8];
            var val = data;
            if(data=='' || data==null) { val = 0;}
               if(row[5]=='TABLETS'){
               var strips = parseInt(val/JSON.parse(data2).tabletsperstrip);
             return val+" tablets("+ strips+" strips)";
           }
               if(row[5]=='Vial / per cc' || row[5]=='Vial / per cc' || row[5]=='Vial / per 0.5 cc'  || row[5]=='vial per cc'){
               var vials = parseInt(val/JSON.parse(data2).mlpervial);
             return val+" CC ("+ vials+" vials)";
           }
              if(row[5]=='per vial' || row[5]=='Per vial'){
            
             return val+" vials";
           }
                    if(row[5]=='per ampule'){
             return val+" ampules";
           }
              if(row[5]=='BOTTLE'){
          var bottles = parseInt(val/JSON.parse(data2).perbottle);
             return val+JSON.parse(data2).unitperbottle+" ("+ bottles+" bottles)";
           }
  
             if(row[5]=='TUBE'){
          //     console.log(JSON.parse(data))
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           
              var tubes = parseInt(val/JSON.parse(data2).pertube);
             return val+JSON.parse(data2).unitpertube+" ("+ tubes+" tubes)";
           }
       
                    if(row[5]=='Per supp' || row[5]=='SACHET' || row[5]=='Sachet' || row[5]=='box' || row[5]=='Set' || row[5]=='ROLLS' || row[5]=='PIECES' || row[5]=='pack' || row[5]=='Diskus'){
             return val+" units";
           }
          
            
          },
        },
          { "targets" : [6],
          "render" : function (data, type, row) {
            var data2 = row[8];
            var val = data;
            if(data=='' || data==null) { val = 0;}
               if(row[5]=='TABLETS'){
               var strips = parseInt(val/JSON.parse(data2).tabletsperstrip);
             return val+" tablets("+ strips+" strips)";
           }
               if(row[5]=='Vial / per cc' || row[5]=='Vial / per cc' || row[5]=='Vial / per 0.5 cc'  || row[5]=='vial per cc'){
               var vials = parseInt(val/JSON.parse(data2).mlpervial);
             return val+" CC ("+ vials+" vials)";
           }
              if(row[5]=='per vial' || row[5]=='Per vial'){
            
             return val+" vials";
           }
                    if(row[5]=='per ampule'){
             return val+" ampules";
           }
              if(row[5]=='BOTTLE'){
          var bottles = parseInt(val/JSON.parse(data2).perbottle);
             return val+JSON.parse(data2).unitperbottle+" ("+ bottles+" bottles)";
           }
  
             if(row[5]=='TUBE'){
          //     console.log(JSON.parse(data))
             //return JSON.parse(data).tablets +' tablets OR ' +JSON.parse(data).strips + ' strips';
           
              var tubes = parseInt(val/JSON.parse(data2).pertube);
             return val+JSON.parse(data2).unitpertube+" ("+ tubes+" tubes)";
           }
             if(data=='' || data==null) { val = 0;}
                    if(row[5]=='Per supp' || row[5]=='SACHET' || row[5]=='Sachet' || row[5]=='box' || row[5]=='Set' || row[5]=='ROLLS' || row[5]=='PIECES' || row[5]=='pack' || row[5]=='Diskus'){
             return val+" units";
           }
          
           
         
            
          },
        }			
	
  ]
  } );

   var table6 =  $('#checkoutdatatable').DataTable( {
	"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/single/checkout/admin/"+clinicId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit'><i class='fa fa-pencil'></i></button><button class='btn' id='expand2' title='Expand'><i class='fa fa-eye'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
     {
        "targets": [2],
        "visible": false,
        "searchable": true
    },
	  { "targets" : 6,
          "render" : function (data, type, row) {
            if(data == 0) return 'Pending';
           else if(data == 1) return 'Confirmed';
           else if(data == -1) return 'Cancelled';
            
          },
        }	
  ]
  } );


     $('#checkoutdatatable tbody').on( 'click', '#expand2', function () {
         var tr = $(this).closest('tr');
        var row = table6.row( tr );
    var data = table6.row( $(this).parents('tr') ).data();

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(JSON.parse(data[2]))).show();
            tr.addClass('shown');
        }
	
    } );
  
   var table7 =  $('#filesdatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/single/fileManager/admin/"+clinicId,
		"columnDefs": [


	  { "targets" : 4,
          "render" : function (data, type, row) {
           var str = data.split(',');
           var i=0;
           var finalString="";
    str.forEach(function(entry) {
  
       finalString += "<b><a href='" + entry + "'>Download File " +  Number(i+1) + "</a></b><br>"
      i++;
    
});

if(str.length==i){
  return finalString;
}
            
          },
        }	
  ]
  } );
    $('#checkindatatable tbody').on( 'click', '#edit', function () {
		var data = table4.row( $(this).parents('tr') ).data();
		 window.open('http://localhost:8080/app/checkin-view/' + data[0]);
    } );


    $('#precheckdatatable tbody').on( 'click', '#edit', function () {
    var data = table3.row( $(this).parents('tr') ).data();
    	  window.open('http://localhost:8080/app/precheckin-view/' + data[0]);
	
    } );

     $('#inventorydatatable tbody').on( 'click', '#edit', function () {
    var data = table5.row( $(this).parents('tr') ).data();
    	  window.open('http://localhost:8080/app/clinic-inventory-view/'+clinicId +'/'+ data[0]);
	
    } );
   

       $('#checkoutdatatable tbody').on( 'click', '#edit', function () {
    var data = table6.row( $(this).parents('tr') ).data();
    	  window.open('http://localhost:8080/app/checkout-view/'+ data[0]);
	
    } );
   
	




    $('#accadmindatatable tbody').on( 'click', '#edit', function () {
    var data = table.row( $(this).parents('tr') ).data();
    	  window.open('http://localhost:8080/app/workforce-view/' + data[0]);
	
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
<style scoped>
.sm {
  max-width: fit-content;
}
.headerPlace {
  position: absolute;
  top: 0%;
  right: 50px;
  margin-top: 10px;
  font-size: 12px;
  height: 20px;
}
.headerPlace.patient {
  right: 80px;
}
.completedUser {
  position: absolute;
  top: 0%;
  right: 50px;
  margin-top: 10px;
}
.page-title{
  color: white;
}

.link-container {
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.linkD{
  height: 150px;
  width: 150px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-right: 15px;
  margin-top: 15px;
  transition-duration: .5s;
  box-shadow: 1px 1px 5px #07070780;
}
.linkD:hover {
  box-shadow: 4px 4px 25px #0707078a;
  cursor: pointer;
  transition-duration: .5s;
}
.link-icon {
  font-size: 35px;
  margin-top: 10px;
}
.link-text {
  width: 100%;
  font-size: 11.5px;
  text-align: center;
  margin-top: 15px;
}
@media only screen and (max-width: 600px) {
  .link-container {
    width: 100vw;
  }
  .linkD {
    width: calc(50vw - 40px);
    height: calc(50vw - 35px);
    margin-right: 30px;
    margin-top: 30px;
  }
  .link-icon {
    font-size: 55px;
    margin-top: 20px;
  }
  .link-text {
    font-size: 15px;
    margin-top: 20px;
  }
}
</style>