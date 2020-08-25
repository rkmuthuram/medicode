<template>
    <div
    >
        <div v-for="repeat in questions" :key="repeat.id">
   
        <p>
            {{repeat.question}}
        </p>       
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index" :disabled="NoGeneralDisease == true">
                <input v-if="checkbox.label"
                :value="'GeneralDisease'+checkbox.id "
                type="checkbox"
                :id="'GeneralDisease'+checkbox.id "
                :checked="NoGeneralDisease ==  true"
                
                />
                <label :for="'GeneralDisease'+checkbox.id ">{{checkbox.label}}</label>
            </b-form-group>

            <b-form class="form-label-left" v-if="repeat.left">
                <b-form-group
                label="Activity"
                label-for="Activity"
                :label-cols="4"
                >
                    <b-row>
                        <b-col md='4' class="very-small">
                            {{repeat.left}}
                        </b-col>
                        <b-col md='4' class="very-small">
                            <p>{{repeat.right}}</p>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form>

            <b-form class="form-label-left" v-if="repeat.options">
                <b-form-group
                :label="repeat.label"
                label-for="shoulderLabel"
                :label-cols="4"
                >
                    <b-row>
                        <b-col md='4' class="very-small">
                            <v-select
                                :id="$route.name+'left'+repeat.label"
                                class="mt-xs"
                                :options="repeat.options"
                            />
                        </b-col>
                        <b-col md='4' class="very-small">
                            <v-select
                                :id="$route.name+'right'+repeat.label"
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
                <b-form-group class="radio abc-radio abc-radio-success" v-for="(radio, index) in repeat.radios" :key="index">
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
        </div>
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
                    question: 'Which knee is the involved knee ?',
                    radios: [
                        {
                            id: '1a',
                            label: 'Right',
                        },
                        {
                            id: '1b',
                            label: 'Left',
                        },
                    ],
                    
                },
                {
                    question: 'How does your contralateral knee feel ?',
                    radios: [
                        {
                            id: '2a',
                            label: 'Normal',
                        },
                        {
                            id: '2b',
                            label: 'Nearly Normal',
                        },
                        {
                            id: '2c',
                            label: 'Abnormal',
                        },
                        {
                            id: '2d',
                            label: 'Severely Abnormal',
                        },
                    ],
                    
                },
                {
                    question: 'What is the chief complaint ?',
                    answer: ' '
                    
                },
                {
                    question: 'How does your contralateral knee feel ?',
                    radios: [
                        {
                            id: '3a',
                            label: 'Non-traumatic Gradual Onset',
                        },
                        {
                            id: '3b',
                            label: 'Non-traumatic Sudden Onset',
                        },
                        {
                            id: '3c',
                            label: 'Traumatic Non-contact Onset',
                        },
                        {
                            id: '3d',
                            label: 'Traumatic Contact Onset',
                        },
                    ],
                    
                },
                {
                    question: 'How many operations have you had previously on your knee ?',
                    answer: ' '
                    
                },
            ],

        }
    },
    methods: {
    }
    
}
</script>

<style scoped>
.very-small {
    max-width: 120px;
    margin-right: 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>