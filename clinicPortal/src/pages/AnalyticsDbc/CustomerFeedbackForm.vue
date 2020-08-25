<template>
  <div>
    <b-row>
      <h1 class="page-title">
        Customer
        <span class="fw-semi-bold">Feedback Form</span>
      </h1>
    </b-row>
    <b-row>
      <b-col>
        <widget>
             <b-card
          class="border-0 mb-xlg background-cover text-black"  
        >
            <h3 class="mt-lg"><center>DISCLAIMER</center></h3>
           <center> <p class="w-75">
              DBC Malaysia hereby notify you that this notice is served on you pursuant to the Personal Data Protection Act 2010 ("The Act"). We require your personal data to understand your needs and provide you with a better service. For the purpose of this written notice, the terms "personal data" and "processing" shall have the same meaning as prescribed in the Act.</p> </center> 
        </b-card>
        Patient Name : <b>Sagesegaran Kaur</b> | Therapist Name : <b>Sandyeep Naidu</b> | Date : <b>22nd June 2020</b> <br>
        <br><br>

            <b-col xl="12">
              Kindly rate the following ; The far left represents "Very Poor (1)", while the 
                far right represents "Excellent (5)"
                <br><br>
                <b-form-group
                    :label="pain.id+') '+pain.label" v-for="pain in pains" :key="pain.id"
                    :label-for="pain.id"
                    breakpoint="md"
                    >                                    
                        <b-row>                            
                            <b-col cols="8" md="5">
                                <div class="mb-sm mt-3">
                                    <b-form-input
                                    type="range"
                                        :id="'acutePainLevel'+pain.id"
                                        :value='1'
                                        :min="1"
                                        :max='5'
                                        v-model="pain.value"
                                    />
                                </div>                                 
                            </b-col>
                            <div  :style="{'background-image': 'url(' + require('./emoji1.png') + ')'}" class="emoji mr-2" v-show="pain.value == 5 "/>
                            <div  :style="{'background-image': 'url(' + require('./emoji2.png') + ')'}" class="emoji mr-2" v-show="pain.value ==4"/>
                            <div  :style="{'background-image': 'url(' + require('./emoji3.png') + ')'}" class="emoji mr-2" v-show="pain.value ==3"/>
                            <div  :style="{'background-image': 'url(' + require('./emoji4.png') + ')'}" class="emoji mr-2" v-show="pain.value ==2"/>
                            <div  :style="{'background-image': 'url(' + require('./emoji5.png') + ')'}" class="emoji mr-2" v-show="pain.value ==1"/>
                            
                           
                        </b-row>
                </b-form-group>  
                <b-form-group >
            <label for="otherActive">8) How can we improve your experience with DBC Physiotherapy ?</label>
            <textarea-autosize 
         
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherActive"
            />
            
        </b-form-group>  
             <b-button variant="success" type="submit" class="mr-xs" >Submit Feedback</b-button>
            </b-col>
        </widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '../../components/Widget/Widget.vue'


export default {
  components: { Widget },

  data() {
    return {
       pains:[
                {
                    label: 'How is the recovery of your injury after coming to DBC for treatment?',
                    id: '1',
                    value: 1,
                                    },
                {
                    label: 'What would you rate your overall experience with DBC Physiotherapy?',
                    id: '2',
                    value: 1
                },
                {
                    label: 'Attention & Care by physiotherapist',
                    id: '3',
                    value: 1
                }
                ,
                {
                    label: 'Explanation of your condition and progress',
                    id: '4',
                    value: 1
                }
                ,
                {
                    label: 'Flexibility & Efficiency in booking appointments',
                    id: '5',
                    value: 1
                }
                ,
                {
                    label: 'DBC Center Hospitality',
                    id: '6',
                    value: 1
                }
                ,
                {
                    label: 'DBC Center Cleanliness',
                    id: '7',
                    value: 1
                }
            ]

    };
  },
  methods: {
  
  },
  mounted() {

  }
};
</script>

<style scoped>
.rate {
  background-color: #ffd000;
  color: black;
}
.general {
  background-color: #ffd000;
  color: black;
}
.cover {
  position: absolute;
  left: 0;
  height: fit-content;
  width: 100%;
}
.legend {
  height: 100%;
  width: 5px;
  z-index: 1;
}
.sm {
  max-width: 80px;
}
.back-button {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(25%);
}

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