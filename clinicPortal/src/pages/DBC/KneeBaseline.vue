<template>
    <div>
        <personal-info/>
        <b-row>
            <b-col xl="8" lg="10" md="12" >
                <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                        <painLevelGeneral/>
                    </b-tab>
                    <b-tab title="History">
                        <history/>
                    </b-tab>  
                    <b-tab title="Impairment">
                        <impairment/>
                    </b-tab>  
                    <b-tab title="Function">
                        <knee-function/>
                    </b-tab>
                    <b-tab title="Activities">
                        <activities/>
                        <br>
                        <b-button variant="danger" type="submit" class="mr-xs">Submit {{$route.name}}</b-button>
                    </b-tab>                  
                </b-tabs>
            </b-col>
        </b-row>        
    </div>    
</template>    

<script>
import personalInfo from "./PersonalInfo"
import painLevelGeneral from "./PainLevelGeneral"
import history from "./KneeBaseline/History"
import impairment from "./KneeBaseline/Impairment"
import kneeFunction from "./KneeBaseline/Function"
import activities from "./KneeBaseline/Activities"

export default {
    components: {personalInfo, painLevelGeneral,impairment,history,kneeFunction,activities},
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