<template>
    <div>
        <b-row>
            <b-col xl="12" lg="12" md="12" >
                <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                        <pain-level/>
                    </b-tab>
                    <b-tab title="Trouble Level">
                        <pain-level typeName="Trouble"/>
                    </b-tab>
                    <b-tab title="Stress Level">
                        <stress-level/>
                    </b-tab>                      
                </b-tabs>
            </b-col>
        </b-row>        
    </div>    
</template>    

<script>
import painLevel from "./PainLevelGeneral/PainLevel"
import stressLevel from "./PainLevelGeneral/Stress"

export default {
    components: {painLevel,stressLevel},
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