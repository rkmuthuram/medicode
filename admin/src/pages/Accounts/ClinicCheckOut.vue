<template>
  <b-row>
    <b-col xl='8' lg='16'>
      <Widget
        title="
        <div>
          <h4>
            New Check Out&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'>Follow these 4 simple steps to complete Check Out!</p>
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
   <tab-content title="Customer Info" :before-change="validOne"> 
     <!--    <tab-content title="Customer Info">-->
          <b-form-group
                  label="  Patient Identification Number (MRN Number)"
                >
               <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:4'" 
                  name="patientId"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('patientId')}"
                  type="text"
               v-model="data.patientId"
                />
        </b-form-group>
            <b-form-group
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
        </b-form-group>
       <!--   <b-form-group>
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
        </b-form-group> -->
   


                
              </b-form>
            </tab-content>
     <tab-content title="Add Products" :before-change="validTwo"> 
       <!--       <tab-content title="Add Products" > -->
            
              <b-form>
              
                  <b-form-group
                  label="Select Medicine OR Start Scanning (QR / Barcode)"
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
  
  <b-card class="mb-xlg border-0"  v-if="selectedMedicine!=null" :key="componentKey">
          <span class="fw-semi-bold text-primary">{{selectedMedicine.product_category}}</span>
          <span class="fw-semi-bold text-muted ml-sm">{{selectedMedicine.product_name}}</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>Manufacturer :  {{selectedMedicine.manufacturer}} | Distributor : {{selectedMedicine.company_name}}</small></span><br>
            
          </div>
          <div class="mb-lg">
            <h3 class="text-primary mb-0">{{selectedMedicine.packing_type}} | {{selectedMedicine.packing_quantity}} | {{selectedMedicine.color}}</h3>
          </div>
           <!--   <div class="mb-lg">
            <h3 class="text-success mb-0">Available Stock : {{selectedMedicine.quantity}} units</h3>
          </div> -->
            <div v-if="selectedMedicine.packing_type=='TABLETS'" :key="componentKey">
   <span class="fw-semi-bold text-primary">Current Stock :<img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/pills.png?alt=media&token=70eb9961-0de4-4554-95fb-d8cad97a5d79' />  {{JSON.parse(selectedMedicine.quantity).tablets}} tablets ({{JSON.parse(selectedMedicine.quantity).tablets/JSON.parse(selectedMedicine.quantity).tabletsperstrip}} strips)</span>
     <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                   
                  <tr>
                  
              <!--    <td>       <b-form-group
              label="Strips"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
           
              <select v-model="selectedMedicine.quantity_strips">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).strips" :value="n">{{ n }}</option>
  </select>
            <!--  <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent" type="number"  v-model="selectedMedicine.quantity_strips"></b-form-input>
    </b-input-group> -->
          <!--  </b-form-group></td>  -->
              <!--     <td>       <b-form-group
              label="Tablets"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <select v-model="selectedMedicine.quantity_tablets">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).tablets" :value="n">{{ n }}</option>
  </select>
          <!--    <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent" type="number"    v-model="selectedMedicine.quantity_tablets"></b-form-input>
              </b-input-group> -->
         <!--   </b-form-group></td> -->
      <td> <b-form-group
              label="TABLETS"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
            
             <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent"  type="number"  v-model="selectedMedicine.quantity_tablets"></b-form-input>
              </b-input-group>
            </b-form-group>  </td>     
                                              
            </tr>
              
                    
                
              </tbody>
            </table> 
                 
  
                </div>
                  <div v-if=" selectedMedicine.packing_type=='Per vial' || selectedMedicine.packing_type=='per vial'" :key="componentKey">
                       <span class="fw-semi-bold text-primary">Current Stock : <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' /> {{JSON.parse(selectedMedicine.quantity).vials}} vials</span>
 <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
         
            
                <td> <b-form-group
              label="Vial"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
               <select v-model="selectedMedicine.quantity_vials">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).vials" :value="n">{{ n }}</option>
  </select>
            <!--
              <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_vials"></b-form-input>
              </b-input-group>-->
            </b-form-group>  </td>  
                                      
            </tr>
                         <tr>
                 
            
        <!--      <td> <b-form-group
              label="BY ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
            
             <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_mls"></b-form-input>
              </b-input-group>
            </b-form-group>  </td>     -->
                   
          <!--  <td> <b-form-group
              label="ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="per dose">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_mlperdose"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
           <div v-if="selectedMedicine.packing_type=='Vial / per cc' || selectedMedicine.packing_type=='Vial / per 0.5 cc' || selectedMedicine.packing_type=='vial per cc'" :key="componentKey">
              <span class="fw-semi-bold text-primary">Current Stock : <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/injection.png?alt=media&token=d415a06a-ccaf-4c5d-88cc-2df1afbb6b51' /> {{JSON.parse(selectedMedicine.quantity).mls}} CC ({{JSON.parse(selectedMedicine.quantity).mls/JSON.parse(selectedMedicine.quantity).mlpervial}} vials)</span>
