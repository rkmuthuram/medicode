<template>
  <!-- NOTIFICATIONS -->
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <feather-icon icon="BellIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" :badge="unreadNotif" />

    <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown">
<!--<span>{{ $socket.connected ? 'Online' : 'Offline' }}</span> -->
   <!--   <div class="notification-top text-center p-5 bg-primary text-white"> -->
     <div class="notification-top text-center p-5 bg-primary text-white">
        <h3 class="text-white">{{unreadNotif}}</h3>
        <p class="opacity-75">New Notifications</p>
      </div>

 <component :is="scrollbarTag" ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="settings" :key="$vs.rtl">
        <ul class="bordered-items">
          <li v-for="ntf in unreadNotifications" :key="ntf.idx" class="flex justify-between px-4 py-4 notification cursor-pointer" @click="navigateToStockAlert(ntf.idx,ntf.readStatus)">
            <div class="flex items-start">
              <feather-icon icon="MessageSquareIcon" :svgClasses="[`text-warning`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>
              <div class="mx-2">
                <span class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span>
                <small>{{ ntf.msg }}</small>
              </div>
            </div>
            <small class="mt-1 whitespace-no-wrap">{{ntf.create_time}}</small>
          </li>
        </ul>
      </component>

  <!-- <div class="
        checkout-footer
        fixed
        bottom-0
        rounded-b-lg
        text-primary
        w-full
        p-2
        font-semibold
        text-center
        border
        border-b-0
        border-l-0
        border-r-0
        border-solid
        d-theme-border-grey-light
        cursor-pointer">
        <span>View All Notifications</span> 
      </div> -->
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {
        userInfo:JSON.parse(localStorage.getItem('userInfo')),
        unreadNotif:0,
      unreadNotifications: [
     /*  {
          index    : 0,
          title    : 'New Message',
          msg      : 'Are your going to meet me tonight?',
          icon     : 'MessageSquareIcon',
          time     : this.randomDate({sec: 10}),
          category : 'primary'
        },
        { index    : 1,
          title    : 'New Order Recieved',
          msg      : 'You got new order of goods.',
          icon     : 'PackageIcon',
          time     : this.randomDate({sec: 40}),
          category : 'success'
        },
        { index    : 2,
          title    : 'Server Limit Reached!',
          msg      : 'Server have 99% CPU usage.',
          icon     : 'AlertOctagonIcon',
          time     : this.randomDate({min: 1}),
          category : 'danger'
        },
        { index    : 3,
          title    : 'New Mail From Peter',
          msg      : 'Cake sesame snaps cupcake',
          icon     : 'MailIcon',
          time     : this.randomDate({min: 6}),
          category : 'primary'
        },
        { index    : 4,
          title    : 'Bruce\'s Party',
          msg      : 'Chocolate cake oat cake tiramisu',
          icon     : 'CalendarIcon',
          time     : this.randomDate({hr: 2}),
          category : 'warning'
        }
        ,     {
          index    : 0,
          title    : 'New Message',
          msg      : 'Are your going to meet me tonight?',
          icon     : 'MessageSquareIcon',
          time     : this.randomDate({sec: 10}),
          category : 'primary'
        },
        { index    : 1,
          title    : 'New Order Recieved',
          msg      : 'You got new order of goods.',
          icon     : 'PackageIcon',
          time     : this.randomDate({sec: 40}),
          category : 'success'
        },
        { index    : 2,
          title    : 'Server Limit Reached!',
          msg      : 'Server have 99% CPU usage.',
          icon     : 'AlertOctagonIcon',
          time     : this.randomDate({min: 1}),
          category : 'danger'
        },
        { index    : 3,
          title    : 'New Mail From Peter',
          msg      : 'Cake sesame snaps cupcake',
          icon     : 'MailIcon',
          time     : this.randomDate({min: 6}),
          category : 'primary'
        },
        { index    : 4,
          title    : 'Bruce\'s Party',
          msg      : 'Chocolate cake oat cake tiramisu',
          icon     : 'CalendarIcon',
          time     : this.randomDate({hr: 2}),
          category : 'warning'
        } */
      ],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  sockets: {
    connect() {
   console.log('socket connected')
   //  this.$socket.client.emit('joinRoom', 'room1')
   //   this.subscribeChannels();
    },
    customEmit(val) {
  //    console.log(val)
    }
  },
    mounted () {
    this.getNotifications();
     window.setInterval(() => {
    this.getNotifications();
  }, 120000)
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    navigateToStockAlert(notificationId,readStatus){
      if(readStatus==1){
 this.$router.push({name: 'LowStockAlert', params: {notificationId:notificationId }})
      }
      if(readStatus==0){
            var self=this;
        this.$http.patch('enigma/single-notifications/'+ notificationId+'/'+ self.userInfo.uid)
                .then(function (response) {
             
                if(response.status == 200 && response.data.success){  
                //  console.log(response.data);
                  self.getNotifications();
                  self.$router.push({name: 'LowStockAlert', params: {notificationId:notificationId }})
                }
                else {
                 
                }
                })
                .catch(function (error) {
      
                });
      }
 
    },

     getNotifications(){
          var self=this;
        this.$http.get('enigma/notifications/'+ self.userInfo.clinicId + '/' + self.userInfo.uid)
                .then(function (response) {
             
                if(response.status == 200 && response.data.success){  
                //console.log(response.data);   
                 self.unreadNotifications = response.data.allNotifications;
                 self.unreadNotif = response.data.unreadNotifications;

                }
                else {
                 
                }
                })
                .catch(function (error) {
      
                });
      },




    subscribeChannels(){
  var self=this;
  this.$socket.client.on("displayNotifications", (arg) => {
    console.log(arg)
 self.$vs.notify({
          title: arg.title,
          text: arg.text,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: arg.color
        })
        return
});
    },
 
  }
}

</script>

