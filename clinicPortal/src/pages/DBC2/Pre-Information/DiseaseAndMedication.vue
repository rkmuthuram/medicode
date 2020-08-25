<template>
    <b-row>
        <b-col xl="12">
            <b-row>
                <b-col>
                    Disease and Medication
                </b-col>
            </b-row>
            <br>
            <b-tabs nav-class="bg-tranparent">
                <b-tab title="General Disease" active>
                    <generalDisease/>
                </b-tab>
                <b-tab title="Regular Medication">
                    <regularMedication/>
                </b-tab>                      
            </b-tabs>
        </b-col>
    </b-row>
</template>

<script>
import generalDisease from "./GeneralDisease"
import regularMedication from "./RegularMedication"

export default {
    components: {generalDisease, regularMedication},
    data(){
        return{

        }
    },
    
}
</script>