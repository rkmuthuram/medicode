<template>
  <b-row>
    <b-col xl='8' lg='16'>
      {{clinicName}}
      <Widget
        title="
        <div>
          <h4>
            New Pre Check In&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'>Follow these 4 simple steps to complete Pre Check In!</p>
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
           <tab-content title="Purchase Order Info" :before-change="validOne"> 
          
              <b-form>
                
             <b-form-group
                  label="Select Vendor"
                >
           
               <v-select :options="vendorInfo"    v-model="data.vendor" label="name" >
    <template slot="option" slot-scope="option">
        #{{option.id}} - {{ option.name }} 
    </template>
  </v-select>
        </b-form-group>
          <b-form-group
                  label="Purchase Order Number"
                >
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'"
                  
                  name="order_number"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('order_number')}"
                  type="text"
               v-model="data.order_number"
                />
        </b-form-group>
            
            <!--   <b-form-group
                  label="Total Amount (RM)"
                >
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:2'"
                  
                  name="total_amount"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('total_amount')}"
                  type="number"
               v-model="data.total_amount"
                />
        </b-form-group> -->
          <b-form-group>
           <label for="myvueDropZone">Upload Purchase Order</label>
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
                               
                                  v-validate="'required|min:4'"
                             :class="{ 'form-control': true}"
                                id="comments"
                                name="comments"
                                />
        </b-form-group>
   


                
              </b-form>
            </tab-content>
           <tab-content title="Add Products" :before-change="validTwo"> 
      
            
              <b-form>
              
                  <b-form-group
                  label="Select Medicine"
                >
            <v-select label="product_name" :filterable="false" :options="medicineInfo"  @search="onSearch"  v-model="selectedMedicine" change="" >
    <template slot="no-options">
      type to search medicine by name / category / manufacturer / any barcodes..
    </template>
    <template slot="option" slot-scope="option">
      <div class="d-center">
        {{ option.product_name }} - {{ option.manufacturer }} - {{option.color}}
        </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div class="selected d-center">
        {{ option.product_name }}
      </div>
    </template>
  </v-select>
            <!--   <v-select    v-model="data2.medicine" label="name" >
    <template slot="option" slot-scope="option">
         {{ option.product_name }} - {{ option.product_category }} - {{ option.company_name }}
    </template>
  </v-select>-->
        </b-form-group>
  
  <b-card class="mb-xlg border-0"  v-if="selectedMedicine!=null">
          <span class="fw-semi-bold text-success">{{selectedMedicine.product_category}}</span>
          <span class="fw-semi-bold text-muted ml-sm">{{selectedMedicine.product_name}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Manufacturer :  {{selectedMedicine.manufacturer}} | Distributor : {{selectedMedicine.company_name}}</small></span><br>
            
          </div>
          <div class="mb-lg">
            <h3 class="text-success mb-0">{{selectedMedicine.packing_type}} | {{selectedMedicine.packing_quantity}} | {{selectedMedicine.color}}</h3>
          </div>
    
                <div v-if="selectedMedicine.packing_type=='TABLETS'" :key="componentKey">

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
                <b-form-input class="input-transparent" type="number"  @change="getTabletValue"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getTabletValue"  v-model="selectedMedicine.quantity_stripsperbox"></b-form-input>
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
                <b-form-input class="input-transparent" type="number"  @change="getTabletValue"  v-model="selectedMedicine.quantity_strips"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number" @change="getTabletValue"  v-model="selectedMedicine.quantity_tabletsperstrip"></b-form-input>
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
                <b-form-input class="input-transparent" type="number"   @change="getTabletValue"  v-model="selectedMedicine.quantity_tablets"></b-form-input>
              </b-input-group>
            </b-form-group></td>
                                
            </tr>
                    
                
              </tbody>
            </table> 
                 
  
                </div>

                 <div v-if="selectedMedicine.packing_type=='Per vial' || selectedMedicine.packing_type=='per vial' " :key="componentKey">
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
                <b-form-input class="input-transparent" type="number" @change="getVialValue"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_vialsperbox"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_vials"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_mlpervial"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_mls"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_mlperdose"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
                            <div v-if="selectedMedicine.packing_type=='Vial / per cc' || selectedMedicine.packing_type=='Vial / per 0.5 cc' || selectedMedicine.packing_type=='vial per cc' " :key="componentKey">
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
                <b-form-input class="input-transparent" type="number" @change="getVialValue"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_vialsperbox"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_vials"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_mlpervial"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_mls"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_mlperdose"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue"  v-model="selectedMedicine.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
  
                </div>
      <div v-if="selectedMedicine.packing_type=='per ampule'" :key="componentKey">
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
                <b-form-input class="input-transparent" type="number"  @change="getAmpuleValue"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue"  v-model="selectedMedicine.quantity_ampuleperbox"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue"  v-model="selectedMedicine.quantity_ampules"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue"  v-model="selectedMedicine.quantity_mlperampule"></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
                        <div v-if="selectedMedicine.packing_type=='BOTTLE'" :key="componentKey">
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
                <b-form-input class="input-transparent" type="number" @change="getBottleValue"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue"  v-model="selectedMedicine.quantity_bottleperbox"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue"  v-model="selectedMedicine.quantity_bottles"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
                    
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="selectedMedicine.quantity_unitperbottle" />
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="per bottle">
                <b-form-input class="input-transparent"  type="number" @change="getBottleValue"  v-model="selectedMedicine.quantity_perbottle" ></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
            <tr>
               <td> <b-form-group
              :label="selectedMedicine.quantity_unitperbottle"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue"  v-model="selectedMedicine.quantity_unittotal"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
              </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>

                 <div v-if="selectedMedicine.packing_type=='TUBE'" :key="componentKey">
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
                <b-form-input class="input-transparent" type="number" @change="getTubeValue"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getTubeValue"  v-model="selectedMedicine.quantity_tubeperbox"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getTubeValue"  v-model="selectedMedicine.quantity_tubes"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
                    
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="selectedMedicine.quantity_unitpertube" />
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="per tube">
                <b-form-input class="input-transparent"  type="number" @change="getTubeValue"  v-model="selectedMedicine.quantity_pertube" ></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
            <tr>
               <td> <b-form-group
              :label="selectedMedicine.quantity_unitpertube"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getTubeValue"  v-model="selectedMedicine.quantity_unittotal"></b-form-input>
              </b-input-group>
            </b-form-group> </td>    
              </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>

                  <div v-if="selectedMedicine.packing_type=='Per supp' || selectedMedicine.packing_type=='SACHET' || selectedMedicine.packing_type=='Sachet' || selectedMedicine.packing_type=='box' || selectedMedicine.packing_type=='Set' || selectedMedicine.packing_type=='ROLLS' || selectedMedicine.packing_type=='PIECES' || selectedMedicine.packing_type=='pack' || selectedMedicine.packing_type=='Diskus' "  :key="componentKey">
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
                <b-form-input class="input-transparent" type="number"  @change="getWholeValue"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"   @change="getWholeValue"  v-model="selectedMedicine.quantity_unitperbox"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"   @change="getWholeValue"  v-model="selectedMedicine.quantity_units"></b-form-input>
              </b-input-group>
            </b-form-group> </td>      
                            
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div> 
                      
                <b-button type="button" variant="success" class="btn-rounded" @click="addToList()" >
             Verify & Add to List
              </b-button> &nbsp;&nbsp;
               <b-button type="button" variant="danger" class="btn-rounded" @click="removeFromList()" >
             Remove Item
              </b-button>
    
    

                        
        </b-card>

       

     <table  class="table table-bordered table-lg mt-lg mb-0" v-if="allSelectedProducts.length!=0">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Num.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th class="hidden-sm-down">Brand</th>
                  <th class="">Qty</th>
                   <th class="">Actions</th>
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in allSelectedProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                             <td v-if="product.packing_type=='TABLETS'"> {{product.quantity_strips}} strips ({{product.quantity_tabletsperstrip}} per strip) | {{product.quantity_tablets}} tablets</td>
                                       <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'"> {{product.quantity_mlpervial}} ML/vial | {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_mlperampule}} ML/ampule | {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'">  {{product.quantity_perbottle}}{{product.quantity_unitperbottle}}/bottle | {{product.quantity_bottles}} bottles | {{product.quantity_unittotal}}{{product.quantity_unitperbottle}} </td>
                                            <td v-if="product.packing_type=='TUBE'">  {{product.quantity_pertube}}{{product.quantity_unitpertube}}/tube | {{product.quantity_tubes}} tubes | {{product.quantity_unittotal}}{{product.quantity_unitpertube}} </td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                       <td><b-button type="button" variant="danger" class="btn-rounded" @click="removeFromAllProducts(index)"> Remove Item </b-button></td>
                </tr>
              </tbody>
            </table> 
     
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
                             <td v-if="product.packing_type=='TABLETS'"> {{product.quantity_strips}} strips ({{product.quantity_tabletsperstrip}} per strip) | {{product.quantity_tablets}} tablets</td>
                                       <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc' || product.packing_type=='per vial' || product.packing_type=='Per vial' || product.packing_type=='vial per cc'"> {{product.quantity_mlpervial}} ML/vial | {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"> {{product.quantity_mlperampule}} ML/ampule | {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'">  {{product.quantity_perbottle}}{{product.quantity_unitperbottle}}/bottle | {{product.quantity_bottles}} bottles | {{product.quantity_unittotal}}{{product.quantity_unitperbottle}} </td>
                                            <td v-if="product.packing_type=='TUBE'">  {{product.quantity_pertube}}{{product.quantity_unitpertube}}/tube | {{product.quantity_tubes}} tubes | {{product.quantity_unittotal}}{{product.quantity_unitpertube}} </td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' ">  {{product.quantity_units}} units </td>
                   
                </tr>
              </tbody>
            </table> 

       <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.vendor.name}}</h3>
            Vendor
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.order_number}}</h3>
            Purchase Order Number 
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
  components: { Widget, vSelect,vueDropzone: vue2Dropzone},
  data() {
    return {
       clinicName:'',
      staffId:window.localStorage.getItem('id'),
      componentKey:0,
      allSelectedProducts:[],
        clinicId: this.$route.params.clinicId,
        loadingWizard: false,
         errorMsg: null,
         count: 0,
      isLoading:false,
       data:{
        vendor:'',
        order_number:'',
       attachments:[],
        comments:''
 
      },
      accept:false,
    progress:1,
    vendorInfo:[],
    medicineInfo:[],
    data2:{

    },
    selectedMedicine:null,
    data3:{

    },
    
            dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/development/precheckin/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 3,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
    };
  },
  watch: {
  selectedMedicine: function (medicine) {
  
  }
},
  methods: {
         async getAccount() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/clinic/'+ this.clinicId)
   this.clinicName= response.data.accountInfo[0].name;
    
  } catch (error) {
    console.error(error);
  }
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
 
      if(this.selectedMedicine.packing_type=='TABLETS' && this.selectedMedicine.quantity_tablets<1){
          return Messenger().post({type:'error',message:'Tablet Quantity required!',hideAfter: 3,showCloseButton:true});
      }
      
  /*  else if(this.selectedMedicine.quantity_vials<1 && this.selectedMedicine.packing_type=='Vial / per cc' || this.selectedMedicine.packing_type=='Vial / per 0.5 cc' || this.selectedMedicine.packing_type=='per vial' || this.selectedMedicine.packing_type=='Per vial' || this.selectedMedicine.packing_type=='vial per cc' ){
        return Messenger().post({type:'error',message:'Vial Quantity required!',hideAfter: 3,showCloseButton:true});
      } */
    else  if(this.selectedMedicine.packing_type=='per ampule' && this.selectedMedicine.quantity_ampules<1){
          return Messenger().post({type:'error',message:'Ampule Quantity required!',hideAfter: 3,showCloseButton:true});
      }
    else if(this.selectedMedicine.packing_type=='BOTTLE' && this.selectedMedicine.quantity_bottles<1){
          return Messenger().post({type:'error',message:'Bottle Quantity required!',hideAfter: 3,showCloseButton:true});
      }
      else if(this.selectedMedicine.packing_type=='TUBE' && this.selectedMedicine.quantity_tubes<1){
          return Messenger().post({type:'error',message:'Tube Quantity required!',hideAfter: 3,showCloseButton:true});
      }
      this.allSelectedProducts.push(this.selectedMedicine);
      this.selectedMedicine=null;
    //  console.log(this.allSelectedProducts);
      return Messenger().post({type:'success',message:'Item added to list!',hideAfter: 3,showCloseButton:true});
   
    },
