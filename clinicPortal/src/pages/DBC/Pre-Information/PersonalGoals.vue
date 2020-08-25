<template>
    <div
    >     
        <div v-for="repeat in questions" :key="repeat.id">
            <p>
                {{repeat.question}}
            </p>
            
            <b-form-group class="abc-checkbox abc-checkbox-default" v-for="(checkbox, index) in repeat.checkboxes" :key="index">
                <input v-if="checkbox.label"
                :value="'personalGoals'+checkbox.id "
                type="checkbox"
                :id="'personalGoals'+checkbox.id "
                />
                <label :for="'personalGoals'+checkbox.id ">{{checkbox.label}}</label>
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
            :id="'personalGoals'+repeat.id"
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
                    question: 'What goals do you have for the physiotherapy and rehabilitation program ? ',
                    checkboxes: [
                        {
                            id: '1a',
                            label: ' Relieve Pain ',
                        },
                        {
                            id: '1b',
                            label: 'Return to Work ',
                        },
                        {
                            id: '1c',
                            label: 'Resume Recreational Activities ',
                        },
                        {
                            id: '1d',
                            label: 'Restore of daily functioning',
                        },
                        {
                            id: '1e',
                            label: 'Resume sport activities ',
                        },
                        {
                            id: '1f',
                            label: 'Restore personal relationships  ',
                        },
                    ]
                },
                {
                    question: 'Other personal goals. If you want please tell more about your goals and expectations ',
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