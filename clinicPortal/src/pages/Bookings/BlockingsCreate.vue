<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Add New Blocked Session</li>
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
                  label="Select Date"
                  label-for="description"
                  description=""
                >
     <input type="date" placeholder="Start" v-model="data.date"  class="form-control">
                  </b-form-group>

                <b-form-group
                  label="Select Branch"
                >
           
                  <v-select
                        
                    v-model="data.branch"
                  
                  :options="['TTDI', 'Ampang','Jalan Kuching','Bangi']"
              
                  />
        </b-form-group>
        <p>Select Time & Capacity and Click Add to List. You should see the blocked list below fill up,once done click submit button below </p>
                <b-form-group
                  label="Select Time & Capacity Below"
               
                >
           
                  <v-select
                        
                    v-model="data.time"
                    
                    :options='["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"]'
              
                  />
                   <input type="number" v-model="data.capacity" class="form-control very-small"   placeholder="Enter capacity">
        </b-form-group>
<b-button type="button" variant="default" class="btn-rounded" @click="addToList()" >
               Add to List
              </b-button>
<br><br>
              <p>Blocked / Reduced Capacity List</p>
        <ul id="v-for-object" class="demo">
  <li v-for="(value,key) in data.session">
  TIME: {{key}}    | CAPACITY :  {{ value }} 
  </li>
</ul> <br><br><br>
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
import vSelect from 'vue-select';
import DatePicker from 'vue2-datepicker';
import Vue from 'vue';
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
      data:{
       date:'',
       branch:'',
       session:{
          
       },
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
    onSubmit(e) {
       var self = this;
         e.preventDefault();
  
       
         if(self.data.date == '' || self.data.branch == '' || Object.keys(self.data.session).length === 0 && self.data.session.constructor === Object){
            return Messenger().post({ type:'error',message :"Fill up all fields & Add at least one sesion to list before clicking Submit"});
        }
     // self.isLoading = true;
      var session = JSON.stringify(self.data.session);
        
                self.axios.post('https://backend.medicodesolution.com/staging/blocked_sessions/add', {
                 date:self.data.date,
                 branch:self.data.branch,
                 session:session
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
   
   }
};
</script>
