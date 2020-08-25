<template>
    <div
    > 
        <div v-for="repeat in questions" :key="repeat.id">
            <p>
                {{repeat.question}}
            </p>
            
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="(checkbox, index) in repeat.checkboxes" :key="index">
                <input v-if="checkbox.label"
                :value="'acutePainArea'+checkbox.id"
                type="checkbox"
                :id="'acutePainArea'+checkbox.id"
                />
                <label :for="'acutePainArea'+checkbox.id">{{checkbox.label}}</label>
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
                    question: 'Select your pain area',
                    checkboxes: [
                        {
                            id: '1a',
                            label: 'Neck'
                        },
                        {
                            id: '1b',
                            label: 'Shoulder Left'
                        },
                        {
                            id: '1c',
                            label: 'Shoulder Right'
                        },
                        {
                            id: '1d',
                            label: 'Hand Left'
                        },
                        {
                            id: '1e',
                            label: 'Hand Right'
                        },
                        {
                            id: '1f',
                            label: 'Mid Thoracic'
                        },
                        {
                            id: '1g',
                            label: 'Lower Back'
                        },
                        {
                            id: '1h',
                            label: 'Hip Left'
                        },
                        {
                            id: '1i',
                            label: 'Hip Right'
                        },
                        {
                            id: '1j',
                            label: 'Knee Left'
                        },
                        {
                            id: '1k',
                            label: 'Knee Right'
                        },
                        {
                            id: '1l',
                            label: 'Ankle Left'
                        },
                        {
                            id: '1m',
                            label: 'Ankle Right'
                        },
                    ]
                },
            ],

        }
    },
    
}
</script>