<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
   <li class="breadcrumb-item active">View Block #{{blockingId}}</li>
    </ol>


    <b-row>

      <b-col lg='8' xs='12'>
        <Widget
          title="<h5>        
            <small> Fill up & click Submit</small>
          </h5>"
          customHeader 
        >
          <b-form >
            <fieldset>
              <legend>
               
              </legend>

                   <b-form-group
                  label="Date"
                  label-for="description"
                  description=""
                >
     <input type="text" placeholder="Start" v-model="data.date"  class="form-control" disabled>
                  </b-form-group>

                <b-form-group
                  label="Branch"
                >
           
                  <v-select
                        
                    v-model="data.branch"
                    disabled
                  :options="['TTDI', 'Ampang','Jalan Kuching','Bangi']"
              
                  />
        </b-form-group>
       
              <p>Blocked / Reduced Capacity List</p>
       {{data.session}}

            </fieldset>
        
          </b-form>

           <b-button type="button" variant="warning" class="btn-rounded" @click="deleteBlock()">
       DELETE BLOCK
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
import DatePicker from 'vue2-datepicker';
import Vue from 'vue';
import moment from 'moment';
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
  components: { Widget,vSelect,DatePicker },
  data() {
    return {
       blockingId: this.$route.params.blockingId,
      data:{
        
       date:'',
       branch:'',
       session:'',
       time:'',
       capacity:''
      },
        start_time:'',
        end_time:'',
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      isLoading:false,
      allMembersInfo:[],      
    };
  },
  methods: {
    addToList(){
      var time = this.data.time;
      var capacity  = this.data.capacity;
       this.data.time = '';
      this.data.capacity = 0;
     return this.data.session[time] = parseInt(capacity);
     


    },
      navigateToList(){
        this.$router.push({name:'BlockedListing'});
    },
    deleteBlock() {
       var self = this;
      self.axios.delete('https://backend.medicodesolution.com/staging/blocked_sessions/'+this.blockingId)
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

    async getBlocking() {
    
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/blocked_sessions/'+ this.blockingId)
   
   this.data.branch = response.data.sessionInfo[0].branch;
   this.data.date = response.data.sessionInfo[0].date;

 this.data.session = response.data.sessionInfo[0].session;
 
  } catch (error) {
    console.error(error);
  }
}
  },
  created() {
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.locationClasses,
      theme: 'air',
      showCloseButton: true,
    };
  
  },
   mounted(){
     this.getBlocking();
     
  
      
   },
};
</script>
