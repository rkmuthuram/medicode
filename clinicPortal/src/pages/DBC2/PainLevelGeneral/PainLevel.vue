<template>
    <div>
        <b-row>
            <b-col xl="12">
                <b-form-group
                    :label="typeName+' '+scale.label" v-for="scale in scales" :key="scale.id"
                    :label-for="scale.id"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <div class="mb-sm">
                                    <b-form-slider
                                        :id="$route.name+typeName+scale.id"
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
            props: {
                typeName: {
                    default: 'Pain'
                }
            },
    data(){
        
        return{
            scales:[
                {
                    label: 'Level Today (24 hours)',
                    id: 'today'
                },
                {
                    label: 'Level (7 days)',
                    id: 'oneWeek'
                },
                {
                    label: 'Level (6 Weeks)',
                    id: 'sixWeeks'
                },
            ]

        }
    }
    
}
</script>