<template>
    <div
    > 
        <div>
            <p>
                Do you use pain and/or anti-inflammatory medications?
            </p>

            <b-col md="6" >
                <b-form-group class="radio abc-radio abc-radio-success" >
                    <input
                    type="radio"
                    value="Yes"
                    name="YesPain"
                    id="YesPain"
                    checked
                    v-model="disable"
                    />
                    <label for="YesPain">Yes</label>
                </b-form-group>
                <b-form-group class="radio abc-radio abc-radio-danger" >
                    <input
                    type="radio"
                    value="No"
                    name="NoPain"
                    id="NoPain"
                    v-model="disable"
                    />
                    <label for="NoPain">No</label>
                </b-form-group>
            </b-col>

            <br>
        </div>
    
        <div v-for="repeat in questions" :key="repeat.id">
            <p>
                {{repeat.question}}
            </p>
            
            <b-form-group class="abc-checkbox abc-checkbox-default" v-for="(checkbox, index) in repeat.checkboxes" :key="index">
                <input v-if="checkbox.label"
                :value="'pain'+checkbox.id "
                type="checkbox"
                :id="'pain'+checkbox.id "
                />
                <label :for="'pain'+checkbox.id ">{{checkbox.label}}</label>
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
            :id="'pain'+repeat.id"
            :disabled="disable == 'No'"
            />

            <b-col md="6" v-if="repeat.radios">
                <b-form-group class="radio abc-radio abc-radio-success" v-for="(radio, index) in repeat.radios" :key="index">
                    <input
                    type="radio"
                    :value="radio.label"
                    :name="repeat.question"
                    :id="'pain'+ radio.id"
                    :v-model="radio.label"
                    />
                    <label :for="'pain'+ radio.id">{{radio.label}}</label>
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
            disable: 'Yes',
            questions: [
                {
                    question: 'Please specify your pain medication',
                    answer: ' '
                },
                {
                    question: 'Dosage (times/day)',
                    answer: ' '
                },
                {
                    question: 'Does the medication affect your pain?',
                    radios: [
                        {
                            id: '2a',
                            label: 'No Medication',
                        },
                        {
                            id: '2b',
                            label: 'Helps Completely',
                        },
                        {
                            id: '2c',
                            label: 'Helps Significantly',
                        },
                        {
                            id: '2d',
                            label: 'Helps a Little',
                        },
                        {
                            id: '2e',
                            label: 'No Help',
                        },
                    ]
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