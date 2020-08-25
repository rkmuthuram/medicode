<template>
    <div
    > 
    Choose the appropriate answer which best describes your ability to perform
    the following Tasks<br><br>
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

            <b-form class="form-label-left" v-if="repeat.label">
                <b-form-group
                :label="repeat.label"
                label-for="label"
                :label-cols="7"
                >
                    <b-row>
                        <b-col md='9' class="very-small">
                            <v-select
                                :id="$route.name+repeat.label"
                                class="mt-xs"
                                :options="['No Problems', 'Some Problems','Considerable Problems','Cannot Perform']"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form>        
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
                    label: 'Intense Leisure Time Physical Activity Sports',
                },
                {
                    label: 'Lifting Heavy Objects',
                },
                {
                    label: 'Strenuous Physical Tasks (moving etc.)',
                },
                {
                    label: 'Lifting and Carrying Shopping Bags',
                },
                {
                    label: 'Bending, Kneeling and Squatting',
                },
                {
                    label: 'Walking More than 1km (0.6miles)',
                },
                {
                    label: 'Running',
                },
                {
                    label: 'Dressing, Putting on Socks',
                },
                {
                    label: 'Sleeping at Night',
                },
                {
                    label: 'Standing up From a Chair',
                },
                {
                    label: 'Travelling in a Car for More than 15 minutes',
                },
            ],

        }
    },
    
}
</script>

<style scoped>
.very-small {
    max-width: 260px;
    margin-right: 0px;
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