<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>

    <vx-card :title="'Low Stock Alert - '+ alertDetails.create_time  +' , 8.00 am '" >
 <downloadexcel :data="sanitizedJson"  >
     <vs-button class="bg-success-gradient ml-4" >Export to CSV</vs-button>
</downloadexcel>
     
  <br>
        <vs-table stripe :data="affectedJson" pagination max-items="15">

            <template slot="thead">
                <vs-th>Manufacturer</vs-th>
                <vs-th>Product Name.</vs-th>
                <vs-th>Prescription</vs-th>
                <vs-th>Balance</vs-th>
                <vs-th>Action</vs-th>
               
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td>
                   <span> <b>{{data[indextr].manufacturer}}</b></span> 
                     
                    </vs-td>
                        <vs-td>
                        <span> <b>{{data[indextr].name}}</b></span> 
                 
                    </vs-td>
                        <vs-td>
                   <span> <b>{{data[indextr].prescription}}</b></span> 
                    
                    </vs-td>
                       <vs-td>
                   <span v-if="data[indextr].prescription=='TABLETS'"> <b>{{JSON.parse(data[indextr].balanceQuantity).tablets}} tab / {{Math.ceil(parseInt(JSON.parse(data[indextr].balanceQuantity).tablets/JSON.parse(data[indextr].balanceQuantity).tabletsperstrip)).toFixed(0)}} strips</b></span> 
                     <span v-if="data[indextr].prescription=='TUBE'"> <b>{{JSON.parse(data[indextr].balanceQuantity).unittotal}}{{JSON.parse(data[indextr].balanceQuantity).unitpertube}}/ {{Math.ceil(parseInt(JSON.parse(data[indextr].balanceQuantity).unittotal/JSON.parse(data[indextr].balanceQuantity).pertube)).toFixed(0)}} tubes</b></span> 
                      <span v-if="data[indextr].prescription=='BOTTLE'"> <b>{{JSON.parse(data[indextr].balanceQuantity).unittotal}}{{JSON.parse(data[indextr].balanceQuantity).unitperbottle}}/ {{Math.ceil(parseInt(JSON.parse(data[indextr].balanceQuantity).unittotal/JSON.parse(data[indextr].balanceQuantity).perbottle)).toFixed(0)}} bottles</b></span> 
                        <span v-if="data[indextr].prescription=='per vial' || data[indextr].prescription=='Per vial'"> <b>{{JSON.parse(data[indextr].balanceQuantity).vials}} vials</b></span> 
                         <span v-if="data[indextr].prescription=='per ampule'"> <b>{{JSON.parse(data[indextr].balanceQuantity).ampules}} ampules</b></span> 
                           <span v-if="data[indextr].prescription=='Vial / per cc' || data[indextr].prescription=='Vial / per 0.5 cc' ||data[indextr].prescription=='vial per cc'"> <b>{{JSON.parse(data[indextr].balanceQuantity).mls}} CC / {{JSON.parse(data[indextr].balanceQuantity).mls/JSON.parse(data[indextr].balanceQuantity).mlpervial }} vials</b></span> 
                            <span v-if="data[indextr].prescription=='Per supp' || data[indextr].prescription=='SACHET' || data[indextr].prescription=='Sachet' || data[indextr].prescription=='box' || data[indextr].prescription=='Set' || data[indextr].prescription=='ROLLS' || data[indextr].prescription=='PIECES' || data[indextr].prescription=='pack' || data[indextr].prescription=='Diskus'"> <b>{{JSON.parse(data[indextr].balanceQuantity).units}} units</b></span>
                    
                    </vs-td>
                       
                       
                        <vs-td>
                      <span>  <vs-button @click="manage(data[indextr].productId)">Manage</vs-button></span> 
                     
                    </vs-td>
                    
                     
                       

               
                </vs-tr>
            </template>
        </vs-table>

     

    </vx-card>
</template>

<script>
import JsonExcel from "vue-json-excel";


export default {
  data () {
    return {
     alertDetails:'',
     userInfo:JSON.parse(localStorage.getItem('userInfo')),
     notificationId: this.$route.params.notificationId,
     affectedJson:[],
     sanitizedJson:[],
    }
  },
     components: {
   downloadexcel: JsonExcel
  },
  methods:{
      manage(productId){
    this.$router.push({name: 'manageStock', params: {clinicId: this.userInfo.clinicId,productId:productId }})
        .catch(() => {})
      },
      getAlert(){
   var self=this;
         self.$http.get('enigma/single-notifications/'+self.notificationId, {
           
                })  
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                    
                self.alertDetails = response.data.alertDetails;
             //   self.affectedJson = response.data.alertDetails.affectedJson;
             self.affectedJson = response.data.affectedJson;

var index=0;
            self.affectedJson.forEach(function(entry) {
            
            
          var currentQuantity;
  currentQuantity =  JSON.parse(entry.balanceQuantity).units;
  if(entry.prescription=='TABLETS'){
   
   
   currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";

  }
  else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
   
    currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
   
   }
   else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
    
     currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
    
    }
else if(entry.prescription=='per ampule'){
   

   currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";

  }
 else if(entry.prescription=='BOTTLE'){

  currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
  }
  else  if(entry.prescription=='TUBE'){

   currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
  }


       self.sanitizedJson.push({
                manufacturer:entry.manufacturer,
                product_name:entry.name,
                prescription:entry.prescription,
                balance:currentQuantity
              })

 

  
    index++;
});

             //   console.log(self.affectedJson)
               
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
      this.getAlert();
  }
}
</script>
