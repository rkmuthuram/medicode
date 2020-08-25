<template>
    <div>
        <b-row>
            <b-col xl="12">
                <b-form-group v-for="textarea in textarea1" :key="textarea.id"
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
            textarea1:[
                {
                    label: 'Medical History',
                    id: 'medicalHistory'
                },
                {
                    label: 'Present Complaints',
                    id: 'presentComplaints'
                },
                {
                    label: 'Presentation',
                    id: 'presentation'
                },
                {
                    label: 'X-Ray/MRI',
                    id: 'xray'
                },
                {
                    label: 'Range Of Motion',
                    id: 'rangeOfMotion'
                },
                {
                    label: 'Motor Conduction',
                    id: 'motorConduction'
                },
            ],

        }
    }
    
}
</script>