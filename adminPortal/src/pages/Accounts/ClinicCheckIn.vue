<template>
  <b-row>
    <b-col xl='8' lg='16'>
      <Widget
        title="
        <div>
          <h4>
            New Check In&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'>Follow these 4 simple steps to complete Check In!</p>
        </div>"
        customHeader  collapse
      >
         <form-wizard
          shape="tab"
          color="#3498db"
          title=""
          subtitle=""
       @on-validate="handleValidation"
      
                  @on-loading="setLoading"
                  @on-error="handleErrorMessage"
        >
          <b-progress class="progress-xs" variant="gray-light" :value="progress" :max="3" />
          <b-button slot="prev" variant="primary">
            <i class="fa fa-caret-left" /> Previous
          </b-button>
          <b-button slot="next" variant="primary">
            Next <i class="fa fa-caret-right" />
          </b-button>
          <b-button  slot="finish" variant="success" @click="submit" v-if="isLoading==false" >
            Proceed  <i class="fa fa-check" />
          </b-button>
       <!-- <tab-content title="Invoice Info" :before-change="validOne"> -->
         <tab-content title="Invoice Info" >

              <b-form>
              
             <b-form-group
                  label="Select Pre Check In Record"
                >
           
               <v-select :options="preInfo"    v-model="selectedPreCheckIn" label="orderId" >
    <template slot="option" slot-scope="option">
        {{option.orderId}} - {{ option.vendorName}} - Created {{option.created}}
    </template>
  </v-select>
        </b-form-group>
         <b-card class="mb-xlg border-0"  v-if="selectedPreCheckIn!=null">
          <span class="fw-semi-bold text-success">Vendor : {{selectedVendorInfo.name}}</span>
          <span class="fw-semi-bold text-muted ml-sm">{{selectedPreCheckIn.orderId}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Comments:  {{selectedPreCheckIn.comments}} | Attachments : {{selectedPreCheckIn.attachments}}</small></span>
          </div>
          <div class="mb-lg">
           <table  class="table table-bordered table-lg mt-lg mb-0" >
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                   <th class="hidden-sm-down">Color</th>
                  <th class="">Purchase Order Qty</th>
                  
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in selectedPreCheckIn.allProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                        <td>{{product.color}}</td>
                     <td v-if="product.packing_type=='TABLETS'"> {{product.quantity_strips}} strips ({{product.quantity_tabletsperstrip}} per strip) | {{product.quantity_tablets}} tablets</td>
                                       <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'"> {{product.quantity_mlpervial}} ML/vial | {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_mlperampule}} ML/ampule | {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'">  {{product.quantity_perbottle}}{{product.quantity_unitperbottle}}/bottle | {{product.quantity_bottles}} bottles | {{product.quantity_unittotal}}{{product.quantity_unitperbottle}} </td>
                                            <td v-if="product.packing_type=='TUBE'">  {{product.quantity_pertube}}{{product.quantity_unitpertube}}/tube | {{product.quantity_tubes}} tubes | {{product.quantity_unittotal}}{{product.quantity_unitpertube}} </td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                           
                     
                </tr>
              </tbody>
            </table> 
          </div>
          
                        
        </b-card>

          <b-form-group
                  label="Invoice Number"
                >
               <input
                       
                  name="invoiceId"
                  :class="{ 'form-control': true}"
                  type="text"
               v-model="data.invoiceId"
                />
        </b-form-group>
            
           <b-form-group
                  label="Total Amount (RM)"
                >
               <input
                
                  
                  name="totalAmount"
                  :class="{ 'form-control': true}"
                  type="number"
               v-model="data.totalAmount"
                />
        </b-form-group> 
          <b-form-group>
           <label for="myvueDropZone">Upload Invoice </label>
             <label for="myvueDropZone"> *upto 3 items, max 10MB size*</label>
            
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-success="successEvent"></vue-dropzone>
       
              </b-form-group>
            <b-form-group
                  label="Additional Comments (optional)"
                >
              <textarea-autosize
                                  v-model="data.comments"
                                placeholder=""
                                :min-height="45"
                               
                                 
                             :class="{ 'form-control': true}"
                                id="comments"
                                name="comments"
                                />
        </b-form-group>
   


                
              </b-form>
            </tab-content>
          <tab-content title="Scan Products" :before-change="validTwo">
             
            
              <b-form>
              
                  <b-card class="mb-xlg border-0"  v-if="selectedPreCheckIn!=null">
          <span class="fw-semi-bold text-success">Vendor : {{selectedVendorInfo.name}}</span>
          <span class="fw-semi-bold text-muted ml-sm">#{{selectedPreCheckIn.orderId}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Comments:  {{selectedPreCheckIn.comments}} | Attachments : {{selectedPreCheckIn.attachments}}</small></span>
          </div>
          <div class="mb-lg">
            <table  class="table table-bordered table-lg mt-lg mb-0" >
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                    <th class="">Color</th>
                  <th class="">Purchase Order Qty</th>
                  <th class="">Delivered Qty</th>
                  <th class="">Expiry Date</th>
                   <th class="">Batch Number</th>
                  
                   <th class="">Manufacturer Barcode</th>
                    <th class="">Internal QR Code</th>
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in selectedPreCheckIn.allProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                      <td>{{product.color}}</td>
                      <td v-if="product.packing_type=='TABLETS'"> {{product.quantity_strips}} strips ({{product.quantity_tabletsperstrip}} per strip) | {{product.quantity_tablets}} tablets</td>
                                       <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'"> {{product.quantity_mlpervial}} ML/vial | {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_mlperampule}} ML/ampule | {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'">  {{product.quantity_perbottle}}{{product.quantity_unitperbottle}}/bottle | {{product.quantity_bottles}} bottles | {{product.quantity_unittotal}}{{product.quantity_unitperbottle}} </td>
                                            <td v-if="product.packing_type=='TUBE'">  {{product.quantity_pertube}}{{product.quantity_unitpertube}}/tube | {{product.quantity_tubes}} tubes | {{product.quantity_unittotal}}{{product.quantity_unitpertube}} </td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                    


                               <td>
                                 <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge>
                                         <div v-if="product.packing_type=='TABLETS' && product.delivered_quantity>0" :key="componentKey">

     <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                  <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number"  @change="getTabletValue(index)"  v-model="product.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Strips"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"  @change="getTabletValue(index)"  v-model="product.quantity_stripsperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
                  <tr>
                  
                  <td>       <b-form-group
              label="Strips"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent" type="number"  @change="getTabletValue(index)"  v-model="product.quantity_strips"></b-form-input>
    </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Tablets"
              label-for="append-field4"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field4" append="per strip">
                <b-form-input class="input-transparent"  type="number" @change="getTabletValue(index)"  v-model="product.quantity_tabletsperstrip"></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
                 <tr>
                  <td>       <b-form-group
              label="Tablets"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent" type="number"   @change="getTabletValue(index)"  v-model="product.quantity_tablets"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                                
            </tr>
                    
                
              </tbody>
            </table> 
                 
  
                </div>
                  <div v-if=" product.packing_type=='Per vial' || product.packing_type=='per vial'  && product.delivered_quantity>0 " :key="componentKey">
 <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                  <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number" @change="getVialValue(index)"  v-model="product.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Vial"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_vialsperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td> 
                <td> <b-form-group
              label="Vial"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_vials"></b-form-input>
              </b-input-group>
            </b-form-group> </td>  
                                      
            </tr>
                         <tr>
                 
            <td> <b-form-group
              label="ML / CC"
              label-for="append-field4"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field4" append="per vial">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_mlpervial"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     
              <td> <b-form-group
              label="ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_mls"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     
                   
          <!--  <td> <b-form-group
              label="ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="per dose">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_mlperdose"></b-form-input>
              </b-input-group>
            </b-form-group> </td>      -->  
         <!--   <td> <b-form-group
              label="Doses"
              label-for="append-field6"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field6" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
                            <div v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='vial per cc'  && product.delivered_quantity>0 " :key="componentKey">
<table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                     <tr>
                  <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number" @change="getVialValue(index)"  v-model="product.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Vial"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_vialsperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td> 
                <td> <b-form-group
              label="Vial"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_vials"></b-form-input>
              </b-input-group>
            </b-form-group> </td>  
                                      
            </tr>
                         <tr>
                 
            <td> <b-form-group
              label="ML / CC"
              label-for="append-field4"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field4" append="per vial">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_mlpervial"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     
              <td> <b-form-group
              label="ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_mls"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     
                   
          <!--  <td> <b-form-group
              label="ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="per dose">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_mlperdose"></b-form-input>
              </b-input-group>
            </b-form-group> </td>      -->  
         <!--   <td> <b-form-group
              label="Doses"
              label-for="append-field6"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field6" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="product.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
  
                </div>
      <div v-if="product.delivered_quantity>0 && product.packing_type=='per ampule'" :key="componentKey">
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                  <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number"  @change="getAmpuleValue(index)"  v-model="product.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Ampules"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue(index)"  v-model="product.quantity_ampuleperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td>   
                       <td> <b-form-group
              label="Ampules"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue(index)"  v-model="product.quantity_ampules"></b-form-input>
              </b-input-group>
            </b-form-group> </td>      
              <td> <b-form-group
              label="ML"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="per ampule">
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue(index)"  v-model="product.quantity_mlperampule"></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
                        <div v-if="product.packing_type=='BOTTLE' && product.delivered_quantity>0" :key="componentKey">
       <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                  <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number" @change="getBottleValue(index)"  v-model="product.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Bottles"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="product.quantity_bottleperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td>  </tr><tr> 
                       <td> <b-form-group
              label="Bottles"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="product.quantity_bottles"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
                    
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="product.quantity_unitperbottle" />
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="per tube">
                <b-form-input class="input-transparent"  type="number" @change="getBottleValue(index)"  v-model="product.quantity_perbottle" ></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
            <tr>
               <td> <b-form-group
              :label="product.quantity_unitperbottle"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="product.quantity_unittotal"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
              </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>

                 <div v-if="product.packing_type=='TUBE' && product.delivered_quantity>0" :key="componentKey">
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                  <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number" @change="getTubeValue(index)"  v-model="product.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Tubes"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"  @change="getTubeValue(index)"  v-model="product.quantity_tubeperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td>  </tr><tr> 
                       <td> <b-form-group
              label="Tubes"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getTubeValue(index)"  v-model="product.quantity_tubes"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
                    
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="product.quantity_unitpertube" />
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="per tube">
                <b-form-input class="input-transparent"  type="number" @change="getTubeValue(index)"  v-model="product.quantity_pertube" ></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
            <tr>
               <td> <b-form-group
              :label="product.quantity_unitpertube"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getTubeValue(index)"  v-model="product.quantity_unittotal"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
              </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>

                  <div v-if="product.delivered_quantity>0 && product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' "  :key="componentKey">
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                  <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number"  @change="getWholeValue(index)"  v-model="product.quantity_boxes"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                  <td> <b-form-group
              label="Units"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field2" append="per box">
                <b-form-input class="input-transparent"  type="number"   @change="getWholeValue(index)"  v-model="product.quantity_unitperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td>   
                       <td> <b-form-group
              label="Units"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"   @change="getWholeValue(index)"  v-model="product.quantity_units"></b-form-input>
              </b-input-group>
            </b-form-group> </td>      
                            
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div> 
                </td>
                                 <div v-if="product.delivered_quantity>0">
                                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="expirydate"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('expirydate')}"
                  type="date"
                v-model="product.expiry_date"
                />
                <span class="text-danger" v-if="errors.has('expirydate')">
                  {{ errors.first('expirydate') }}
                </span> 
                </div>
                               <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge></td>
                                <td>
                                   <div v-if="product.delivered_quantity>0">
                                <input
                  data-vv-validate-on="change"
                  v-validate="'required'"
                  name="batch_number"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('batch_number')}"
                  type="text"
                v-model="product.batch_number"
                />
                <span class="text-danger" v-if="errors.has('batch_number')">
                  {{ errors.first('batch_number') }}
                </span> 
                </div>
                                  <b-badge v-if="!product.delivered_quantity" variant="danger" class="text-gray-dark">NA</b-badge></td>
                                   
                                       <td><barcode v-bind:value="product.manufacturer_barcode" format="CODE128" :options="{ height:100 }" v-if="product.manufacturer_barcode">
  Show this if the rendering fails.
