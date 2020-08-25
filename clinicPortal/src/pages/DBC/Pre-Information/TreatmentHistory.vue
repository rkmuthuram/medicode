<template>
    <b-row>
        <b-col xl="12">
            <b-row>
                <b-col>
                    Treatment History
                </b-col>
            </b-row>
            <br>
            <b-tabs nav-class="bg-tranparent">
                <b-tab title="Diagnostic Tests" active>
                    <diagnosticTests/>
                </b-tab>
                <b-tab title="Health Care">
                    <healthCare/>
                </b-tab>
                <b-tab title="Self Treatment">
                    <selfTreatment/>
                </b-tab>                       
            </b-tabs>
        </b-col>
    </b-row>
</template>

<script>
import diagnosticTests from "./DiagnosticTests"
import healthCare from "./HealthCare"
import selfTreatment from "./SelfTreatment"

export default {
    components: {diagnosticTests, healthCare,selfTreatment},
    data(){
        return{

        }
    },
    
}
</script>