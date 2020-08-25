<template>
    <div>
        <personal-info/>
        <b-row>
            <b-col xl="8" lg="10" md="12" >
                <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                        <painLevelGeneral/>
                    </b-tab>
                    <b-tab :title="$route.name">
                        <impairment/>
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
import impairment from "./NeckBaseline/Impairment"

export default {
    components: {personalInfo, painLevelGeneral,impairment},
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