<template>
    <div
    >       
    
        <div v-for="repeat in questions" :key="repeat.id"> 

            <p>
            {{repeat.question}}
            </p>           
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index" :disabled="NoDiagnostic == true">
                <input v-if="checkbox.label"
                :value="'healthcare'+checkbox.id "
                type="checkbox"
                :id="'healthcare'+checkbox.id "
                :checked="NoDiagnostic ==  true"
                
                />
                <label :for="'healthcare'+checkbox.id ">{{checkbox.label}}</label>
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
            :id="'healthcare'+repeat.id"
            />

            <b-col md="6" v-if="repeat.radios">
                <b-form-group class="radio abc-radio abc-radio-danger" v-for="(radio, index) in repeat.radios" :key="index">
                    <input
                    type="radio"
                    :value="radio.label"
                    :name="repeat.question"
                    :id="'healthcare'+radio.id"
                    :v-model="radio.label"
                    />
                    <label :for="'healthcare'+radio.id">{{radio.label}}</label>
                </b-form-group>
            </b-col>

            <br>       
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select';

export default {
    components:{vSelect},
    data(){
        return{
            NoDiagnostic: null,
            YesDiagnostic: '',
            questions: [
                {
                    question: 'What health care professionals have you consulted to treat these symptoms?',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'Physician',
                        },
                        {
                            id: '1b',
                            label: 'Medical Specialist ',
                        },
                        {
                            id: '1c',
                            label: 'Occupational Health Physician',
                        },
                        {
                            id: '1d',
                            label: 'Physiotherapist, Occupational Physiotherapist',
                        },
                        
                    ],
                },
                {
                    question: 'Other, please specify',
                    answer: ' ',
                },
                {
                    question: 'By immobilization, when removed?',
                    answer: ' ',
                },
                {
                    question: 'Surgical operation, when operated?',
                    answer: ' ',
                },
                {
                    // question: 'What health care professionals have you consulted to treat these symptoms?',
                    checkboxes: [
                        {
                            id: '2a',
                            label: 'Orthotics, Insoles ',
                        },
                        {
                            id: '2b',
                            label: 'Physiotherapy  ',
                        },
                        {
                            id: '2c',
                            label: 'Manual Mobilization or Manipulation',
                        },
                        {
                            id: '2d',
                            label: 'Massage ',
                        },
                        {
                            id: '2e',
                            label: 'Acupuncture',
                        },
                        
                    ],
                },
                {
                    question: 'Other treatment or modalities? Please specify',
                    answer: ' ',
                },
            ],

        }
    },
    methods: {
    }
    // computed: {
    //     whatever (){
    //         return this.questions[0].radios[1].label;
    //     }
    // }
    
}
</script>