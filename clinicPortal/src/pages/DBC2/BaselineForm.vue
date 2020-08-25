    <template>
    <div>
        <b-row>
            <b-col xl="3" lg="6" md="7" sm="12" >
                <Widget
                title="<h6> Baseline </h6>"
                 collapse customHeader
                >

                     <b-form-group
                        label="SBL"
                        label-for="SBL"
                        :label-cols="4"
                        >
                        <b-form-group class="abc-checkbox abc-checkbox-success center-checkbox float-right">
                        <input
                            type="checkbox"
                            id="SBL"
                        />
                        <label for="SBL"></label>
                        </b-form-group>
                    </b-form-group>

                    <b-form-group
                        label="Neck"
                        label-for="Neck"
                        :label-cols="4"
                        >
                        <b-form-group class="abc-checkbox abc-checkbox-success center-checkbox float-right">
                        <input
                            type="checkbox"
                            id="Neck"
                        />
                        <label for="Neck"></label>
                        </b-form-group>
                    </b-form-group>

                    <b-form-group
                        label="Back"
                        label-for="Back"
                        :label-cols="4"
                        >
                        <b-form-group class="abc-checkbox abc-checkbox-success center-checkbox float-right">
                        <input
                            type="checkbox"
                            id="Back"
                        />
                        <label for="Back"></label>
                        </b-form-group>
                    </b-form-group>

                    <b-form-group
                    label="Shoulder"
                    label-for="shoulderSelect"
                    :label-cols="4"
                    >
                        <b-dropdown id="shoulderSelect" :text="shoulderSelect" variant="default" class="float-right">
                            <b-dropdown-item-button
                            @click="changeSelectOption('shoulderSelect', 'None')"
                            >None</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('shoulderSelect', '1 program')"
                            >1 program</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('shoulderSelect', '2 program')"
                            >2 program</b-dropdown-item-button>
                        </b-dropdown>                    
                    </b-form-group>

                    <b-form-group
                    label="Knee"
                    label-for="kneeSelect"
                    :label-cols="4"
                    >
                        <b-dropdown id="kneeSelect" :text="kneeSelect" variant="default" class="float-right">
                            <b-dropdown-item-button
                            @click="changeSelectOption('kneeSelect', 'None')"
                            >None</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('kneeSelect', '1 program')"
                            >1 program</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('kneeSelect', '2 program')"
                            >2 program</b-dropdown-item-button>
                        </b-dropdown>
                    </b-form-group>    

                    <b-form-group
                    label="Acute"
                    label-for="acuteSelect"
                    :label-cols="4"
                    >
                        <b-dropdown id="acuteSelect" :text="acuteSelect" variant="default" class="float-right">
                            <b-dropdown-item-button
                            @click="changeSelectOption('acuteSelect', 'None')"
                            >None</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('acuteSelect', '1 program')"
                            >1 program</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('acuteSelect', '2 program')"
                            >2 program</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('acuteSelect', '3 program')"
                            >3 program</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('acuteSelect', '4 program')"
                            >4 program</b-dropdown-item-button>
                            <b-dropdown-item-button
                            @click="changeSelectOption('acuteSelect', '5 program')"
                            >5 program</b-dropdown-item-button>
                        </b-dropdown>
                    </b-form-group>  

                    <div class="btn-toolbar float-right mt-sm">
                    <b-button variant="danger">Save</b-button>
                    <b-button variant="inverse">Cancel</b-button>
                    </div>

                </Widget>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';

export default {
    data(){
        return {
            shoulderSelect: 'none',
            kneeSelect: 'none',
            acuteSelect: 'none',
        }
    },
    components: {
        vSelect
    },
    methods: {
        changeSelectOption(field, value) {
        Vue.set(this, field, value);
        },
    }
}
</script>

<style scoped>
.center-checkbox {
    margin: 0;
    padding-top: 7px;
}
</style>