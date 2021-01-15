import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'isLoggedOut'

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//const accessToken = JSON.parse(localStorage.getItem('accessToken'));

if (userInfo && userInfo.userRole) initialRole = userInfo.userRole
console.log('currentRole: '+initialRole)
//console.log('userInfo: '+userInfo)
//console.log('accessToken: '+accessToken)
export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    isLoggedIn    :  new AclRule('Account Admin').or('Clinic Admin (Doctor)').or('Clinic Admin (Management)').or('Nurse').generate(),
    isLoggedOut    : new AclRule('isLoggedOut').generate(),
       
  }
})
