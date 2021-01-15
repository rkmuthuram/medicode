<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Medicine Dashboard - {{data.product_name}}</li>
    </ol>


    <b-row>
      <b-col md="8" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Information" active>
              
    <legend>Complete Information</legend>
     <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
              >
                <div slot="label">
               Clinic Id
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.id"
                     id="clinicId"
                v-bind:data-id="clinicId"
                 disabled 
                />
              </b-form-group>


    <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="internalid"
                description=""
              >
                <div slot="label">
               Internal QR Code (Internal Id)
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="internal_qrcode"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('internalid')}"
                  type="text"
                v-model="data.internal_qrcode"
                   id="internal_qrcode"
                v-bind:data-id="data.internal_qrcode"
                />
                <span class="text-danger" v-if="errors.has('internalid')">
                  {{ errors.first('internalid') }}
                </span>
              </b-form-group>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="internalbar"
                description=""
              >
                <div slot="label">
               Internal Bar Code
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="internalbar"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('internalbar')}"
                  type="text"
                v-model="data.internal_barcode"
                />
                <span class="text-danger" v-if="errors.has('internalbar')">
                  {{ errors.first('internalbar') }}
                </span>
              </b-form-group>
                  <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="manufacturerbar"
                description=""
              >
                <div slot="label">
              Manufacturer Bar Code
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="manufacturerbar"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('manufacturerbar')}"
                  type="text"
                v-model="data.manufacturer_barcode"
                />
                <span class="text-danger" v-if="errors.has('manufacturerbar')">
                  {{ errors.first('manufacturerbar') }}
                </span>
              </b-form-group>
                   <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="packing_qty"
                description=""
              >
                <div slot="label">
                Packing Quantity
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="packing_qty"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('packing_qty')}"
                  type="text"
                v-model="data.packing_quantity"
                />
                <span class="text-danger" v-if="errors.has('packing_qty')">
                  {{ errors.first('packing_qty') }}
                </span>
              </b-form-group>


               <b-form-group
              label="Packing Type"
              label-for="default-select"
              :label-cols="3"
              description=""
            >
              <b-row>
                <b-col md='9'>
                  <v-select
                    v-validate="'required'"
                    
                    class="mt-xs"
                    v-model="data.packing_type"
                   
                  />
                </b-col>
              </b-row>
            </b-form-group>     

     <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="product_category"
                description=""
              >
                <div slot="label">
                Product Category
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="product_category"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('product_category')}"
                  type="text"
                v-model="data.product_category"
                />
                <span class="text-danger" v-if="errors.has('product_category')">
                  {{ errors.first('product_category') }}
                </span>
              </b-form-group>
                  <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="product_name"
                description=""
              >
                <div slot="label">
                Product Name
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="product_name"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('product_name')}"
                  type="text"
                v-model="data.product_name"
                />
                <span class="text-danger" v-if="errors.has('product_name')">
                  {{ errors.first('product_name') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="ingredient"
                description=""
              >
                <div slot="label">
                Ingredient
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="ingredient"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('ingredient')}"
                  type="text"
                v-model="data.ingredient"
                />
                <span class="text-danger" v-if="errors.has('ingredient')">
                  {{ errors.first('ingredient') }}
                </span>
              </b-form-group>
                        <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="manufacturer"
                description=""
              >
                <div slot="label">
               Manufacturer
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="manufacturer"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('manufacturer')}"
                  type="text"
                v-model="data.manufacturer"
                />
                <span class="text-danger" v-if="errors.has('manufacturer')">
                  {{ errors.first('manufacturer') }}
                </span>
              </b-form-group>
         
                   <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="color"
                description=""
              >
                <div slot="label">
            Color
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="color"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('color')}"
                  type="text"
                v-model="data.color"
                />
                <span class="text-danger" v-if="errors.has('color')">
                  {{ errors.first('color') }}
                </span>
              </b-form-group>
         

          </b-tab>
              <b-tab title="Check In History">
        
              <div class="table-responsive">
           <table class="table table-hover" id="myclinicinventorydatatable">
             <thead>
               <tr>
                  <th>#</th>
                 <th>Check In </th>
                  <th>Quantity</th>
                  <th>Timestamp</th>
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>


          </b-tab>

               <b-tab title="Check Out History">
        
              <div class="table-responsive">
           <table class="table table-hover" id="myclinicinventorydatatable2">
             <thead>
               <tr>
                  <th>#</th>
                  <th>Check Out </th>
                  <th>Quantity</th>
                  <th>Timestamp</th>
                  <th>Actions</th>       
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>


          </b-tab>
               <b-tab title="Ammend History">
        
              <div class="table-responsive">
           <table class="table table-hover" id="myclinicinventorydatatable3">
             <thead>
               <tr>
                 <th>Before</th>
                  <th>After</th>
                   <th>Remarks</th>
                  <th>Timestamp</th>
                     
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>


          </b-tab>
        </b-tabs>
      </b-col>
      <b-col lg='8' xs='12'>
       

      
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vSelect from 'vue-select';
import mock from './mock';
import VueBarcode from 'vue-barcode-master';
import VueQrcode from 'vue-qrcode-master';
const { Messenger } = window;

