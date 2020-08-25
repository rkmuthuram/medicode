<template>
    <div>
        <b-form-group
        :label="scale.label" v-for="scale in scales" :key="scale.id"
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input type="number" :id="scale.id" class="form-control very-small" name="Left" placeholder="0">
                <input type="text" class="form-control input-transparent very-small" name="percent" placeholder="%" disabled>
            </b-row>  
        </b-form-group>

        <br>

        <b-form-group
        label="Weight Distribution"
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input type="text" class="form-control input-transparent very-small" name="Left" placeholder="Left" disabled>
                <input type="text" class="form-control input-transparent very-small" name="Right" placeholder="Right" disabled>
            </b-row>  
        </b-form-group>

        <b-form-group
        label=""
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input v-model="weightDistributionLeft" id="weightDistributionLeft" type="number" class="form-control very-small" name="weightDistributionLeft" placeholder="0">
                <input  id="weightDistributionRight" :value="calculatedweightDistributionRight" type="number" class="form-control very-small input-transparent" name="weightDistributionRight" placeholder="0" disabled>
            </b-row>  
        </b-form-group>
    </div>
</template>

<script>

export default {
    data(){        
        return{
            weightDistributionLeft: '',
            scales:[
                {
                    label: 'Static Balance Score',
                    id: 'staticBalance'
                },
                {
                    label: 'Visual Dependency Score',
                    id: 'visualDependency'
                },
                {
                    label: 'Proprioception Disturbance Score',
                    id: 'proprioceptionDisturbance'
                },
                {
                    label: 'Vestibular Dominant Score',
                    id: 'vestibularDominant'
                },
            ]

        }
    },
    computed: {
        calculatedweightDistributionRight() {
            return 100 -  parseFloat(this.weightDistributionLeft)
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