</barcode><span v-if="!product.manufacturer_barcode">No record</span></td>
 <td><qrcode :value="product.internal_qrcode+''+product.product_name" :options="{ height:100 }" v-if="product.internal_qrcode"></qrcode> <span v-if="!product.internal_qrcode">No record</span></td>
                     
                </tr>
              </tbody>
            </table> 
            
                  <b-modal v-model="showModal"  ref="modal" id="small" size="sm" body-class="bg-white" @ok="processManual" title="Cannot find barcode for product you just scanned. Manually select the product from dropdown below, or Click Ignore button to close." cancel-title="Ignore" ok-title="Submit">
                        <v-select :options="unselectedProducts"  :value="Index"  v-model="manualSelection" placeholder="Select Product" label="label"  >
    <template slot="option" slot-scope="option">
        {{ option.label }}
    </template>
  </v-select>
    </b-modal>
          </div>
          
                        
        </b-card>
  


       

    
              </b-form>
            </tab-content>
            <tab-content title="Review & Confirmation">
            
          

           <table  class="table table-bordered table-lg mt-lg mb-0" v-if="allSelectedProducts.length!=0">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                  <th class="">Qty</th>
                 
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in allSelectedProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                       <td>{{product.quantity}}</td>
                   
                </tr>
              </tbody>
            </table> 

        <div class="mb-lg" v-if="selectedPreCheckIn!=null">
            <h3 class="text-success mb-0">{{selectedPreCheckIn.preId}}</h3>
            Pre Check In Record
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.invoiceId}}</h3>
            Invoice Number 
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.totalAmount}}</h3>
            Total Amount (RM)
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.comments}}</h3>
            Comments
          </div>


      
              <b-form-group>
                  <input
                    type="checkbox"
                    id="checkbox-default"
                    v-model="accept"
                  />
                   <label for="checkbox-default">I have reviewed the contents and am ready to proceed</label>
                </b-form-group>
            </tab-content>
            <div class="loader" v-if="loadingWizard"></div>
    <div v-if="errorMsg">
      <span class="error">{{errorMsg}}</span>
    </div>
        </form-wizard>
      </Widget>
    </b-col>
  </b-row>
