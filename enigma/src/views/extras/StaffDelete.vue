


<template>
  <div id="checkin-tableview">
    
 
     

  

  
  </div>
</template>

<script>



export default {
  components: {

  },
  data () {
    return {
    userInfo:JSON.parse(localStorage.getItem('userInfo')),
    workforceId: this.$route.params.workforceId,
    }
  },
  watch: {
 
  },
  computed: {

  },
  methods: {


  },
  mounted () {
    var self=this;

   self.$http.delete('workforce/'+self.workforceId, {
    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
              
                    self.$router.push('/staffs')
         
                }
               else {
               self.$router.push('/staffs')
                }
                })
                .catch(function (error) {
                  self.$router.push('/staffs')
                         
                });   
  }
}

</script>
