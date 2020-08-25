<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {  
    const currentPath = this.$router.history.current.path;
    if(currentPath=='/'){
       this.$router.push('/login');
    }
    if(currentPath.startsWith('/app/') && window.localStorage.getItem('authenticated') === 'false'){
      this.$router.push('/login');
    }
    else if(currentPath.startsWith('/login') && window.localStorage.getItem('authenticated') === 'true'){
      this.$router.push('/app/dashboard');
    }
  },

};
</script>

<style src="./styles/theme.scss" lang="scss" />
