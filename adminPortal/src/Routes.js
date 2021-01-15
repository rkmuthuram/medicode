import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';




import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';


// 1. Dashboard
import Dashboard from '@/pages/Dashboard/Dashboard';

// 2. Settings
import Settings from '@/pages/Dashboard/Settings';

// 3. Accounts
import AccountCreate from '@/pages/Accounts/AccountCreate';
import AccountListing from '@/pages/Accounts/AccountListing';
import AccountView from '@/pages/Accounts/AccountView';
import AccountUpdate from '@/pages/Accounts/AccountUpdate';
import ClinicAccountCreate from '@/pages/Accounts/ClinicAccountCreate';
import ClinicAccountView from '@/pages/Accounts/ClinicAccountView';
import ClinicAccountUpdate from '@/pages/Accounts/ClinicAccountUpdate';
import ClinicAccountCreateIP from '@/pages/Accounts/ClinicAccountIPCreate';
import ClinicPreCheckIn from '@/pages/Accounts/ClinicPreCheckIn';
import ClinicCheckIn from '@/pages/Accounts/ClinicCheckIn';
import ClinicCheckOut from '@/pages/Accounts/ClinicCheckOut';
import ClinicStockUpdate from '@/pages/Accounts/ClinicStockUpdate';
import ClinicFileUpload from '@/pages/Accounts/ClinicFileUpload';
import ClinicFileUpdate from '@/pages/Accounts/ClinicFileUpdate';

import PreCheckInListing from '@/pages/Accounts/PreCheckInListing';
import PreCheckInView from '@/pages/Accounts/PreCheckInView';
import CheckInListing from '@/pages/Accounts/CheckInListing';
import CheckInView from '@/pages/Accounts/CheckInView';
import ClinicInventoryView from '@/pages/Accounts/ClinicInventoryView';
import CheckOutView from '@/pages/Accounts/CheckOutView';
// 4. Workforce
import WorkforceListing from '@/pages/Workforce/WorkforceListing';
import WorkforceCreate from '@/pages/Workforce/WorkforceCreate';
import WorkforceCreateAccountClinic from '@/pages/Workforce/WorkforceCreateAccountClinic';
import WorkforceCreateAccountAdmin from '@/pages/Workforce/WorkforceCreateAccountAdmin';
import WorkforceView from '@/pages/Workforce/WorkforceView';
import WorkforceUpdate from '@/pages/Workforce/WorkforceUpdate'; 


// 5. Vendors

import VendorCreate from '@/pages/Vendor/VendorCreate';
import VendorListingPublic from '@/pages/Vendor/VendorListingPublic';
import VendorListingPrivate from '@/pages/Vendor/VendorListingPrivate';
import VendorView from '@/pages/Vendor/VendorView';
import VendorUpdate from '@/pages/Vendor/VendorUpdate';

// 6. Medicine

import MedicineCreate from '@/pages/Medicine/MedicineCreate';
import MedicineListing from '@/pages/Medicine/MedicineListing';
import MedicineView from '@/pages/Medicine/MedicineView';
import MedicineUpdate from '@/pages/Medicine/MedicineUpdate';




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
          component: Dashboard,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-create',
          name: 'AccountCreate',
          component: AccountCreate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'vendor-create',
          name: 'VendorCreate',
          component: VendorCreate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'vendor-listing-public',
          name: 'VendorListingPublic',
          component: VendorListingPublic,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'vendor-listing-private',
          name: 'VendorListingPrivate',
          component: VendorListingPrivate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'vendor-view/:vendorId',
          name: 'VendorView',
          component: VendorView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'vendor-update/:vendorId',
          name: 'VendorUpdate',
          component: VendorUpdate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'medicine-create',
          name: 'MedicineCreate',
          component: MedicineCreate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'medicine-listing',
          name: 'MedicineListing',
          component: MedicineListing,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'medicine-view/:medicineId',
          name: 'MedicineView',
          component: MedicineView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'medicine-update/:medicineId',
          name: 'MedicineUpdate',
          component: MedicineUpdate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-create-clinic/:accountId',
          name: 'ClinicAccountCreate',
          component: ClinicAccountCreate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-view-clinic/:clinicId',
          name: 'ClinicAccountView',
          component: ClinicAccountView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'precheckin-clinic/:clinicId',
          name: 'ClinicPreCheckIn',
          component: ClinicPreCheckIn,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'precheckin-listing',
          name: 'PreCheckInListing',
          component: PreCheckInListing,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'checkin-listing',
          name: 'CheckInListing',
          component: CheckInListing,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'precheckin-view/:preCheckInId/:clinicId',
          name: 'PreCheckInView',
          component: PreCheckInView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'checkin-view/:checkInId/:clinicId',
          name: 'CheckInView',
          component: CheckInView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'checkout-view/:checkOutId/:clinicId',
          name: 'CheckOutView',
          component: CheckOutView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'clinic-inventory-view/:clinicId/:inventoryId',
          name: 'ClinicInventoryView',
          component: ClinicInventoryView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'checkin-clinic/:clinicId',
          name: 'ClinicCheckIn',
          component: ClinicCheckIn,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'checkout-clinic/:clinicId',
          name: 'ClinicCheckOut',
          component: ClinicCheckOut,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-update-clinic/:clinicId',
          name: 'ClinicAccountUpdate',
          component: ClinicAccountUpdate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'stock-update-clinic/:clinicId',
          name: 'ClinicStockUpdate',
          component: ClinicStockUpdate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'file-upload-clinic/:clinicId',
          name: 'ClinicFileUpload',
          component: ClinicFileUpload,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'file-update-clinic/:fileId',
          name: 'ClinicFileUpdate',
          component: ClinicFileUpdate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-create-clinicIP/:accountId/:clinicId',
          name: 'ClinicAccountCreateIP',
          component: ClinicAccountCreateIP,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-listing',
          name: 'AccountListing',
          component: AccountListing,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-view/:accountId',
          name: 'AccountView',
          component: AccountView,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'account-update/:accountId',
          name: 'AccountUpdate',
          component: AccountUpdate,
            meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforce-listing',
          name: 'WorkforceListing',
          component: WorkforceListing,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforce-create',
          name: 'WorkforceCreate',
          component: WorkforceCreate,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforce-create-acc-admin/:accountId',
          name: 'WorkforceCreateAccountAdmin',
          component: WorkforceCreateAccountAdmin,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforce-create-acc-clinic/:accountId/:clinicId',
          name: 'WorkforceCreateAccountClinic',
          component: WorkforceCreateAccountClinic,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforce-view/:workforceId',
          name: 'WorkforceView',
          component: WorkforceView,
          meta:{
            requiresAuth: true
          }
        },
        {
          path: 'workforce-update/:workforceId',
          name: 'WorkforceUpdate',
          component: WorkforceUpdate,
          meta:{
            requiresAuth: true
          }
        },
      ],
    },

  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = window.localStorage.getItem('access');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  if (requiresAuth){
    if(currentUser!='staff' && currentUser!='admin'){
      next('/login');
    }
    else{
      next();
    }
  }
  else if(requiresGuest){
    if(currentUser=='staff' || currentUser=='admin'){
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


