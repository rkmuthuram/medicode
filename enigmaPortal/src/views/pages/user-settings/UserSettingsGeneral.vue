<template>
  <vx-card no-shadow>

    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="activeUserInfo.photoURL" size="70px" class="mr-4 mb-4" />
      <div>
       <!-- <vs-button class="mr-4 sm:mb-0 mb-2" disabled>Upload photo</vs-button>
        <vs-button type="border" color="danger" disabled>Remove</vs-button>
        <p class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB</p> -->
      </div>
    </div>

    <!-- Info -->
    <vs-input class="w-full mb-base" label-placeholder="Username" v-model="userInfo.displayName"></vs-input>
    <vs-input class="w-full" label-placeholder="Email" v-model="userInfo.email"></vs-input>
  <vs-input class="w-full my-base" label-placeholder="Clinic" v-model="userInfo.clinicName"></vs-input>
    <vs-input class="w-full my-base" label-placeholder="Account" v-model="userInfo.accountName"></vs-input>
      <vs-input class="w-full my-base" label-placeholder="Role" v-model="userInfo.userRole"></vs-input>
    <vs-alert icon-pack="feather" icon="icon-info" class="h-full my-4" color="success">
      <span>Your account is verified & active</span>
    </vs-alert>

  

    <!-- Save & Reset Button -->
  <!--  <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div> -->
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      userInfo:JSON.parse(localStorage.getItem('userInfo')),
      username: 'johny_01',
      name: this.$store.state.AppActiveUser.displayName,
      email: 'john@admin.com',
      company: 'SnowMash Technologies Pvt Ltd'
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
