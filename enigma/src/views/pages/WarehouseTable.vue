<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>


     

        <vs-table stripe :data="unitDetails"  search>

            <template slot="thead">
             
                <vs-th>Name</vs-th>
                <vs-th>Reminder Type</vs-th>
               <vs-th>Group / Type</vs-th>  
                 <vs-th>Date Time</vs-th>
                
                   <vs-th>Status</vs-th>

            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data"  :state="data[indextr].status == 'Parked'?'primary':data[indextr].status == 'Inactive'?'danger':data[indextr].status == 'Moving'?'success':data[indextr].status == 'Idling'?'warning':null">
                   
                        <vs-td>
                        <span> <b>{{data[indextr].assetName}} </b></span> 
                 
                    </vs-td>
                        <vs-td>
                    <span> <b>{{data[indextr].lastUpdated}}</b></span>
        
                    </vs-td>
                       <vs-td>
                        <span> <b>{{data[indextr].ignition}}</b></span> 
                      
                    </vs-td>
                  <!--      <vs-td>
                   <span> <b>{{data[indextr].assetGroup}} ({{data[indextr].assetType}})</b></span> 
                    
                    </vs-td> -->
                       
                      
                        <vs-td>
                       <span> <b>{{data[indextr].speed}} kph</b></span> 
                   
                    </vs-td>
                       
                     <vs-td>
                   <span v-if="data[indextr].idlingStatus==1"> <b>{{data[indextr].minLastUpdated}} minutes</b></span> <span v-if="data[indextr].idlingStatus==0"> <b> NO </b></span> 
                       
                  
                    </vs-td>
                 
                        <vs-td>
                       <span> <b>{{data[indextr].mileage}} km</b></span> 
                     
                    </vs-td>
                    
                   
                  <vs-td><span v-if="data[indextr].fuelLevel!='NA'"> <b>{{data[indextr].fuelLevel}} litres ({{data[indextr].fuelPct}}%)</b></span>
                  <span v-if="data[indextr].fuelLevel=='NA'"><b>NA</b></span>
                  </vs-td>
                  
                       
                        <vs-td>
                   <span v-if="data[indextr].isInsidePolygon==true"> <b>{{data[indextr].poiName}}</b></span> <span v-if="data[indextr].isInsidePolygon==false && data[indextr].distanceFromNearest<1"> <b>{{data[indextr].address}} ({{data[indextr].distanceFromNearest}}km from {{data[indextr].poiName}})</b></span>  <span v-if="data[indextr].isInsidePolygon==false && data[indextr].distanceFromNearest>=1"> <b>{{data[indextr].address}}</b></span> <br><a target="_blank" :href="'https://www.google.com/maps/search/?api=1&query='+data[indextr].lat+','+data[indextr].lng">Open in Maps</a>
                    </vs-td>
                        <vs-td>
                          <span> <b>{{data[indextr].status}}</b></span> 
                     
                    </vs-td>
            
                  
                </vs-tr>
            </template>
        </vs-table>

    

</template>

<script>


export default {
  data () {
    return {
  
          
   
     unitDetails:[],
  
    }
  },
    components: {

  },
  methods:{

     
  },
  mounted(){
   
  }
}
</script>
