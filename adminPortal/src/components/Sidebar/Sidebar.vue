<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
    <nav :class="{sidebar: true}">
      <header class="logo">
        <router-link to="/app/dashboard">
          Admin 
          <span class="fw-semi-bold">Portal</span>
        </router-link>
      </header>
      <ul class="nav">
        <NavLink
          :activeItem="activeItem"
          header="Dashboard"
          link="/app/dashboard"
          iconName="flaticon-home"
          index="dashboard"
          isHeader
        />
       <NavLink
       v-if="username=='Medicode Administrator'" 
          :activeItem="activeItem"
          header="Accounts"
          link="/app/account-listing"
          iconName="flaticon-document"
          index="dashboard"
          isHeader
        />
         <NavLink
            v-if="username=='Medicode Administrator'" 
          :activeItem="activeItem"
          header="Vendors"
          link="/app/vendor-listing"
          iconName="flaticon-user"
          index="vendor"
          :childrenLinks="[
          { header: 'Public', link: '/app/vendor-listing-public' },
          { header: 'Private', link: '/app/vendor-listing-private' },     
        ]"
        />
        
          <NavLink
           v-if="username=='Medicode Administrator'" 
          :activeItem="activeItem"
          header="Medicines"
          link="/app/medicine-listing"
          iconName="flaticon-help"
          index="dashboard"
          isHeader
        />
         <NavLink
          v-if="username=='Medicode Administrator'"  
          :activeItem="activeItem"
          header="Pre Check Ins"
          link="/app/precheckin-listing"
          iconName="flaticon-database"
          index="dashboard"
          isHeader
        />
          <NavLink
           v-if="username=='Medicode Administrator'"  
          :activeItem="activeItem"
          header="Check Ins"
          link="/app/checkin-listing"
          iconName="flaticon-database"
          index="dashboard"
          isHeader
        />
           <NavLink
        v-if="username=='Medicode Administrator'" 
          :activeItem="activeItem"
          header="Settings"
          link="/app/settings"
          iconName="flaticon-settings"
          index="dashboard"
          isHeader
        />
       
     
       

      </ul>
      <h5 class="navTitle d-sm-down-none">
   
      </h5>
    
    </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: { NavLink },
  data() {
    return {
      username:window.localStorage.getItem('username'),
      access:window.localStorage.getItem('access'),
  
    };
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split("/");
      paths.pop();
      this.changeSidebarActive(paths.join("/"));
    }
  },
  created() {
    this.setActiveByRoute();
   
    
  },
  computed: {
    ...mapState("layout", {
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement
    })
  }
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
