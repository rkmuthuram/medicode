<template>
    <div
    > 
        <p>
            Other Symptoms?
        </p>
        <b-form-group class="abc-checkbox abc-checkbox-danger">
            <input
            value="No"
            type="checkbox"
            id="NoOther"
            v-model="NoOther"
            />
            <label for="NoOther">No</label>
        </b-form-group>

        <div v-for="repeat in questions" :key="repeat.id">
            <p>
                {{repeat.question}}
            </p>
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index" :disabled="NoOther == true">
                <input v-if="checkbox.label"
                :value="'other'+checkbox.id "
                type="checkbox"
                :id="'other'+checkbox.id "
                :checked="NoOther ==  true"
                />
                <label :for="'other'+checkbox.id ">{{checkbox.label}}</label>
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
            />

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
            NoOther: null,
            questions: [
                {
                    // question: 'Other Symptoms?',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'No other symptoms'
                        },
                        {
                            id: '1b',
                            label: 'Headache'
                        },
                        {
                            id: '1c',
                            label: 'Blurred Vision'
                        },
                        {
                            id: '1d',
                            label: 'Dizziness'
                        },
                        {
                            id: '1e',
                            label: 'Recurrent Stomach Pain'
                        },
                        {
                            id: '1f',
                            label: 'Lost of Weight'
                        },
                        {
                            id: '1g',
                            label: 'Abnormal Symptoms in Thorax Area'
                        },
                        {
                            id: '1h',
                            label: 'Shortness of Breath, Hyperventilation'
                        },
                        {
                            id: '1i',
                            label: 'Incontinency'
                        },
                        {
                            id: '1j',
                            label: 'General Fatigue, Tiredness'
                        },
                        {
                            id: '1k',
                            label: 'Concentration Difficulties'
                        },
                        {
                            id: '1l',
                            label: 'Nervousness, Anxiety'
                        },
                        {
                            id: '1m',
                            label: 'Low Mood'
                        },
                        
                    ]
                },
                {
                    question: 'Have you experienced other associated symptoms?',
                    answer: ' '
                }
            ],

        }
    },
    
}
</script>