<template>
    <div>
        <personal-info/>
        <b-row>
            <b-col xl="8" md="12" >
                    <b-tabs nav-class="bg-tranparent">
                        <b-tab title="Section 1" active>
                            <b-tabs nav-class="bg-tranparent">
                                <b-tab title="Current Symptoms" active>
                                    <currentSymptoms/>
                                </b-tab>
                                <b-tab title="Other Symptoms">
                                    <otherSymptoms/>
                                </b-tab>
                                <b-tab title="Pain Medication">
                                    <painMedication/>
                                </b-tab>                       
                            </b-tabs>
                        </b-tab>

                        <b-tab title="Section 2">
                            <treatmentHistory/>
                        </b-tab>
                        <b-tab title="Section 3">
                            <diseaseAndMedication/>
                        </b-tab>
                        <b-tab title="Section 4" >
                            <b-tabs nav-class="bg-tranparent" @input="tabClick">
                                <b-tab title="Physical Activity" active>
                                    <physicalActivity/>
                                </b-tab>
                                <b-tab title="Working Status">
                                    <workingStatus/>
                                </b-tab>
                                <b-tab title="Personal Goals">
                                    <personalGoals/>    
                                    
                                    <!-- <b-button v-if="showButton" variant="danger" type="submit" class="mr-xs">Submit {{$route.name}}</b-button>                                -->
                                </b-tab>                       
                            </b-tabs>
                            <br>
                            <b-button v-show="showButton" variant="danger" type="submit" class="mr-xs">Submit {{$route.name}}</b-button>  
                        </b-tab>                      
                    </b-tabs>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import personalInfo from "./PersonalInfo"
import currentSymptoms from "./Pre-Information/CurrentSymptoms"
import otherSymptoms from "./Pre-Information/OtherSymptoms"
import painMedication from "./Pre-Information/PainMedication"
import treatmentHistory from "./Pre-Information/TreatmentHistory"
import diseaseAndMedication from "./Pre-Information/DiseaseAndMedication"
import physicalActivity from "./Pre-Information/PhysicalActivity"
import workingStatus from "./Pre-Information/WorkingStatus"
import personalGoals from "./Pre-Information/PersonalGoals"

export default {
    components: {personalInfo,currentSymptoms,otherSymptoms,painMedication, treatmentHistory, diseaseAndMedication,physicalActivity,workingStatus,personalGoals},
    data(){
        return{
            currentTab: 0
        }
    },
    methods:{
        tabClick(evt){
            this.currentTab = evt;
        }
    },
    computed:{
        showButton(){
            return this.currentTab == 2;
        }
    }
    
}
</script>