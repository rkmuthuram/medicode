<template>
    <div
    > 
    For each question choose the number that best measures your disability as you have
    experienced it in the past six weeks<br><br>
    Zero indicates no problem at all, 10 indicates the worse possible problem
    <br><br> 
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
                    label: 'Is your neck stiff ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Is it difficult to look up ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Is it difficult to rotate your head to the left and right ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Is it difficult to put your coat on ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Is it difficult to comb your hair ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Is it difficult to work with your arms raised ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Do you experience pain while lying in bed ? ',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Do you have to lie down due to your neck pain ? ',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Does your neck affect your sleep ? ',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Does your neck affect your work ? ',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Forced to change job duties due to neck pain ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'How much does your neck pain limit your daily life ?',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
                {
                    label: 'Does your neck pain affect your mood ? ',
                    options: ['0','1','2','3','4','5','6','7','8','9','10']
                },
            ],

        }
    },
    
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