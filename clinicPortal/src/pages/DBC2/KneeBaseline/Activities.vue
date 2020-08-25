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
                    :value="'activities'+ radio.id"
                    :name="repeat.question"
                    :id="'activities'+ radio.id"
                    />
                    <label :for="'activities'+ radio.id">{{radio.label}}</label>
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
                    question: 'What is the highest level of activity that you can perform without significant swelling your knee ?',
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
                            label: 'Unable to perform any of the above activities  due to knee swelling',
                            id: '1e'
                        },
                    ]
                },
                {
                    question: 'During the past 4 weeks or since your injury, did your knee lock or catch ?',
                    radios: [
                        {
                            label: 'Yes',
                            id: '2a'
                        },
                        {
                            label: 'No',
                            id: '2b'
                        },
                    ]
                },
                {
                    question: 'What is the highest level of activity that you can perform without significant giving way in your knee ?',
                    radios: [
                        {
                            label: 'Very strenuous activities like jumping or pivoting as in basketball or soccer',
                            id: '3a'
                        },
                        {
                            label: 'Strenuous activities like heavy physical work, skiing or tennis',
                            id: '3b'
                        },
                        {
                            label: 'Moderate activities like moderate physical work, running or jogging',
                            id: '3c'
                        },
                        {
                            label: 'Light activities like walking, housework or yard work',
                            id: '3d'
                        },
                        {
                            label: 'Unable to perform any of the above activities  due to giving way on the knee',
                            id: '3e'
                        },
                    ]
                },
                {
                    question: 'What is the highest level of activity that you can participate in on a regular basis?',
                    radios: [
                        {
                            label: 'Very strenuous activities like jumping or pivoting as in basketball or soccer',
                            id: '4a'
                        },
                        {
                            label: 'Strenuous activities like heavy physical work, skiing or tennis',
                            id: '4b'
                        },
                        {
                            label: 'Moderate activities like moderate physical work, running or jogging',
                            id: '4c'
                        },
                        {
                            label: 'Light activities like walking, housework or yard work',
                            id: '4d'
                        },
                        {
                            label: 'Unable to perform any of the above activities  due to knee pain',
                            id: '4e'
                        },
                    ]
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