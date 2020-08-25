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
                    question: 'What is the highest level of activity that you can perform without significant knee pain ?',
                    radios: [
                        {
                            label: 'Very strenuous activities like jumping or pivoting as in basketball or soccer',
                            id: '1a'
                        },
                        {
                            label: 'Strenuous activities like heavy physical work, skiing or tennis',
                            id: '1b'
                        },
                        {
                            label: 'Moderate activities like moderate physical work, running or jogging',
                            id: '1c'
                        },
                        {
                            label: 'Light activities like walking, housework or yard work',
                            id: '1d'
                        },
                        {
                            label: 'Unable to perform any of the above activities  due to knee pain',
                            id: '1e'
                        },
                    ]
                },
                {
                    label: 'During the past 4 weeks, or since your injury, how often have you had pain ? ( 1 = Never, 10 = Constantly )',
                    options: ['1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'If you have pain, how serious is it ? ( 1 = No Pain, 10 = Worst Imaginable Pain )',
                    options: ['1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'During the past 4 weeks, or sinceyour injury, how stiff or swollen was your knee ?',
                    options: ['Not At All', 'Mildly', 'Moderately', 'Very', 'Extremely']
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