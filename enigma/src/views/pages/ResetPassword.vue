<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Reset Password</h4>
                                    <p>Please enter your new password.</p>
                                </div>
                                <vs-input type="email" label-placeholder="Email" v-model="email" class="w-full mb-6" disabled/>
                                <vs-input type="password" label-placeholder="Password" v-model="password" class="w-full mb-6" />
                                <vs-input type="password" label-placeholder="Confirm Password" v-model="password_confirm" class="w-full mb-8" />

                                <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                                    <vs-button type="border" to="/login" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Go Back To Login</vs-button>
                                    <vs-button class="w-full sm:w-auto" @click="resetPassword">Reset</vs-button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
     token: this.$route.params.token,
     email: this.$route.params.email,
     completed:'false',
     password:'',
     password_confirm:'',

    }
  },
  methods:{
        resetPassword() {
      const email = this.email;
      var self=this;
      if (self.password.length<6 ||self.password!=self.password_confirm) {
         
             return  self.$vs.notify({
          title: 'Validation Error',
          text: 'Password must be at least 6 characters & match with confirm password.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
           color: 'warning'
        })
      }

     else if (self.password.length>5 && self.password==self.password_confirm){
    var self = this;
      
      self.$http.patch('enigma/reset-password/'+self.token+'/'+self.email,{
          newPassword:self.password
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
        self.$router.push('/login')
               
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
  }
}
</script>
