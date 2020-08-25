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
                      <input :id="table.target" type="number" class="form-control" :name="table.target" placeholder="degrees">
                  </td>
                  <td>
                      <input :id="table.ability" type="number" class="form-control " :name="table.ability" placeholder="degrees">
                  </td>
                  <td>
                      <input :id="table.deficit" type="number" class="form-control " :name="table.deficit" placeholder="degrees">
                  </td>
                  <td>
                      <div class="progress-container">
                          {{table.strengthDeficit.percent}} %
                        <b-progress
                        :variant="table.strengthDeficit.colorClass" :value="table.strengthDeficit.percent" :max="100"
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