</template>
<style>
span.error{
  color:#e74c3c;
  font-size:20px;
  display:flex;
  justify-content:center;
}
</style>
<script>

import Vue from 'vue';
import vSelect from 'vue-select';
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { select2CountriesData, select2ShipmentData, cardTypesData } from './data';
import rns from '../../assets/cards/rns.png';
import moment from 'moment';
import VueBarcode from 'vue-barcode-master';
import VueQrcode from 'vue-qrcode-master';

const { Messenger } = window;
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
  name: 'FormWizardPage',
  components: { Widget, vSelect,vueDropzone: vue2Dropzone,barcode: VueBarcode,qrcode:VueQrcode},
  data() {
    return {
      manufacturerBarcodes:[],
      showModal:false,
      selectedVendorInfo:{},
      unselectedProducts:[],
      allSelectedProducts:[],
      unselectedBarcode:null,
      selectedPreCheckIn:null,
      manualSelection:{},
        clinicId: this.$route.params.clinicId,
        loadingWizard: false,
         errorMsg: null,
         count: 0,
      isLoading:false,
       data:{
        vendor:'',
       
       preCheckIn:'',
       invoiceId:'',
       totalAmount:'',
       attachments:[],
        comments:''
 
      },
      accept:false,
    progress:1,
    preInfo:[],
    medicineInfo:[],
    data2:{

    },
    componentKey:0,
    selectedMedicine:null,
    data3:{

    },
    
            dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/staging/checkin/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 3,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
    };
  },
  watch: {
  selectedPreCheckIn: function (preCheckIn) {
  this.selectedPreCheckIn.allProducts = JSON.parse(this.selectedPreCheckIn.allProducts);
  this.getPreSelectedVendor(this.selectedPreCheckIn.vendorId)
  }
},
  methods: {
    processManual(){ 
      const self=this;   
      if(self.manualSelection==null || self.manualSelection==''){
          return Messenger().post({type:'error',message:'Scanned barcode not tagged to any product!',hideAfter: 3,showCloseButton:true});
      }
  
        var selectedIndex = self.manualSelection.Index;
        console.log(selectedIndex);
        self.selectedPreCheckIn.allProducts[selectedIndex].manufacturer_barcode = self.unselectedBarcode;
           if(self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==undefined || self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==''){
     self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity= 1;
   }
   else {
     self.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity++;
   }
  return  Messenger().post({message:self.selectedPreCheckIn.allProducts[selectedIndex].product_name+' scanned!', hideAfter: 3,showCloseButton:true});
        console.log(self.manualSelection.Index);
    
    },
    removeFromList(){
      this.selectedMedicine=null;
      return Messenger().post({type:'success',message:'Item removed!',hideAfter: 3,showCloseButton:true});
    },
      removeFromAllProducts(index){
      this.allSelectedProducts.splice(index);
      return Messenger().post({type:'success',message:'Item removed!',hideAfter: 3,showCloseButton:true});
    },
    addToList(){
      if(this.selectedMedicine.quantity==null || this.selectedMedicine.quantity==undefined || this.selectedMedicine.quantity==''){
       return Messenger().post({type:'error',message:'Quantity required!',hideAfter: 3,showCloseButton:true});
      }
      this.allSelectedProducts.push(this.selectedMedicine);
      this.selectedMedicine=null;
         console.log(this.allSelectedProducts);
      return Messenger().post({type:'success',message:'Item added to list!',hideAfter: 3,showCloseButton:true});
   
    },
      getBottleValue(index){
         
          if(this.selectedPreCheckIn.allProducts[index].quantity_boxes==undefined || this.selectedPreCheckIn.allProducts[index].quantity_boxes==''){
    this.selectedPreCheckIn.allProducts[index].quantity_boxes = 0;
  }
      if(this.selectedPreCheckIn.allProducts[index].quantity_bottleperbox==undefined || this.selectedPreCheckIn.allProducts[index].quantity_bottleperbox==''){
    this.selectedPreCheckIn.allProducts[index].quantity_bottleperbox = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_bottles==undefined || this.selectedPreCheckIn.allProducts[index].quantity_bottle==''){
    this.selectedPreCheckIn.allProducts[index].quantity_bottles = 0;
  }
   if(this.selectedPreCheckIn.allProducts[index].quantity_unitperbottle==undefined || this.selectedPreCheckIn.allProducts[index].quantity_unitperbottle==''){
    this.selectedPreCheckIn.allProducts[index].quantity_unitperbottle = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_perbottle==undefined || this.selectedPreCheckIn.allProducts[index].quantity_perbottle==''){
    this.selectedPreCheckIn.allProducts[index].quantity_perbottle = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_unitperbottle==undefined || this.selectedPreCheckIn.allProducts[index].quantity_unitperbottle==''){
    this.selectedPreCheckIn.allProducts[index].quantity__unitperbottle = 'ml';
  }
  this.selectedPreCheckIn.allProducts[index].quantity_bottles = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_boxes) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_bottleperbox);
  this.selectedPreCheckIn.allProducts[index].quantity_unittotal  = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_bottles) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_perbottle);
  
  this.componentKey+=1;

    },
        getTubeValue(index){
        
          if(this.selectedPreCheckIn.allProducts[index].quantity_boxes==undefined || this.selectedPreCheckIn.allProducts[index].quantity_boxes==''){
    this.selectedPreCheckIn.allProducts[index].quantity_boxes = 0;
  }
      if(this.selectedPreCheckIn.allProducts[index].quantity_tubeperbox==undefined || this.selectedPreCheckIn.allProducts[index].quantity_tubeperbox==''){
    this.selectedPreCheckIn.allProducts[index].quantity_tubeperbox = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_tubes==undefined || this.selectedPreCheckIn.allProducts[index].quantity_tubes==''){
    this.selectedPreCheckIn.allProducts[index].quantity_tubes = 0;
  }
   if(this.selectedPreCheckIn.allProducts[index].quantity_unitpertube==undefined || this.selectedPreCheckIn.allProducts[index].quantity_unitpertube==''){
    this.selectedPreCheckIn.allProducts[index].quantity_unitpertube = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_pertube==undefined || this.selectedPreCheckIn.allProducts[index].quantity_pertube==''){
    this.selectedPreCheckIn.allProducts[index].quantity_pertube = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_unitpertube==undefined || this.selectedPreCheckIn.allProducts[index].quantity_unitpertube==''){
    this.selectedPreCheckIn.allProducts[index].quantity__unitpertube = 'g';
  }
  this.selectedPreCheckIn.allProducts[index].quantity_tubes = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_boxes) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_tubeperbox);
  this.selectedPreCheckIn.allProducts[index].quantity_unittotal  = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_tubes) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_pertube);
  
  this.componentKey+=1;

    },
    getAmpuleValue(index){
        if(this.selectedPreCheckIn.allProducts[index].quantity_boxes==undefined || this.selectedPreCheckIn.allProducts[index].quantity_boxes==''){
    this.selectedPreCheckIn.allProducts[index].quantity_boxes = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_ampuleperbox==undefined || this.selectedPreCheckIn.allProducts[index].quantity_ampuleperbox==''){
    this.selectedPreCheckIn.allProducts[index].quantity_ampuleperbox = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_ampules==undefined || this.selectedPreCheckIn.allProducts[index].quantity_ampules==''){
    this.selectedPreCheckIn.allProducts[index].quantity_ampules = 0;
  }
      if(this.selectedPreCheckIn.allProducts[index].quantity_mlperampule==undefined || this.selectedPreCheckIn.allProducts[index].quantity_mlperampule==''){
    this.selectedPreCheckIn.allProducts[index].quantity_mlperampule = 0;
  }
      this.selectedPreCheckIn.allProducts[index].quantity_ampules = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_boxes) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_ampuleperbox);
  
  this.componentKey+=1;

    },
       getWholeValue(index){
        if(this.selectedPreCheckIn.allProducts[index].quantity_boxes==undefined || this.selectedPreCheckIn.allProducts[index].quantity_boxes==''){
    this.selectedPreCheckIn.allProducts[index].quantity_boxes = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_unitperbox==undefined || this.selectedPreCheckIn.allProducts[index].quantity_unitperbox==''){
    this.selectedPreCheckIn.allProducts[index].quantity_unitperbox = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_units==undefined || this.selectedPreCheckIn.allProducts[index].quantity_units==''){
    this.selectedPreCheckIn.allProducts[index].quantity_units = 0;
  }
  
      this.selectedPreCheckIn.allProducts[index].quantity_units = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_boxes) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_unitperbox);
  
  this.componentKey+=1;

    },
    getVialValue(index){

  if(this.selectedPreCheckIn.allProducts[index].quantity_boxes==undefined || this.selectedPreCheckIn.allProducts[index].quantity_boxes==''){
    this.selectedPreCheckIn.allProducts[index].quantity_boxes = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_vialsperbox==undefined || this.selectedPreCheckIn.allProducts[index].quantity_vialsperbox==''){
    this.selectedPreCheckIn.allProducts[index].quantity_vialsperbox = 0;
  }
      if(this.selectedPreCheckIn.allProducts[index].quantity_vials==undefined || this.selectedPreCheckIn.allProducts[index].quantity_vials==''){
    this.selectedPreCheckIn.allProducts[index].quantity_vials = 0;
  }
  if(this.selectedPreCheckIn.allProducts[index].quantity_mlpervial==undefined || this.selectedPreCheckIn.allProducts[index].quantity_mlpervial==''){
    this.selectedPreCheckIn.allProducts[index].quantity_mlpervial = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_mls==undefined || this.selectedPreCheckIn.allProducts[index].quantity_mls==''){
    this.selectedPreCheckIn.allProducts[index].quantity_mls = 0;
  }
 /* if(this.selectedPreCheckIn.allProducts[index].quantity_mlperdose==undefined || this.selectedPreCheckIn.allProducts[index].quantity_mlperdose==''){
    this.selectedPreCheckIn.allProducts[index].quantity_mlperdose = 0;
  }
  
  if(this.selectedPreCheckIn.allProducts[index].quantity_doses==undefined || this.selectedPreCheckIn.allProducts[index].quantity_doses==''){
    this.selectedPreCheckIn.allProducts[index].quantity_doses = 0;
  } */


     this.selectedPreCheckIn.allProducts[index].quantity_vials = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_boxes) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_vialsperbox);
      this.selectedPreCheckIn.allProducts[index].quantity_mls = Number(this.selectedPreCheckIn.allProducts[index].quantity_mlpervial*this.selectedPreCheckIn.allProducts[index].quantity_vials);
  this.componentKey+=1;



    },
