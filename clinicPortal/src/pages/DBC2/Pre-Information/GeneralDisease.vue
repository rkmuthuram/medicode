<template>
    <div
    >
        <p>
            Do you have, or have you had, any of the following conditions? 
        </p>
        <b-form-group class="abc-checkbox abc-checkbox-danger">
            <input
            value="No"
            type="checkbox"
            id="NoGeneralDisease"
            v-model="NoGeneralDisease"
            />
            <label for="NoGeneralDisease">No Disease or Health Risk Factors Below</label>
        </b-form-group>
    
        <div v-for="repeat in questions" :key="repeat.id">            
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index" :disabled="NoGeneralDisease == true">
                <input v-if="checkbox.label"
                :value="'GeneralDisease'+checkbox.id "
                type="checkbox"
                :id="'GeneralDisease'+checkbox.id "
                :checked="NoGeneralDisease ==  true"
                
                />
                <label :for="'GeneralDisease'+checkbox.id ">{{checkbox.label}}</label>
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
                    :id="'selfTreatment'+ radio.id"
                    :v-model="radio.label"
                    />
                    <label :for="'selfTreatment'+ radio.id">{{radio.label}}</label>
                </b-form-group>
            </b-col>

            <br>       
        </div>
        <b-form-group :disabled="NoGeneralDisease == true">
            <label for="otherGeneralDisease">Other chronic disease or condition, please specify</label>
            <textarea-autosize 
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherGeneralDisease"
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
            NoGeneralDisease: null,
            questions: [
                {
                    // question: 'What tests/ evaluation have you done in the past year?',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'Malignant Disease ',
                        },
                        {
                            id: '1b',
                            label: 'Coronary Artery Disease ',
                        },
                        {
                            id: '1c',
                            label: 'Other Heart or Circulatory Disease',
                        },
                        {
                            id: '1d',
                            label: 'Rheumatoid Arthritis ',
                        },
                        {
                            id: '1e',
                            label: 'Spondylarthritis',
                        },
                        {
                            id: '1f',
                            label: 'Other Severe Joint Disorders',
                        },
                        {
                            id: '1g',
                            label: 'HIV',
                        },
                        {
                            id: '1h',
                            label: 'Osteoporosis ',
                        },
                        {
                            id: '1i',
                            label: 'Asthma, Ventilatory Disorder ',
                        },
                        {
                            id: '1j',
                            label: 'High Eye Pressure',
                        },
                        {
                            id: '1k',
                            label: 'High Blood Pressure',
                        },
                        {
                            id: '1l',
                            label: 'High Cholesterol Levels',
                        },
                        {
                            id: '1m',
                            label: 'Diabetes ',
                        },
                        {
                            id: '1n',
                            label: 'Hyperthyroidism or Hypothyroidism',
                        },
                        {
                            id: '1o',
                            label: 'Epilepsy ',
                        },
                        {
                            id: '1p',
                            label: 'Mental Disorder',
                        },
                        {
                            id: '1q',
                            label: 'Mental Disease',
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