async onSearch(search, loading) {
  if(escape(search)=='' || escape(search)==null || escape(search)==undefined){
   return this.medicineInfo;
  }
    loading(true);
    const response = await this.axios.get(`https://backend.medicodesolution.com/development/search/medicines/${escape(search)}`);
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
           if(this.data.vendor=='' || this.data.vendor==null){
        
         	reject('Select vendor to continue..')
         }
             if(this.data.order_number=='' || this.data.order_number==null){
        
         	reject('Key in order number to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Purchase Order to continue..')
         }
              
       
       else{
        //  console.log('vendor:'+this.data.vendor.name+'--- order number:'+this.data.order_number+'--- attachments:'+ JSON.stringify(this.data.attachments) + '--- comments:'+this.data.comments);
          resolve(true)
         }   
     
     })
    },
      validTwo:function() {
     return new Promise((resolve, reject) => {
           if(this.data.vendor=='' || this.data.vendor==null){
        
         	reject('Select vendor to continue..')
         }
             if(this.data.order_number=='' || this.data.order_number==null){
        
         	reject('Key in order number to continue..')
         }
             if(this.data.attachments.length==0 || this.data.attachments==null){
        
         	reject('Upload Purchase Order to continue..')
         }
             if(this.allSelectedProducts.length==0 ){
        
         	reject('Add at least 1 (one) product to continue..')
         }
             /* if(this.data.subtotal=='' || this.data.subtotal==null){
        
         	reject('Key in Subtotal (RM) to continue..')
         }
           if(this.data.tax_rate=='' || this.data.tax_rate==null){
        
         	reject('Key in Tax Rate (RM) to continue..')
         }

      if(this.data.total_amount=='' || this.data.total_amount==null){
        
         	reject('Key in Total Amount (RM) to continue..')
         }
           if(this.data.comments=='' || this.data.comments==null){
        
         	reject('Key in Comments..')
         } */

       
       
       else{
        //  console.log('vendor:'+this.data.vendor.name+'--- order number:'+this.data.order_number+'--- attachments:'+ JSON.stringify(this.data.attachments) + '--- comments:'+this.data.comments);
          resolve(true)
         }   
     
     })
    },
      getBottleValue(){
         
          if(this.selectedMedicine.quantity_boxes==undefined || this.selectedMedicine.quantity_boxes==''){
    this.selectedMedicine.quantity_boxes = 0;
  }
      if(this.selectedMedicine.quantity_bottleperbox==undefined || this.selectedMedicine.quantity_bottleperbox==''){
    this.selectedMedicine.quantity_bottleperbox = 0;
  }
     if(this.selectedMedicine.quantity_bottles==undefined || this.selectedMedicine.quantity_bottle==''){
    this.selectedMedicine.quantity_bottles = 0;
  }
   if(this.selectedMedicine.quantity_unitperbottle==undefined || this.selectedMedicine.quantity_unitperbottle==''){
    this.selectedMedicine.quantity_unitperbottle = 0;
  }
     if(this.selectedMedicine.quantity_perbottle==undefined || this.selectedMedicine.quantity_perbottle==''){
    this.selectedMedicine.quantity_perbottle = 0;
  }
     if(this.selectedMedicine.quantity_unitperbottle==undefined || this.selectedMedicine.quantity_unitperbottle==''){
    this.selectedMedicine.quantity__unitperbottle = 'ml';
  }
  this.selectedMedicine.quantity_bottles = parseInt(this.selectedMedicine.quantity_boxes) * parseInt(this.selectedMedicine.quantity_bottleperbox);
  this.selectedMedicine.quantity_unittotal  = parseInt(this.selectedMedicine.quantity_bottles) * Number(this.selectedMedicine.quantity_perbottle);
  
  this.componentKey+=1;

    },
        getTubeValue(){
        
          if(this.selectedMedicine.quantity_boxes==undefined || this.selectedMedicine.quantity_boxes==''){
    this.selectedMedicine.quantity_boxes = 0;
  }
      if(this.selectedMedicine.quantity_tubeperbox==undefined || this.selectedMedicine.quantity_tubeperbox==''){
    this.selectedMedicine.quantity_tubeperbox = 0;
  }
     if(this.selectedMedicine.quantity_tubes==undefined || this.selectedMedicine.quantity_tubes==''){
    this.selectedMedicine.quantity_tubes = 0;
  }
   if(this.selectedMedicine.quantity_unitpertube==undefined || this.selectedMedicine.quantity_unitpertube==''){
    this.selectedMedicine.quantity_unitpertube = 0;
  }
     if(this.selectedMedicine.quantity_pertube==undefined || this.selectedMedicine.quantity_pertube==''){
    this.selectedMedicine.quantity_pertube = 0;
  }
     if(this.selectedMedicine.quantity_unitpertube==undefined || this.selectedMedicine.quantity_unitpertube==''){
    this.selectedMedicine.quantity__unitpertube = 'g';
  }
  this.selectedMedicine.quantity_tubes = parseInt(this.selectedMedicine.quantity_boxes) * parseInt(this.selectedMedicine.quantity_tubeperbox);
  this.selectedMedicine.quantity_unittotal  = parseInt(this.selectedMedicine.quantity_tubes) * Number(this.selectedMedicine.quantity_pertube);
  
  this.componentKey+=1;

    },
    getAmpuleValue(){
        if(this.selectedMedicine.quantity_boxes==undefined || this.selectedMedicine.quantity_boxes==''){
    this.selectedMedicine.quantity_boxes = 0;
  }
    if(this.selectedMedicine.quantity_ampuleperbox==undefined || this.selectedMedicine.quantity_ampuleperbox==''){
    this.selectedMedicine.quantity_ampuleperbox = 0;
  }
    if(this.selectedMedicine.quantity_ampules==undefined || this.selectedMedicine.quantity_ampules==''){
    this.selectedMedicine.quantity_ampules = 0;
  }
      if(this.selectedMedicine.quantity_mlperampule==undefined || this.selectedMedicine.quantity_mlperampule==''){
    this.selectedMedicine.quantity_mlperampule = 0;
  }
      this.selectedMedicine.quantity_ampules = parseInt(this.selectedMedicine.quantity_boxes) * parseInt(this.selectedMedicine.quantity_ampuleperbox);
  
  this.componentKey+=1;

    },
       getWholeValue(){
        if(this.selectedMedicine.quantity_boxes==undefined || this.selectedMedicine.quantity_boxes==''){
    this.selectedMedicine.quantity_boxes = 0;
  }
    if(this.selectedMedicine.quantity_unitperbox==undefined || this.selectedMedicine.quantity_unitperbox==''){
    this.selectedMedicine.quantity_unitperbox = 0;
  }
    if(this.selectedMedicine.quantity_units==undefined || this.selectedMedicine.quantity_units==''){
    this.selectedMedicine.quantity_units = 0;
  }
  
      this.selectedMedicine.quantity_units = parseInt(this.selectedMedicine.quantity_boxes) * parseInt(this.selectedMedicine.quantity_unitperbox);
  
  this.componentKey+=1;

    },
    getVialValue(){

  if(this.selectedMedicine.quantity_boxes==undefined || this.selectedMedicine.quantity_boxes==''){
    this.selectedMedicine.quantity_boxes = 0;
  }
    if(this.selectedMedicine.quantity_vialsperbox==undefined || this.selectedMedicine.quantity_vialsperbox==''){
    this.selectedMedicine.quantity_vialsperbox = 0;
  }
      if(this.selectedMedicine.quantity_vials==undefined || this.selectedMedicine.quantity_vials==''){
    this.selectedMedicine.quantity_vials = 0;
  }
  if(this.selectedMedicine.quantity_mlpervial==undefined || this.selectedMedicine.quantity_mlpervial==''){
    this.selectedMedicine.quantity_mlpervial = 0;
  }
     if(this.selectedMedicine.quantity_mls==undefined || this.selectedMedicine.quantity_mls==''){
    this.selectedMedicine.quantity_mls = 0;
  }
 /* if(this.selectedMedicine.quantity_mlperdose==undefined || this.selectedMedicine.quantity_mlperdose==''){
    this.selectedMedicine.quantity_mlperdose = 0;
  }
  
  if(this.selectedMedicine.quantity_doses==undefined || this.selectedMedicine.quantity_doses==''){
    this.selectedMedicine.quantity_doses = 0;
  } */


     this.selectedMedicine.quantity_vials = parseInt(this.selectedMedicine.quantity_boxes) * parseInt(this.selectedMedicine.quantity_vialsperbox);
      this.selectedMedicine.quantity_mls = Number(this.selectedMedicine.quantity_mlpervial*this.selectedMedicine.quantity_vials);
  this.componentKey+=1;



    },
