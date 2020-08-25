<template>
    <b-row>
      <b-col xl="12">
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Positions</th>
                  <th>Left</th>
                  <th>Right</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="table in tables" :key="table.id">
                  <td>{{table.position}}</td>
                  <td>
                      <input :id="'emg'+table.position+table.left" type="number" class="form-control very-small" :name="table.left" placeholder="μV ">
                  </td>
                  <td>
                      <input :id="'emg'+table.position+table.right" type="number" class="form-control very-small" :name="table.right" placeholder="μV ">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <b-form-group>
            <label for="emgText">Physio Interpretation:</label>
            <textarea-autosize 
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="emgText"
            />
            
        </b-form-group>
      </b-col>
    </b-row>
</template>

<script>

export default {
    data(){
        return{
            tables: [
                {
                    position: 'Standing',
                    left: '',
                    right: '',
                },
                {
                    position: 'Forward Bending',
                    left: '',
                    right: '',
                },{
                    position: 'Back Extension',
                    left: '',
                    right: '',
                },{
                    position: 'Sitting',
                    left: '',
                    right: '',
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