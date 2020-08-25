<template>
    <div>
        <b-row>
            <b-col xl="12">
                The far left represents "No Pain", while the 
                far right represents "The worst possible pain"
                <br><br>
                <b-form-group
                    :label="pain.label" v-for="pain in pains" :key="pain.id"
                    :label-for="pain.id"
                    breakpoint="md"
                    >                                    
                        <b-row>                            
                            <b-col cols="8" md="5">
                                <div class="mb-sm mt-3">
                                    <b-form-input
                                    type="range"
                                        :id="'acutePainLevel'+pain.id"
                                        :value='0'
                                        :min="0"
                                        :max='10'
                                        v-model="pain.value"
                                    />
                                </div>                                 
                            </b-col>
                            <div  :style="{'background-image': 'url(' + require('./emoji1.png') + ')'}" class="emoji mr-2" v-show="pain.value == 0 "/>
                            <div  :style="{'background-image': 'url(' + require('./emoji2.png') + ')'}" class="emoji mr-2" v-show="pain.value == 1 || pain.value == 2 || pain.value == 3"/>
                            <div  :style="{'background-image': 'url(' + require('./emoji3.png') + ')'}" class="emoji mr-2" v-show="pain.value == 4 || pain.value == 5 || pain.value == 6"/>
                            <div  :style="{'background-image': 'url(' + require('./emoji4.png') + ')'}" class="emoji mr-2" v-show="pain.value == 7 || pain.value == 8 || pain.value == 9"/>
                            <div  :style="{'background-image': 'url(' + require('./emoji5.png') + ')'}" class="emoji mr-2" v-show="pain.value == 10 "/>
                            
                            <b-input type="text" v-model="pain.value" disabled class="very-small mt-2"/>
                        </b-row>
                </b-form-group>  
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    data(){
        return{
            pains:[
                {
                    label: 'Pain Level Today (24 hours)',
                    id: 'today',
                    value: 0,
                                    },
                {
                    label: 'Pain Level (7 days)',
                    id: 'oneWeek',
                    value: 0
                },
                {
                    label: 'Pain Level (6 Weeks)',
                    id: 'sixWeeks',
                    value: 0
                },
            ]

        }
    },
    
}
</script>
<style scoped>
.very-small {
    max-width: 60px;
    margin-right: 10px;
}
.emoji {
    /* background-image: url('./emoji1.png'); */
    background-position: center;
    background-size: contain;
    height: 50px;
    width: 50px;
}
</style>