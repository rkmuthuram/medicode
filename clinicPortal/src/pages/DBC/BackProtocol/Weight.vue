<template>
    <b-row>
        <b-col xl="12">
                <b-form-group
                label="Body Weight"
                label-for="bodyWeight"
                label-class="text-md-left px-3"
                label-cols="3"
                breakpoint="md"
                >
                    <b-row>
                        <input v-model="bodyWeight" id="bodyWeight" type="number" class="form-control very-small" name="bodyWeight" placeholder="0">
                        <input type="text" class="form-control input-transparent very-small" name="kg" placeholder="kg" disabled>
                    </b-row>  
                </b-form-group>
                <b-form-group
                label="Functional Weight"
                label-for="functionalWeight"
                label-class="text-md-left px-3"
                label-cols="3"
                breakpoint="md"
                >
                    <b-row>
                        <input v-model="functionalWeight" id="functionalWeight" type="number" class="form-control very-small" name="functionalWeight" placeholder="0"> 
                        <input type="text" class="form-control input-transparent very-small" name="kg" placeholder="kg" disabled>
                    </b-row>    
                </b-form-group>

                <b-form-group label="Total Weight" label-for="Total Weight" label-cols="3" label-class="text-md-left px-3" breakpoint="md">
                    <b-row>
                        <input id="from_amount" type="number" class="form-control input-transparent very-small" name="to_amount" :value="calculatedFromAmount" disabled placeholder="0">
                        <input type="text" class="form-control input-transparent very-small" name="kg" placeholder="kg" disabled>
                    </b-row>
                </b-form-group> 
        </b-col>
    </b-row>
</template>

<script>

export default {
    data(){
        return{
            bodyWeight:'',
            functionalWeight:'0',
            totalWeight: '0',

        }
    },
        computed: {
            calculatedFromAmount() {
                return  parseFloat(this.bodyWeight) + parseFloat(this.functionalWeight)
            }
        }
    
}
</script>

<style scoped>
.very-small {
    max-width: 60px;
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