<table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                     <tr>
              
               
              <td> <b-form-group
              label="Vial"
              label-for="append-field3"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
             <select v-model="selectedMedicine.quantity_vials">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).vials" :value="n">{{ n }}</option>
  </select>
            </b-form-group> </td>  
                                      
            </tr>
                         <tr>
                 
            
              <td> <b-form-group
              label="BY ML / CC"
              label-for="append-field5"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field5" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_mls"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_mlperdose"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getVialValue(index)"  v-model="selectedMedicine.quantity_doses"></b-form-input>
              </b-input-group>
            </b-form-group> </td>     -->                           
            </tr>
          
                
              </tbody>
            </table> 
  
                </div>
      <div v-if="selectedMedicine.packing_type=='per ampule'" :key="componentKey">
           <span class="fw-semi-bold text-primary">Current Stock :  <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' />{{JSON.parse(selectedMedicine.quantity).ampules}} ampules</span>
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
             
             
                       <td> <b-form-group
              label="Ampules"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
             <select v-model="selectedMedicine.quantity_ampules">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).ampules" :value="n">{{ n }}</option>
  </select>
           <!--   <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue(index)"  v-model="selectedMedicine.quantity_ampules"></b-form-input> -->
           
            </b-form-group> </td>      
                          
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
                        <div v-if="selectedMedicine.packing_type=='BOTTLE'" :key="componentKey">
                             <span class="fw-semi-bold text-primary">Current Stock : <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/bottles.png?alt=media&token=784f4166-e1d3-4e53-b7e5-de05b90a20e1' /> {{JSON.parse(selectedMedicine.quantity).unittotal}}{{JSON.parse(selectedMedicine.quantity).unitperbottle}}  ({{JSON.parse(selectedMedicine.quantity).unittotal/JSON.parse(selectedMedicine.quantity).perbottle}} bottles)</span>
       <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
             <!--    <td>       <b-form-group
              label="Boxes"
              label-for="append-field"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <b-input-group class="input-group-transparent" id="append-field" append="total">
                <b-form-input class="input-transparent" type="number" @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_boxes"></b-form-input>
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
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_bottleperbox"></b-form-input>
              </b-input-group>
            </b-form-group> </td> -->  </tr><tr> 
                       <td> <b-form-group
              label="Bottles"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
              
            >
             <select v-model="selectedMedicine.quantity_bottles">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).bottles" :value="n">{{ n }}</option>
  </select>
             <!-- <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_bottles"></b-form-input>
              </b-input-group> -->
            </b-form-group> </td>    
                    
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="JSON.parse(selectedMedicine.quantity).unitperbottle" 
                      disabled/>
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
               <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_unittotal"></b-form-input>
              </b-input-group>
           <!--   <b-input-group class="input-group-transparent" id="append-field3" append="per tube">
                <b-form-input class="input-transparent"  type="number" @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_perbottle" ></b-form-input>
              </b-input-group> -->
            </b-form-group> </td>                      
            </tr>               
              </tbody>
            </table> 
                   
  
                </div>

                 <div v-if="selectedMedicine.packing_type=='TUBE'" :key="componentKey">
                    <span class="fw-semi-bold text-primary">Current Stock : <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/tubes.png?alt=media&token=be09cc67-f444-4e0e-8b09-226b3ecd3558' /> {{JSON.parse(selectedMedicine.quantity).unittotal}}{{JSON.parse(selectedMedicine.quantity).unitpertube}}  ({{JSON.parse(selectedMedicine.quantity).unittotal/JSON.parse(selectedMedicine.quantity).pertube}} tubes)</span>
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
              
             <tr> 
                       <td> <b-form-group
              label="Tubes"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
              <select v-model="selectedMedicine.quantity_tubes">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).tubes" :value="n">{{ n }}</option>
  </select>
            </b-form-group> </td>    
                    
              <td>
               <v-select  
                    class="mt-xs"
                    :options="['L','ml','g','mg','mcg','doses','vials']"
                      v-model="JSON.parse(selectedMedicine.quantity).unitpertube" 
                      disabled/>
                 <b-form-group
              label=""
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
            <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_unittotal"></b-form-input>
              </b-input-group>
            </b-form-group> </td>                      
            </tr>
            <tr>
                
              </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>

                  <div v-if="selectedMedicine.packing_type=='Per supp' || selectedMedicine.packing_type=='SACHET' || selectedMedicine.packing_type=='Sachet' || selectedMedicine.packing_type=='box' || selectedMedicine.packing_type=='Set' || selectedMedicine.packing_type=='ROLLS' || selectedMedicine.packing_type=='PIECES' || selectedMedicine.packing_type=='pack' || selectedMedicine.packing_type=='Diskus' "  :key="componentKey">
                     <span class="fw-semi-bold text-primary">Current Stock : <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/units.png?alt=media&token=17211f17-6705-47e8-8cfe-e005409e5194' /> {{JSON.parse(selectedMedicine.quantity).units}} units</span>
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                 
                 
                       <td> <b-form-group
              label="Units"
              label-for="append-field2"
              label-class="text-md-right px-3"
              label-cols="4"
              breakpoint="md"
            >
             <select v-model="selectedMedicine.quantity_units">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).units" :value="n">{{ n }}</option>
  </select>
          <!--    <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"   @change="getWholeValue(index)"  v-model="selectedMedicine.quantity_units"></b-form-input>
              </b-input-group> -->
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
                  <th class="">Packing Type</th>
                  <th class="">Dispensed Qty</th>
                   <th class="">Actions</th>
                </tr>
              </thead>
                     <tbody>
                <tr v-for="(product,index) in allSelectedProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                    <td>{{product.packing_type}}</td>
                    <td v-if="product.packing_type=='TABLETS'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/pills.png?alt=media&token=70eb9961-0de4-4554-95fb-d8cad97a5d79' /> <!--{{product.quantity_strips}} strips  &amp;-->   <span v-if="product.quantity_strips==0 && product.quantity_tablets!=0">{{product.quantity_tablets}} tablets</span>
                         <span v-if="product.quantity_strips!=0 && product.quantity_tablets==0">{{product.quantity_strips}} strips</span>
                  <span v-if="product.quantity_strips!=0 && product.quantity_tablets!=0">  {{product.quantity_strips}} strips  &amp; {{product.quantity_tablets}} tablets</span>
                          </td>
                                         <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc'  || product.packing_type=='vial per cc'"> <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/injection.png?alt=media&token=d415a06a-ccaf-4c5d-88cc-2df1afbb6b51' />         <span v-if="product.quantity_mls==0 && product.quantity_vials!=0">{{product.quantity_vials}} vials</span>
                         <span v-if="product.quantity_mls!=0 && product.quantity_vials==0">{{product.quantity_mls}} loose ML</span>
                  <span v-if="product.quantity_mls!=0 && product.quantity_vials!=0"> {{product.quantity_mls}} loose ML &amp; {{product.quantity_vials}} vials</span></td>
                                         <td v-if="product.packing_type=='per vial' || product.packing_type=='Per vial'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' /> {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' /> {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/bottles.png?alt=media&token=784f4166-e1d3-4e53-b7e5-de05b90a20e1' /> <span v-if="product.quantity_unittotal==0 && product.quantity_bottles!=0">{{product.quantity_bottles}} bottles</span>
                         <span v-if="product.quantity_unittotal!=0 && product.quantity_bottles==0">{{product.quantity_unittotal}}{{product.quantity_unitperbottle}}/ loose</span>
                  <span v-if="product.quantity_unittotal!=0 && product.quantity_bottles!=0"> {{product.quantity_unittotal}}{{product.quantity_unitperbottle}}/ loose &amp; {{product.quantity_bottles}} bottles</span> </td>
                                            <td v-if="product.packing_type=='TUBE'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/tubes.png?alt=media&token=be09cc67-f444-4e0e-8b09-226b3ecd3558' />    <span v-if="product.quantity_unittotal==0 && product.quantity_tubes!=0">{{product.quantity_tubes}} tubes</span>
                         <span v-if="product.quantity_unittotal!=0 && product.quantity_tubes==0">{{product.quantity_unittotal}}{{product.quantity_unitpertube}}/ loose</span>
                  <span v-if="product.quantity_unittotal!=0 && product.quantity_tubes!=0"> {{product.quantity_unittotal}}{{product.quantity_unitpertube}}/ loose &amp; {{product.quantity_tubes}} tubes</span></td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' "> <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/units.png?alt=media&token=17211f17-6705-47e8-8cfe-e005409e5194' /> {{product.quantity_units}} units </td>
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
                   <th class="">Packing Type</th>
                  <th class="">Dispensed Qty</th>
                 
                </tr>
              </thead>
                     <tbody>
               <tr v-for="(product,index) in allSelectedProducts" :key="product.product_name">
                  <td>{{index+1}}</td>
                  <td> <b-badge variant="success" class="text-gray-dark">{{product.product_name}}</b-badge></td>
                   <td>{{product.product_category}}</td>
                    <td>{{product.manufacturer}}</td>
                    <td>{{product.packing_type}}</td>
                            <td v-if="product.packing_type=='TABLETS'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/pills.png?alt=media&token=70eb9961-0de4-4554-95fb-d8cad97a5d79' /> <!--{{product.quantity_strips}} strips  &amp;-->   <span v-if="product.quantity_strips==0 && product.quantity_tablets!=0">{{product.quantity_tablets}} tablets</span>
                         <span v-if="product.quantity_strips!=0 && product.quantity_tablets==0">{{product.quantity_strips}} strips</span>
                  <span v-if="product.quantity_strips!=0 && product.quantity_tablets!=0">  {{product.quantity_strips}} strips  &amp; {{product.quantity_tablets}} tablets</span>
                          </td>
                                         <td v-if="product.packing_type=='Vial / per cc' || product.packing_type=='Vial / per 0.5 cc'  || product.packing_type=='vial per cc'"> <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/injection.png?alt=media&token=d415a06a-ccaf-4c5d-88cc-2df1afbb6b51' />         <span v-if="product.quantity_mls==0 && product.quantity_vials!=0">{{product.quantity_vials}} vials</span>
                         <span v-if="product.quantity_mls!=0 && product.quantity_vials==0">{{product.quantity_mls}} loose ML</span>
                  <span v-if="product.quantity_mls!=0 && product.quantity_vials!=0"> {{product.quantity_mls}} loose ML &amp; {{product.quantity_vials}} vials</span></td>
                                         <td v-if="product.packing_type=='per vial' || product.packing_type=='Per vial'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' /> {{product.quantity_vials}} vials</td>
                                         <td v-if="product.packing_type=='per ampule'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' /> {{product.quantity_ampules}} ampules</td>
                                         <td v-if="product.packing_type=='BOTTLE'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/bottles.png?alt=media&token=784f4166-e1d3-4e53-b7e5-de05b90a20e1' /> <span v-if="product.quantity_unittotal==0 && product.quantity_bottles!=0">{{product.quantity_bottles}} bottles</span>
                         <span v-if="product.quantity_unittotal!=0 && product.quantity_bottles==0">{{product.quantity_unittotal}}{{product.quantity_unitperbottle}}/ loose</span>
                  <span v-if="product.quantity_unittotal!=0 && product.quantity_bottles!=0"> {{product.quantity_unittotal}}{{product.quantity_unitperbottle}}/ loose &amp; {{product.quantity_bottles}} bottles</span> </td>
                                            <td v-if="product.packing_type=='TUBE'"><img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/tubes.png?alt=media&token=be09cc67-f444-4e0e-8b09-226b3ecd3558' />    <span v-if="product.quantity_unittotal==0 && product.quantity_tubes!=0">{{product.quantity_tubes}} tubes</span>
                         <span v-if="product.quantity_unittotal!=0 && product.quantity_tubes==0">{{product.quantity_unittotal}}{{product.quantity_unitpertube}}/ loose</span>
                  <span v-if="product.quantity_unittotal!=0 && product.quantity_tubes!=0"> {{product.quantity_unittotal}}{{product.quantity_unitpertube}}/ loose &amp; {{product.quantity_tubes}} tubes</span></td>
                                             <td v-if="product.packing_type=='Per supp' || product.packing_type=='SACHET' || product.packing_type=='Sachet' || product.packing_type=='box' || product.packing_type=='Set' || product.packing_type=='ROLLS' || product.packing_type=='PIECES' || product.packing_type=='pack' || product.packing_type=='Diskus' "> <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/units.png?alt=media&token=17211f17-6705-47e8-8cfe-e005409e5194' /> {{product.quantity_units}} units </td>
                   
                </tr>
              </tbody>
            </table> 

       <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.patientId}}</h3>
          Patient Identification Number (MRN Number)
          </div>
           <div class="mb-lg">
            <h3 class="text-success mb-0">{{data.total_amount}}</h3>
           Total Amount
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
  components: { Widget, vSelect,vueDropzone: vue2Dropzone},
  data() {
    return {
      staffId:window.localStorage.getItem('id'),
       staffName:window.localStorage.getItem('username'),
      liveInventory:new Array(),
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
          url: 'https://backend.enigmedsvcs.com/development/precheckin/attachments/upload',
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
     async getInventory() {
  try {
   const response = await this.axios.get('https://backend.enigmedsvcs.com/development/all/inventory/'+this.clinicId);
   this.liveInventory = response.data.inventoryInfo; 
   
  } catch (error) {
    console.error(error);
  }
},
     onBarcodeScanned (barcode) {
       
       var self=this;
       console.log(barcode)
       var liveInventory = self.liveInventory; 
        self.selectedMedicine = null;
       liveInventory.forEach(function(entry) {
    if(entry.productId==barcode){
    self.selectedMedicine = entry;
    }
   else if(entry.barcode==barcode){
 self.selectedMedicine = entry;
    }
    else if(entry.internal_barcode==barcode){
 self.selectedMedicine = entry;
    }

    
});
      

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
        var id=this.selectedMedicine.productId;
      var i=0;var fail=false;
               this.allSelectedProducts.forEach(function(entry) {
    if(entry.productId==id){
       fail=true;
    }
    i++;
});
    if(fail==true && i==this.allSelectedProducts.length){
 return Messenger().post({type:'error',message:'Product already added to the list!',hideAfter: 3,showCloseButton:true});
    }
    if(this.selectedMedicine.packing_type=='TABLETS'){
  
     
      if(this.selectedMedicine.quantity_tablets==undefined  && this.selectedMedicine.quantity_strips==undefined){
         return Messenger().post({type:'error',message:'Select valid dispense quantity!',hideAfter: 3,showCloseButton:true});
      }
      if(this.selectedMedicine.quantity_tablets == undefined) { this.selectedMedicine.quantity_tablets=0; }
      if(this.selectedMedicine.quantity_strips == undefined) { this.selectedMedicine.quantity_strips=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_tablets);
      if(this.selectedMedicine.quantity_strips != undefined) { this.selectedMedicine.dispensed_total += (Number(this.selectedMedicine.quantity_strips)* Number(qty.tabletsperstrip)); }
         if(this.selectedMedicine.dispensed_total>qty.tablets){
 return Messenger().post({type:'error',message:'Insufficient dispense quantity!',hideAfter: 3,showCloseButton:true});
    }
  
   
    }
    if(this.selectedMedicine.packing_type=='Vial / per cc' || this.selectedMedicine.packing_type=='Vial / per 0.5 cc' || this.selectedMedicine.packing_type=='per vial' || this.selectedMedicine.packing_type=='Per vial' || this.selectedMedicine.packing_type=='vial per cc'){

     
      if(this.selectedMedicine.quantity_vials==undefined  && this.selectedMedicine.quantity_mls==undefined){
         return Messenger().post({type:'error',message:'Select valid dispense quantity!',hideAfter: 3,showCloseButton:true});
      }
      if(this.selectedMedicine.quantity_vials == undefined) { this.selectedMedicine.quantity_vials=0; }
      if(this.selectedMedicine.quantity_mls == undefined) { this.selectedMedicine.quantity_mls=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_mls);
          if(this.selectedMedicine.quantity_mls != undefined) { this.selectedMedicine.dispensed_total += Number(this.selectedMedicine.quantity_vials* (qty.mlpervial)); }        
         if(this.selectedMedicine.dispensed_total>qty.mls){
 return Messenger().post({type:'error',message:'Insufficient dispense quantity!',hideAfter: 3,showCloseButton:true});
    }

    }
      if(this.selectedMedicine.packing_type=='per ampule'){

     
      if(this.selectedMedicine.quantity_ampules==undefined ){
         return Messenger().post({type:'error',message:'Select valid dispense quantity!',hideAfter: 3,showCloseButton:true});
      }
      if(this.selectedMedicine.quantity_ampules == undefined) { this.selectedMedicine.quantity_ampules=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_ampules);
       
         if(this.selectedMedicine.dispensed_total>qty.ampules){
 return Messenger().post({type:'error',message:'Insufficient dispense quantity!',hideAfter: 3,showCloseButton:true});
    }

    }
       if(this.selectedMedicine.packing_type=='Per supp' || this.selectedMedicine.packing_type=='SACHET' || this.selectedMedicine.packing_type=='Sachet' || this.selectedMedicine.packing_type=='box' || this.selectedMedicine.packing_type=='Set' || this.selectedMedicine.packing_type=='ROLLS' || this.selectedMedicine.packing_type=='PIECES' || this.selectedMedicine.packing_type=='pack' || this.selectedMedicine.packing_type=='Diskus' ){

     
      if(this.selectedMedicine.quantity_units==undefined ){
         return Messenger().post({type:'error',message:'Select valid dispense quantity!',hideAfter: 3,showCloseButton:true});
      }
      if(this.selectedMedicine.quantity_units == undefined) { this.selectedMedicine.quantity_units=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_units);
       
         if(this.selectedMedicine.dispensed_total>qty.units){
 return Messenger().post({type:'error',message:'Insufficient dispense quantity!',hideAfter: 3,showCloseButton:true});
    }

    }
  /*    if(this.selectedMedicine.dispensed_quantity==null || this.selectedMedicine.dispensed_quantity==undefined || this.selectedMedicine.dispensed_quantity=='' || this.selectedMedicine.dispensed_quantity==0){
       return Messenger().post({type:'error',message:'Valid dispensed quantity required!',hideAfter: 3,showCloseButton:true});
      }
        if(this.selectedMedicine.dispensed_quantity>this.selectedMedicine.stock_quantity ){
       return Messenger().post({type:'error',message:'Dispense quantity must not be higher than stock quantity!',hideAfter: 3,showCloseButton:true});
      }  */
   if(this.selectedMedicine.packing_type=='BOTTLE'){

     
      if(this.selectedMedicine.quantity_bottles==undefined  && this.selectedMedicine.quantity_unittotal==undefined){
         return Messenger().post({type:'error',message:'Select valid dispense quantity!',hideAfter: 3,showCloseButton:true});
      }
      if(this.selectedMedicine.quantity_bottles == undefined) { this.selectedMedicine.quantity_bottles=0; }
      if(this.selectedMedicine.quantity_unittotal == undefined) { this.selectedMedicine.quantity_unittotal=0; }
     this.selectedMedicine.quantity_unitperbottle = JSON.parse(this.selectedMedicine.quantity).unitperbottle;
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_unittotal);
  
          if(this.selectedMedicine.quantity_bottles != undefined) { this.selectedMedicine.dispensed_total += Number(this.selectedMedicine.quantity_bottles* (qty.perbottle)); }        
    
         if(this.selectedMedicine.dispensed_total>qty.unittotal){
 return Messenger().post({type:'error',message:'Insufficient dispense quantity!',hideAfter: 3,showCloseButton:true});
    }

    }
       if(this.selectedMedicine.packing_type=='TUBE'){

     
      if(this.selectedMedicine.quantity_tubes==undefined  && this.selectedMedicine.quantity_unittotal==undefined){
         return Messenger().post({type:'error',message:'Select valid dispense quantity!',hideAfter: 3,showCloseButton:true});
      }
      if(this.selectedMedicine.quantity_tubes == undefined) { this.selectedMedicine.quantity_tubes=0; }
      if(this.selectedMedicine.quantity_unittotal == undefined) { this.selectedMedicine.quantity_unittotal=0; }
       this.selectedMedicine.quantity_unitpertube = JSON.parse(this.selectedMedicine.quantity).unitpertube;
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_unittotal);
          if(this.selectedMedicine.quantity_tubes != undefined) { this.selectedMedicine.dispensed_total += Number(this.selectedMedicine.quantity_tubes* (qty.pertube)); }        
            console.log(this.selectedMedicine.dispensed_total)
         if(this.selectedMedicine.dispensed_total>qty.unittotal){
 return Messenger().post({type:'error',message:'Insufficient dispense quantity!',hideAfter: 3,showCloseButton:true});
    }

    }
   if(fail==false && i==this.allSelectedProducts.length){
      this.allSelectedProducts.push(this.selectedMedicine);
      this.selectedMedicine=null;
      return Messenger().post({type:'success',message:'Item added to list!',hideAfter: 3,showCloseButton:true});
    }

    
    
   
    },
