<template>
    <div
    >
        <p>
           What medications are you regularly using (more than once per week) ? 
        </p>
        <b-form-group class="abc-checkbox abc-checkbox-danger">
            <input
            value="No"
            type="checkbox"
            id="NoRegularMed"
            v-model="NoRegularMed"
            />
            <label for="NoRegularMed">No Regular Medication</label>
        </b-form-group>
    
        <div v-for="repeat in questions" :key="repeat.id">            
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index" :disabled="NoRegularMed == true">
                <input v-if="checkbox.label"
                :value="'RegularMed'+checkbox.id "
                type="checkbox"
                :id="'RegularMed'+checkbox.id "
                :checked="NoRegularMed ==  true"
                
                />
                <label :for="'RegularMed'+checkbox.id ">{{checkbox.label}}</label>
            </b-form-group>

            <b-form class="form-label-left" v-if="repeat.options">
                <b-form-group
                label="Select One"
                label-for="Select One"
                :label-cols="4"
                >
                    <b-row>
                        <b-col md='9'>
                            <v-select
                                :id="repeat.id"
                                class="mt-xs"
                                :options="repeat.options"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form>

            <textarea-autosize v-if="repeat.answer"  
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            :id="repeat.id"
            :disabled="disable == 'No'"
            />

            <b-col md="6" v-if="repeat.radios">
                <b-form-group class="radio abc-radio abc-radio-danger" v-for="(radio, index) in repeat.radios" :key="index">
                    <input
                    type="radio"
                    :value="radio.label"
                    :name="repeat.question"
                    :id="'RegularMed'+ radio.id"
                    :v-model="radio.label"
                    />
                    <label :for="'RegularMed'+ radio.id">{{radio.label}}</label>
                </b-form-group>
            </b-col>

            <br>       
        </div>
        <b-form-group :disabled="NoRegularMed == true">
            <label for="otherRegularMed">Other medication, please specify</label>
            <textarea-autosize 
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherRegularMed"
            />
            
        </b-form-group>
    </div>
</template>

<script>
import vSelect from 'vue-select';

export default {
    components:{vSelect},
    data(){
        return{
            NoRegularMed: null,
            questions: [
                {
                    // question: 'What tests/ evaluation have you done in the past year?',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'Analgesics / Anti-Inflammatory Medication ',
                        },
                        {
                            id: '1b',
                            label: 'Pain Threshold / Nerve Damage Medication',
                        },
                        {
                            id: '1c',
                            label: 'Cardiac Medication',
                        },
                        {
                            id: '1d',
                            label: 'Rheumatoid Arthritis ',
                        },
                        {
                            id: '1e',
                            label: 'Blood Pressure Medication ',
                        },
                        {
                            id: '1f',
                            label: 'Other Severe Joint Disorders',
                        },
                        {
                            id: '1g',
                            label: 'Hyperlipidemia Medication ',
                        },
                        {
                            id: '1h',
                            label: 'Diabetes Medication  ',
                        },
                        {
                            id: '1i',
                            label: 'Asthma Medication ',
                        },
                        {
                            id: '1j',
                            label: 'Corticosteroids ',
                        },
                        {
                            id: '1k',
                            label: 'Antiepileptic Medication ',
                        },
                        {
                            id: '1l',
                            label: 'Sleeping Pills ',
                        },
                        {
                            id: '1m',
                            label: 'Antidepressant Medication ',
                        },
                        {
                            id: '1n',
                            label: 'Psychiatric Medication',
                        },
                        {
                            id: '1o',
                            label: 'Hormones  ',
                        },
                        {
                            id: '1p',
                            label: 'Gastro-Intestinal Medication',
                        },
                        {
                            id: '1q',
                            label: 'Nutritional Supplements',
                        },
                        
                    ],
                },
            ],

        }
    },
    methods: {
    }
    
}
</script>