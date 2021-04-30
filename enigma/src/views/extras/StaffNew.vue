


<template>
  <div id="checkin-tableview">
    
 
     <!-- tab 1 content -->
          <form >
       
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Name" v-model="data.username" class="w-full" name="user-name" v-validate="'required|min:5'" />
              <span class="text-danger">{{ errors.first('user-name') }}</span>
            </div>
               <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Email" v-model="data.email" class="w-full" name="user-email" v-validate="'required|email'" />
              <span class="text-danger">{{ errors.first('user-email') }}</span>
            </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Tel-no" v-model="data.tel_no" class="w-full" name="user-tel" v-validate="'required|min:10'" />
              <span class="text-danger">{{ errors.first('user-tel') }}</span>
            </div>
               <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="IC-no" v-model="data.ic_no" class="w-full" name="user-ic" v-validate="'required|min:10'" />
              <span class="text-danger">{{ errors.first('user-ic') }}</span>
            </div>
        
      
      <br>
      Profile Image
                 <vue-dropzone ref="myVueDropzone2" id="dropzone2" :options="dropzoneOptions2" v-on:vdropzone-success="successEvent2"></vue-dropzone>
        <!--    <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-select v-model="city" class="w-full select-large" label="City">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
              </vs-select>
            </div> -->
        <br>

          <vs-button color="primary" type="filled" icon-pack="feather" icon="icon-download"    @click="submit">Submit</vs-button>

          </form>

     

  

  
  </div>
</template>

<script>

import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  components: {
vueDropzone: vue2Dropzone
  },
  data () {
    return {
    userInfo:JSON.parse(localStorage.getItem('userInfo')),
    data:{
           username:'',
        email:'',
        tel_no:'',
        password:'123456',
        position:'Nurse',
        center:'',
        photoUrl:'',
        ic_no:''
      },
           dropzoneOptions2: {
      url: 'https://backend.enigmedsvcs.com/development/workforce/photo/upload',
          thumbnailWidth: 150,
          maxFilesize: 5.0,
          maxFiles: 1,
          addRemoveLinks: true,
          acceptedFiles:'image/*'
          //autoProcessQueue: false
          
      },
    }
  },
  watch: {
 
  },
  computed: {

  },
  methods: {
   submit(){
    var self=this;  
    if(self.data.photoUrl==''){
               return    self.$vs.notify({
          title: 'Error',
          text: 'Upload profile image to continue..',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
          
    }
     self.$validator.validateAll().then(result => {
        if (result) {
      self.$http.post('workforce/non-admin', {
         username: self.data.username,
                    email:self.data.email,
                    tel_no: self.data.tel_no,
                    password:'123456',
                    position:self.data.position,
                    center:self.data.center,
                     photoUrl:self.data.photoUrl,
                     ic_no:self.data.ic_no,
                     accountId:self.userInfo.accountId,
                     clinicId:self.userInfo.clinicId
    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                 self.$vs.notify({
          title: 'Success',
          text: response.data.success,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
                    self.$router.push('/dashboard')
         
                }
               else {
                  if(response.data.error){
                    self.$vs.notify({
          title: 'Error',
          text: response.data.error,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
          
                  }
                 else {
                       self.$vs.notify({
          title: 'Error',
          text: response.error,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
          
                   }
                }
                })
                .catch(function (error) {
                     self.$vs.notify({
          title: 'Error',
          text: error,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
                         
                });   
        }

      })

 
   
  },
         successEvent2 (file) {
        this.data.photoUrl =file.xhr.response;
      
      },

  },
  mounted () {
    


  }
}

</script>
