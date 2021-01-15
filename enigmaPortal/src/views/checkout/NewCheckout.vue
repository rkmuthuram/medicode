<!-- =========================================================================================
  File Name: FormWizardValidation.vue
  Description: Form wizard with validation
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card title="Check Out">

  <!--  <p>Implement Form validation with form wizard using popular <strong> <router-link to="/forms/form-validation">VeeValidate</router-link></strong></p> -->

    <div class="mt-5">
      <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="null" finishButtonText="Submit">
        <tab-content title="Customer Info" class="mb-5" icon="feather icon-home" :before-change="validateStep1">

          <!-- tab 1 content -->
          <form data-vv-scope="step-1">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Patient Identification Number (MRN Number)" v-model="data.patientId" class="w-full" name="mrn_number" v-validate="'required|min:5'" />
              <span class="text-danger">{{ errors.first('step-1.mrn_number') }}</span>
            </div>
        <!--    <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Last Name"  v-model="lastName" class="w-full" name="last_name" v-validate="'required|alpha'" />
              <span class="text-danger">{{ errors.first('step-1.last_name') }}</span>
            </div> -->
          
                  <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Amount (RM)" v-model="data.total_amount" class="w-full" name="total_amount" type="number"  v-validate="'required|min:2'"  />
              <span class="text-danger">{{ errors.first('step-1.total_amount') }}</span>
            </div>
        <!--    <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-select v-model="city" class="w-full select-large" label="City">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
              </vs-select>
            </div> -->
          </div>
          </form>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content title="Add Products" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep2">
          <form data-vv-scope="step-2">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
             <v-select label="product_name" placeholder=" type to search medicine by name / category / manufacturer / any barcodes.." :filterable="false" :options="medicineInfo"  @search="onSearch"  v-model="selectedMedicine" change="" >
    <template slot="no-options">
    -
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
            </div>
          </div>
          <br>
               <vx-card title=""   v-if="selectedMedicine!=null" :key="componentKey" card-border>

   
          <span class="fw-semi-bold text-primary">{{selectedMedicine.product_name}}</span>
          <span class="fw-semi-bold text-muted ml-sm"> ({{selectedMedicine.product_category}})</span>
          <hr />
          <div class="d-flex justify-content-between mb-lg">
          
            <span class="text-muted"><small>{{selectedMedicine.manufacturer}}<sub>(manufacturer)</sub> | {{selectedMedicine.company_name}}<sub>(distributor)</sub> | {{selectedMedicine.packing_type}}<sub>(prescription type)</sub> | {{selectedMedicine.packing_quantity}}<sub>(packing quantity)</sub> | {{selectedMedicine.color}}<sub>(color)</sub></small></span><br>
            
          </div>
     

           <!--   <div class="mb-lg">
            <h3 class="text-success mb-0">Available Stock : {{selectedMedicine.quantity}} units</h3>
          </div> -->
            <vs-divider/>
            <div v-if="selectedMedicine.packing_type=='TABLETS'" :key="componentKey">
   <span class="fw-semi-bold text-primary">Balance Stock :  {{JSON.parse(selectedMedicine.quantity).tablets}} tablets ({{JSON.parse(selectedMedicine.quantity).tablets/JSON.parse(selectedMedicine.quantity).tabletsperstrip}} strips)  <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/pills.png?alt=media&token=70eb9961-0de4-4554-95fb-d8cad97a5d79' /> </span>
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
      <td>
            
            
            
       Key In Dispense Quantity (TABLETS)  <vs-input class="inputx" placeholder="TABLETS QUANTITY" v-model="selectedMedicine.quantity_tablets" type="number" />
             </td>     
                                              
            </tr>
              
                    
                
              </tbody>
            </table> 
                 
  
                </div>
                  <div v-if=" selectedMedicine.packing_type=='Per vial' || selectedMedicine.packing_type=='per vial'" :key="componentKey">
                       <span class="fw-semi-bold text-primary">Current Stock : {{JSON.parse(selectedMedicine.quantity).vials}} vials  <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' /></span>
 <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
         
            
                <td> 
        Key In Dispense Quantity (VIALS)    <br>     <select v-model="selectedMedicine.quantity_vials">
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
              <span class="fw-semi-bold text-primary">Current Stock : {{JSON.parse(selectedMedicine.quantity).mls}} CC ({{JSON.parse(selectedMedicine.quantity).mls/JSON.parse(selectedMedicine.quantity).mlpervial}} vials) <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/injection.png?alt=media&token=d415a06a-ccaf-4c5d-88cc-2df1afbb6b51' /> </span>
