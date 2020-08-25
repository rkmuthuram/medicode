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
            id="NoDiagnostic"
            v-model="NoDiagnostic"
            />
            <label for="NoDiagnostic">No</label>
        </b-form-group>
    
        <div v-for="repeat in questions" :key="repeat.id">            
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index" :disabled="NoDiagnostic == true">
                <input v-if="checkbox.label"
                :value="'diagnostic'+checkbox.id "
                type="checkbox"
                :id="'diagnostic'+checkbox.id "
                :checked="NoDiagnostic ==  true"
                
                />
                <label :for="'diagnostic'+checkbox.id ">{{checkbox.label}}</label>
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
                    :id="'pain'+ radio.id"
                    :v-model="radio.label"
                    />
                    <label :for="'pain'+ radio.id">{{radio.label}}</label>
                </b-form-group>
            </b-col>

            <br>       
        </div>
        <b-form-group :disabled="NoDiagnostic == true">
            <label for="otherDiagnostic">Other, please specify</label>
            <textarea-autosize 
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherDiagnostic"
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
            NoDiagnostic: null,
            questions: [
                {
                    // question: 'What tests/ evaluation have you done in the past year?',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'X-Ray',
                        },
                        {
                            id: '1b',
                            label: 'Ultrasonography',
                        },
                        {
                            id: '1c',
                            label: 'Computed Tomography (CT)',
                        },
                        {
                            id: '1d',
                            label: 'Magnetic Resonance Imaging (MRI)',
                        },
                        {
                            id: '1e',
                            label: 'Electroneuromyography (ENMG)',
                        },
                        {
                            id: '1f',
                            label: 'Laboratory Tests',
                        },
                        {
                            id: '1g',
                            label: 'Gamma Ray Study',
                        },
                        
                    ],
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