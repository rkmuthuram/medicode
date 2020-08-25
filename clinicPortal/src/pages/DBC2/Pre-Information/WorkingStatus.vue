<template>
    <div
    >     
        <div v-for="repeat in questions" :key="repeat.id">
            <p>
                {{repeat.question}}
            </p>
            
            <b-form-group class="abc-checkbox abc-checkbox-default" v-for="(checkbox, index) in repeat.checkboxes" :key="index">
                <input v-if="checkbox.label"
                :value="'workStat'+checkbox.id "
                type="checkbox"
                :id="'workStat'+checkbox.id "
                />
                <label :for="'workStat'+checkbox.id ">{{checkbox.label}}</label>
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
            :id="'workStat'+repeat.id"
            />

            <b-col md="6" v-if="repeat.radios">
                <b-form-group class="radio abc-radio abc-radio-success" v-for="(radio, index) in repeat.radios" :key="index">
                    <input
                    type="radio"
                    :value="radio.label"
                    :name="repeat.question"
                    :id="'workStat'+ radio.id"
                    :v-model="radio.label"
                    />
                    <label :for="'workStat'+ radio.id">{{radio.label}}</label>
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
            questions: [
                {
                    question: 'Are you currently continuing with your work duties? ',
                    radios: [
                        {
                            id: '1a',
                            label: 'Full Time Working',
                        },
                        {
                            id: '1b',
                            label: 'Part Time Working ',
                        },
                        {
                            id: '1c',
                            label: 'Not Working Currently',
                        },
                        {
                            id: '1d',
                            label: 'Currently on Sick Leave due to This Problem',
                        },
                        {
                            id: '1e',
                            label: 'Currently on Sick Leave due to Other Problem ',
                        },
                    ]
                },
                {
                    question: 'What type of work do you do? ',
                    radios: [
                        {
                            id: '2a',
                            label: 'Sedentary Work',
                        },
                        {
                            id: '2b',
                            label: 'Light Work ',
                        },
                        {
                            id: '2c',
                            label: 'Medium Work ',
                        },
                        {
                            id: '2d',
                            label: 'Heavy Work',
                        },
                        {
                            id: '2e',
                            label: 'Very Heavy Work ',
                        },
                    ]
                },
                {
                    question: 'How many days have you missed from work in the past 12 months due to these symptoms? ',
                    answer: ' '
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