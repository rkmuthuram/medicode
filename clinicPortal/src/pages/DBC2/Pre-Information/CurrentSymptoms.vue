<template>
    <div
    > 
        <div v-for="repeat in questions" :key="repeat.id">
            <p>
                {{repeat.question}}
            </p>
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index">
                <input v-if="checkbox.label"
                :value="'current'+checkbox.id"
                type="checkbox"
                :id="'current'+checkbox.id"
                />
                <label :for="'current'+checkbox.id">{{checkbox.label}}</label>
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
                                :id="'current'+repeat.question"
                                class="mt-xs"
                                :options="repeat.options"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form>
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
                    question: 'What is your primary reason for seeking physiotherpy?',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'Prevention, Conditioning'
                        },
                        {
                            id: '1b',
                            label: 'Musculoskeletal Problems'
                        },
                        {
                            id: '1c',
                            label: 'Several Musculoskeletal Problems'
                        },
                        {
                            id: '1d',
                            label: 'Neurological Symptoms or Condition'
                        },
                        {
                            id: '1e',
                            label: 'Cardiovascular Symptoms or Condition'
                        },
                        {
                            id: '1f',
                            label: 'Ventilator Symptoms or Condition'
                        },
                        {
                            id: '1g',
                            label: 'Psychosocial Symptoms or Condition'
                        },
                        {
                            id: '1h',
                            label: 'Wellness, Convenience'
                        },
                    ]
                },
                {
                    question: 'What is the duration of the current episode?',
                    options: ['Week or Less', 'One Week to One Month', 'One Month to Three Months', 'Three Months to Six Months', 'Six Months to Twelve Months', 'One Year to Two Years', 'More than Two Years']
                },
                {
                    question: 'How regular are your symptoms?',
                    options: ['No Symptoms','First Time','Sporadic','Repeated (almost once a year)','Constant (almost constant continuous)',]
                },
                {
                    question: 'How did the pain start/ injury occur?',
                    options: ['Abruptly without any specific reason','Abruptly due to injury or extrinsic factor','Gradually without any specific reason','Gradually due to overuse or extrinsic factor',]
                },
            ],

        }
    },
    
}
</script>