<template>
    <div>
        <b-row >
            <b-col xl="12">
                    <b-form-group
                    label="Test Weight"
                    label-for="testWeight"
                    label-class="text-md-left px-3"
                    label-cols="8"
                    breakpoint="md"
                    >
                        <b-row>
                            <input v-model="sblform.f1" id="testWeight" type="number" class="form-control very-small" name="testWeight" placeholder="0">
                            <input type="text" class="form-control input-transparent very-small" name="plates" placeholder="plates" disabled>
                        </b-row>  
                    </b-form-group> 
            </b-col>
        </b-row>
        <br>
        <b-row>
        <b-col xl="12">
            <b-row >
                <b-col xl="12">
                        <b-form-group
                        label="EMG Reading Left"
                        label-for="emgReadingLeft"
                        label-class="text-md-left px-3"
                        label-cols="8"
                        breakpoint="md"
                        >
                            <b-row>
                                <input v-model="sblform.f2" id="emgReadingLeft" type="number" class="form-control very-small" name="emgReadingLeft" placeholder="0">
                            </b-row>  
                        </b-form-group> 
                </b-col>
            </b-row>
            <b-row >
                <b-col xl="12">
                        <b-form-group
                        label="EMG Reading Right"
                        label-for="emgReadingRight"
                        label-class="text-md-left px-3"
                        label-cols="8"
                        breakpoint="md"
                        >
                            <b-row>
                                <input v-model="sblform.f3" id="emgReadingRight" type="number" class="form-control very-small" name="emgReadingRight" placeholder="0">
                            </b-row>  
                        </b-form-group> 
                </b-col>
            </b-row>
            <br>
            <b-row >
                <b-col xl="12" >
                        <b-form-group
                        label="Co-ordination during Fatigue Test"
                        label-for="coordination"
                        label-class="text-md-left px-3"
                        label-cols="8"
                        breakpoint="md"
                        >
                            <b-row>
                                <input v-model="sblform.f4" id="coordination" type="number" class="form-control very-small" name="coordination" placeholder="0">
                            </b-row>  
                        </b-form-group> 
                </b-col>
            </b-row>
            
            
            <br>
            <b-form class="form-label-left">
                <b-form-group
                label="Coordination Measurement Outcome"
                label-for="label"
                :label-cols="8"
                >
                    <b-row>
                        <b-col md='9' >
                            <v-select
                                id="coordinationMeasurementOutcome"
                                class="mt-xs"
                                :options="['Normal','Abnormal','Severely Abnormal']"
                                v-model="sblform.f5"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form> 
            <br>
            <b-form-group>
                <label for="fatigueText">Physio Interpretation:</label>
                <textarea-autosize 
                placeholder="Write here"
                :min-height="35"
                class="form-control"
                id="fatigueText"
                v-model="sblform.f6"
                />
                
            </b-form-group>
        </b-col>
        </b-row>
    </div>    
</template>

<script>
import vSelect from 'vue-select';

export default {
    components: {vSelect},
    data(){
        return{
            coordination: '',
            testWeight: '',
            emgReadingLeft: '',
            emgReadingRight: ''

        }
    },
    
}
</script>

<style scoped>
.very-small {
    max-width: 60px;
    margin-right: 10px;
}
.progress-container{
    width: 100%;
    height: 35px;
    /* padding-top: 12px; */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>