/* eslint-disable */
function initializationMessengerCode() {
  (function () {
    let $,
      FlatMessage,
      spinner_template,
      __hasProp = {}.hasOwnProperty,
      __extends = function (child, parent) {
        for (const key in parent) {
          if (__hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      };

    $ = jQuery;

    spinner_template = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';

    FlatMessage = (function (_super) {
      __extends(FlatMessage, _super);

      function FlatMessage() {
        return FlatMessage.__super__.constructor.apply(this, arguments);
      }

      FlatMessage.prototype.template = function (opts) {
        let $message;
        $message = FlatMessage.__super__.template.apply(this, arguments);
        $message.append($(spinner_template));
        return $message;
      };

      return FlatMessage;
    }(Messenger.Message));

    Messenger.themes.air = {
      Message: FlatMessage,
    };
  }).call(window);
}
/* eslint-enable */


export default {
  name: 'FormValidation',
  components: { Widget,vSelect,barcode: VueBarcode,qrcode:VueQrcode},
  data() {
    return {
            mock,
      data:{

      },
    
      inventoryId: this.$route.params.inventoryId,
      clinicId: this.$route.params.clinicId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    };
  },
  
  methods: {
 
   async getMedicine() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/medicine/'+ this.inventoryId)
  this.data = response.data.medicineInfo[0];
 
 
  } catch (error) {
    console.error(error);
  }
},
     navigateToDashboard(){
        this.$router.push({name:'Dashboard' });
    },

  },
   mounted(){
     this.getMedicine();
         
        $(document).ready(function() {
        var clinicId = $("#clinicId").attr("data-id");
        var productId = $("#internal_qrcode").attr("data-id");
  
          

      var table5 =  $('#myclinicinventorydatatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/inventory/clinic/checkins/"+clinicId+"/"+productId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit Member'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    }
	
  ]
  } );


    var table6 =  $('#myclinicinventorydatatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/inventory/clinic/checkouts/"+clinicId+"/"+productId,
		"columnDefs": [
    {
      "data": null,
      "defaultContent": "<button class='btn' id='edit' title='Edit Member'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    }
	
  ]
  } );


      var table7 =  $('#myclinicinventorydatatable3').DataTable( {
		"processing": true,
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/development/inventory/clinic/product3/admin/"+clinicId+"/"+productId,
	
  } );


    $('#myclinicinventorydatatable tbody').on( 'click', '#edit', function () {
		var data = table5.row( $(this).parents('tr') ).data();
		 window.open('https://admin.medicodesolution.com/app/checkin-view/' + data[1]);
    } );

        $('#myclinicinventorydatatable2 tbody').on( 'click', '#edit', function () {
		var data = table6.row( $(this).parents('tr') ).data();
		 window.open('https://admin.medicodesolution.com/app/checkout-view/' + data[1]);
    } );
  
   
	
      });
  
      
   },
     created() {
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.locationClasses,
      theme: 'air',
      showCloseButton: true,
    };
  
  },
};
</script>
