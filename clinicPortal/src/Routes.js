import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';




import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
import ActivationStaff from '@/pages/Activation/ActivationStaff';
import ForgotPasswordStaff from '@/pages/ForgotPassword/ForgotPasswordStaff';


// Charts
import DashboardAnalytics from '@/pages/AnalyticsDbc/DashboardAnalytics';
import Anal from '@/pages/AnalyticsDbc/Anal';
import CustomerFeedback from '@/pages/AnalyticsDbc/CustomerFeedback.vue';
import CustomerFeedbackForm from '@/pages/AnalyticsDbc/CustomerFeedbackForm.vue';


// DBC Links
import MembersListing from '@/pages/Members/MembersListing';
import MembersCreate from '@/pages/Members/MembersCreate';
import MembersView from '@/pages/Members/MembersView';
import MembersProgramme from '@/pages/Members/MembersProgramme';
import MembersUpdate from '@/pages/Members/MembersUpdate';


import WorkforceListing from '@/pages/Workforce/WorkforceListing';
import WorkforceCreate from '@/pages/Workforce/WorkforceCreate';
import WorkforceView from '@/pages/Workforce/WorkforceView';
import WorkforceUpdate from '@/pages/Workforce/WorkforceUpdate';


import AccountListing from '@/pages/Account/AccountListing';
import AccountCreate from '@/pages/Account/AccountCreate';
import AccountView from '@/pages/Account/AccountView';
import AccountUpdate from '@/pages/Account/AccountUpdate';

import ProfileView from '@/pages/MyProfile/ProfileView';
import ProfileUpdate from '@/pages/MyProfile/ProfileUpdate';



import BookingsListing from '@/pages/Bookings/BookingsListing';
import BookingsListingCenter from '@/pages/Bookings/BookingsListingCenter';
import BookingsListingPersonal from '@/pages/Bookings/BookingsListingPersonal';
import BlockedListing from '@/pages/Bookings/BlockedListing';
import BookingsCreate from '@/pages/Bookings/BookingsCreate';
import BlockingsCreate from '@/pages/Bookings/BlockingsCreate';
import BlockingsView from '@/pages/Bookings/BlockingsView';
import BookingsView from '@/pages/Bookings/BookingsView';
import BookingsUpdate from '@/pages/Bookings/BookingsUpdate';
import Scheduling from '@/pages/Bookings/Scheduling';






Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/forgotpasswordStaff/:token/:email',
      name: 'ForgotPasswordStaff',
      component: ForgotPasswordStaff,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/activationStaff/:token/:email',
      name: 'ActivationStaff',
      component: ActivationStaff,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardAnalytics,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'analytics',
          name: 'Analytics',
          component: Anal,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'customer-feedback',
          name: 'Customer Feedback',
          component: CustomerFeedback,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'customer-feedback-form',
          name: 'Customer Feedback Form',
          component: CustomerFeedbackForm,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'memberslisting',
          name: 'MembersListing',
          component: MembersListing,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'memberscreate',
          name: 'MembersCreate',
          component: MembersCreate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'membersview/:memberId',
          name: 'MembersView',
          component: MembersView,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'membersprogramme/:programmeId',
          name: 'MembersProgramme',
          component: MembersProgramme,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'membersupdate/:memberId',
          name: 'MembersUpdate',
          component: MembersUpdate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'accountlisting',
          name: 'AccountListing',
          component: AccountListing,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'accountcreate',
          name: 'AccountCreate',
          component: AccountCreate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'accountview/:accountId',
          name: 'AccountView',
          component: AccountView,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'accountupdate/:accountId',
          name: 'AccountUpdate',
          component: AccountUpdate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'profileview',
          name: 'ProfileView',
          component: ProfileView,
        },
        {
          path: 'profileupdate',
          name: 'ProfileUpdate',
          component: ProfileUpdate,
        },
        {
          path: 'workforcelisting',
          name: 'WorkforceListing',
          component: WorkforceListing,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforcecreate',
          name: 'WorkforceCreate',
          component: WorkforceCreate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforceview/:memberId',
          name: 'WorkforceView',
          component: WorkforceView,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforceupdate/:memberId',
          name: 'WorkforceUpdate',
          component: WorkforceUpdate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'bookingslisting',
          name: 'BookingsListing',
          component: BookingsListing,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'bookingsscheduling',
          name: 'Scheduling',
          component: Scheduling,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'bookingslistingcenter',
          name: 'BookingsListingCenter',
          component: BookingsListingCenter,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'bookingslistingpersonal',
          name: 'BookingsListingPersonal',
          component: BookingsListingPersonal,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'blockedlisting',
          name: 'BlockedListing',
          component: BlockedListing,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'bookingscreate',
          name: 'BookingsCreate',
          component: BookingsCreate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'blockingscreate',
          name: 'BlockingsCreate',
          component: BlockingsCreate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'blockingsview/:blockingId',
          name: 'BlockingsView',
          component: BlockingsView,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'bookingsview/:bookingId',
          name: 'BookingsView',
          component: BookingsView,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'bookingsupdate/:bookingId',
          name: 'BookingsUpdate',
          component: BookingsUpdate,
          meta:{
            requiresAuth: true
          }
        },
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    }
  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = window.localStorage.getItem('authenticated');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  if (requiresAuth){
    if(currentUser=='false'){
      next('/login');
    }
    else{
      next();
    }
  }
  else if(requiresGuest){
    if(currentUser=='true'){
      next('/app/dashboard');
    }
    else{
      next();
    }
  }
  else{
    next();
  }
})
export default router


