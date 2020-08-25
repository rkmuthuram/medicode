<template>
    <div
    >
        <p>
           What physical activities do you participate in during your free time? 
        </p>
        <b-form-group class="abc-checkbox abc-checkbox-danger">
            <input
            value="No"
            type="checkbox"
            id="NoActive"
            v-model="NoActive"
            />
            <label for="NoActive">I am not physically active </label>
        </b-form-group>

        <b-form-group v-for="repeat in questions" :key="repeat.id" 
        :label="repeat.label"
        :label-for="repeat.label"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input :id="'physicalActive'+repeat.id" type="number" class="form-control very-small" name="bodyWeight" placeholder="0" :disabled="NoActive == true">
                <input type="text" class="form-control input-transparent very-small" :name="repeat.placeholder" :placeholder="repeat.placeholder" disabled>
            </b-row>  
        </b-form-group>

        <b-form-group >
            <label for="otherActive">Please specify 1-5 most typical types of activity</label>
            <textarea-autosize 
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherActive"
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
            NoActive: null,
            questions: [
                {
                    label: 'Light Aerobic Activities',
                    placeholder: 'min / week',
                },
                {
                    label: 'Moderate Intensity Aerobic Activity',
                    placeholder: 'min / week',
                },
                {
                    label: 'Vigorous Intensity Aerobic Activity',
                    placeholder: 'min / week',
                },
                {
                    label: 'Muscle-Strengthening Activities',
                    placeholder: 'times / week',
                },
                {
                    label: 'Sitting',
                    placeholder: 'hours / week',
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
    max-width: 100px;
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