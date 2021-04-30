<template>
  <div class="dashboard-page">
    <h1 class="page-title">
      <strong class="mr-3">Home</strong> 
      <small>Dashboard</small>
    </h1>
    <div class="sidesWrapper">
      <div class="analyticsSide">
      
        <div class="link-container">
        
          <div class="linkD" v-for="link in links" :key="link.id" @click="navigate(link.function)"><i class="fa link-icon" :class="link.icon" :style="{color:link.color}"/><div class="link-text" :style="{color:link.color}"> <strong>{{link.name}}</strong> </div></div>
        </div>

        <br><br>
        <legend></legend>
          <span>Main Clients</span>
        <div class="link-container">
        
          <div class="linkD" v-for="link in links2" :key="link.id" @click="navigateToClinicAccountView(link.id)"><i class="fa link-icon" :class="link.icon" :style="{color:link.color}"/><div class="link-text" :style="{color:link.color}"> <strong>{{link.name}}</strong> </div></div>
        </div>

      
    
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>

import Widget from "@/components/Widget/Widget";





export default {
  name: "Dashboard",
  components: {
    Widget,  },
  data() {
    return {
      clinics:[],
      links2:[],
      staffId:window.localStorage.getItem('id'),
      access:window.localStorage.getItem('access'),
      links: [
      /* {
          name: 'PRE CHECK IN',
          color: '#C043D2',
          icon: 'fa-sitemap',
          function: 'navigateToPreCheckIn'
        },
        {
          name: 'CHECK IN',
          color: '#C043D2',
          icon: 'fa-sign-out',
          function: 'navigateToCheckIn'
        },
       */ {
          name: 'CHECK OUT',
          color: '#C043D2',
          icon: 'fa-sign-in',
          function: 'navigateToCheckOut'
        },
        
       /* {
          name: 'INVENTORY ',
          color: '#F8AF0B',
          icon: 'fa-database',
            function: 'navigateToClinicAccountView'
        },
        {
          name: 'ACCOUNT SETTINGS ',
          color: '#46CD5F',
          icon: 'fa-user',
          function: 'navigateToClinicAccountView'
        }, */
        {
          name: 'UPLOAD FILES',
          color: '#4A314D',
          icon: 'fa-file',
          function: 'navigateToFileUploader'
        },
        {
          name: 'LOGOUT ',
          color: '#C42323',
          icon: 'fa-power-off',
          function: 'logout'
        },
        
      ],
    };
  },
  methods: {
    navigate(function_name){
      this [function_name]() 
    },
    navigateToClinicAccountView(id) {

      return this.$router.push({
        name: "ClinicAccountView",
        params: { clinicId: id }
      });
    },
       navigateToAccounts() {
      return this.$router.push({
        name: "AccountListing",
     
      });
    },
         navigateToPublicVendors() {
      return this.$router.push({
        name: "VendorListingPublic",
     
      });
    },
         navigateToPrivateVendors() {
      return this.$router.push({
        name: "VendorListingPrivate",
     
      });
    },
            navigateToMedicines() {
      return this.$router.push({
        name: "MedicineListing",
     
      });
    },

       navigateToPreCheckIn() {
      return this.$router.push({
        name: "PreCheckInListing",
  
      });
    },
     navigateToCheckIn() {
      return this.$router.push({
        name: "CheckInListing",
  
      });
    },
       navigateToSettings() {
      return this.$router.push({
        name: "Settings",
  
      });
    },
        navigateToFileUploader() {
      return this.$router.push({
        name: "ClinicFileUpload",
        params: { clinicId: '5' }
      });
    },
       navigateToCheckOut() {
      return this.$router.push({
        name: "ClinicCheckOut",
        params: { clinicId: '5' }
      });
    },


    logout() {
      var txt;
  var r = confirm("Are you sure want to logout?");
  if (r == true) {
       window.localStorage.setItem('authenticated', false);
    window.localStorage.setItem('username', false);
    window.localStorage.setItem('access',false );
      this.$router.push('/login');
  } else {
 
  }

    },
         async getAccounts() {
           var self=this;
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/all/clinics');
   
  var clinics = response.data.clinics;
 clinics.forEach(function(entry) {
   self.links2.push(    {
          name: entry.name,
          id:entry.id,
          accountId:entry.accountId,
          color: '#46CD5F',
          icon: 'fa-user',
          function: 'navigateToClinicAccountView'
        } )
});
    
    
    
  } catch (error) {
    console.error(error);
  }
},

  },
   mounted(){
 
          if(this.access=='admin'){
           this.links= [
       {
          name: 'ACCOUNTS',
          color: '#C043D2',
          icon: 'fa-sitemap',
          function: 'navigateToAccounts'
        },
        {
          name: 'VENDORS (Public)',
          color: '#C043D2',
          icon: 'fa-sign-out',
          function: 'navigateToPublicVendors'
        },
        {
        name: 'VENDORS (Private)',
          color: '#C043D2',
          icon: 'fa-sign-in',
          function: 'navigateToPrivateVendors'
        },
        {
          name: 'MEDICINES ',
          color: '#F8AF0B',
          icon: 'fa-database',
            function: 'navigateToMedicines'
        },
        {
          name: 'PRE CHECK-INS ',
          color: '#46CD5F',
          icon: 'fa-user',
          function: 'navigateToPreCheckIn'
        }, 
          {
          name: 'CHECKINS',
          color: '#4A314D',
          icon: 'fa-file',
          function: 'navigateToCheckIn'
        },
           {
          name: 'SETTINGS',
          color: '#4A314D',
          icon: 'fa-file',
          function: 'navigateToSettings'
        },
        {
          name: 'LOGOUT ',
          color: '#C42323',
          icon: 'fa-power-off',
          function: 'logout'
        },
        
      ];
        this.links2 = [];
          }
       this.getAccounts();
  
  
      
   },
  unmounted() {
  
  },
  computed: {

  }
};
</script>

<style scoped>
.link-container {
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.linkD{
  height: 150px;
  width: 150px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-right: 15px;
  margin-top: 15px;
  transition-duration: .5s;
  box-shadow: 1px 1px 5px #07070780;
}
.linkD:hover {
  box-shadow: 4px 4px 25px #0707078a;
  cursor: pointer;
  transition-duration: .5s;
}
.link-icon {
  font-size: 35px;
  margin-top: 10px;
}
.link-text {
  width: 100%;
  font-size: 11.5px;
  text-align: center;
  margin-top: 15px;
}
@media only screen and (max-width: 600px) {
  .link-container {
    width: 100vw;
  }
  .linkD {
    width: calc(50vw - 40px);
    height: calc(50vw - 35px);
    margin-right: 30px;
    margin-top: 30px;
  }
  .link-icon {
    font-size: 55px;
    margin-top: 20px;
  }
  .link-text {
    font-size: 15px;
    margin-top: 20px;
  }
}
</style>
