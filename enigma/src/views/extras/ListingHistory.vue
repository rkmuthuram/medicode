


<template>
  <div id="checkin-tableview">
    


    
   <div class="table-responsive">
            <table class="table table-striped table-bordered table-responsive" id="clinichistorydatatable">
             
             <thead>
               <tr>
                 <th>Id</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Author</th> 
                   <th>Time</th> 
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
      
    var table8 =  $('#clinichistorydatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
         "dom": 'frtip',
    "ajax": "https://backend.enigmedsvcs.com/development/admin/clinicHistory/"+ userInfo.clinicId,
    	"columnDefs": [
    {
      "targets": 0,
      "visible":false,
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