async onSearch(search, loading) {
  if(escape(search)=='' || escape(search)==null || escape(search)==undefined){
   return this.medicineInfo;
  }
    loading(true);
    const response = await this.axios.get(`https://backend.enigmedsvcs.com/development/search/liveInventory/`+ this.clinicId +`/${escape(search)}`);
    this.medicineInfo = response.data.medicineInfo;
   // console.log(this.medicineInfo)
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
           if(this.data.patientId=='' || this.data.patientId==null){
        
         	reject('Enter Patient MRN to continue..')
         }
             if(this.data.total_amount=='' || this.data.total_amount==null){
        
         	reject('Key in total amount to continue..')
         }
         
       
       else{
        //  console.log('vendor:'+this.data.vendor.name+'--- order number:'+this.data.order_number+'--- attachments:'+ JSON.stringify(this.data.attachments) + '--- comments:'+this.data.comments);
          resolve(true)
         }   
     
     })
    },
      validTwo:function() {
     return new Promise((resolve, reject) => {
               if(this.data.patientId=='' || this.data.patientId==null){
        
        	reject('Enter Patient MRN to continue..')
         }
             if(this.data.total_amount=='' || this.data.total_amount==null){
        
         	reject('Key in total amount to continue..')
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

  submit(){
    var self=this;
    self.isLoading = true;
    if(self.accept==false){
       self.isLoading = false;
      return Messenger().post({type:'error',message:'Tick confirmation checkbox to continue!',hideAfter: 3,showCloseButton:true});
    }
  
   var finalProducts = new Array();

  var index=0;var length = self.allSelectedProducts.length;
 
//  console.log(this.allSelectedProducts);
   self.allSelectedProducts.forEach(function(entry) {
   
   
    
 if(entry.packing_type=='TABLETS'){
  var quantity = {
     tablets:Number(entry.quantity_tablets),
     strips:Number(entry.quantity_strips),
     totaltablets:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
    if(entry.packing_type=='Per vial' || entry.packing_type=='per vial' || entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
  var quantity = {
    
     vials:Number(entry.quantity_vials),
     mls:Number(entry.quantity_mls),
    totalmls:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
     if(entry.packing_type=='per ampule'){
  var quantity = {
    ampules:Number(entry.quantity_ampules),
    totalampules:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
        if(entry.packing_type=='BOTTLE'){
  var quantity = {

     bottles:Number(entry.quantity_bottles),
     unittotal:Number(entry.quantity_unittotal),
    totalunits:Number(entry.dispensed_total)
   };
  finalProducts.push({clinicId:self.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }
     if(entry.packing_type=='TUBE'){
  var quantity = {
    tubes:Number(entry.quantity_tubes),
     unittotal:Number(entry.quantity_unittotal),
    totalunits:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }

      if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){
  var quantity = {
     units:Number(entry.quantity_units),
    totalunits:Number(entry.dispensed_total)
   };
 finalProducts.push({clinicId:self.clinicId,productId:entry.productId,quantity:JSON.stringify(quantity),packing_type:entry.packing_type});
   }




 

  
    index++;
});
 
    if(index==length){
     // return console.log(finalProducts);
 self.axios.post('https://backend.enigmedsvcs.com/development/checkout/submit', {
          clinicId:self.clinicId,
          patientId:self.data.patientId,
          total_amount:self.data.total_amount,
          allProducts:JSON.stringify(self.allSelectedProducts),
          finalProducts:finalProducts,
          staffId:self.staffId,
           staffName:self.username,
          

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
   
  },
  },
     mounted(){
      this.getInventory();
  this.$barcodeScanner.init(this.onBarcodeScanned);
 
 
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