getTabletValue(index){

  if(this.selectedPreCheckIn.allProducts[index].quantity_boxes==undefined || this.selectedPreCheckIn.allProducts[index].quantity_boxes==''){
    this.selectedPreCheckIn.allProducts[index].quantity_boxes = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_stripsperbox==undefined || this.selectedPreCheckIn.allProducts[index].quantity_stripsperbox==''){
    this.selectedPreCheckIn.allProducts[index].quantity_stripsperbox = 0;
  }
     if(this.selectedPreCheckIn.allProducts[index].quantity_stripsperbox==undefined || this.selectedPreCheckIn.allProducts[index].quantity_stripsperbox==''){
    this.selectedPreCheckIn.allProducts[index].quantity_stripsperbox = 0;
  }
      if(this.selectedPreCheckIn.allProducts[index].quantity_strips==undefined || this.selectedPreCheckIn.allProducts[index].quantity_strips==''){
    this.selectedPreCheckIn.allProducts[index].quantity_strips = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_tabletsperstrip==undefined || this.selectedPreCheckIn.allProducts[index].quantity_tabletsperstrip==''){
    this.selectedPreCheckIn.allProducts[index].quantity_tabletsperstrip = 0;
  }
    if(this.selectedPreCheckIn.allProducts[index].quantity_tablets==undefined || this.selectedPreCheckIn.allProducts[index].quantity_tablets==''){
    this.selectedPreCheckIn.allProducts[index].quantity_tablets = 0;
  }

   this.selectedPreCheckIn.allProducts[index].quantity_strips = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_boxes) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_stripsperbox);
   this.selectedPreCheckIn.allProducts[index].quantity_tablets = parseInt(this.selectedPreCheckIn.allProducts[index].quantity_strips) * parseInt(this.selectedPreCheckIn.allProducts[index].quantity_tabletsperstrip);
  this.componentKey+=1;
},
async onSearch(search, loading) {
  if(escape(search)=='' || escape(search)==null || escape(search)==undefined){
   return this.medicineInfo;
  }
    loading(true);
    const response = await this.axios.get(`https://backend.medicodesolution.com/staging/search/medicines/${escape(search)}`);
    this.medicineInfo = response.data.medicineInfo;
    loading(false);
    },
     successEvent (file) {
        this.data.attachments.push(file.xhr.response);
      },
 onComplete: function(){
          submit()
        },
        setLoading: function(value) {
            this.loadingWizard = value
        },
        handleValidation: function(isValid, tabIndex){
       //    console.log('Tab: '+tabIndex+ ' valid: '+isValid)
        },
        handleErrorMessage: function(errorMsg){
          this.errorMsg = errorMsg
        },
        navigateToDashboard(){
        this.$router.push({name:'Dashboard' });
    },
      validOne:function() {
     return new Promise((resolve, reject) => {
           if(this.selectedPreCheckIn=='' || this.selectedPreCheckIn==null){
        
         	reject('Select Pre Check In to continue..')
         }
             if(this.data.invoiceId=='' || this.data.invoiceId==null){
        
         	reject('Key in invoice number to continue..')
         }
            if(this.data.totalAmount=='' || this.data.totalAmount==null){
        
         	reject('Key in Total Amount (RM) to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Invoice to continue..')
         }
              
       
       else{
      /*   console.log('precheckin:'+this.data.preCheckIn.id+'--- invoice number:'+this.data.invoiceId+'--- total amount:'+this.data.totalAmount+'--- attachments:'+ JSON.stringify(this.data.attachments) + '--- comments:'+this.data.comments); */
          resolve(true)
         }   
     
     })
    },
      validTwo:function() {
     return new Promise((resolve, reject) => {
        var minimumProductAdded=false;
            this.selectedPreCheckIn.allProducts.forEach(function(entry) {
    if(entry.delivered_quantity!=null && entry.delivered_quantity!=undefined){
      minimumProductAdded=true;
    }
});
                if(this.selectedPreCheckIn=='' || this.selectedPreCheckIn==null){
        
         	reject('Select Pre Check In to continue..')
         }
             if(this.data.invoiceId=='' || this.data.invoiceId==null){
        
         	reject('Key in invoice number to continue..')
         }
            if(this.data.totalAmount=='' || this.data.totalAmount==null){
        
         	reject('Key in Total Amount (RM) to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Invoice to continue..')
         }
             if(minimumProductAdded==false){
        
         	reject('Add at least one product to continue..')
         }
         else {
            resolve(true);
         }
        
     
     
     })
    },
  getQuantityColor(ordered,received){
    if(received>=ordered){
      return 'success';
    }
    else{
      return 'warning';
    }
  },
  submit(){
    var self=this;
     self.isLoading = true;
    if(self.accept==false){
       self.isLoading = false;
      return Messenger().post({type:'error',message:'Tick confirmation checkbox to continue!',hideAfter: 3,showCloseButton:true});
    }
 

   //no validation
   self.$validator.validateAll().then((result) => {
		  if (result) {
          self.axios.post('https://backend.medicodesolution.com/staging/checkin/submit', {
        clinicId:self.clinicId,
          preCheckInId:self.selectedPreCheckIn.preId,
          invoiceId:self.data.invoiceId,
          totalAmount:self.data.totalAmount,
          comments:self.data.comments,
          attachments:self.data.attachments.join(),
          allProducts:JSON.stringify(self.selectedPreCheckIn.allProducts)

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                                   self.isLoading = false;
                   Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
                   return self.navigateToDashboard();
         
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                 Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
              return self.navigateToDashboard();
                  }
                 else {
                   self.isLoading = false;
               Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   return self.navigateToDashboard();
                   }
                }
                })
                .catch(function (error) {
                self.isLoading = false;
                 Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true}); 
                     return self.navigateToDashboard();               
                }); 
		  }
                  if(!result){
                    self.isLoading = false;
        	         return  Messenger().post({ type:'error',message :"Ensure Batch Number,Expiry Date & Quantity infos are correctly filled in Step 2 (Scan Products)", hideAfter: 3,showCloseButton:true});
                  }
		});
    
   
  },
 async getPreCheckIns() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/precheckins/'+this.clinicId);

   this.preInfo = response.data.preInfo;
   
 
  } catch (error) {
    console.error(error);
  }
},

 async getPreSelectedVendor(id) {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/vendor/'+id);
   this.selectedVendorInfo = response.data.vendorInfo[0];
 
   
 
  } catch (error) {
    console.error(error);
  }
},
  async getManufacturerBarcodes() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/manufacturerBarcodes')
   this.manufacturerBarcodes = response.data.manufacturerBarcodes;

   console.log(this.manufacturerBarcodes)
  } catch (error) {
    console.error(error);
  }
},
 onBarcodeScanned (barcode) {
       var index = 0; var selectedIndex;
       var self=this;
       self.unselectedProducts = [];
     this.selectedPreCheckIn.allProducts.forEach(function(entry) {
    if(entry.manufacturer_barcode==barcode){
    selectedIndex = index;
    }
    if(entry.manufacturer_barcode=='' || entry.manufacturer_barcode==null || entry.manufacturer_barcode==undefined){
      self.unselectedProducts.push({
        label:entry.product_name,
        Index:index
      });
    }
    index++;
});

if(selectedIndex!=null && selectedIndex!=undefined){
   if(this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==undefined || this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity==''){
     this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity= 1;
   }
   else {
     this.selectedPreCheckIn.allProducts[selectedIndex].delivered_quantity++;
   }
  return  Messenger().post({message:this.selectedPreCheckIn.allProducts[selectedIndex].product_name+' scanned!', hideAfter: 3,showCloseButton:true});
}
else {
  if(this.manufacturerBarcodes.includes(barcode)){

    return  Messenger().post({type:'error',message:'This barcode is tagged to product not in your precheckin list. Kindly ammend your precheckin info if you wish to add this product.', hideAfter: 3,showCloseButton:true});
  }
  else {
    this.unselectedBarcode = barcode;
    this.showModal=true;
    return  Messenger().post({type:'error',message:'Item not found', hideAfter: 3,showCloseButton:true});
  }
   
}
      },

  },
     mounted(){
  this.getPreCheckIns();
  this.getManufacturerBarcodes();
 
 
   },
    created() {
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.locationClasses,
      theme: 'air',
      showCloseButton: true,
    };
   this.$barcodeScanner.init(this.onBarcodeScanned);
  },
};
</script>

<style src="./ClinicPreCheckIn.scss" lang="scss" />
