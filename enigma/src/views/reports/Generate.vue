<!-- =========================================================================================
  File Name: FormWizardValidation.vue
  Description: Form wizard with validation
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card title="Report Generator">


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
                        <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download" @click="downloadInventory" >All Time</vs-button><br>
                         <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download" @click="downloadInventory2" >Monthly</vs-button><br>
                     </td>
                           
                      
                             
                      
                    </tr>  

                       <tr>
                      <td>CHECKOUT</td>
                   
                      <td>
                        
                         <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download" @click="downloadCheckout('daily')" >Daily</vs-button><br>
                         <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download" @click="downloadCheckout('weekly')" >Weekly</vs-button><br>
                         <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download"  @click="downloadCheckout('monthly')" >Monthly</vs-button><br>
                        <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download" @click="downloadCheckout('alltime')" >All Time</vs-button> <br>
                           <b-col >
        
              <b-form-group>
                  <DatePicker
                    lang="en"
                    range
                    format="DD/MMM/YYYY"
                    input-class="form-control"
                    v-model="selection.timeRange"
                    id="datetimepicker"
                    @change="updatePreferences"
                  >
                    <i class="glyphicon glyphicon-th" slot="calendar-icon" />
                  </DatePicker>
                </b-form-group>
                <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download" @click="downloadCheckout('timeRange')"  >Download by Range</vs-button>
      </b-col>     </td>&nbsp;
                             
                      
                    </tr>     

                         <tr>
                      <td>DAILY SUMMARY</td>
                   
                      <td>
                           <vs-button color="success" type="filled" icon-pack="feather" icon="icon-download" @click="downloadSummary" >Download</vs-button>
                        </td>
                           
                      
                             
                      
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
    <br>

  </vx-card>
  
   
</template>

<script>

import { Validator } from 'vee-validate';
import vSelect from 'vue-select';
import DatePicker from "vue2-datepicker";
  import 'vue2-datepicker/index.css';
export default {
  data () {
    return {
        clinicId: JSON.parse(localStorage.getItem('userInfo')).clinicId,
             selection:{
        timeRange:''
      },
         isLoading:false,
             fromDate: null,
            toDate: null,
            configFromdateTimePicker: {
              minDate: new Date(),
              maxDate: null
            },
            configTodateTimePicker: {
              minDate: null
            }
    }
  },
  methods: {
       downloadInventory(){
      var self=this;
         self.$http.post('clinic/download/reportInventory/'+self.clinicId, {
           
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
           
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
            
          
                  }
                 else {
              
                   }
                }
                })
                .catch(function (error) {
                         
                });  
    },
      downloadSummary(){
      var self=this;
         self.$http.post('clinic/download/reportSummary/'+self.clinicId, {
           
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
     
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
            
          
                  }
                 else {
           
                   }
                }
                })
                .catch(function (error) {
                           
                });  
    },
      downloadInventory2(){
      var self=this;
         self.$http.post('clinic/download/reportInventory2/'+self.clinicId, {
           
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
        
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
             
          
                  }
                 else {
               
                   }
                }
                })
                .catch(function (error) {
                       
                });  
    },
     downloadCheckout(type){
      var self=this;
     
        var timeRange = self.selection.timeRange;
       if(timeRange=='' || timeRange[0]==null){
       timeRange = 'All';
     }
   
         self.$http.post('clinic/download/reportCheckout/'+self.clinicId, {
           type:type,
           timeRange:timeRange
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
            
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                 
          
                  }
                 else {
                 
                   }
                }
                })
                .catch(function (error) {
                           
                });  
    },
  },
  mounted(){
    
   
 

   },
  components: {
  vSelect,DatePicker
  }
}
</script>
