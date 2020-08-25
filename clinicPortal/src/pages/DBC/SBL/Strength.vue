<template>
    <b-row>
      <b-col xl="12">
            <div class="table-resposive">
                <table class="table">
                <thead>
                    <tr>
                    <th class="hidden-sm-down">Type</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>Avg</th>
                    <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="table in tables" :key="table.id">
                    <td>{{table.type}}</td>
                    <td>
                        <input :id="'emg'+table.type+table.one" type="number" class="form-control very-small" :name="table.one" placeholder="kg ">
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.two" type="number" class="form-control very-small" :name="table.two" placeholder="kg ">
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.three" type="number" class="form-control very-small" :name="table.three" placeholder="kg ">
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.average" type="number" class="form-control very-small" :name="table.average" placeholder="kg ">
                    </td>
                    <td>
                        <v-select
                            id="strengthResult"
                            class="mt-xs"
                            :options="['Poor','Average','Good']"
                        />
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <b-form-group>
                <label for="strengthText">Remarks</label>
                <textarea-autosize 
                placeholder="Write here"
                :min-height="35"
                class="form-control"
                id="strengthText"
                />
                
            </b-form-group>
      </b-col>
    </b-row>
</template>

<script>
import vSelect from 'vue-select';

export default {
    components: {vSelect},
    data(){
        return{
            tables: [
                {
                    type: 'Chest Press (Left)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Chest Press (Right)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Extension (Left)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Extension (Right)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Curls (Left)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Curls (Right)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
            ],

        }
    },
    
}
</script>

<style scoped>
.very-small {
    max-width: 60px;
    margin-right: 10px;
}
.progress-container{
    width: 100%;
    height: 35px;
    /* padding-top: 12px; */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>