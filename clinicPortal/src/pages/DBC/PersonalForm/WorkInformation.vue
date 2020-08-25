<template>
    <div>
        <b-row>
            <b-col xl="12" lg="12" md="12" >
                <!-- <Widget
                title="<h6> Work Information </h6>"
                 collapse customHeader
                > -->
                    <b-form-group label-for="Occupation">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Occupation" size="16" 
                                    v-validate="'required|min:1'"
                                    name="Occupation"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Occupation')}"
                                    id="Occupation"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Occupation')">
                        {{ errors.first('Occupation') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Employer">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Employer" size="16" 
                                    v-validate="'required|min:1'"
                                    name="Employer"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Employer')}"
                                    id="Employer"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Employer')">
                        {{ errors.first('Employer') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Company Phone">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-input-group-text slot="prepend" class="bg-default text-white">
                                    <i class="la la-phone" />
                                    </b-input-group-text>
                                    <b-form-input class="input-transparent small-form" type="text" id="CompanyPhone"
                                    placeholder="Company Phone"
                                    v-mask="'(60)##-###-#######'"
                                    v-validate="'required|min:15'"
                                    v-model="CompanyPhone"
                                    name="Company Phone"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Phone')}"
                                    />
                                </b-input-group>
                            </b-col>

                            <b-col>
                                <b-input-group>
                                    <b-input-group-text slot="prepend" class="bg-default text-white">
                                    <i class="la la-phone" />
                                    </b-input-group-text>
                                    <b-form-input class="input-transparent small-form" type="text" id="CompanyFax"
                                    placeholder="Company Fax"
                                    v-mask="'(60)##-###-#######'"
                                    v-model="CompanyFax"
                                    name="Company Fax"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Fax')}"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company Phone')">
                        {{ errors.first('Company Phone') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="CompanyAddress">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Company Address" size="16" 
                                    v-validate="'required|min:1'"
                                    name="Company Address"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Address')}"
                                    id="CompanyAddress"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company Address')">
                        {{ errors.first('Company Address') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="CompanyPostal">
                        <b-row >
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Postal Code" size="16" class="small-form"
                                    v-validate="'required|min:1|numeric'"
                                    name="Company Postal"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Postal')}"
                                    id="CompanyPostal"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company Postal')">
                        {{ errors.first('Company Postal') }}
                        </span>
                    </b-form-group>
                    
                    <b-form-group label-for="City">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="City" size="16" class="small-form"
                                    v-validate="'required|min:1'"
                                    name="Company City"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company City')}"
                                    id="CompanyCity"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company City')">
                        {{ errors.first('Company City') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Contact Person">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Contact Person" size="16" 
                                    v-validate="'required|min:1'"
                                    name="Contact Person"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Contact Person')}"
                                    id="ContactPerson"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Contact Person')">
                        {{ errors.first('Contact Person') }}
                        </span>
                    </b-form-group>

                    Work Category
                    <v-select
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="workCategorySelect"
                        :options="['technical', 'scientific', 'juridical', 'humanitarian', 'agricultural', 'forestry', 'fishing', 'industrial work', 'machinery', 'mining', 'quarry', 'construction work', 'service work', 'pensioner', 'student', 'unemployed']"
                    />

                <!-- </Widget> -->
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue';
import DatePicker from 'vue2-datepicker';
import vSelect from 'vue-select';

export default {
    data(){
        return{
            CompanyFax: null,
            CompanyPhone: null,
            datetimepickerText: null,
            educationSelect: 'Select Education Type',
            doctorSelect: 'Select Doctor',
            workCategorySelect: 'Select Work Category',
            hospitalSelect:'Select Hospital',
            insuranceSelect: 'Select Insurance Type'
        }
    },
    components: {
        DatePicker,
        vSelect,
    },
    methods: {
        selectDate(val) {
        Vue.set(this, 'datetimepickerText', val.toLocaleDateString());
        },
    }
}
</script>

<style scoped>
.small-form {
    max-width: 210px;
    width: 210px;
}
</style>