<template>
    <div>
        <b-row>
            <b-col xl="8" lg="10" md="12" >
                    <b-tabs nav-class="bg-tranparent">
                        <b-tab title="Personal Information" active>
                            <personal-information/>
                        </b-tab>
                        <b-tab title="Important Information">
                            <important-info/>
                        </b-tab>
                        <b-tab title="Work Information">
                            <work-info/>
                            <br>
                            <b-button variant="danger" type="submit" class="mr-xs">Submit Form</b-button>
                        </b-tab>
                        
                    </b-tabs>
            </b-col>
        </b-row>     
    </div>
</template>

<script>
import Vue from 'vue';
import DatePicker from 'vue2-datepicker';
import vSelect from 'vue-select';
import personalInformation from './PersonalForm/PersonalInformation'
import importantInfo from './PersonalForm/Important'
import workInfo from './PersonalForm/WorkInformation'

export default {
    data(){
        return{
        }
    },
    components: {
        DatePicker,
        vSelect,
        personalInformation,
        importantInfo,
        workInfo
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