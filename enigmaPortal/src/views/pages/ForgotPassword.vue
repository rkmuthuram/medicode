<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Recover your password</h4>
                                    <p>Please enter your email address and we'll send you instructions on how to reset your password.</p>
                                </div>

                                <vs-input type="email" label-placeholder="Email" v-model="email" class="w-full mb-8" />
                                <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Back To Login</vs-button>
                                <vs-button class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0" @click="forgotPassword">Recover Password</vs-button>
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
      email: ''
    }
  },
     methods: {
      validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
     forgotPassword() {
      const email = this.email;
      var self=this;
      if (this.validateEmail(email)==false) {
         
             return  self.$vs.notify({
          title: 'Validation Error',
          text: 'Fill up email field to request Reset Password link.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
           color: 'warning'
        })
      }

     else if (this.validateEmail(email)==true) {
    var self = this;
      
      self.$http.post('enigma/forgot-password/'+ self.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
           
              
              self.$vs.notify({
          title: 'Check Email for Reset Link',
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
     },
}
</script>
