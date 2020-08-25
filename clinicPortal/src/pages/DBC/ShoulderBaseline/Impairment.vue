<template>
    <div
    >

        <div v-for="repeat in questions" :key="repeat.id">
         
         <p v-if="repeat.disclaimer">
            <br>
            Choose the number that indicates your ability to carry out
            the following activities with your painful / problem hand
            <br><br>
            0 = Unable to do, 1 = Very difficult to do, 2 = Somewhat difficult to do, 3 = Not difficult
        </p> 

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
                    question: 'What tests/ evaluation have you done in the past year?',
                    radios: [
                        {
                            id: '1a',
                            label: 'Right',
                        },
                        {
                            id: '1b',
                            label: 'Left',
                        },
                        {
                            id: '1c',
                            label: 'Both',
                        },
                        
                    ],
                    
                },
                {
                    disclaimer: ' '
                },
                {
                    // question: 'Activity',
                    left: 'Left',
                    right: 'Right'
                },
                {
                    label: 'Put On a Coat',
                    options: ['0','1','2','3'],
                },
                {
                    label: 'Sleep On Your Painful or Affected Side',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Wash Back / Do Up Bra',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Manage Toileting',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Comb Your Hair',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Reach a High Shelf',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Lift 5kg / 12 lbs Above Shoulder',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Throw a Ball Overhand',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Carry Out Your Normal Work',
                    options: ['0','1','2','3']
                },
                {
                    label: 'Participate in Your Usual Sport',
                    options: ['0','1','2','3']
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