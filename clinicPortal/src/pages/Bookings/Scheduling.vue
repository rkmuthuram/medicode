<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Smart Scheduler</li>
    </ol>


    <b-row>

      <b-col lg='12' xs='12'>
        <Widget
        
        >
           
                            <v-select
                                id="corestatus"
                                class="mt-xs"
                                placeholder="Branch"
                                :options="['Ampang','Bangi','Jalan Kuching','TTDI']"
                               v-model="selection.branch"
                               @change="getSchedule"
                            />
                           <v-select :options="years"    v-model="selection.year"   placeholder="Year"   @change="getSchedule" label="label" :value="Year" >
    <template slot="option" slot-scope="option">
        {{ option.label }}
    </template>
  </v-select>
  <v-select :options="months"    v-model="selection.month" placeholder="Month"   @change="getSchedule" label="label" :value="Month">
    <template slot="option" slot-scope="option">
        {{ option.label }}
    </template>
  </v-select>
          
                     
              
                     
                            <br>
                   

 <table class="table table-striped">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Date</th>
                  <th>TIMINGS</th>
                  <th>PHYSIOS</th>
                  <th class="hidden-sm-down">SUMMARY</th>
         
                </tr>
              </thead>
              <tbody>
                <tr v-for="(date,index) in dates" >
                  <td>{{index+1}})  {{ toReadableDate(date) }}</td>
                  <td>
                   <table class="table">
              <thead>
                <tr>
                 
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="time in timings" >
                  <td>{{time.label}}</td>

                
             
                </tr>
              </tbody>
            </table>
                  </td>
                  <td>
                       <table class="table">
              <thead>
                <tr>
                 
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="time in timings" >
                  <td v-for="physio in physioInfo"> <p-check class="p-switch p-fill">{{ filter(physio.username) }}</p-check></td>
             
                
             
                </tr>
              </tbody>
            </table>
                  </td>
               <td>
                    
                   <table class="table">
              <thead>
                <tr>
                 
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="time in timings" >
                  <td>On Duty : x | Unavailable : y | Current Bookings : z | Capacity : t% </td>

                
             
                </tr>
              </tbody>
            </table>
               
                   </td>
             
                </tr>
              </tbody>
            </table>













        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import 'pretty-checkbox/src/pretty-checkbox.scss';
import Widget from '@/components/Widget/Widget';
import Vue from 'vue';
import PrettyCheckbox from 'pretty-checkbox-vue';
import vSelect from 'vue-select';
import moment from 'moment';
export default {
  name: 'FormValidation',
  components: { Widget,PrettyCheckbox,vSelect,moment},
  data() {
    return {
      data:{
      sessions:{
        physio:[]
      }
        
      },
      selection:{
        branch:'',
        year:'',
        month:''
      },
      dates:[],
         years: [
                        {
                            label: '2020',
                            Year:2020
                        },
                        {
                            label: '2021',
                            Year:2021
                        }
                    ],
        months: [
                        {
                            label: 'January',
                            Month:0
                        },
                        {
                            label: 'February',
                            Month:1
                        },
                         {
                            label: 'March',
                            Month:2
                        },
                         {
                            label: 'April',
                            Month:3
                        },
                        {
                            label: 'May',
                            Month:4
                        },
                       {
                            label: 'June',
                            Month:5
                        },
                      {
                            label: 'July',
                            Month:6
                        },
                       {
                            label: 'August',
                            Month:7
                        },
                        {
                            label: 'September',
                            Month:8
                        },
                        {
                            label: 'October',
                            Month:9
                        },
                         {
                            label: 'November',
                            Month:10
                        },
                       {
                            label: 'December',
                            Month:11
                        },
                         
                    ],
          physioInfo:[],
            timings: [
                        {
                            id: '1a',
                            label: '08:00 AM',
                            value:'08:00'
                        },
                        {
                            id: '1b',
                            label: '09:00 AM',
                            value:'09:00'
                        },
                         {
                            id: '1c',
                            label: '10:00 AM',
                            value:'10:00'
                        },
                         {
                            id: '1d',
                            label: '11:00 AM',
                            value:'11:00'
                        },
                         {
                            id: '1e',
                            label: '12:00 PM',
                            value:'12:00'
                        },
                         {
                            id: '1f',
                            label: '01:00 PM',
                            value:'13:00'
                        },
                         {
                            id: '1g',
                            label: '02:00 PM',
                            value:'14:00'
                        },
                         {
                            id: '1h',
                            label: '03:00 PM',
                            value:'15:00'
                        },
                         {
                            id: '1i',
                            label: '04:00 PM',
                            value:'16:00'
                        },
                         {
                            id: '1j',
                            label: '05:00 PM',
                            value:'17:00'
                        },
                         {
                            id: '1k',
                            label: '06:00 PM',
                            value:'18:00'
                        },
                         {
                            id: '1l',
                            label: '07:00 PM',
                            value:'19:00'
                        },
                         {
                            id: '1m',
                            label: '08:00 PM',
                            value:'20:00'
                        },
                     
                    ],
    };
  },
  methods: {
getDaysInMonthUTC(month, year) {
  var date = new Date(Date.UTC(year, month, 1));
  var days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
},
   async getSchedule() {

     this.dates = this.getDaysInMonthUTC(this.selection.month.Month,this.selection.year.Year);
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/physio/branch/' + this.selection.branch)
   this.physioInfo = response.data.physioInfo; 
  } catch (error) {
    console.error(error);
  }
},
filter (username){
    return username.split(" ")[0];
},
toReadableDate(date){
  
 var datee = moment(date).format('dddd , MMMM Do YYYY');
 
 return datee;
}
  },
mounted(){
  

      
   },

};
</script>


