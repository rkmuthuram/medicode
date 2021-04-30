


<template>
  <div id="staff-tableview">
    
    
<div class="demo-alignment">

            <vs-button color="primary" type="filled" icon-pack="feather" icon="icon-download"    @click="$router.push({name: 'staffs-add'}).catch(err => {})">NEW NURSE ACCOUNT</vs-button>
     

        </div>
   <div class="table-responsive">
            <table class="table table-striped table-bordered table-responsive"  id="staffadmindatatable2">
             
             <thead>
               <tr>
                <th>ID</th>
                  <th>Username</th>
                  <th>Email</th> 
                   <th>Role</th> 
                   <th>Status</th>
                   <th>Action</th>
                
               </tr>
             </thead>
             <tbody>
             </tbody>
       
           </table>
           </div>
     

  

  
  </div>
</template>

<script>

 

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
    async deleteRecord(){
       var self=this;
console.log('kk')
    },
  },
  mounted () {
    
    $(document).ready(function() {
      
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      var stafftable =  $('#staffadmindatatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
             "dom": 'frtip',
		"ajax": "https://backend.enigmedsvcs.com/development/workforce/clinic/admin/"+ userInfo.clinicId,
		"columnDefs": [
       {
        "targets": [0],
        "visible": false,
        "searchable": true
    },
        {
      "data": null,
      "defaultContent": "<button id='edit' class='btn'><i class='fa fa-home'></i>Delete</button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
	{ "targets" : 4,
          "render" : function (data, type, row) {
           
            if(data == 1) return 'Active';
           else if(data != 1) return 'Suspended';
   
            
          },
        }	
	
  ]
  } );


       $('#staffadmindatatable2 tbody').on('click', '#edit', (evt) => {
       
         //  const data = $(evt.target).data('logId');
           	var data = stafftable.row( $(evt.target).parents('tr') ).data();
           if(data[3]!="Nurse"){
        alert("No authorization to delete Admins/Doctors.")
    }
    if(data[3]=="Nurse"){
  	window.location.href = 'staff-delete/' + data[0] ;
	
    }
          // this.logData(data); 
      });

  	
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