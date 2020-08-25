<template>
    <b-row>
        <b-col xl="8">
            <Widget
            :title="timestamp"
            collapse customHeader
            >
                <div v-for="patient in patients" :key="patient.id">
                    <div class="form-control input-transparent">
                        {{patient.data}}
                        <cite v-if="!patient.data.length" class="text-danger"><span class="glyphicon glyphicon-exclamation-sign" /> Patient {{patient.error}} is missing</cite>                       
                    </div>
                    <br>
                </div>
            </Widget>    
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return{
            timestamp: "",
            patients: [
                {
                    data: 'Ram',
                    error: 'Name'
                },
                {
                    data: '',
                    error: 'Social Security Number'
                },
                {
                    data: '',
                    error: 'Age'
                },
                {
                    data: '',
                    error: 'Gender'
                },
                {
                    data: '',
                    error: 'Physiotherapist'
                },
            ]
        }
    },
    created() {
        setInterval(this.getNow);
    },
    methods: {
        getNow() {
            const today = new Date();
            const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +'\xa0\xa0\xa0\xa0'+  time;
            this.timestamp = dateTime;
        },
    },

}
</script>