<table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                     <tr>
              
               
              <td> 
         Key In Dispense Quantity (VIALS)     <br>    <select v-model="selectedMedicine.quantity_vials">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).vials" :value="n">{{ n }}</option>
  </select>
          </td>  
                                      
            </tr>
                         <tr>
                 
            
              <td> 
                      Key In Dispense Quantity (ML/CC)  <vs-input class="inputx"  @change="getVialValue(index)" placeholder="BY ML/CC" v-model="selectedMedicine.quantity_mls" type="number" />
         </td>     
                   
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
           <span class="fw-semi-bold text-primary">Current Stock : {{JSON.parse(selectedMedicine.quantity).ampules}} ampules <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/ampoule.png?alt=media&token=96a8f68c-caac-417f-9356-05e4831907f5' /></span>
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
             
             
                       <td> 
       Key In Dispense Quantity (AMPULES)   <br><select v-model="selectedMedicine.quantity_ampules">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).ampules" :value="n">{{ n }}</option>
  </select>
           <!--   <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"   @change="getAmpuleValue(index)"  v-model="selectedMedicine.quantity_ampules"></b-form-input> -->
           
       </td>      
                          
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>
                        <div v-if="selectedMedicine.packing_type=='BOTTLE'" :key="componentKey">
                             <span class="fw-semi-bold text-primary">Current Stock :  {{JSON.parse(selectedMedicine.quantity).unittotal}}{{JSON.parse(selectedMedicine.quantity).unitperbottle}}  ({{JSON.parse(selectedMedicine.quantity).unittotal/JSON.parse(selectedMedicine.quantity).perbottle}} bottles) <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/bottles.png?alt=media&token=784f4166-e1d3-4e53-b7e5-de05b90a20e1' /></span>
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
                       <td> 
        Key In Dispense Quantity (BOTTLE)   <br>      <select v-model="selectedMedicine.quantity_bottles">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).bottles" :value="n">{{ n }}</option>
  </select>
             <!-- <b-input-group class="input-group-transparent" id="append-field3" append="total">
                <b-form-input class="input-transparent"  type="number"  @change="getBottleValue(index)"  v-model="selectedMedicine.quantity_bottles"></b-form-input>
              </b-input-group> -->
             </td>    
                    
              <td>
           
              Key In Dispense Quantity ({{JSON.parse(selectedMedicine.quantity).unitperbottle}})  <vs-input class="inputx"   @change="getBottleValue(index)"  :placeholder="JSON.parse(selectedMedicine.quantity).unitperbottle" v-model="selectedMedicine.quantity_unittotal" type="number" />
           
          
           </td>                      
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
                       <td> 
       Key In Dispense Quantity (TUBE)   <br>         <select v-model="selectedMedicine.quantity_tubes">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).tubes" :value="n">{{ n }}</option>
  </select>
           </td>    
                    
              <td>

       Key In Dispense Quantity ({{JSON.parse(selectedMedicine.quantity).unitpertube}})  <vs-input class="inputx"   @change="getBottleValue(index)"  :placeholder="JSON.parse(selectedMedicine.quantity).unitpertube" v-model="selectedMedicine.quantity_unittotal" type="number" />

              </td>                      
            </tr>
            <tr>
                
              </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div>

                  <div v-if="selectedMedicine.packing_type=='Per supp' || selectedMedicine.packing_type=='SACHET' || selectedMedicine.packing_type=='Sachet' || selectedMedicine.packing_type=='box' || selectedMedicine.packing_type=='Set' || selectedMedicine.packing_type=='ROLLS' || selectedMedicine.packing_type=='PIECES' || selectedMedicine.packing_type=='pack' || selectedMedicine.packing_type=='Diskus' "  :key="componentKey">
                     <span class="fw-semi-bold text-primary">Current Stock : {{JSON.parse(selectedMedicine.quantity).units}} units <img src='https://firebasestorage.googleapis.com/v0/b/kka-pj.appspot.com/o/units.png?alt=media&token=17211f17-6705-47e8-8cfe-e005409e5194' /></span>
    <table  class="table table-bordered table-lg mt-lg mb-0" >
           
                     <tbody>
                      <tr>
                 
                 
                       <td>    Key In Dispense Quantity (UNITS)   <br>     <select v-model="selectedMedicine.quantity_units">
    <option v-for="n in JSON.parse(selectedMedicine.quantity).units" :value="n">{{ n }}</option>
  </select>
       </td>      
                            
            </tr>
          
                
              </tbody>
            </table> 
                   
  
                </div> 
          
           <div class="demo-alignment">

              <vs-button color="success" type="filled" icon-pack="feather" icon="icon-check" @click="addToList()">Add to List</vs-button>
