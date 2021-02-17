


<template>
  <div id="checkin-tableview">
    
 
     <!-- tab 1 content -->
          <form >
       
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="File Title" v-model="data.title" class="w-full" name="file-title" v-validate="'required|min:5'" />
              <span class="text-danger">{{ errors.first('file-title') }}</span>
            </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="File Description (optional)" v-model="data.desc" class="w-full" name="file-title"  />
            </div>
      
      <br>
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-file-added="checkOtherImage" v-on:vdropzone-queue-complete="onDropzoneUploadComplete"></vue-dropzone>
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
       title:'',
       desc:'',
       attachments:[],

      },
           dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/development/fileManager/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 15,
          addRemoveLinks: true,
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
    if(self.data.attachments.length==0){
               return    self.$vs.notify({
          title: 'Error',
          text: 'Upload any file to continue..',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
          
    }
     self.$validator.validateAll().then(result => {
        if (result) {
      self.$http.post('fileManager', {
          title:self.data.title,
        staffId:self.userInfo.uid,
        staffName:self.userInfo.displayName,
        clinicId:self.userInfo.clinicId,
        desc:self.data.desc,
        attachments:self.data.attachments.join(),
          

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
        removeOtherImage(i){
      this.data.attachments.splice(i,1);
    },
       removeImage(){
      this.data.photoUrl='';
    },
        checkOtherImage(file){
  
      if((this.data.attachments.length +  this.$refs.myVueDropzone.getQueuedFiles().length) > 14){
         this.$refs.myVueDropzone.removeAllFiles();
            this.$vs.notify({
          title: 'Error',
          text: '"Maximum 15 items total. Remove at least one existing attachment before uploading new document!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
  
      }
    },
        onDropzoneUploadComplete(file){
    //    console.log(this.images);
    var myfiles = this.$refs.myVueDropzone.getAcceptedFiles();
    var i = 0;
  for(i=0; i < myfiles.length;i++){
 // console.log(myfiles[i].xhr.response);
  this.data.attachments.push(myfiles[i].xhr.response);
   if(i == myfiles.length){
  
  }
  }
    this.upload++;
     //    console.log(this.upload);
 // console.log(this.images);
    },
  },
  mounted () {
    


  }
}

</script>
