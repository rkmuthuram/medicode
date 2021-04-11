<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="Sample screens" >

        <vs-tabs>
                <vs-tab label="Dashboard">
                    <div class="tab-text">
                    <warehouseDashboard >  </warehouseDashboard>
                    </div>
                </vs-tab>
                   <vs-tab label="Checkout">
                    <div class="tab-text">
                        <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="Submit" @on-complete="formSubmitted">
                <tab-content title="Client Info" class="mb-5" icon="feather icon-home">

                    <!-- tab 1 content -->
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input label="Client Name" v-model="firstName" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input label="PIC"  v-model="lastName" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input type="email" label="Email"  v-model="email" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-select v-model="city" class="w-full select-large" label="City">
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
                            </vs-select>
                        </div>
                    </div>
                </tab-content>

                <!-- tab 2 content -->
                <tab-content title="Products" class="mb-5" icon="feather icon-briefcase">
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full">
                            <vs-input label="Order No." v-model="proposalTitle" class="w-full mt-4" />
                            <vs-input label="Delivery ETA/Schedule"  v-model="jobTitle" class="w-full mt-4" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full">
                            <vs-textarea v-model="textarea" label="Order discription" class="mb-0 md:mt-10 mt-6" rows="3" />
                        </div>
                    </div>
                </tab-content>

                <!-- tab 3 content -->
                <tab-content title="Step 3" class="mb-5" icon="feather icon-image">
                    <div class="vx-row">
                       
                        <div class="vx-col md:w-1/2 w-full">
                            <vs-select v-model="city" class="w-full select-large mt-5" label="Delivery Location">
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
                            </vs-select>
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-select v-model="status" class="w-full select-large" label="Status">
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in statusOptions" class="w-full" />
                            </vs-select>
                        </div>
                        <div class="vx-col md:w-1/2 w-full md:mt-8">
                            <div class="demo-alignment">
                                <span>:</span>
                                <div class="flex">
                                  <vs-checkbox>Accept (All-Single)</vs-checkbox>
                                  <vs-checkbox>Accept (All-Multiple)</vs-checkbox>
                                  <vs-checkbox>Accept (Some-Single)</vs-checkbox>
                                  <vs-checkbox>Accept (Some-Multiple)</vs-checkbox>
                                  <vs-checkbox>Decline</vs-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-content>
            </form-wizard>
                    </div>
                </vs-tab>
                <vs-tab label="Alerts">
                    <div class="tab-text">
                        <warehouseTable>  </warehouseTable>
                    </div>
                </vs-tab>
                     <vs-tab label="Inventory">
                    <div class="tab-text">
                        <warehouseTable>  </warehouseTable>
                    </div>
                </vs-tab>
               
             
             
            </vs-tabs>

    </vx-card>
</template>

<script>
import vSelect from 'vue-select';
import warehouseDashboard from "./WarehouseDashboard.vue";
import warehouseTable from "./WarehouseTable.vue";
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  data () {
    return {
    
    }
  },
    components: {
       vSelect,warehouseDashboard,warehouseTable,  FormWizard,
    TabContent
  },
  methods:{
  

     
  },
  mounted(){

  }
}
</script>
<style>

</style>