getTabletValue(){
 
  if(this.selectedMedicine.quantity_boxes==undefined || this.selectedMedicine.quantity_boxes==''){
    this.selectedMedicine.quantity_boxes = 0;
  }
    if(this.selectedMedicine.quantity_stripsperbox==undefined || this.selectedMedicine.quantity_stripsperbox==''){
    this.selectedMedicine.quantity_stripsperbox = 0;
  }
     if(this.selectedMedicine.quantity_stripsperbox==undefined || this.selectedMedicine.quantity_stripsperbox==''){
    this.selectedMedicine.quantity_stripsperbox = 0;
  }
      if(this.selectedMedicine.quantity_strips==undefined || this.selectedMedicine.quantity_strips==''){
    this.selectedMedicine.quantity_strips = 0;
  }
    if(this.selectedMedicine.quantity_tabletsperstrip==undefined || this.selectedMedicine.quantity_tabletsperstrip==''){
    this.selectedMedicine.quantity_tabletsperstrip = 0;
  }
    if(this.selectedMedicine.quantity_tablets==undefined || this.selectedMedicine.quantity_tablets==''){
    this.selectedMedicine.quantity_tablets = 0;
  }

   this.selectedMedicine.quantity_strips = parseInt(this.selectedMedicine.quantity_boxes) * parseInt(this.selectedMedicine.quantity_stripsperbox);
   this.selectedMedicine.quantity_tablets = parseInt(this.selectedMedicine.quantity_strips) * parseInt(this.selectedMedicine.quantity_tabletsperstrip);
  this.componentKey+=1;
},
  submit(){
    var self=this;
     self.isLoading = true;
    if(self.accept==false){
       self.isLoading = false;
      return Messenger().post({type:'error',message:'Tick confirmation checkbox to continue!',hideAfter: 3,showCloseButton:true});
    }
  /* console.log('vendorId:'+self.data.vendor.id);
    console.log('orderId:'+self.data.order_number);
    console.log('attachments:'+self.data.attachments.join());
     console.log('comments:'+self.data.comments);
     console.log('allProducts'+ JSON.stringify(self.allSelectedProducts)); */

   //no validation
 
    
    self.axios.post('https://backend.medicodesolution.com/development/precheckin/submit', {
          clinicId:self.clinicId,
          vendorId:self.data.vendor.id,
          orderId:self.data.order_number,
          comments:self.data.comments,
          attachments:self.data.attachments.join(),
          allProducts:JSON.stringify(self.allSelectedProducts),
            staffId:self.staffId

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
  },
 async getVendors() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/development/all/vendors');

   this.vendorInfo = response.data.vendorInfo;
   
 
  } catch (error) {
    console.error(error);
  }
}

  },
     mounted(){
  this.getVendors();
       this.getAccount();  
 
 
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

<style src="./ClinicPreCheckIn.scss" lang="scss" />