<vs-button color="danger" type="filled" icon-pack="feather" icon="icon-trash" @click="removeFromList()">Remove</vs-button>

        </div>

       
            

                        


    
    </vx-card>
    <div>
         

       

     <table  class="table table-bordered table-lg mt-lg mb-0" v-if="allSelectedProducts.length!=0">
              <thead class="thead-dark">
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
                       <td><vs-button color="danger" type="filled" icon-pack="feather" icon="icon-trash" @click="removeFromAllProducts(index)">Remove Item</vs-button></td>
                </tr>
              </tbody>
            </table> 
          </div>
          
          </form>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content title="Review & Confirmation" class="mb-5" icon="feather icon-image" :before-change="validateStep3">
          <form data-vv-scope="step-3">
               <span class="badge badge-success">   Patient MRN No : {{data.patientId}} </span> |
              

           <span class="badge badge-success">    Amount (RM) : {{data.total_amount}}</span> 
          <div class="vx-row">
             
   
              <br><br>
                 Dispensed Products
               <table  class="table table-bordered table-lg mt-lg mb-0" v-if="allSelectedProducts.length!=0">
              <thead class="thead-dark">
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
          <br>
    
            <div class="vx-col md:w-1/2 w-full md:mt-8">
             
              
                <div class="flex">
                  <vs-checkbox>I have reviewed the contents and am ready to proceed</vs-checkbox>
               
                </div>
             
            </div>
          </div>
          </form>
        </tab-content>
      </form-wizard>
    </div>

 
  </vx-card>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VueBarcodeScanner from 'vue-barcode-scanner';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueBarcode from 'vue-barcode';
import { Validator } from 'vee-validate';
import vSelect from 'vue-select';

const dict = {
  custom: {
    first_name: {
      required: 'First name is required',
      alpha: 'First name may only contain alphabetic characters'
    },
    last_name: {
      required: 'Last name is required',
      alpha: 'Last name may only contain alphabetic characters'
    },
    email: {
      required: 'Email is required',
      email: 'Please enter valid email'
    },
    job_title: {
      required: 'Job title name is required',
      alpha: 'Job title may only contain alphabetic characters'
    },
    proposal_title: {
      required: 'Proposal title name is required',
      alpha: 'Proposal title may only contain alphabetic characters'
    },
    event_name: {
      required: 'Event name is required',
      alpha: 'Event name may only contain alphabetic characters'
    }
  }
}

// register custom messages
Validator.localize('en', dict)

