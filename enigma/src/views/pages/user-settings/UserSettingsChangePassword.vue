<template>
  <vx-card no-shadow>

    <vs-input class="w-full mb-base" label-placeholder="Old Password" v-model="old_password" />
    <vs-input class="w-full mb-base" label-placeholder="New Password" v-model="new_password" />
    <vs-input class="w-full mb-base" label-placeholder="Confirm Password" v-model="confirm_new_password" />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="changePassword">Save Changes</vs-button>
    <!--  <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button> -->
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
      userInfo:JSON.parse(localStorage.getItem('userInfo')),
    }
  },
  methods:{
       changePassword() {
    
      var self=this;
      if (self.old_password.length<6 || self.new_password.length<6  || self.new_password!=self.confirm_new_password) {
         
             return  self.$vs.notify({
          title: 'Validation Error',
          text: 'Password must be at least 6 characters & match with confirm password.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
           color: 'warning'
        })
      }

     else if (self.old_password.length>5 || self.new_password.length>5  || self.new_password==self.confirm_new_password) {
    var self = this;
      
      self.$http.patch('enigma/change-password/'+self.userInfo.uid,{
          newPassword:self.new_password,
          oldPassword:self.old_password,
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
    },
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
