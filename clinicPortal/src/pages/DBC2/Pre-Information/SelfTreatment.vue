<template>
    <div
    >
        <p>
            What tests/ evaluation have you done in the past year?
        </p>
        <b-form-group class="abc-checkbox abc-checkbox-danger">
            <input
            value="No"
            type="checkbox"
            id="NoSelf"
            v-model="NoSelf"
            />
            <label for="NoSelf">None</label>
        </b-form-group>
    
        <div v-for="repeat in questions" :key="repeat.id">            
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index" :disabled="NoSelf == true">
                <input v-if="checkbox.label"
                :value="'selfTreatment'+checkbox.id "
                type="checkbox"
                :id="'selfTreatment'+checkbox.id "
                :checked="NoSelf ==  true"
                
                />
                <label :for="'selfTreatment'+checkbox.id ">{{checkbox.label}}</label>
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
        <b-form-group :disabled="NoSelf == true">
            <label for="otherselfTreatment">Other, please specify</label>
            <textarea-autosize 
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherselfTreatment"
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
            NoSelf: null,
            questions: [
                {
                    // question: 'What tests/ evaluation have you done in the past year?',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'Balancing of Activities',
                        },
                        {
                            id: '1b',
                            label: 'Muscle Exercises',
                        },
                        {
                            id: '1c',
                            label: 'Relaxation Exercises',
                        },
                        {
                            id: '1d',
                            label: 'Ice and/or Hot Packs',
                        },
                        {
                            id: '1e',
                            label: 'Electrostimulation ',
                        },
                        {
                            id: '1f',
                            label: 'With Other Modalities/ Methods',
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