export default {
  data () {
    return {

           userInfo:JSON.parse(localStorage.getItem('userInfo')),
      liveInventory:new Array(),
      componentKey:0,
      allSelectedProducts:[],
        clinicId: JSON.parse(localStorage.getItem('userInfo')).clinicId,
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
      firstName: '',
      lastName: '',
      email: '',
      city: 'new-york',
      proposalTitle: '',
      jobTitle: '',
      textarea: '',
      eventName: '',
      eventLocation: 'san-francisco',
      status: 'plannning',
      cityOptions: [
        { text: 'New York', value: 'new-york' },
        { text: 'Chicago', value: 'chicago' },
        { text: 'San Francisco', value: 'san-francisco' },
        { text: 'Boston', value: 'boston' }
      ],
      statusOptions: [
        { text: 'Plannning', value: 'plannning' },
        { text: 'In Progress', value: 'in progress' },
        { text: 'Finished', value: 'finished' }
      ],
      LocationOptions: [
        { text: 'New York', value: 'new-york' },
        { text: 'Chicago', value: 'chicago' },
        { text: 'San Francisco', value: 'san-francisco' },
        { text: 'Boston', value: 'boston' }
      ]
    }
  },
  methods: {
     submit(){
    var self=this;  
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
 self.$http.post('checkout/submit', {
          clinicId:self.clinicId,
          patientId:self.data.patientId,
          total_amount:self.data.total_amount,
          allProducts:JSON.stringify(self.allSelectedProducts),
          finalProducts:finalProducts,
          staffId:self.userInfo.uid,
          

    })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                 self.$vs.notify({
          title: 'Success',
          text: response.data.success,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
                    self.$router.push('/dashboard')
         
                }
               else {
                  if(response.data.error){
                    self.$vs.notify({
          title: 'Error',
          text: response.data.error,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
          
                  }
                 else {
                       self.$vs.notify({
          title: 'Error',
          text: response.error,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
          
                   }
                }
                })
                .catch(function (error) {
                     self.$vs.notify({
          title: 'Error',
          text: error,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
                         
                });   


    }
   
  },
    validateStep1 () {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
    validateStep2 () {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-2').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
    validateStep3 () {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-3').then(result => {
          if (result) {
           this.submit()
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
     async getInventory() {
  try {
   const response =  await this.$http({ url: 'all/inventory/'+this.clinicId });
   this.liveInventory = response.data.inventoryInfo; 
   
  } catch (error) {
    console.error(error);
  }
},
async onSearch(search, loading) {
  if(escape(search)=='' || escape(search)==null || escape(search)==undefined){
   return this.medicineInfo;
  }
    loading(true);
    const response = await this.$http({ url: 'search/liveInventory/' + this.clinicId +`/${escape(search)}` });
    this.medicineInfo = response.data.medicineInfo;
   // console.log(this.medicineInfo)
    loading(false);
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
     this.$vs.notify({
        title:'Icon mail',
        text:'Item removed!',
        color:'success',
        iconPack: 'feather',
        icon:'icon-check'});
   
    },
      removeFromAllProducts(index){
      this.allSelectedProducts.splice(index);
    return this.$vs.notify({
        title:'Icon mail',
        text:'Item removed!',
        color:'success',
        iconPack: 'feather',
        icon:'icon-check'});
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
          return this.$vs.notify({
        title:'Icon mail',
        text:'Product already added to the list!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});

    }
    if(this.selectedMedicine.packing_type=='TABLETS'){
  
     
      if(this.selectedMedicine.quantity_tablets==undefined  && this.selectedMedicine.quantity_strips==undefined){
              return this.$vs.notify({
        title:'Icon mail',
        text:'Select valid dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
      
      }
      if(this.selectedMedicine.quantity_tablets == undefined) { this.selectedMedicine.quantity_tablets=0; }
      if(this.selectedMedicine.quantity_strips == undefined) { this.selectedMedicine.quantity_strips=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_tablets);
      if(this.selectedMedicine.quantity_strips != undefined) { this.selectedMedicine.dispensed_total += (Number(this.selectedMedicine.quantity_strips)* Number(qty.tabletsperstrip)); }
         if(this.selectedMedicine.dispensed_total>qty.tablets){
                return this.$vs.notify({
        title:'Icon mail',
        text:'Insufficient dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});

    }
  
   
    }
    if(this.selectedMedicine.packing_type=='Vial / per cc' || this.selectedMedicine.packing_type=='Vial / per 0.5 cc' || this.selectedMedicine.packing_type=='per vial' || this.selectedMedicine.packing_type=='Per vial' || this.selectedMedicine.packing_type=='vial per cc'){

     
      if(this.selectedMedicine.quantity_vials==undefined  && this.selectedMedicine.quantity_mls==undefined){
       return this.$vs.notify({
        title:'Icon mail',
        text:'Select valid dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
      }
      if(this.selectedMedicine.quantity_vials == undefined) { this.selectedMedicine.quantity_vials=0; }
      if(this.selectedMedicine.quantity_mls == undefined) { this.selectedMedicine.quantity_mls=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_mls);
          if(this.selectedMedicine.quantity_mls != undefined) { this.selectedMedicine.dispensed_total += Number(this.selectedMedicine.quantity_vials* (qty.mlpervial)); }        
         if(this.selectedMedicine.dispensed_total>qty.mls){
              return this.$vs.notify({
        title:'Icon mail',
        text:'Insufficient dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});

    }

    }
      if(this.selectedMedicine.packing_type=='per ampule'){

     
      if(this.selectedMedicine.quantity_ampules==undefined ){
        this.$vs.notify({
        title:'Icon mail',
        text:'Select valid dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});

      }
      if(this.selectedMedicine.quantity_ampules == undefined) { this.selectedMedicine.quantity_ampules=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_ampules);
       
         if(this.selectedMedicine.dispensed_total>qty.ampules){
    return this.$vs.notify({
        title:'Icon mail',
        text:'Insufficient dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
    }

    }
       if(this.selectedMedicine.packing_type=='Per supp' || this.selectedMedicine.packing_type=='SACHET' || this.selectedMedicine.packing_type=='Sachet' || this.selectedMedicine.packing_type=='box' || this.selectedMedicine.packing_type=='Set' || this.selectedMedicine.packing_type=='ROLLS' || this.selectedMedicine.packing_type=='PIECES' || this.selectedMedicine.packing_type=='pack' || this.selectedMedicine.packing_type=='Diskus' ){

     
      if(this.selectedMedicine.quantity_units==undefined ){
      this.$vs.notify({
        title:'Icon mail',
        text:'Select valid dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
      }
      if(this.selectedMedicine.quantity_units == undefined) { this.selectedMedicine.quantity_units=0; }
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_units);
       
         if(this.selectedMedicine.dispensed_total>qty.units){
    return this.$vs.notify({
        title:'Icon mail',
        text:'Insufficient dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
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
          this.$vs.notify({
        title:'Icon mail',
        text:'Select valid dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
      }
      if(this.selectedMedicine.quantity_bottles == undefined) { this.selectedMedicine.quantity_bottles=0; }
      if(this.selectedMedicine.quantity_unittotal == undefined) { this.selectedMedicine.quantity_unittotal=0; }
     this.selectedMedicine.quantity_unitperbottle = JSON.parse(this.selectedMedicine.quantity).unitperbottle;
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_unittotal);
  
          if(this.selectedMedicine.quantity_bottles != undefined) { this.selectedMedicine.dispensed_total += Number(this.selectedMedicine.quantity_bottles* (qty.perbottle)); }        
    
         if(this.selectedMedicine.dispensed_total>qty.unittotal){
    return this.$vs.notify({
        title:'Icon mail',
        text:'Insufficient dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
    }

    }
       if(this.selectedMedicine.packing_type=='TUBE'){

     
      if(this.selectedMedicine.quantity_tubes==undefined  && this.selectedMedicine.quantity_unittotal==undefined){
         this.$vs.notify({
        title:'Icon mail',
        text:'Select valid dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
      }
      if(this.selectedMedicine.quantity_tubes == undefined) { this.selectedMedicine.quantity_tubes=0; }
      if(this.selectedMedicine.quantity_unittotal == undefined) { this.selectedMedicine.quantity_unittotal=0; }
       this.selectedMedicine.quantity_unitpertube = JSON.parse(this.selectedMedicine.quantity).unitpertube;
      var qty = JSON.parse(this.selectedMedicine.quantity);
      this.selectedMedicine.dispensed_total = Number(this.selectedMedicine.quantity_unittotal);
          if(this.selectedMedicine.quantity_tubes != undefined) { this.selectedMedicine.dispensed_total += Number(this.selectedMedicine.quantity_tubes* (qty.pertube)); }        
            console.log(this.selectedMedicine.dispensed_total)
         if(this.selectedMedicine.dispensed_total>qty.unittotal){
    return this.$vs.notify({
        title:'Icon mail',
        text:'Insufficient dispense quantity!',
        color:'danger',
        iconPack: 'feather',
        icon:'icon-check'});
    }

    }
   if(fail==false && i==this.allSelectedProducts.length){
      this.allSelectedProducts.push(this.selectedMedicine);
      this.selectedMedicine=null;
      this.$vs.notify({
        title:'Icon mail',
        text:'Item added to list!',
        color:'success',
        iconPack: 'feather',
        icon:'icon-check'});
    }

    
    
   
    },
  },
  mounted(){
      this.getInventory();
     this.$barcodeScanner.init(this.onBarcodeScanned);
 

   },
  components: {
    FormWizard,
    TabContent,
    vSelect
  }
}
</script>
