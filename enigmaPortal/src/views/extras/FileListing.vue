


<template>
  <div id="checkin-tableview">
    

    
   <div class="table-responsive">
            <table class="table table-striped table-bordered table-responsive" id="filesdatatable">
             
             <thead>
               <tr>
                  <th>ID</th>
                  <th>Staff</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Files</th>
                   <th>Upload Date</th>   
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
      
     var table7 =  $('#filesdatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/single/fileManager/admin/"+ userInfo.clinicId,
		"columnDefs": [


	  { "targets" : 4,
          "render" : function (data, type, row) {
           var str = data.split(',');
           var i=0;
           var finalString="";
    str.forEach(function(entry) {
  
       finalString += "<b><a href='" + entry + "'>Download File " +  Number(i+1) + "</a></b><br>"
      i++;
    
});

if(str.length==i){
  return finalString;
}
            
          },
        }	
  ]
  } );

  $('#checkindatatable tbody').on( 'click', '#edit', function () {
		var data = table4.row( $(this).parents('tr') ).data();
		 window.open('https://enigma.medicodesolution.com/view-check-in/'+ data[0]);
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