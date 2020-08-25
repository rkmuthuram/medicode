<template>
    <div>
        <b-row>
            <b-col xl="12">
                <b-form-group
                    :label="pain.label" v-for="pain in pains" :key="pain.id"
                    :label-for="pain.id"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <div class="mb-sm">
                                    <b-form-slider
                                        :id="'acutePainLevel'+pain.id"
                                        :value='0'
                                        :max='10'
                                    />
                                </div>
                            </b-col>
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
                    id: 'today'
                },
                {
                    label: 'Pain Level (7 days)',
                    id: 'oneWeek'
                },
                {
                    label: 'Pain Level (6 Weeks)',
                    id: 'sixWeeks'
                },
            ]

        }
    }
    
}
</script>