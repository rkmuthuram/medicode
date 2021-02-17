<template>
  <b-navbar toggleable="md" class="header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
     
    
        <b-nav-item-dropdown right extra-menu-classes="py-0">
          <template slot="button-content">
            <span class="avatar thumb-sm float-left mr-2">
              <img class="rounded-circle" src="https://storage.cloud.google.com/dbc-asia/resources/user.png" alt="..." />
            </span>
            <span class="d-md-down-none d-lg-inline"><span class="fw-semi-bold">{{username}}</span></span>
            <span v-if="unreadNotif!=0" class="ml-2 circle bg-primary text-white fw-bold d-md-down-none d-lg-inline-block">{{unreadNotif}}</span>
          </template>
          <notifications  :unreadNotif="unreadNotif" :unreadNotifications="unreadNotifications"   />
        </b-nav-item-dropdown>
   
        <b-nav-item class="divider"></b-nav-item>
     

        <b-nav-item class="d-md-down-none" @click="logout">
          <i class="la la-power-off px-2" />
        </b-nav-item>
   
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notifications from '@/components/Notifications/Notifications';

export default {
  name: 'Headed',
  components: { Notifications },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic,
    }),
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'toggleChat', 'switchSidebar', 'changeSidebarActive']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
  logout() {
      var txt;
  var r = confirm("Are you sure want to logout?");
  if (r == true) {
        window.localStorage.setItem('authenticated', false);
           window.localStorage.setItem('username',null);
      window.localStorage.setItem('id', null);
       window.localStorage.setItem('access', null);

      this.$router.push('/login');
  } else {
 
  }

    },
       async getNotifications() {
     var self=this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/admin/notifications/'+ this.uid)
   self.unreadNotifications = response.data.allNotifications;
                 self.unreadNotif = response.data.unreadNotifications;
            
 
  } catch (error) {
    console.error(error);
  }
}
  },
  created() {

  },
   mounted () {
    this.getNotifications();
     window.setInterval(() => {
    this.getNotifications();
  },30000)
  },
  data() {
    return {
      showNavbarAlert: true,
        username:window.localStorage.getItem('username'),
         uid:window.localStorage.getItem('id'),
            unreadNotif:0,
      unreadNotifications: []

    }
  }
};
</script>

<style src="./Header.scss" lang="scss" scoped />
