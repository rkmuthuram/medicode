<template>
    <b-row>
      <b-col xl="12">
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Strength</th>
                  <th>Target</th>
                  <th>Ability</th>
                  <th class="hidden-sm-down">Deficit</th>
                  <th class="">% Strength Deficit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="table in tables" :key="table.id">
                  <td>{{table.strength}}</td>
                  <td>
                      <input :id="'strength'+table.target" type="number" class="form-control very-small" v-model="table.target" placeholder="kg">
                  </td>
                  <td>
                      <input :id="'strength'+table.ability" type="number" class="form-control very-small" v-model="table.ability" placeholder="kg">
                  </td>
                  <td>
                      <input :id="'strength'+table.deficit" type="number" class="form-control very-small input-transparent deficit" :value="tableDeficit(table.target, table.ability)" placeholder="kg" disabled>
                  </td>
                  <td>
                      <div class="progress-container">
                          <span class="text-percent">{{ parseFloat((table.target-table.ability) / table.target * 100.0) }}</span> %
                        <b-progress
                        :variant="checkStrengthStatus(table.target, table.ability)" :value="getPercentage(table.target, table.ability)" :max="100"
                        class="progress-sm mb-xs"
                        />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </b-col>
    </b-row>
</template>

<script>

export default {
    data(){
        return{
            tables: [
                {
                    strength: 'Double Leg Press',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Single Leg Press (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Single Leg Press (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Flexion',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Extension',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
            ],

        }
    },
    methods:{
        checkStrengthStatus(target, ability){
            let deficit = target - ability;
            let percentage = deficit/target * 100;

            if(percentage < 20){
                return 'success'
            }
            else if(percentage >= 20 && percentage < 40){
                return 'warning'
            }
            else{
                return 'danger'
            }
        },
        tableDeficit(target, ability){
            return target - ability;
        },
        getPercentage(target, ability){
            let deficit = target - ability;
            return (deficit/target) * 100;
        }
    },
    watch:{
        
    }
    
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
}
.text-percent {
    max-width: 36px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;
    display: inline-flex;
}
.deficit {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;
    display: inline-flex;
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