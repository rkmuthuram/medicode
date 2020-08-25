<template>
    <div>
        <personal-info/>

        <b-row>
            <b-col xl="8" lg="10" md="12" >
                    <b-tabs nav-class="bg-tranparent">
                        <b-tab title="Weight" active>
                            <weight/>
                        </b-tab>
                        <b-tab title="Strength">
                            <strength/>
                        </b-tab>
                        <b-tab title="Range">
                            <range/>
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
import weight from "./BackProtocol/Weight"
import strength from "./BackProtocol/Strength"
import range from "./BackProtocol/Range"

export default {
    components: {personalInfo,weight,strength,range},
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