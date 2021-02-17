


<template>
  <div id="staff-tableview">
    
    

   <div class="table-responsive">
            <table class="table table-striped table-bordered table-responsive"  id="staffadmindatatable2">
             
             <thead>
               <tr>
                <th>ID</th>
                  <th>Username</th>
                  <th>Email</th> 
                   <th>Role</th> 
                   <th>Status</th>
                
               </tr>
             </thead>
             <tbody>
             </tbody>
       
           </table>
           </div>
     

  

  
  </div>
</template>

<script>

import moment from 'moment';


export default {
  components: {

  },
  data () {
    return {
    userInfo:JSON.parse(localStorage.getItem('userInfo')),
    }
  },
  watch: {
 
  },
  computed: {

  },
  methods: {
 
  },
  mounted () {
    
    $(document).ready(function() {
      
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      var stafftable =  $('#staffadmindatatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
             "dom": 'frtip',
		"ajax": "https://backend.medicodesolution.com/development/workforce/clinic/admin/"+ userInfo.clinicId,
		"columnDefs": [
       {
        "targets": [0],
        "visible": false,
        "searchable": true
    },
	{ "targets" : 4,
          "render" : function (data, type, row) {
           
            if(data == 1) return 'Active';
           else if(data != 1) return 'Suspended';
   
            
          },
        }	
	
  ]
  } );



  	
      });

  }
}

</script>
<style lang="scss">


.btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 6px 8px;
  font-size: 12px;
  cursor: pointer;
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}
</style>