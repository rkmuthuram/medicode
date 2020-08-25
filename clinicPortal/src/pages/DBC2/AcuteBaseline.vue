<template>
    <div>
        <personal-info/>
        <b-row>
            <b-col xl="8" lg="10" md="12" >
                <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Acute 1" active>
                        <acute-one/>
                    </b-tab>
                    <b-tab title="Pain Area">
                        <acute-pain-area/>
                    </b-tab>
                    <b-tab title="Pain Level">
                        <acute-pain-level/>
                    </b-tab>
                    <b-tab title="Acute 2">
                        <acute-two/>
                    </b-tab>
                    <b-tab title="Acute 3">
                        <acute-three/>
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
import acuteOne from "./AcuteBaseline/AcuteOne"
import acuteTwo from "./AcuteBaseline/AcuteTwo"
import acuteThree from "./AcuteBaseline/AcuteThree"
import acutePainLevel from "./AcuteBaseline/AcutePainLevel"
import acutePainArea from "./AcuteBaseline/AcutePainArea"

export default {
    components:{personalInfo,acuteOne,acuteTwo,acuteThree,acutePainLevel,acutePainArea},
    data(){
        return{

        }
    }
    
}
</script>