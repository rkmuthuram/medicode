<template>
    <b-row>
      <b-col xl="12">
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Range</th>
                  <th>Target</th>
                  <th>Ability</th>
                  <th class="hidden-sm-down">Deficit</th>
                  <th class="">% Range Deficit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="table in tables" :key="table.id">
                  <td>{{table.strength}}</td>
                  <td>
                      <input :id="'range'+table.target" type="number" class="form-control" v-model="table.targetRange" placeholder="degrees">
                  </td>
                  <td>
                      <input :id="'range'+table.ability" type="number" class="form-control " v-model="table.abilityRange" placeholder="degrees">
                  </td>
                  <td>
                      <input :id="'range'+table.deficit" type="number" class="form-control very-small input-transparent deficit" :value="tableDeficitRange(table.targetRange, table.abilityRange)" placeholder="kg" disabled>
                  </td>
                  <td>
                      <div class="progress-container">
                          <span class="text-percent">{{ parseFloat((table.targetRange-table.abilityRange) / table.targetRange * 100.0) }}</span> %
                        <b-progress
                        :variant="checkRangeStatus(table.targetRange, table.abilityRange)" :value="getPercentage(table.targetRange, table.abilityRange)" :max="100"
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
                    strength: 'Lumbar Flexion ',
                    targetRange: '',
                    abilityRange: '',
                    deficitRange: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Extension',
                    targetRange: '',
                    abilityRange: '',
                    deficitRange: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Left)',
                    targetRange: '',
                    abilityRange: '',
                    deficitRange: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Right)',
                    targetRange: '',
                    abilityRange: '',
                    deficitRange: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Left)',
                    targetRange: '',
                    abilityRange: '',
                    deficitRange: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Right)',
                    targetRange: '',
                    abilityRange: '',
                    deficitRange: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
            ],

        }
    },
    methods:{
        checkRangeStatus(targetRange, abilityRange){
            let deficitRange = targetRange - abilityRange;
            let percentage = deficitRange/targetRange * 100;

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
        tableDeficitRange(targetRange, abilityRange){
            return targetRange - abilityRange;
        },
        getPercentage(targetRange, abilityRange){
            let deficitRange = targetRange - abilityRange;
            return (deficitRange/targetRange) * 100;
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