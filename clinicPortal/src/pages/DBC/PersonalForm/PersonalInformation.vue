<template>
    <div>
        <b-row>
            <b-col xl="12" lg="12" md="12" >
                <!-- <Widget
                title="<h6> Personal Information </h6>"
                 collapse customHeader
                > -->
                    <b-form-group label-for="name">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Full Name" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('name')">
                        {{ errors.first('name') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Date of Birth">
                        <b-row>
                            <b-col> 
                                <b-input-group>
                                    <DatePicker lang="en" v-model="datetimepickerText" placeholder="Date of Birth" format="DD-MM-YYYY"
                                                input-class="form-control"  id="datetimepicker">
                                        <i class="glyphicon glyphicon-th" slot="calendar-icon"/>
                                    </DatePicker>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-form-group>

                    <b-form-group label-for="Phone">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-input-group-text slot="prepend" class="bg-default text-white">
                                    <i class="la la-phone" />
                                    </b-input-group-text>
                                    <b-form-input class="input-transparent small-form" type="text" id="Phone"
                                    placeholder="(60)12-345-6789"
                                    v-mask="'(60)##-###-#######'"
                                    v-validate="'required|min:15'"
                                    name="Phone"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Phone')}"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Phone')">
                        {{ errors.first('Phone') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Address">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Address" size="16" 
                                    v-validate="'required|min:1'"
                                    name="Address"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Address')}"
                                    id="Address"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Address')">
                        {{ errors.first('Address') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Postal">
                        <b-row >
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Postal Code" size="16" class="small-form"
                                    v-validate="'required|min:1|numeric'"
                                    name="Postal"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Postal')}"
                                    id="Postal"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Postal')">
                        {{ errors.first('Postal') }}
                        </span>
                    </b-form-group>
                    
                    <b-form-group label-for="City">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="City" size="16" class="small-form"
                                    v-validate="'required|min:1'"
                                    name="City"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('City')}"
                                    id="City"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('City')">
                        {{ errors.first('City') }}
                        </span>
                    </b-form-group>                    

                    <b-form-group label-for="email">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="email" placeholder="Email" size="16" class="small-form"
                                    v-validate="'required|email'"
                                    name="email"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                                    id="email"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('email')">
                        {{ errors.first('email') }}
                        </span>
                    </b-form-group>

                    Education
                    <v-select
                        id="educationSelect"
                        class="mt-xs"
                        v-model="educationSelect"
                        :options="['primary', 'secondary', 'upper secondary', 'vocational/professional', 'polytechnic', 'university']"
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
        vSelect
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