<template>
    <div>
        <personal-info/>

        <b-row>
            <b-col xl="8" lg="10" md="12" >
                    <b-tabs nav-class="bg-tranparent">
                        <b-tab title="EMG" active>
                            <emg/>
                        </b-tab>
                        <b-tab title="Fatigue">
                            <fatigue-test/>
                        </b-tab>
                        <b-tab title="Strength">
                            <strength/>
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
import emg from "./SBL/EMG"
import fatigueTest from "./SBL/FatigueTest"
import strength from "./SBL/Strength"

export default {
    components: {personalInfo,emg,fatigueTest,strength},
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