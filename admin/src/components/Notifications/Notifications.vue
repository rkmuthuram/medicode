<template>
  <section class="notifications navbar-notifications">
    <header class="header">
      <h6 class="my-3 text-center">You have {{unreadNotif}} new notifications</h6>
    </header>
  <b-list-group class="listGroup thin-scroll">

    <b-list-group-item class="listGroupItem" v-for="item in unreadNotifications" :key="item.idx">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-angle-double-up fa-2x" />
      </span>
      <p class="text-ellipsis m-0">
        {{item.title}} <br>  <b-button size="xs" variant="success" class="mr-1" @click="navigateToStockAlert(item.idx,item.readStatus)">{{item.msg}}</b-button> 
        <time class="help-block m-0">
        {{item.create_time}}
        </time>
      </p>
    </b-list-group-item>
 
  </b-list-group>
   
  </section>
</template>

<script>
import Vue from 'vue';

import NotifictionsList from './NotificationsDemo/NotificationsList';
import NewNotifictionsList from './NotificationsDemo/NewNotificationsList';
import Messages from './NotificationsDemo/Messages';
import Progress from './NotificationsDemo/Progress';

export default {
  props: {
   unreadNotif: Number,
   unreadNotifications:Array
 },
  name: 'Notification',
  components: {
    NotifictionsList, NewNotifictionsList, Messages, Progress,
  },
  data() {
    return {
      notificationsTabSelected: 1,
      newNotifications: null,
      isLoad: false,
      uid:window.localStorage.getItem('id'),
    };
  },
  methods: {
    loadNotifications() {
      Vue.set(this, 'isLoad', true);

      setTimeout(() => {
        Vue.set(this, 'newNotifications', 'new notifications component');
        Vue.set(this, 'isLoad', false);
      }, 1500);
    },
      navigateToStockAlert(notificationId,readStatus){
        
      if(readStatus==1){
     
 this.$router.push({name: 'NotificationView', params: {notificationId:notificationId }})

      }
      if(readStatus==0){
        var self=this;
       self.axios.patch('https://backend.enigmedsvcs.com/development/admin/single-notifications/'+ notificationId+'/'+ self.uid, {
         
                })
                .then(function (response) {
                  console.log(response);
                if(response.status == 200 && response.data.success){
            
                self.$emit('getNotifications')
            self.$router.push({name: 'NotificationView', params: {notificationId:notificationId }})
                }
                else {
                  if(response.data.error){
                  
          
                  }
                 else {
               
                   }
                }
                })
                .catch(function (error) {
                            
                });   
      }
 
    },
  },
};
</script>

<style src="./Notifications.scss" lang="scss" />
