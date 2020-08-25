<template>
    <div>
        <b-row>
            <b-col xl="12">
                <b-form-group v-for="textarea in textarea2" :key="textarea.id"
                    :label="textarea.label"
                    :label-for="textarea.id"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                :id="textarea.id"
                                />
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
            textarea2:[
                {
                    label: 'Education',
                    id: 'eduDocRep'
                },
                {
                    label: 'Pain Relief Management',
                    id: 'painReliefMgmt'
                },
                {
                    label: 'Manual Therapy',
                    id: 'manualThrpy'
                },
                {
                    label: 'Exercises',
                    id: 'exerDocRep'
                },
                {
                    label: 'DBC Protocol',
                    id: 'dbcProtocol'
                },
                {
                    label: 'Additional Treatment',
                    id: 'addTreat'
                },
            ],

        }
    }
    
}
</script>