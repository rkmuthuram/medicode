<template>
    <div>
        <personal-info/>

        <b-row>
            <b-col xl="8" lg="10" md="12" >
                    <b-tabs nav-class="bg-tranparent">
                        <b-tab title="General" active>
                            <acutePainArea/>
                            <b-form-group
                                label="Current Update"
                                label-for="Current Update"
                                breakpoint="md"
                                >
                                    <b-row>
                                        <b-col md="12">
                                            <textarea-autosize
                                            placeholder=""
                                            :min-height="35"
                                            class="form-control"
                                            id="currentUpdate"
                                            />
                                        </b-col>
                                    </b-row>
                            </b-form-group>
                        </b-tab>
                        <b-tab title="Pain">
                            <acute-pain-level/>
                        </b-tab>
                        <b-tab title="Findings">
                            <physical-findings/>
                            <b-form-group
                                label="Physiotherapist Impression"
                                label-for="Physiotherapist Impression"
                                breakpoint="md"
                                >
                                    <b-row>
                                        <b-col md="12">
                                            <textarea-autosize
                                            placeholder=""
                                            :min-height="35"
                                            class="form-control"
                                            id="physiotherapistImpression"
                                            />
                                        </b-col>
                                    </b-row>
                            </b-form-group> 
                        </b-tab>
                        <b-tab title="Treatment">
                            <b-form-group v-for="textarea in textarea2" :key="textarea.id"
                                :label="textarea.label"
                                :label-for="textarea.id"
                                breakpoint="md"
                                >
                                    <b-row>
                                        <b-col md="12">
                                            <textarea-autosize
                                            placeholder=""
                                            :min-height="35"
                                            class="form-control"
                                            :id="textarea.id"
                                            />
                                        </b-col>
                                    </b-row>
                            </b-form-group>  
                        </b-tab>
                        <b-tab title="Protocol">
                            <b-row>
                            <b-col xl="12">
                                <div class="table-resposive">
                                    <table class="table">
                                    <thead>
                                        <tr>
                                        <th class="hidden-sm-down">Machine</th>
                                        <th>Motions</th>
                                        <th>Weight</th>
                                        <th>Reps</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="table in tables" :key="table.id">
                                        <td>{{table.machine}}</td>
                                        <td  v-if="table.motions">{{table.motions}}</td>
                                        <td  v-if="table.text">
                                            <textarea-autosize
                                            placeholder="Write here"
                                            :min-height="35"
                                            class="form-control"
                                            :id="'MLU'+table.text"
                                            />
                                        </td>
                                        <td>
                                            <input :id="table.machine+table.motions+table.weight" type="number" class="form-control very-small" :name="table.weight" placeholder="kg">                                            
                                        </td>
                                        <td>
                                            <input :id="table.machine+table.motions+table.reps" type="number" class="form-control very-small" :name="table.reps" placeholder="rep ">
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <div class="table-resposive">
                                    <table class="table">
                                    <tbody>
                                        <tr>
                                        <td>MLU</td>
                                        <td>
                                            <textarea-autosize
                                            placeholder="Write here"
                                            :min-height="35"
                                            class="form-control"
                                            id="MLUmotions"
                                            />
                                        </td>
                                        <td>
                                            <textarea-autosize
                                            placeholder="Write weight here"
                                            :min-height="35"
                                            class="form-control"
                                            id="MLUweight"
                                            />                                           
                                        </td>
                                        <td>
                                            <textarea-autosize
                                            placeholder="Write reps here"
                                            :min-height="35"
                                            class="form-control"
                                            id="MLUreps"
                                            />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <!-- <b-form-group>
                                    <label for="emgText">MLU (Multiple) Manual Input</label>
                                    <textarea-autosize 
                                    placeholder="Write here"
                                    :min-height="35"
                                    class="form-control"
                                    id="MLU"
                                    />
                                    
                                </b-form-group> -->
                            </b-col>
                            </b-row>
                        </b-tab>
                        <b-tab title="Remarks">
                            <b-form-group
                                label="Remarks"
                                label-for="Remarks"
                                breakpoint="md"
                                >
                                    <b-row>
                                        <b-col md="12">
                                            <textarea-autosize
                                            placeholder=""
                                            :min-height="35"
                                            class="form-control"
                                            id="Remarks"
                                            />
                                        </b-col>
                                    </b-row>
                            </b-form-group> 
                            <br>
                            <b-button variant="danger" type="submit" class="mr-xs">Submit Form</b-button>
                        </b-tab>
                        
                    </b-tabs>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import personalInfo from "./PersonalInfo"
import acutePainArea from "./AcuteBaseline/AcutePainArea"
import acutePainLevel from "./AcuteBaseline/AcutePainLevel"
import physicalFindings from "./DoctorReport/PhysicalFindings"

export default {
    components: {personalInfo,acutePainArea,physicalFindings,acutePainLevel},
    data(){
        return{
            textarea2:[
                {
                    label: 'Warm Ups',
                    id: 'warmUps'
                },
                {
                    label: 'Manual Therapy',
                    id: 'manualTherapy'
                },
                {
                    label: 'Pain Management',
                    id: 'painMgmt'
                },
            ],
            tables: [
                {
                    machine: 'LTE',
                    motions: 'Extension',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTF',
                    motions: 'Flexion',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTR',
                    motions: 'Left Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTR',
                    motions: 'Right Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTL',
                    motions: 'Left Lateral Flexion',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTL',
                    motions: 'Right Lateral Flexion',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'CEE',
                    motions: 'Extension',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'C3R',
                    motions: 'Left Rotation',
                    weight: '',
                    reps: '',
                },{
                    machine: 'C3R',
                    motions: 'Right Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'SBA',
                    motions: 'Retraction',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Left Internal Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Right Internal Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Left External Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Right External Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Bilateral',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Single Left',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Single Right',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Calf',
                    weight: '',
                    reps: '',
                },
            ],
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