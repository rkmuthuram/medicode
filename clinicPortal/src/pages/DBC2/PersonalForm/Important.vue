<template>
    <div>
        <b-row>
            <b-col xl="12" lg="12" md="12" >
                <!-- <Widget
                title="<h6> Doctor | Hospital | Insurance</h6>"
                 collapse customHeader
                > -->
<b-form class="form-label-left">
                        <b-form-group
                        label="Operation"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="operationSelect"
                                :options="['Pre-Operation','Post-Operation']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                        
                    
                    </b-form>
                           <b-form class="form-label-left">
                        <b-form-group
                        label="Module Number"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                    <select v-model="moduleSelect" >
    <option v-for="n in moduleCount" :value="n-1">{{ n-1 }}</option>
  </select>
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                    <b-form class="form-label-left">
                        <b-form-group
                        label="Doctor"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="doctorSelect"
                                :options="['Large Magellanic Cloud', 'Andromeda Galaxy', 'SextansA']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>

                    <b-form class="form-label-left">
                        <b-form-group
                        label="Hospital"
                        label-for="hospitalSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="hospitalSelect"
                                class="mt-xs"
                                v-model="hospitalSelect"
                                :options="['Large Magellanic Cloud', 'Andromeda Galaxy', 'SextansA']"
                            />
                            
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>

                    <b-form class="form-label-left">
                        <b-form-group
                        label="Payment Mode"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="paymentSelect"
                                :options="['Panel Insurance','Pay & Claim','Cash','FOC','Others']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                       <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Payment Mode Details"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="paymentSelect=='Others'"
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                    
                    <b-form class="form-label-left">
                        <b-form-group
                        v-if="paymentSelect=='Panel Insurance'"
                        label="Insurance Panel"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="insuranceSelect"
                                class="mt-xs"
                                v-model="insuranceSelect"
                                :options="['Prudential','Great Eastern','AIA Personal','AXA','Zurich','TNB']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>


                <!-- </Widget> -->
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue';
import DatePicker from 'vue2-datepicker';
import vSelect from 'vue-select';

export default {
    data(){
        return{
            datetimepickerText: null,
            educationSelect: 'Select Education Type',
            doctorSelect: 'Select Doctor',
            workCategorySelect: 'Select Work Category',
            hospitalSelect:'Select Hospital',
            insuranceSelect: 'Select Insurance Type',
            paymentSelect: 'Select Payment Type',
            operationSelect:'Select Type',
            moduleCount:101
        }
    },
    components: {
        DatePicker,
        vSelect,
    },
    methods: {
        selectDate(val) {
        Vue.set(this, 'datetimepickerText', val.toLocaleDateString());
        },
    }
}
</script>

<style scoped>
.small-form {
    max-width: 210px;
    width: 210px;
}
</style>