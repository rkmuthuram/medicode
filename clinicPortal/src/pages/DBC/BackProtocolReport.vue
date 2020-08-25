<template>
    <div>
        <personal-info/>

        <b-row>
            <b-col xl="8" lg="10" md="12" >
                    <b-tabs nav-class="bg-tranparent">
                        <b-tab title="Summary" active>
                            <b-form-group
                                label="Summary"
                                label-for="summary"
                                breakpoint="md"
                                >
                                    <b-row>
                                        <b-col md="12">
                                            <textarea-autosize
                                            placeholder=""
                                            :min-height="35"
                                            class="form-control"
                                            id="summary"
                                            />
                                        </b-col>
                                    </b-row>
                            </b-form-group> 
                            <br>
                            <b-button variant="danger" type="submit" class="mr-xs">Submit Form</b-button>
                        </b-tab>
                        
                    </b-tabs>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import personalInfo from "./PersonalInfo"
import general from "./DoctorReport/General"
import physicalFindings from "./DoctorReport/PhysicalFindings"
import managementPlan from "./DoctorReport/ManagementPlan"

export default {
    components: {personalInfo,general,physicalFindings,managementPlan},
    data(){
        return{

        }
    },
    
}
</script>

<style scoped>
.very-small {
    max-width: 60px;
    margin-right: 10px;
}
</style>