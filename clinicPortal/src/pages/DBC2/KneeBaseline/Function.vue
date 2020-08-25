<template>
    <div> 
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
                :label="repeat.label"
                label-for="label"
                :label-cols="8"
                >
                    <b-row>
                        <b-col md='9' class="very-small">
                            <v-select
                                :id="$route.name+repeat.label"
                                class="mt-xs"
                                :options="repeat.options"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form>  

            <b-col md="12" v-if="repeat.radios">
                <b-form-group class="radio abc-radio abc-radio-success" v-for="(radio, index) in repeat.radios" :key="index">
                    <input
                    type="radio"
                    :value="'kneeImpairment'+ radio.id"
                    :name="repeat.question"
                    :id="'kneeImpairment'+ radio.id"
                    />
                    <label :for="'kneeImpairment'+ radio.id">{{radio.label}}</label>
                </b-form-group>
            </b-col>   

            <br v-if="repeat.space">
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
                    question: 'How does your knee affect ability to:'
                },
                {
                    label: 'Go Up Stairs',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Go Down Stairs',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Kneel on the Front of Your Knee',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Squat',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Sit with Your Knee Bent',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Rise from a Chair',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Run Straight Ahead',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Jump and Land on Your Involved Leg',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },
                {
                    label: 'Stop and Start Quickly',
                    options: ['Not Difficult At All', 'Minimally Difficult', 'Moderately Difficult','Extremely Difficult', 'Unable To do']
                },

                {
                    space: ' '
                },


                {
                    label: 'Function prior to your knee injury',
                    options: ['1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Current function of your knee',
                    options: ['1','2','3','4','5','6','7','8','9','10']
                },
            ],

        }
    },
    
}
</script>

<style scoped>
.very-small {
    max-width: 220px;
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