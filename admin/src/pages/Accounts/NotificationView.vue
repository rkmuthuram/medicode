<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">View Notification - {{alertDetails.title}}/{{alertDetails.create_time}} </li>
    </ol>


    <b-row>
      <b-col md="8" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Information" active>
                <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#Check In Id</th>
                            <th>#Pre CheckIn Id</th>
                      <th class="hidden-sm-down">Clinic</th>
        
                  <th>Invoice Number</th>
                  <th class="hidden-sm-down">Amount(RM)</th>
                  <th class="hidden-sm-down">Date Added</th>
                  <th class="hidden-sm-down">Action</th>
              
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in affectedJson" :key="row.id">
                  <td>#{{row.id}}</td>
                     <td>
                   {{row.preCheckInId}}
                  </td>
                   <td>{{row.clinicName}}</td>
               
                   <td>
                   {{row.invoiceId}}
                  </td>
                   <td>
                   {{row.totalAmount}}
                  </td>
                   <td>
                   {{row.create_time}}
                  </td>
                      <td>
                   <b-button type="submit" variant="danger" class="btn-rounded float-right" @click="navigateToCheckIn(row.id,row.clinicId)">
                Manage
              </b-button>
                  </td>
               
                </tr>
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
import VueBarcode from 'vue-barcode-master';
import VueQrcode from 'vue-qrcode-master';
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
  components: { Widget,vSelect,barcode: VueBarcode,qrcode:VueQrcode},
  data() {
    return {
        notificationId: this.$route.params.notificationId,
        alertDetails:'',
        affectedJson:[],
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  
  methods: {
      navigateToCheckIn(checkInId,clinicId){
           this.$router.push({name: 'CheckInView', params: {checkInId:checkInId,clinicId:clinicId }})
      }
      ,
     async getNotification() {
         var self=this;
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/admin/single-notifications/'+ this.notificationId)
           self.alertDetails = response.data.alertDetails;
             //   self.affectedJson = response.data.alertDetails.affectedJson;
             self.affectedJson = response.data.affectedJson;
    
  } catch (error) {
    console.error(error);
  }
},


  },
   mounted(){

            this.getNotification();  
     
  
      
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
