<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Programme Dashboard - {{data.title}} - #{{data.id}}</li>
    </ol>


    <b-row>
      <b-col md="12" xs="12">
        <b-tabs class="mb-lg">
           <b-tab title="Main">
            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                 Username
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.username"
                 disabled 
                />
              </b-form-group>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                Member ID
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.memberId"
                 disabled 
                />
              </b-form-group>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                 Programme Id
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.id"
                 disabled 
                />
              </b-form-group>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                Created
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.create_time"
                 disabled 
                />
              </b-form-group>
                 <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                 Last Updated
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.update_time"
                 disabled 
                />
              </b-form-group>
              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"

              >
                <div slot="label">
                 Title 
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="data.title"
             
                />
              </b-form-group>
                  <b-form-group
                    label="Status"
                    label-for="corestatus"
                    :label-cols="3"
                    >
                      <v-select
                                id="corestatus"
                                class="mt-xs"
                                v-model="data.selectedStatus"
                                :options="['Active','Inactive','Completed','***TO DELETE***']"
                               
                            />
                                    
                    </b-form-group>
                    
 <b-form-group 
                    label="Description"
                    id="coredesc"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="data.description"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="coredesc"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
               
                             <b-button variant="danger" type="submit" class="mr-xs"  @click="updateProgramme()">Update Programme</b-button>
          </b-tab>
    
          
           <b-tab title="Programme">
              <input
    type="hidden"
  false-value="false"
   id="programmeId"
                v-bind:data-id="programmeId"
                        />
                         <b-form-group 
                    label="Doctor's Diagnosis"
                    id="presentComplaintss"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="bform.diag"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="presentComplaintss"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
              <b-form-group
                        label="BLIS Functional Assesment"
                        label-for="SBL"
                        :label-cols="4"
                        >
                        <b-form-group class="abc-checkbox abc-checkbox-success center-checkbox float-right">
                        <input
                            type="checkbox"
                           
                            v-model="bform.sbl"
                             true-value="true"
  false-value="false"
   id="SBL"
  
                        />
                           
                        <label for="SBL"></label>
                        </b-form-group>
                    </b-form-group>

                    <b-form-group
                        label="Neck"
                        label-for="Neck"
                        :label-cols="4"
                        
                        >
                        <b-form-group class="abc-checkbox abc-checkbox-success center-checkbox float-right">
                        <input
                            type="checkbox"
                            id="Neck"
                             true-value="true"
  false-value="false"
                             v-model="bform.neck"
                        />
                        <label for="Neck"></label>
                        </b-form-group>
                    </b-form-group>

                    <b-form-group
                        label="Back"
                        label-for="Back"
                        :label-cols="4"
                        >
                        <b-form-group class="abc-checkbox abc-checkbox-success center-checkbox float-right">
                        <input
                            type="checkbox"
                            id="Back"
                             true-value="true"
  false-value="false"
                             v-model="bform.back"
                        />
                        <label for="Back"></label>
                        </b-form-group>
                    </b-form-group>

                    <b-form-group
                    label="Shoulder"
                    label-for="bform.shoulder"
                    :label-cols="4"
                    >
                      <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="bform.shoulder"
                                :options="['none','1 program','2 program']"
                            />
                                    
                    </b-form-group>

                    <b-form-group
                    label="Knee"
                    label-for="kneeSelect"
                    :label-cols="4"
                    >
                     <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="bform.knee"
                                :options="['none','1 program','2 program']"
                            />
                    </b-form-group>    

                    <b-form-group
                    label="Acute"
                    label-for="acuteSelect"
                    :label-cols="4"
                    >
                       <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="bform.acute"
                                :options="['none','1 program','2 program','3 program','4 program','5 program']"
                            />
                    </b-form-group>  
             
   <b-form class="form-label-left">
                        <b-form-group
                        label="Number of Sessions"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                    <select v-model="bform.session" >
    <option v-for="n in sessionCount" :value="n">{{ n }}</option>
  </select>
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                            
                
               <b-button variant="danger" type="submit" class="mr-xs" v-if="bfNew==true" @click="submitNewBF()">Submit New Form</b-button>
           <b-button variant="danger" type="submit" class="mr-xs" v-if="bfUpdate==true" @click="updateBF()">Update Form</b-button>
                 
             
          </b-tab>
             
          <b-tab title="Acute Baseline" v-if="bform.acute!='none'">
                            <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Subjective" active>
                      <b-form-group 
                    label="Present History"
                    id="motorConduction2"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aform.ac7"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="motorConduction2"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                     <b-form-group 
                    label="Chief Complaints"
                    id="presentComplaints"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aform.ac2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="presentComplaints"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                       <b-form-group 
                    label="Medical History"
                    id="medicalHistory"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac1"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="medicalHistory"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                                         <b-form-group 
                    label="X-Ray/MRI"
                    id="xray"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aform.ac4"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="xray"
                                />
                            </b-col>
                        </b-row>
                </b-form-group>   
                                  <!--     <b-form-group 
                    label="Presentation"
                    id="presentation"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aform.ac3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="presentation"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> -->
                              
                                      
                   </b-tab>
                    <b-tab title="Pain Area">
        
            <p>
             Select your pain area
            </p>
           
          <div class="image-container">
    <div class="body-front"></div>
    <div class="body-back"></div>

    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 577" class="svg-style">
      <path
        class="st0 neck"
        d="M140.8 85.7c-0.9 0-1.7-0.4-2.3-1.1 -1-1.3-0.8-3.2 0.4-4.2l41.5-33.7c0.5-0.4 1.2-0.7 1.9-0.7H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-61.6l-40.7 33C142.1 85.5 141.5 85.7 140.8 85.7z"
      />
      <path
        class="st0"
        d="M184.3 119.4c-0.6 0-1.2-0.2-1.7-0.6 -1.3-1-1.7-2.8-0.7-4.2L206.1 81c0.6-0.8 1.5-1.3 2.4-1.3H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-35l-23.3 32.4C186.2 119 185.2 119.4 184.3 119.4z"
      />
      <path
        class="st0"
        d="M198.3 310.7c-0.1 0-0.2 0-0.4 0 -1.6-0.2-2.8-1.7-2.6-3.3l10.2-84.4c0.2-1.5 1.5-2.6 3-2.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-33.8l-9.9 81.8C201.1 309.6 199.8 310.7 198.3 310.7z"
      />
      <path
        class="st0"
        d="M94.3 423.3c-0.9 0-1.8-0.4-2.4-1.2 -1-1.3-0.8-3.2 0.5-4.2l77.4-60c0.5-0.4 1.2-0.6 1.8-0.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-72.3l-76.6 59.4C95.6 423.1 94.9 423.3 94.3 423.3z"
      />
      <path
        class="st0"
        d="M140.8 422.5c-1.2 0-2.4-0.7-2.8-1.9 -0.6-1.5 0.2-3.3 1.7-3.9l57.5-21.8c0.3-0.1 0.7-0.2 1.1-0.2H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-46.2l-57 21.6C141.5 422.4 141.2 422.5 140.8 422.5z"
      />
      <path
        class="st0"
        d="M140.8 546.7c-0.5 0-0.9-0.1-1.4-0.3 -1.5-0.8-2-2.6-1.3-4.1l57.5-109.4c0.5-1 1.5-1.6 2.7-1.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-44.9l-56.7 107.8C142.9 546.1 141.9 546.7 140.8 546.7z"
      />
      <path
        class="st0"
        d="M394 121.4c-1.7 0-3-1.3-3-3s1.3-3 3-3h92.6l61.3-2c1.6-0.1 3 1.2 3.1 2.9 0.1 1.7-1.2 3-2.9 3.1l-61.4 2L394 121.4z"
      />
      <path
        class="st0"
        d="M566.3 314.7c-0.5 0-1.1-0.1-1.6-0.5l-86.9-53.9H377c-1.7 0-3-1.3-3-3s1.3-3 3-3h101.7c0.6 0 1.1 0.2 1.6 0.5l87.6 54.4c1.4 0.9 1.8 2.7 1 4.1C568.3 314.2 567.3 314.7 566.3 314.7z"
      />
      <path
        class="st0"
        d="M489.5 233.5c-0.6 0-1.2-0.2-1.7-0.5l-64.2-43.5h-55.9c-1.7 0-3-1.3-3-3s1.3-3 3-3h56.8c0.6 0 1.2 0.2 1.7 0.5l65 44c1.4 0.9 1.7 2.8 0.8 4.2C491.4 233 490.5 233.5 489.5 233.5z"
      />
      <path
        class="st0 move-abit"
        d="M485.5 175.5c-0.3 0-0.7-0.1-1-0.2l-60-21.8h-56.8c-1.7 0-3-1.3-3-3s1.3-3 3-3H425c0.3 0 0.7 0.1 1 0.2l60.5 22c1.6 0.6 2.4 2.3 1.8 3.8C487.9 174.7 486.7 175.5 485.5 175.5z"
      />
      <path
        class="st0"
        d="M463.7 323.3c-0.6 0-1.2-0.2-1.7-0.6l-35.7-25.4H355c-1.7 0-3-1.3-3-3s1.3-3 3-3h72.2c0.6 0 1.2 0.2 1.7 0.6l36.5 26c1.3 1 1.7 2.8 0.7 4.2C465.6 322.9 464.6 323.3 463.7 323.3z"
      />
      <path
        class="st0"
        d="M514.3 366c-0.4 0-0.7-0.1-1.1-0.2l-97.5-37.6H355c-1.7 0-3-1.3-3-3s1.3-3 3-3h61.3c0.4 0 0.7 0.1 1.1 0.2l98 37.8c1.5 0.6 2.3 2.3 1.7 3.9C516.6 365.3 515.5 366 514.3 366z"
      />
      <path
        class="st0"
        d="M508.3 555.3c-0.8 0-1.5-0.3-2.1-0.9L422.8 470h-55.1c-1.7 0-3-1.3-3-3s1.3-3 3-3h56.4c0.8 0 1.6 0.3 2.1 0.9l84.2 85.3c1.2 1.2 1.2 3.1 0 4.2C509.8 555 509.1 555.3 508.3 555.3z"
      />
    </svg> -->

    <div class="selection">
      <b-form-group
             class="abc-checkbox abc-checkbox-inverse checkboxes"
        v-for="pain in pains12"
        :key="pain.id"
      >
        <input
          v-if="pain.label"
          :value='pain.label'
          v-model="aform.pains"
          type="checkbox"
          :id="'aform'+pain.id"
        />
        <label :for="'aform'+pain.id" :class="pain.hide">{{pain.label}}</label>

        <label
          class="point"
          :style="pain.style"
          v-b-tooltip.hover
          :title="pain.label"
          :for="'aform'+pain.id"
        ></label>
        <label
          class="point"
          v-if="pain.style2"
          :style="pain.style2"
          v-b-tooltip.hover
          :title="pain.label"
          :for="'aform'+pain.id"
        ></label>
      </b-form-group>
          <br />
</div>
  </div>


          
            
                    </b-tab>
                    <b-tab title="Pain Level">
              <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="aform.pl1"  min="0" max="10"></vue-slider>
                </div> <br>
                 <!--      <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="aform.pl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="aform.pl3" min="0" max="10"></vue-slider>
                </div><br>
                    </b-tab>
                    <b-tab title="Objective">
                  
                       <b-form-group 
                    label="Observation"
                    id="obswalking"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac21"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="obswalking"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                                 <!--   <b-form-group 
                    label="Observation Sitting"
                    id="obssitting"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac22"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="obssitting"
                                />
                            </b-col>
                        </b-row>
                </b-form-group>  -->

                                       <!--   <b-form-group 
                    label="Posture Standing"
                    id="postanding"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac23"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="postanding"
                                />
                            </b-col>
                        </b-row>
                </b-form-group>      -->

                                                  <b-form-group 
                    label="Palpation"
                    id="palpation"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac24"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="palpation"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
 <b-form-group 
                    label="Range Of Motion"
                    id="rangeOfMotion"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aform.ac5"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="rangeOfMotion"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                                       <b-form-group 
                    label="Muscle Power Testing"
                    id="motorConduction"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aform.ac6"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="motorConduction"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                
                
                                                  <b-form-group 
                    label="Other Tests"
                    id="otherrest"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac25"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="otherrest"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 


                    </b-tab>
                    <b-tab title="Management">
           <b-form-group 
                    label="Physiotherapist Impression"
                    id="Physiotherapist Impression"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac31"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Physiotherapist Impression"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                      <b-form-group 
                    label="Treatment Goals"
                    id="Treatment"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac32"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Treatment"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                      <b-form-group 
                    label="Treatment Plan"
                    id="Treatment Plan"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aform.ac33"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Treatment Plan"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    
                    </b-tab>                        
                </b-tabs>
                  <b-button variant="danger" type="submit" class="mr-xs" v-if="afNew==true" @click="submitNewAF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="afUpdate==true" @click="updateAF()">Update Form</b-button>
          </b-tab>

    <b-tab title="Acute Outcome Form" v-if="bform.acute!='none'">
                            <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Subjective" active>
                     
                       <b-form-group 
                    label="Medical History"
                    id="medicalHistory"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac1"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="medicalHistory"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                                       <b-form-group 
                    label="Present Complaints"
                    id="presentComplaints"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aformo.ac2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="presentComplaints"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                                       <b-form-group 
                    label="Presentation"
                    id="presentation"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aformo.ac3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="presentation"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                                       <b-form-group 
                    label="X-Ray/MRI"
                    id="xray"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aformo.ac4"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="xray"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                                       <b-form-group 
                    label="Range Of Motion"
                    id="rangeOfMotion"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aformo.ac5"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="rangeOfMotion"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                                       <b-form-group 
                    label="Motor Conduction"
                    id="motorConduction"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aformo.ac6"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="motorConduction"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                 <b-form-group 
                    label="Present History"
                    id="motorConduction22"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                  v-model="aformo.ac7"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="motorConduction22"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                   </b-tab>
                    <b-tab title="Pain Area">
        
            <p>
             Select your pain area
            </p>
           


         <div class="image-container">
    <div class="body-front"></div>
    <div class="body-back"></div>

    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 577" class="svg-style">
      <path
        class="st0 neck"
        d="M140.8 85.7c-0.9 0-1.7-0.4-2.3-1.1 -1-1.3-0.8-3.2 0.4-4.2l41.5-33.7c0.5-0.4 1.2-0.7 1.9-0.7H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-61.6l-40.7 33C142.1 85.5 141.5 85.7 140.8 85.7z"
      />
      <path
        class="st0"
        d="M184.3 119.4c-0.6 0-1.2-0.2-1.7-0.6 -1.3-1-1.7-2.8-0.7-4.2L206.1 81c0.6-0.8 1.5-1.3 2.4-1.3H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-35l-23.3 32.4C186.2 119 185.2 119.4 184.3 119.4z"
      />
      <path
        class="st0"
        d="M198.3 310.7c-0.1 0-0.2 0-0.4 0 -1.6-0.2-2.8-1.7-2.6-3.3l10.2-84.4c0.2-1.5 1.5-2.6 3-2.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-33.8l-9.9 81.8C201.1 309.6 199.8 310.7 198.3 310.7z"
      />
      <path
        class="st0"
        d="M94.3 423.3c-0.9 0-1.8-0.4-2.4-1.2 -1-1.3-0.8-3.2 0.5-4.2l77.4-60c0.5-0.4 1.2-0.6 1.8-0.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-72.3l-76.6 59.4C95.6 423.1 94.9 423.3 94.3 423.3z"
      />
      <path
        class="st0"
        d="M140.8 422.5c-1.2 0-2.4-0.7-2.8-1.9 -0.6-1.5 0.2-3.3 1.7-3.9l57.5-21.8c0.3-0.1 0.7-0.2 1.1-0.2H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-46.2l-57 21.6C141.5 422.4 141.2 422.5 140.8 422.5z"
      />
      <path
        class="st0"
        d="M140.8 546.7c-0.5 0-0.9-0.1-1.4-0.3 -1.5-0.8-2-2.6-1.3-4.1l57.5-109.4c0.5-1 1.5-1.6 2.7-1.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-44.9l-56.7 107.8C142.9 546.1 141.9 546.7 140.8 546.7z"
      />
      <path
        class="st0"
        d="M394 121.4c-1.7 0-3-1.3-3-3s1.3-3 3-3h92.6l61.3-2c1.6-0.1 3 1.2 3.1 2.9 0.1 1.7-1.2 3-2.9 3.1l-61.4 2L394 121.4z"
      />
      <path
        class="st0"
        d="M566.3 314.7c-0.5 0-1.1-0.1-1.6-0.5l-86.9-53.9H377c-1.7 0-3-1.3-3-3s1.3-3 3-3h101.7c0.6 0 1.1 0.2 1.6 0.5l87.6 54.4c1.4 0.9 1.8 2.7 1 4.1C568.3 314.2 567.3 314.7 566.3 314.7z"
      />
      <path
        class="st0"
        d="M489.5 233.5c-0.6 0-1.2-0.2-1.7-0.5l-64.2-43.5h-55.9c-1.7 0-3-1.3-3-3s1.3-3 3-3h56.8c0.6 0 1.2 0.2 1.7 0.5l65 44c1.4 0.9 1.7 2.8 0.8 4.2C491.4 233 490.5 233.5 489.5 233.5z"
      />
      <path
        class="st0 move-abit"
        d="M485.5 175.5c-0.3 0-0.7-0.1-1-0.2l-60-21.8h-56.8c-1.7 0-3-1.3-3-3s1.3-3 3-3H425c0.3 0 0.7 0.1 1 0.2l60.5 22c1.6 0.6 2.4 2.3 1.8 3.8C487.9 174.7 486.7 175.5 485.5 175.5z"
      />
      <path
        class="st0"
        d="M463.7 323.3c-0.6 0-1.2-0.2-1.7-0.6l-35.7-25.4H355c-1.7 0-3-1.3-3-3s1.3-3 3-3h72.2c0.6 0 1.2 0.2 1.7 0.6l36.5 26c1.3 1 1.7 2.8 0.7 4.2C465.6 322.9 464.6 323.3 463.7 323.3z"
      />
      <path
        class="st0"
        d="M514.3 366c-0.4 0-0.7-0.1-1.1-0.2l-97.5-37.6H355c-1.7 0-3-1.3-3-3s1.3-3 3-3h61.3c0.4 0 0.7 0.1 1.1 0.2l98 37.8c1.5 0.6 2.3 2.3 1.7 3.9C516.6 365.3 515.5 366 514.3 366z"
      />
      <path
        class="st0"
        d="M508.3 555.3c-0.8 0-1.5-0.3-2.1-0.9L422.8 470h-55.1c-1.7 0-3-1.3-3-3s1.3-3 3-3h56.4c0.8 0 1.6 0.3 2.1 0.9l84.2 85.3c1.2 1.2 1.2 3.1 0 4.2C509.8 555 509.1 555.3 508.3 555.3z"
      />
    </svg> -->

    <div class="selection">
      <b-form-group
             class="abc-checkbox abc-checkbox-inverse checkboxes"
        v-for="pain in pains12"
        :key="pain.id"
      >
        <input
          v-if="pain.label"
          :value='pain.label'
          v-model="aformo.pains"
          type="checkbox"
          :id="'aformo'+pain.id"
        />
        <label :for="'aformo'+pain.id" :class="pain.hide">{{pain.label}}</label>

        <label
          class="point"
          :style="pain.style"
          v-b-tooltip.hover
          :title="pain.label"
          :for="'aformo'+pain.id"
        ></label>
        <label
          class="point"
          v-if="pain.style2"
          :style="pain.style2"
          v-b-tooltip.hover
          :title="pain.label"
          :for="'aformo'+pain.id"
        ></label>
      </b-form-group>
          <br />
</div>
  </div>

 
            
                    </b-tab>
                    <b-tab title="Pain Level">
              <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="aformo.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                    <!--   <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="aformo.pl2"></vue-slider>
                </div> <br> -->
                  <!--     <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="aformo.pl3"></vue-slider>
                </div><br>-->
                 <b-form-group 
                    label="Remarks"
                    id="acutepainremarks"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.plremarks"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="acutepainremarks"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    </b-tab>
                    <b-tab title="Objective">
                  
                       <b-form-group 
                    label="Observation Walking/Sitting"
                    id="obswalking"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac21"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="obswalking"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                   <!--                 <b-form-group 
                    label="Observation Sitting"
                    id="obssitting"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac22"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="obssitting"
                                />
                            </b-col>
                        </b-row>
                </b-form-group>  -->

                                       <!--   <b-form-group 
                    label="Posture Standing"
                    id="postanding"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac23"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="postanding"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> -->

                                                  <b-form-group 
                    label="Palpation"
                    id="palpation"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac24"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="palpation"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                
                                                  <b-form-group 
                    label="Other Tests"
                    id="otherrest"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac25"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="otherrest"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 


                    </b-tab>
                    <b-tab title="Management">
           <b-form-group 
                    label="Physiotherapist Impression"
                    id="Physiotherapist Impression"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac31"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Physiotherapist Impression"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                      <b-form-group 
                    label="Treatment"
                    id="Treatment"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac32"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Treatment"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                      <b-form-group 
                    label="Treatment Plan"
                    id="Treatment Plan"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="aformo.ac33"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Treatment Plan"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                       
                   
                    </b-tab>                        
                </b-tabs>
                    <b-button variant="danger" type="submit" class="mr-xs" @click="duplicateAOF()">Copy Data from Baseline</b-button>
                            <b-button variant="danger" type="submit" class="mr-xs" v-if="aofNew==true" @click="submitNewAOF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="aofUpdate==true" @click="updateAOF()">Update Form</b-button>
          </b-tab>

              <b-tab title="Back Baseline" v-if="bform.back=='true'">
                      <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="blform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                   <!--    <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="blform.pl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="blform.pl3" min="0" max="10"></vue-slider>
                </div><br>
                    <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="blform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="blform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group>
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                       Trouble Level Today (24 hours)
                  <vue-slider v-model="blform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
                    <!--   <div class="mb-sm">
                        Trouble Level (7 days)
                  <vue-slider v-model="blform.tl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                         Trouble Level (6 Weeks)
                  <vue-slider v-model="blform.tl3" min="0" max="10"></vue-slider>
                </div><br>
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                        Stress Level (6 Weeks)
                  <vue-slider v-model="blform.sl1" min="0" max="10"></vue-slider>
                </div><br>
                 
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                    <b-tab title="Impairment">
                      <p>Choose the appropriate answer which best describes your ability to perform the following Tasks</p>
                         <b-form class="form-label-left">
                        <b-form-group
                        label="Intense Leisure Time Physical Activity Sports"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl1"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Lifting Heavy Objects"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl2"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Strenuous Physical Tasks (moving etc.)"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl3"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Lifting and Carrying Shopping Bags"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl4"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Bending, Kneeling and Squatting"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl5"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Walking More than 1km (0.6miles)"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl6"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Running"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl7"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Dressing, Putting on Socks"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl8"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Sleeping at Night"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl9"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Standing up From a Chair"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl10"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Travelling in a Car for More than 15 minutes"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="blform.bl11"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                        
                    
                    </b-form>
                      
                   
                    </b-tab>                     
                </b-tabs>
                  <b-button variant="danger" type="submit" class="mr-xs" v-if="blfNew==true" @click="submitNewBLF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="blfUpdate==true" @click="updateBLF()">Update Form</b-button>
              </b-tab>
   <b-tab title="Back Protocol Form" v-if="bform.back=='true'">
        <b-button variant="primary" type="submit" class="mr-xs"  @click="submitNewBPF()">Create New Back Protocol Entry</b-button><br><br><br>

       <b-form-group
              label="BP Entries"
              label-for="search-select"
              :label-cols="3"
              description="Search & Select BP Entry"
            >
              <b-row>
                <b-col md='9'>
               <v-select :options="backInfo"   v-model="selectedBackNote.note" label="create_time"  :value="id" @change="getBPF">
    <template slot="option" slot-scope="option">
      #{{option.id}} - Created: {{ format_date(option.create_time) }} - Last Updated: {{ format_date(option.update_time) }}
    </template>
  </v-select>
  
                </b-col>
              </b-row>
            </b-form-group>

             <b-form-group
             v-if="showBackNote==true"
              label="Load Previous BP Entry"
              label-for="search-select"
              :label-cols="3"
              description="Search & Select BP Entry Template"
            >
              <b-row>
                <b-col md='9'>
               <v-select :options="backInfo"   v-model="selectedBackNote2.note" label="create_time"  :value="id" @change="loadBPFTemplate">
    <template slot="option" slot-scope="option">
      #{{option.id}} - Created: {{ format_date(option.create_time) }} - Last Updated: {{ format_date(option.update_time) }}
    </template>
  </v-select>
  
                </b-col>
              </b-row>
            </b-form-group>
                      <b-tabs nav-class="bg-tranparent" v-if="showBackNote==true">
                        <b-tab title="Weight" active>
                        <b-row>
        <b-col xl="12">
                <b-form-group
                label="Body Weight"
                label-for="bpform.w1"
                label-class="text-md-left px-3"
                label-cols="3"
                breakpoint="md"
                >
                    <b-row>
                        <input v-model="bpform.w1" id="bpform.w1" type="number" class="form-control very-small" name="bpform.w1" placeholder="0">
                        <input type="text" class="form-control input-transparent very-small" name="kg" placeholder="kg" disabled>
                    </b-row>  
                </b-form-group>
                <b-form-group
                label="Functional Weight"
                label-for="bpform.w2"
                label-class="text-md-left px-3"
                label-cols="3"
                breakpoint="md"
                >
                    <b-row>
                        <input v-model="bpform.w2" id="bpform.w2" type="number" class="form-control very-small" name="bpform.w2" placeholder="0"> 
                        <input type="text" class="form-control input-transparent very-small" name="kg" placeholder="kg" disabled>
                    </b-row>    
                </b-form-group>

                <b-form-group label="Total Weight" label-for="Total Weight" label-cols="3" label-class="text-md-left px-3" breakpoint="md">
                    <b-row>
                        <input id="from_amount" type="number" class="form-control input-transparent very-small" name="to_amount" :value="calculatedFromAmount" disabled placeholder="0">
                        <input type="text" class="form-control input-transparent very-small" name="kg" placeholder="kg" disabled>
                    </b-row>
                </b-form-group> 
        </b-col>
    </b-row>
                        </b-tab>
                        <b-tab title="Strength">
         <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Strength</th>
                  <th>Target</th>
                  <th>Ability</th>
                  <th class="hidden-sm-down">Deficit</th>
                  <th class="">% Strength Deficit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(table,index) in tables" :key="table.id">
                  <td>{{table.strength}}</td>
                  <td>
                      <input :id="'strength'+table.target" type="number" class="form-control very-small"  :value="getStarget(index)" placeholder="kg" disabled>
                  </td>
                  <td>
                      <input :id="'strength'+table.ability" type="number" class="form-control very-small" v-model="bpform.sability[index]" placeholder="kg">
                  </td>
                  <td>
                      <input :id="'strength'+table.deficit" type="number" class="form-control very-small input-transparent deficit" :value="getSDeficit(index)" placeholder="kg" disabled>
                  </td>
                  <td>
                      <div class="progress-container">
                          <span class="text-percent">{{ getSDeficitPercentage(index).toFixed(2) }}</span> %
                        <b-progress
                        :variant="checkStrengthStatus(index)" :value="getSDeficitPercentage2(index)" :max="100"
                        class="progress-sm mb-xs"
                        />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <b-form-group

                label="Physio Interpretation"
                label-for="markdown-editor33"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor33" language="en" v-model="bpform.s2"/>
              
            </b-form-group>
                        </b-tab>
                        <b-tab title="Range">
               <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Range</th>
                  <th>Target</th>
                  <th>Ability</th>
                  <th class="hidden-sm-down">Deficit</th>
                  <th class="">% Range Deficit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(table,index) in tables2" :key="table.id">
                  <td>{{table.strength}}</td>
                  <td>
                      <input :id="'range'+table.target" type="number" class="form-control" v-model="bpform.rtarget[index]" placeholder="degrees" disabled>
                  </td>
                  <td>
                      <input :id="'range'+table.ability" type="number" class="form-control " v-model="bpform.rability[index]" placeholder="degrees">
                  </td>
                  <td>
                      <input :id="'range'+table.deficit" type="number" class="form-control very-small input-transparent deficit" :value="getRDeficit(index)" placeholder="kg" disabled>
                  </td>
                  <td>
                      <div class="progress-container">
                          <span class="text-percent">{{ getRDeficitPercentage(index).toFixed(2) }}</span> %
                        <b-progress
                        :variant="checkRangeStatus(index)" :value="getRDeficitPercentage2(index)" :max="100"
                        class="progress-sm mb-xs"
                        />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
                    <b-form-group

                label="Physio Interpretation"
                label-for="markdown-editor32"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor32" language="en" v-model="bpform.r2"/>
              
            </b-form-group>
                        </b-tab>
                   
                        <b-tab title="EMG" >
                       <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Positions</th>
                  <th>Left</th>
                  <th>Right</th>
               
                </tr>
              </thead>
              <tbody>
                <tr v-for="(table,index) in tables5" :key="table.id">
                  <td>{{table.position}}</td>
                  <td>
                      <input :id="'emgl'+table.position+table.left" type="number" class="form-control very-small"  v-model="bpform.emg1l[index]" :name="table.left" placeholder="μV " />
                       <div class="progress-container">
                       
                        <b-progress
                        :variant="checkEMGStatus(bpform.emg1l[index])" :value="100" :max="100"
                        class="progress-sm mb-xs"
                        />
                    </div>
                  </td>
                  <td>
                      <input :id="'emgr'+table.position+table.right" type="number" class="form-control very-small" v-model="bpform.emg1r[index]"  :name="table.right" placeholder="μV " />
                       <div class="progress-container">
                       
                        <b-progress
                        :variant="checkEMGStatus(bpform.emg1r[index])" :value="100" :max="100"
                        class="progress-sm mb-xs"
                        />
                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
                   <b-form-group

                label="Physio Interpretation"
                label-for="markdown-editor31"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor31" language="en" v-model="bpform.emg2"/>
              
            </b-form-group>
   
                        </b-tab>
                               
                         
                     <b-button variant="danger" type="submit" class="mr-xs" @click="updateBPF()">Update Form</b-button> 
                    </b-tabs>
                            
                </b-tab>

           <b-tab title="Back Outcome Form" v-if="bform.back=='true'">
                      <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="bloform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                     <!--  <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="bloform.pl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="bloform.pl3"></vue-slider>
                </div><br>-->
                <b-form-group 
                    label="Remarks"
                    id="backpainremarks"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="bloform.plremarks"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="backpainremarks"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
               <!--    <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="bloform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="bloform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> -->
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble ", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                       Trouble  Level Today (24 hours)
                  <vue-slider v-model="bloform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
               <!--        <div class="mb-sm">
                        Trouble  Level (7 days)
                  <vue-slider v-model="bloform.tl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                       Trouble  Level (6 Weeks)
                  <vue-slider v-model="bloform.tl3"></vue-slider>
                </div><br>-->
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                        Stress Level (6 Weeks)
                  <vue-slider v-model="bloform.sl1" min="0" max="10"></vue-slider>
                </div><br>
                 
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                    <b-tab title="Impairment">
                      <p>Choose the appropriate answer which best describes your ability to perform the following Tasks</p>
                         <b-form class="form-label-left">
                        <b-form-group
                        label="Intense Leisure Time Physical Activity Sports"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl1"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Lifting Heavy Objects"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl2"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Strenuous Physical Tasks (moving etc.)"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl3"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Lifting and Carrying Shopping Bags"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl4"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Bending, Kneeling and Squatting"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl5"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Walking More than 1km (0.6miles)"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl6"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Running"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl7"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Dressing, Putting on Socks"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl8"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Sleeping at Night"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl9"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Standing up From a Chair"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl10"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Travelling in a Car for More than 15 minutes"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="bloform.bl11"
                                :options="['No Problems','Some Problems','Considerable Problems','Cannot Perform']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                        
                    
                    </b-form>
                        
                
                    </b-tab>                     
                </b-tabs>
                     <b-button variant="danger" type="submit" class="mr-xs" v-if="blofNew==true" @click="submitNewBLOF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="blofUpdate==true" @click="updateBLOF()">Update Form</b-button>
              </b-tab>

              <b-tab title="Neck Baseline" v-if="bform.neck=='true'">
                      <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="nform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                   <!--    <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="nform.pl2"></vue-slider>
                </div> <br>-->
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="nform.pl3" min="0" max="10"></vue-slider>
                </div><br>
                    <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="nform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="nform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                      Trouble Level Today (24 hours)
                  <vue-slider v-model="nform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
                   <!--    <div class="mb-sm">
                        Trouble Level (7 days)
                  <vue-slider v-model="nform.tl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                        Trouble Level (6 Weeks)
                  <vue-slider v-model="nform.tl3" min="0" max="10"></vue-slider>
                </div><br>
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                        Stress Level (6 Weeks)
                  <vue-slider v-model="nform.sl1" min="0" max="10"></vue-slider>
                </div><br>
                
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                    <b-tab title="Impairment">
                      <p>For each question choose the number that best measures your disability as you have experienced it in the past six weeks
<br>
Zero indicates no problem at all, 10 indicates the worse possible problem</p>
                         <b-form class="form-label-left">
                        <b-form-group
                        label="Is your neck stiff ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl1"
                                :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to look up ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl2"
                               :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to rotate your head to the left and right ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl3"
                                :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to put your coat on ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl4"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to comb your hair ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl5"
                                :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to work with your arms raised ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl6"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Do you experience pain while lying in bed ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl7"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Do you have to lie down due to your neck pain ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl8"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Does your neck affect your sleep ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl9"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Does your neck affect your work ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl10"
                          :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Forced to change job duties due to neck pain ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl11"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                                                                        <b-form-group
                        label="How much does your neck pain limit your daily life ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl12"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                                                                        <b-form-group
                        label="Does your neck pain affect your mood ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="nform.bl13"
                             :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                        
                    
                    </b-form>
                  
                    </b-tab>                     
                </b-tabs>
                      <b-button variant="danger" type="submit" class="mr-xs" v-if="nfNew==true" @click="submitNewNF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="nfUpdate==true" @click="updateNF()">Update Form</b-button>
              </b-tab>


              <b-tab title="Neck Outcome Form" v-if="bform.neck=='true'">
                      <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="noform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                <b-form-group 
                    label="Remarks"
                    id="neckpainremarks"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="noform.plremarks"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="neckpainremarks"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <!--   <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="noform.pl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="noform.pl3"></vue-slider>
                </div><br>-->
             <!--    <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="noform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="noform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> -->
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                      Trouble Level Today (24 hours)
                  <vue-slider v-model="noform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
                    <!--   <div class="mb-sm">
                        Trouble Level (7 days)
                  <vue-slider v-model="noform.tl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                        Trouble Level (6 Weeks)
                  <vue-slider v-model="noform.tl3"></vue-slider>
                </div><br> -->
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                        Stress Level (6 Weeks)
                  <vue-slider v-model="noform.sl1" min="0" max="10"></vue-slider>
                </div><br>
                   
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                    <b-tab title="Impairment">
                      <p>For each question choose the number that best measures your disability as you have experienced it in the past six weeks
<br>
Zero indicates no problem at all, 10 indicates the worse possible problem</p>
                         <b-form class="form-label-left">
                        <b-form-group
                        label="Is your neck stiff ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl1"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to look up ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl2"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to rotate your head to the left and right ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl3"
                             :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to put your coat on ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl4"
                                :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to comb your hair ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl5"
                            :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Is it difficult to work with your arms raised ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl6"
                               :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Do you experience pain while lying in bed ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl7"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Do you have to lie down due to your neck pain ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl8"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Does your neck affect your sleep ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl9"
                           :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Does your neck affect your work ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl10"
                             :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                                <b-form-group
                        label="Forced to change job duties due to neck pain ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl11"
                             :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                                                                        <b-form-group
                        label="How much does your neck pain limit your daily life ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl12"
                            :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                                                                        <b-form-group
                        label="Does your neck pain affect your mood ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="noform.bl13"
                                :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                        
                    
                    </b-form>
                  
              
                    </b-tab>                     
                </b-tabs>
                     <b-button variant="danger" type="submit" class="mr-xs" v-if="nofNew==true" @click="submitNewNOF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="nofUpdate==true" @click="updateNOF()">Update Form</b-button>
              </b-tab>


               <b-tab title="Knee Baseline" v-if="bform.knee!='none'">
       <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="kform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                   <!--    <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="kform.pl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="kform.pl3" min="0" max="10"></vue-slider>
                </div><br>
                 <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="kform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="kform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                      Trouble Level Today (24 hours)
                  <vue-slider v-model="kform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
                <!--       <div class="mb-sm">
                         Trouble Level (7 days)
                  <vue-slider v-model="kform.tl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                        Trouble Level (6 Weeks)
                  <vue-slider v-model="kform.tl3" min="0" max="10"></vue-slider>
                </div><br>
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                         Stress Level (6 Weeks)
                  <vue-slider v-model="kform.sl1" min="0" max="10"></vue-slider>
                </div><br>
                   
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                    <b-tab title="History">
                  <p>Which knee is the involved knee ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio11"
                        id="radio-small11"
                        v-model="kform.h1"
                        value="Right"
                      />
                      <label for="radio-small11">Right</label>
                    </b-form-group>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio12"
                        id="radio-small12"
                        v-model="kform.h1"
                        value="Left"
                      />
                      <label for="radio-small12">Left</label>
                    </b-form-group>
                            <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio13"
                        id="radio-small13"
                        v-model="kform.h1"
                        value="Both"
                      />
                      <label for="radio-small13">Both</label>
                    </b-form-group>
            <br>

                  <p>How does your unaffected knee feel ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio20"
                        id="radio-small21"
                        v-model="kform.h2"
                        value="Normal"
                      />
                      <label for="radio-small21">Normal</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio21"
                        id="radio-small22"
                        v-model="kform.h2"
                        value="Nearly Normal"
                      />
                      <label for="radio-small22">Nearly Normal</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio23"
                        id="radio-small23"
                        v-model="kform.h2"
                        value="Abnormal"
                      />
                      <label for="radio-small23">Abnormal</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio24"
                        id="radio-small24"
                        v-model="kform.h2"
                        value="Severely Abnormal"
                      />
                      <label for="radio-small24">Severly Abnormal</label>
                    </b-form-group>
            <br>
     <b-form-group 
                    label="What is the chief complaint ?"
                    id="What is the chief complaint ?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="kform.h3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What is the chief complaint ?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

<p>What was the mechanism of injury?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio30"
                        id="radio-small31"
                        v-model="kform.h4"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small31">Non-traumatic Gradual Onset</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio31"
                        id="radio-small32"
                        v-model="kform.h4"
                        value="Non-traumatic Sudden Onset"
                      />
                      <label for="radio-small32">Non-traumatic Sudden Onset</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio33"
                        id="radio-small33"
                        v-model="kform.h4"
                        value="Traumatic Non-contact Onset"
                      />
                      <label for="radio-small33">Traumatic Non-contact Onset</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio34"
                        id="radio-small34"
                        v-model="kform.h4"
                        value="Traumatic Contact Onset"
                      />
                      <label for="radio-small34">Traumatic Contact Onset</label>
                    </b-form-group>
            <br>


                  <b-form-group 
                    label="How many operations have you had previously on your knee ?"
                    id="How many operations have you had previously on your knee ?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="kform.h5"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="How many operations have you had previously on your knee ?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    </b-tab> 

                          <b-tab title="Impairment">
                  <p>What is the highest level of activity that you can perform without significant knee pain ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio40"
                        id="radio-small41"
                        v-model="kform.i1"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small41">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio41"
                        id="radio-small42"
                        v-model="kform.i1"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small42">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio43"
                        id="radio-small43"
                        v-model="kform.i1"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small43">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio44"
                        id="radio-small44"
                        v-model="kform.i1"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small44">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio45"
                        id="radio-small45"
                        v-model="kform.i1"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small45">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>
            <br>

        <b-form-group
                        label="During the past 4 weeks, or since your injury, how often have you had pain ? ( 1 = Never, 10 = Constantly )"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.i2"
                                :options="[1,2,3,4,5,6,7,8,9,10]"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                              <b-form-group
                        label="If you have pain, how serious is it ? ( 1 = No Pain, 10 = Worst Imaginable Pain )"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.i3"
                                :options="[1,2,3,4,5,6,7,8,9,10]"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                                            <b-form-group
                        label="During the past 4 weeks, or since your injury, how stiff or swollen was your knee ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.i5"
                                :options="['Not at all','Mildly','Moderately','Very','Extremely']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
               
                

                    </b-tab> 


                          <b-tab title="Function">
                  
                            <p>How does your knee affect ability to:</p>
                            <br>
  <b-form-group
                        label="Go Up Stairs"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f1"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                                
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Go Down Stairs"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f2"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Kneel on the Front of Your Knee"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f3"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Squat"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f4"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Sit with Your Knee Bent"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f5"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Rise from a Chair"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f6"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Run Straight Ahead"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f7"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Jump and Land on Your Involved Leg"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f8"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                             <b-form-group
                        label="Stop and Start Quickly"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f9"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

    <br>
                             <p>How would you rate the function of your knee on a scale of 0 to 10 with 10 being normal, excellent function and 0 being the inability to perform any of your usual daily activities which may include sports?</p>
<br>
 <b-form-group
                        label="Function prior to your knee injury"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f10"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                         <b-form-group
                        label="Current function of your knee"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="kform.f11"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-tab> 


                          <b-tab title="Activities">
                       <p>What is the highest level of activity that you can perform without significant swelling your knee ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio60"
                        id="radio-small61"
                        v-model="kform.a1"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small61">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio61"
                        id="radio-small62"
                        v-model="kform.a1"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small62">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio63"
                        id="radio-small63"
                        v-model="kform.a1"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small63">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio64"
                        id="radio-small64"
                        v-model="kform.a1"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small64">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio65"
                        id="radio-small65"
                        v-model="kform.a1"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small65">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>

                    <br>
<p>During the past 4 weeks or since your injury, did your knee lock or catch ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio91"
                        id="radio-small91"
                        v-model="kform.a2"
                        value="Yes"
                      />
                      <label for="radio-small91">Yes</label>
                    </b-form-group>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio92"
                        id="radio-small92"
                        v-model="kform.a2"
                        value="No"
                      />
                      <label for="radio-small92">No</label>
                    </b-form-group>
            <br>


                       <p>What is the highest level of activity that you can perform without significant giving way in your knee ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio70"
                        id="radio-small71"
                        v-model="kform.a3"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small71">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio71"
                        id="radio-small72"
                        v-model="kform.a3"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small72">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio73"
                        id="radio-small73"
                        v-model="kform.a3"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small73">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio74"
                        id="radio-small74"
                        v-model="kform.a3"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small74">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio75"
                        id="radio-small75"
                        v-model="kform.a3"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small75">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>

<br>
   <p>What is the highest level of activity that you can participate in on a regular basis?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio80"
                        id="radio-small81"
                        v-model="kform.a4"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small81">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio81"
                        id="radio-small82"
                        v-model="kform.a4"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small82">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio83"
                        id="radio-small83"
                        v-model="kform.a4"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small83">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio84"
                        id="radio-small84"
                        v-model="kform.a4"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small84">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio85"
                        id="radio-small85"
                        v-model="kform.a4"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small85">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>
               
                    </b-tab>  
                                     
                </b-tabs>
     <b-button variant="danger" type="submit" class="mr-xs" v-if="kfNew==true" @click="submitNewKF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="kfUpdate==true" @click="updateKF()">Update Form</b-button>     
               </b-tab>

     <b-tab title="Knee Outcome Form" v-if="bform.knee!='none'">
       <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="koform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                <b-form-group 
                    label="Remarks"
                    id="kneepainremarks"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="koform.plremarks"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="kneepainremarks"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                  <!--     <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="koform.pl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="koform.pl3"></vue-slider>
                </div><br> -->
                       <!--  <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="koform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="koform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> -->
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                      Trouble Level Today (24 hours)
                  <vue-slider v-model="koform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
                <!--       <div class="mb-sm">
                         Trouble Level (7 days)
                  <vue-slider v-model="koform.tl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                       Trouble Level (6 Weeks)
                  <vue-slider v-model="koform.tl3"></vue-slider>
                </div><br>-->
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                        Stress Level (6 Weeks)
                  <vue-slider v-model="koform.sl1" min="0" max="10"></vue-slider>
                </div><br>
           
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                 <!--   <b-tab title="History">
                  <p>Which knee is the involved knee ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio11"
                        id="radio-small111"
                        v-model="koform.h1"
                        value="Right"
                      />
                      <label for="radio-small111">Right</label>
                    </b-form-group>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio12"
                        id="radio-small112"
                        v-model="koform.h1"
                        value="Left"
                      />
                      <label for="radio-small112">Left</label>
                    </b-form-group>
            <br>

                  <p>How does your unaffected knee feel ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio20"
                        id="radio-small211"
                        v-model="koform.h2"
                        value="Normal"
                      />
                      <label for="radio-small211">Normal</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio21"
                        id="radio-small221"
                        v-model="koform.h2"
                        value="Nearly Normal"
                      />
                      <label for="radio-small221">Nearly Normal</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio23"
                        id="radio-small231"
                        v-model="koform.h2"
                        value="Abnormal"
                      />
                      <label for="radio-small231">Abnormal</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio24"
                        id="radio-small241"
                        v-model="koform.h2"
                        value="Severely Abnormal"
                      />
                      <label for="radio-small241">Severly Abnormal</label>
                    </b-form-group>
            <br>
     <b-form-group 
                    label="What is the chief complaint ?"
                    id="What is the chief complaint ?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="koform.h3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What is the chief complaint ?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

<p>What was the mechanism of injury?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio30"
                        id="radio-small311"
                        v-model="koform.h4"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small311">Non-traumatic Gradual Onset</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio31"
                        id="radio-small321"
                        v-model="koform.h4"
                        value="Non-traumatic Sudden Onset"
                      />
                      <label for="radio-small321">Non-traumatic Sudden Onset</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio33"
                        id="radio-small331"
                        v-model="koform.h4"
                        value="Traumatic Non-contact Onset"
                      />
                      <label for="radio-small331">Traumatic Non-contact Onset</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio34"
                        id="radio-small341"
                        v-model="koform.h4"
                        value="Traumatic Contact Onset"
                      />
                      <label for="radio-small341">Traumatic Contact Onset</label>
                    </b-form-group>
            <br>


                  <b-form-group 
                    label="How many operations have you had previously on your knee ?"
                    id="How many operations have you had previously on your knee ?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="koform.h5"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="How many operations have you had previously on your knee ?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    </b-tab> -->

                          <b-tab title="Impairment">
                  <p>What is the highest level of activity that you can perform without significant knee pain ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio40"
                        id="radio-small411"
                        v-model="koform.i1"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small411">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio41"
                        id="radio-small421"
                        v-model="koform.i1"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small421">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio43"
                        id="radio-small431"
                        v-model="koform.i1"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small431">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio44"
                        id="radio-small441"
                        v-model="koform.i1"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small441">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio451"
                        id="radio-small451"
                        v-model="koform.i1"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small451">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>
            <br>

        <b-form-group
                        label="During the past 4 weeks, or since your injury, how often have you had pain ? ( 1 = Never, 10 = Constantly )"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.i2"
                                :options="[1,2,3,4,5,6,7,8,9,10]"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                              <b-form-group
                        label="If you have pain, how serious is it ? ( 1 = No Pain, 10 = Worst Imaginable Pain )"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.i3"
                                :options="[1,2,3,4,5,6,7,8,9,10]"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                                            <b-form-group
                        label="During the past 4 weeks, or since your injury, how stiff or swollen was your knee ?"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.i5"
                                :options="['Not at all','Mildly','Moderately','Very','Extremely']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
               
                

                    </b-tab> 


                          <b-tab title="Function">
                  
                            <p>How does your knee affect ability to:</p>
                            <br>
  <b-form-group
                        label="Go Up Stairs"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f1"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Go Down Stairs"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f2"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Kneel on the Front of Your Knee"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f3"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Squat"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f4"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Sit with Your Knee Bent"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f5"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Rise from a Chair"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f6"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Run Straight Ahead"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f7"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                         <b-form-group
                        label="Jump and Land on Your Involved Leg"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f8"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                             <b-form-group
                        label="Stop and Start Quickly"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f9"
                               :options="['Unable to do','Extremely difficult','Moderately difficult','Minimally difficult','Not difficult at all']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

    <br>
                             <p>How would you rate the function of your knee on a scale of 0 to 10 with 10 being normal, excellent function and 0 being the inability to perform any of your usual daily activities which may include sports?</p>
<br>
 <b-form-group
                        label="Function prior to your knee injury"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f10"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>

                         <b-form-group
                        label="Current function of your knee"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="koform.f11"
                              :options="['0','1','2','3','4','5','6','7','8','9','10']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-tab> 


                          <b-tab title="Activities">
                       <p>What is the highest level of activity that you can perform without significant swelling your knee ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio60"
                        id="radio-small611"
                        v-model="koform.a1"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small611">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio61"
                        id="radio-small621"
                        v-model="koform.a1"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small621">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio63"
                        id="radio-small631"
                        v-model="koform.a1"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small631">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio64"
                        id="radio-small641"
                        v-model="koform.a1"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small641">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio65"
                        id="radio-small651"
                        v-model="koform.a1"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small651">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>

                    <br>
<p>During the past 4 weeks or since your injury, did your knee lock or catch ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio91"
                        id="radio-small911"
                        v-model="koform.a2"
                        value="Yes"
                      />
                      <label for="radio-small911">Yes</label>
                    </b-form-group>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio92"
                        id="radio-small921"
                        v-model="koform.a2"
                        value="No"
                      />
                      <label for="radio-small921">No</label>
                    </b-form-group>
            <br>


                       <p>What is the highest level of activity that you can perform without significant giving way in your knee ?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio70"
                        id="radio-small711"
                        v-model="koform.a3"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small711">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio71"
                        id="radio-small712"
                        v-model="koform.a3"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small712">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio73"
                        id="radio-small731"
                        v-model="koform.a3"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small731">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio74"
                        id="radio-small741"
                        v-model="koform.a3"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small741">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio75"
                        id="radio-small751"
                        v-model="koform.a3"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small751">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>

<br>
   <p>What is the highest level of activity that you can participate in on a regular basis?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio80"
                        id="radio-small811"
                        v-model="koform.a4"
                        value="Non-traumatic Gradual Onset"
                      />
                      <label for="radio-small811">Very strenuous activities like jumping or pivoting as in basketball or soccer</label>
                    </b-form-group>
                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio81"
                        id="radio-small821"
                        v-model="koform.a4"
                        value="Strenuous activities like heavy physical work, skiing or tennis"
                      />
                      <label for="radio-small821">Strenuous activities like heavy physical work, skiing or tennis</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio83"
                        id="radio-small831"
                        v-model="koform.a4"
                        value="Moderate activities like moderate physical work, running or jogging"
                      />
                      <label for="radio-small831">Moderate activities like moderate physical work, running or jogging</label>
                    </b-form-group>
                     <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio84"
                        id="radio-small841"
                        v-model="koform.a4"
                        value="Light activities like walking, housework or yard work"
                      />
                      <label for="radio-small841">Light activities like walking, housework or yard work</label>
                    </b-form-group>
                          <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio85"
                        id="radio-small851"
                        v-model="koform.a4"
                        value="Unable to perform any of the above activities due to knee pain"
                      />
                      <label for="radio-small851">Unable to perform any of the above activities due to knee pain</label>
                    </b-form-group>
               
                    </b-tab>  
                                           
                </b-tabs>
  <b-button variant="danger" type="submit" class="mr-xs" v-if="kofNew==true" @click="submitNewKOF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="kofUpdate==true" @click="updateKOF()">Update Form</b-button>  
               </b-tab>

                <b-tab title="Shoulder Baseline" v-if="bform.shoulder!='none'">
                      <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="sform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                 <!--      <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="sform.pl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="sform.pl3" min="0" max="10"></vue-slider>
                </div><br>
                  <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="sform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="sform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                       Trouble Level Today (24 hours)
                  <vue-slider v-model="sform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
                  <!--     <div class="mb-sm">
                         Trouble Level (7 days)
                  <vue-slider v-model="sform.tl2"></vue-slider>
                </div> <br> -->
                       <div class="mb-sm">
                        Trouble Level (6 Weeks)
                  <vue-slider v-model="sform.tl3" min="0" max="10"></vue-slider>
                </div><br>
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                        Stress Level (6 Weeks)
                  <vue-slider v-model="sform.sl1" min="0" max="10"></vue-slider>
                </div><br>
                  
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                    <b-tab title="Impairment">
                      <p>Which is the painful shoulder?</p>
                      
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio1"
                        id="radio-smallsf1112"
                        v-model="sform.sb1"
                        value="Right"
                      />
                      <label for="radio-smallsf1112">Right</label>
                    </b-form-group>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio2"
                        id="radio-smallsf2113"
                        v-model="sform.sb1"
                        value="Left"
                      />
                      <label for="radio-smallsf2113">Left</label>
                    </b-form-group>
                           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio3"
                        id="radio-smallsf3114"
                        v-model="sform.sb1"
                        value="Both"
                      />
                      <label for="radio-smallsf3114">Both</label>
                    </b-form-group>
            <br> 
            <p>Choose the number that indicates your ability to carry out the following activities with your painful / problem hand</p>
            <p>0 = Unable to do, 1 = Very difficult to do, 2 = Somewhat difficult to do, 3 = Not difficult</p>
  <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Activity</th>
                  <th>Left</th>
                  <th>Right</th>
                </tr>
              </thead>
              <tbody>
               <tr> 
                 <td>Put On a Coat</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl1"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr1"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>

                  <tr> 
                 <td>Sleep On Your Painful or Affected Side</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl2"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr2"
                              :options="['0','1','2','3']"
                            /></td>
                 </tr>

                  <tr> 
                 <td>Wash Back / Do Up Bra</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl3"
                               :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr3"
                              :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Manage Toileting</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl4"
                              :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr4"
                               :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Comb Your Hair</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl5"
                              :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr5"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Reach a High Shelf</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl6"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr6"
                               :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Lift 5kg / 12 lbs Above Shoulder</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl7"
                             :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr7"
                               :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Throw a Ball Overhand</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl8"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr8"
                               :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Carry Out Your Normal Work
</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl9"
                              :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr9"
                               :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Participate in Your Usual Sport</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbl10"
                             :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="sform.sbr10"
                               :options="['0','1','2','3']"
                            /></td>
                 </tr>
              </tbody>
            </table>
                      
                 
                    </b-tab>                     
                </b-tabs>
                    <b-button variant="danger" type="submit" class="mr-xs" v-if="sfNew==true" @click="submitNewSF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="sfUpdate==true" @click="updateSF()">Update Form</b-button>
              </b-tab>



                <b-tab title="Shoulder Outcome Form" v-if="bform.shoulder!='none'">
                      <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <b-tabs nav-class="bg-tranparent">
                    <b-tab title="Pain Level" active>
                     <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="soform.pl1" min="0" max="10"></vue-slider>
                </div> <br>
                <b-form-group 
                    label="Remarks"
                    id="shoulderpainremarks"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="soform.plremarks"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="shoulderpainremarks"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <!--   <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="soform.pl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="soform.pl3"></vue-slider>
                </div><br> -->
          <!--      <b-form-group 
                    label="What makes your pain better?"
                    id="What makes your pain better?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="soform.sl2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain better?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                    <b-form-group 
                    label="What makes your pain worse?"
                    id="What makes your pain worse?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="soform.sl3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="What makes your pain worse?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> -->
                    </b-tab>
                    <b-tab title="Trouble Level">
                 <p>The far left represents "No Trouble", while the far right represents "The worst possible trouble" </p>
                   <br>  <div class="mb-sm">
                       Trouble Level Today (24 hours)
                  <vue-slider v-model="soform.tl1" min="0" max="10"></vue-slider>
                </div> <br>
              <!--         <div class="mb-sm">
                       Trouble Level (7 days)
                  <vue-slider v-model="soform.tl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                        Trouble Level (6 Weeks)
                  <vue-slider v-model="soform.tl3"></vue-slider>
                </div><br> -->
                    </b-tab>
                    <b-tab title="Stress Level">
                   <p>The far left represents "No Stress", while the far right represents "The worst possible stress" </p> <br>
                       <div class="mb-sm">
                         Stress Level (6 Weeks)
                  <vue-slider v-model="soform.sl1" min="0" max="10"></vue-slider>
                </div><br>
                    
                    </b-tab>                      
                </b-tabs>
                    </b-tab>
                    <b-tab title="Impairment">
                      <p>Which is the painful shoulder?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="radio-smallsf11"
                        v-model="soform.sb1"
                        value="Right"
                      />
                      <label for="radio-smallsf11">Right</label>
                    </b-form-group>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="radio-smallsf21"
                        v-model="soform.sb1"
                        value="Left"
                      />
                      <label for="radio-smallsf21">Left</label>
                    </b-form-group>
                           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="radio-smallsf31"
                        v-model="soform.sb1"
                        value="Both"
                      />
                      <label for="radio-smallsf31">Both</label>
                    </b-form-group>
            <br> 
            <p>Choose the number that indicates your ability to carry out the following activities with your painful / problem hand</p>
            <p>0 = Unable to do, 1 = Very difficult to do, 2 = Somewhat difficult to do, 3 = Not difficult</p>
  <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Activity</th>
                  <th>Left</th>
                  <th>Right</th>
                </tr>
              </thead>
              <tbody>
               <tr> 
                 <td>Put On a Coat</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl1"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr1"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>

                  <tr> 
                 <td>Sleep On Your Painful or Affected Side</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl2"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr2"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>

                  <tr> 
                 <td>Wash Back / Do Up Bra</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl3"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr3"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Manage Toileting</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl4"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr4"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Comb Your Hair</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl5"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr5"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Reach a High Shelf</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl6"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr6"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Lift 5kg / 12 lbs Above Shoulder</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl7"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr7"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Throw a Ball Overhand</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl8"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr8"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Carry Out Your Normal Work
</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl9"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr9"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
                  <tr> 
                 <td>Participate in Your Usual Sport</td>
                 <td>         <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbl10"
                                :options="['0','1','2','3']"
                            />
                           </td>
                  <td>  <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="soform.sbr10"
                                :options="['0','1','2','3']"
                            /></td>
                 </tr>
              </tbody>
            </table>
                    
              
                    </b-tab>                     
                </b-tabs>
                       <b-button variant="danger" type="submit" class="mr-xs" v-if="sofNew==true" @click="submitNewSOF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="sofUpdate==true" @click="updateSOF()">Update Form</b-button>
              </b-tab>

             

 <b-tab title="Daily Notes">

    <b-button variant="primary" type="submit" class="mr-xs"  @click="submitNewDailyNote()">Create New Note</b-button><br><br><br>

       <b-form-group
              label="Daily Note"
              label-for="search-select"
              :label-cols="3"
              description="Search & Select Daily Note"
            >
              <b-row>
                <b-col md='9'>
               <v-select :options="noteInfo"   v-model="selectedNote.note" label="create_time"  :value="id" @change="getPNF">
    <template slot="option" slot-scope="option">
      #{{option.id}} - Created: {{ format_date(option.create_time) }} - Last Updated: {{ format_date(option.update_time) }}
    </template>
  </v-select>
  
                </b-col>
              </b-row>
            </b-form-group>

             <b-form-group
             v-if="showNote==true"
              label="Load Previous Daily Note"
              label-for="search-select"
              :label-cols="3"
              description="Search & Select Daily Note Template"
            >
              <b-row>
                <b-col md='9'>
               <v-select :options="noteInfo"   v-model="selectedNote2.note" label="create_time"  :value="id" @change="loadPNFTemplate">
    <template slot="option" slot-scope="option">
      #{{option.id}} - Created: {{ format_date(option.create_time) }} - Last Updated: {{ format_date(option.update_time) }}
    </template>
  </v-select>
  
                </b-col>
              </b-row>
            </b-form-group>
                      <b-tabs nav-class="bg-tranparent" v-if="showNote==true">
                        <b-tab title="General" active>
                          <div class="image-container">
    <div class="body-front"></div>
    <div class="body-back"></div>

    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 577" class="svg-style">
      <path
        class="st0 neck"
        d="M140.8 85.7c-0.9 0-1.7-0.4-2.3-1.1 -1-1.3-0.8-3.2 0.4-4.2l41.5-33.7c0.5-0.4 1.2-0.7 1.9-0.7H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-61.6l-40.7 33C142.1 85.5 141.5 85.7 140.8 85.7z"
      />
      <path
        class="st0"
        d="M184.3 119.4c-0.6 0-1.2-0.2-1.7-0.6 -1.3-1-1.7-2.8-0.7-4.2L206.1 81c0.6-0.8 1.5-1.3 2.4-1.3H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-35l-23.3 32.4C186.2 119 185.2 119.4 184.3 119.4z"
      />
      <path
        class="st0"
        d="M198.3 310.7c-0.1 0-0.2 0-0.4 0 -1.6-0.2-2.8-1.7-2.6-3.3l10.2-84.4c0.2-1.5 1.5-2.6 3-2.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-33.8l-9.9 81.8C201.1 309.6 199.8 310.7 198.3 310.7z"
      />
      <path
        class="st0"
        d="M94.3 423.3c-0.9 0-1.8-0.4-2.4-1.2 -1-1.3-0.8-3.2 0.5-4.2l77.4-60c0.5-0.4 1.2-0.6 1.8-0.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-72.3l-76.6 59.4C95.6 423.1 94.9 423.3 94.3 423.3z"
      />
      <path
        class="st0"
        d="M140.8 422.5c-1.2 0-2.4-0.7-2.8-1.9 -0.6-1.5 0.2-3.3 1.7-3.9l57.5-21.8c0.3-0.1 0.7-0.2 1.1-0.2H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-46.2l-57 21.6C141.5 422.4 141.2 422.5 140.8 422.5z"
      />
      <path
        class="st0"
        d="M140.8 546.7c-0.5 0-0.9-0.1-1.4-0.3 -1.5-0.8-2-2.6-1.3-4.1l57.5-109.4c0.5-1 1.5-1.6 2.7-1.6H245c1.7 0 3 1.3 3 3s-1.3 3-3 3h-44.9l-56.7 107.8C142.9 546.1 141.9 546.7 140.8 546.7z"
      />
      <path
        class="st0"
        d="M394 121.4c-1.7 0-3-1.3-3-3s1.3-3 3-3h92.6l61.3-2c1.6-0.1 3 1.2 3.1 2.9 0.1 1.7-1.2 3-2.9 3.1l-61.4 2L394 121.4z"
      />
      <path
        class="st0"
        d="M566.3 314.7c-0.5 0-1.1-0.1-1.6-0.5l-86.9-53.9H377c-1.7 0-3-1.3-3-3s1.3-3 3-3h101.7c0.6 0 1.1 0.2 1.6 0.5l87.6 54.4c1.4 0.9 1.8 2.7 1 4.1C568.3 314.2 567.3 314.7 566.3 314.7z"
      />
      <path
        class="st0"
        d="M489.5 233.5c-0.6 0-1.2-0.2-1.7-0.5l-64.2-43.5h-55.9c-1.7 0-3-1.3-3-3s1.3-3 3-3h56.8c0.6 0 1.2 0.2 1.7 0.5l65 44c1.4 0.9 1.7 2.8 0.8 4.2C491.4 233 490.5 233.5 489.5 233.5z"
      />
      <path
        class="st0 move-abit"
        d="M485.5 175.5c-0.3 0-0.7-0.1-1-0.2l-60-21.8h-56.8c-1.7 0-3-1.3-3-3s1.3-3 3-3H425c0.3 0 0.7 0.1 1 0.2l60.5 22c1.6 0.6 2.4 2.3 1.8 3.8C487.9 174.7 486.7 175.5 485.5 175.5z"
      />
      <path
        class="st0"
        d="M463.7 323.3c-0.6 0-1.2-0.2-1.7-0.6l-35.7-25.4H355c-1.7 0-3-1.3-3-3s1.3-3 3-3h72.2c0.6 0 1.2 0.2 1.7 0.6l36.5 26c1.3 1 1.7 2.8 0.7 4.2C465.6 322.9 464.6 323.3 463.7 323.3z"
      />
      <path
        class="st0"
        d="M514.3 366c-0.4 0-0.7-0.1-1.1-0.2l-97.5-37.6H355c-1.7 0-3-1.3-3-3s1.3-3 3-3h61.3c0.4 0 0.7 0.1 1.1 0.2l98 37.8c1.5 0.6 2.3 2.3 1.7 3.9C516.6 365.3 515.5 366 514.3 366z"
      />
      <path
        class="st0"
        d="M508.3 555.3c-0.8 0-1.5-0.3-2.1-0.9L422.8 470h-55.1c-1.7 0-3-1.3-3-3s1.3-3 3-3h56.4c0.8 0 1.6 0.3 2.1 0.9l84.2 85.3c1.2 1.2 1.2 3.1 0 4.2C509.8 555 509.1 555.3 508.3 555.3z"
      />
    </svg> -->

    <div class="selection">
      <b-form-group
             class="abc-checkbox abc-checkbox-inverse checkboxes"
        v-for="pain in pains12"
        :key="pain.id"
      >
        <input
          v-if="pain.label"
          :value='pain.label'
          v-model="pnform.g1"
          type="checkbox"
          :id="'myPainArea'+pain.id"
        />
        <label :for="'myPainArea'+pain.id" :class="pain.hide">{{pain.label}}</label>

        <label
          class="point"
          :style="pain.style"
          v-b-tooltip.hover
          :title="pain.label"
          :for="'myPainArea'+pain.id"
        ></label>
        <label
          class="point"
          v-if="pain.style2"
          :style="pain.style2"
          v-b-tooltip.hover
          :title="pain.label"
          :for="'myPainArea'+pain.id"
        ></label>
      </b-form-group>
          <br />
</div>
  </div>
    <b-form-group>
                <label for="fatigueText">Current Updates:</label>
                <textarea-autosize 
                placeholder="Write here"
                :min-height="35"
                class="form-control"
                id="fatigueText"
                v-model="pnform.g2"
                />
                
            </b-form-group>
                        </b-tab>
                     <b-tab title="Pain Level">
                        <b-form-group>
            <label for="emgText55">VAS:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="pnform.pl1" 
            :min-height="35"
            class="form-control"
            id="emgText55"
            />
            
        </b-form-group>
           <!--   <p>The far left represents "No Pain", while the far right represents "The worst possible pain" </p>
                   <br>  <div class="mb-sm">
                       Pain Level Today (24 hours)
                  <vue-slider v-model="pnform.pl1"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                         Pain Level (7 days)
                  <vue-slider v-model="pnform.pl2"></vue-slider>
                </div> <br>
                       <div class="mb-sm">
                         Pain Level (6 Weeks)
                  <vue-slider v-model="pnform.pl3"></vue-slider>
                </div><br>-->
                    </b-tab>
                                         <b-tab title="Findings">
          <b-form-group>
            <label for="emgText4">Posture/Observation:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="pnform.f1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">ROM:</label>
            <textarea-autosize 
            placeholder="Write here"
               v-model="pnform.f2"  
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Muscle Power/ Flexibility:</label>
            <textarea-autosize 
            placeholder="Write here"
             v-model="pnform.f3" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Palpation/ Special test:</label>
            <textarea-autosize 
            placeholder="Write here"
              v-model="pnform.f4" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">General impression / any additional assessment:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="pnform.f5" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                             <b-form-group>
            <label for="emgText4">Physiotherapist Impression :</label>
            <textarea-autosize 
            placeholder="Write here"
          v-model="pnform.f6"  
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
                             </b-form-group>
            
                    </b-tab>
                                         <b-tab title="Treatment">
            <b-form-group>
            <label for="emgText4">Warm Ups:</label>
            <textarea-autosize 
            placeholder="Write here"
              v-model="pnform.t1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Manual Therapy:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="pnform.t2" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                             <b-form-group>
            <label for="emgText4">Pain Management :</label>
            <textarea-autosize 
            placeholder="Write here"
          v-model="pnform.t3"  
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
                             </b-form-group>
                                               <b-form-group>
            <label for="emgText4">Exercises :</label>
            <textarea-autosize 
            placeholder="Write here"
          v-model="pnform.t4"  
            :min-height="35"
            class="form-control"
            id="emgText221"
            />
                             </b-form-group>
            
                    </b-tab>
                                                  <b-tab title="DBC">
                            <b-row>
                            <b-col xl="12">
                                <div class="table-resposive">
                                    <table class="table">
                                    <thead>
                                        <tr>
                                        <th class="hidden-sm-down">Machine</th>
                                        <th>Motions</th>
                                        <th>Weight</th>
                                        <th>Reps</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(table,index) in tables12" :key="table.id">
                                        <td>{{table.machine}}</td>
                                        <td  v-if="table.motions">{{table.motions}}</td>
                                        <td  v-if="table.text">
                                            <textarea-autosize
                                            placeholder="Write here"
                                            :min-height="35"
                                            class="form-control"
                                            :id="'MLU'+table.text"
                                            />
                                        </td>
                                        <td>
                                            <input :id="table.machine+table.motions+table.weight"    v-model="pnform.pw[index]" type="number" class="form-control very-small" :name="table.weight" placeholder="kg" >                                            
                                        </td>
                                        <td>
                                            <input :id="table.machine+table.motions+table.reps" type="number" v-model="pnform.pr[index]"  class="form-control very-small" :name="table.reps" placeholder="rep ">
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <div class="table-resposive">
                                    <table class="table">
                                    <tbody>
                                        <tr>
                                        <td>MLU</td>
                                        <td>
                                            <textarea-autosize
                                            placeholder="Write here"
                                            :min-height="35"
                                            class="form-control"
                                            id="MLUmotions"
                                              v-model="pnform.ml1"  
                                            />
                                        </td>
                                        <td>
                                            <textarea-autosize
                                            placeholder="Write weight here"
                                            :min-height="35"
                                            class="form-control"
                                            id="MLUweight"
                                               v-model="pnform.ml2"
                                            />                                           
                                        </td>
                                        <td>
                                            <textarea-autosize
                                            placeholder="Write reps here"
                                            :min-height="35"
                                            class="form-control"
                                            id="MLUreps"
                                               v-model="pnform.ml3"
                                            />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <!-- <b-form-group>
                                    <label for="emgText">MLU (Multiple) Manual Input</label>
                                    <textarea-autosize 
                                    placeholder="Write here"
                                    :min-height="35"
                                    class="form-control"
                                    id="MLU"
                                    />
                                    
                                </b-form-group> -->
                            </b-col>
                            </b-row>
                        </b-tab>

                                         <b-tab title="HUR">
            
                <table class="table">
            <thead>
              <tr>
                <th class="hidden-sm-down">Machine</th>
                <th>Motions</th>
                <th>Weight</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(table,index) in tables13" :key="table.id">
                <td>{{table.machine.toUpperCase()}}</td>
                <td v-if="table.motions">{{table.motions}}</td>
                <td v-if="table.text">
                  <textarea-autosize
                    placeholder="Write here"
                    :min-height="35"
                    class="form-control"
                    :id="'HUR'+table.text"
                  />
                </td>
                <td>
                  <input
                    :id="table.machine+table.motions+table.weight"
                    type="number"
                    class="form-control very-small"
                    :name="table.weight"
                    placeholder="kg"
                     v-model="pnform.hw[index]"
                  />
                </td>
                <td>
                  <input
                    :id="table.machine+table.motions+table.reps"
                    type="number"
                    class="form-control very-small"
                    :name="table.reps"
                    placeholder="rep "
                    v-model="pnform.hr[index]"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <br><br>

           <table class="table">
            <tbody>
              <tr>
                <td>PULLEY</td>
                <td>
                  <textarea-autosize
                    placeholder="Write here"
                    :min-height="35"
                    class="form-control"
                    id="HURmotions"
                        v-model="pnform.hur1"
                  />
                </td>
                <td>
                  <textarea-autosize
                    placeholder="Write weight here"
                    :min-height="35"
                    class="form-control"
                    id="HURweight"
                         v-model="pnform.hur2"
                  />
                </td>
                <td>
                  <textarea-autosize
                    placeholder="Write reps here"
                    :min-height="35"
                    class="form-control"
                    id="HURreps"
                         v-model="pnform.hur3"
                  />
                </td>
              </tr>
            </tbody>
          </table>
                    </b-tab>

                                        <b-tab title="Remarks">
              <b-form-group>
            <label for="emgText4">Remarks :</label>
            <textarea-autosize 
            placeholder="Write here"
          v-model="pnform.r1"  
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
                             </b-form-group>
                               <b-form-group>
            <label for="emgText4">Payment Amount (RM)</label>
            <input
            type="number"
          v-model="pnform.amount"  
           
            class="form-control"
            id="emgText2"
            />
                             </b-form-group>
             <b-form-group
            
              >
                <label for="myvueDropZone">Upload Attachments (Relevant medical documents:- MRI,Report,etc)</label>
             <label for="myvueDropZone"> *upto 15 items, max 10MB size*</label>
  <ul id="example-2">
  <li v-for="item,index in data.attachments" v-if="data.attachments!=''">
   <p v-if="item!=''"> {{index}})<a :href="item" target="_blank">{{item}}</a>  </p>   
  &nbsp;&nbsp; <b-button variant="warning" size="xs" class="mb-xs mr-xs" @click="removeOtherImage(index)" v-if="item!=''">Remove Attachment</b-button>
  </li>
</ul>
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-file-added="checkOtherImage" v-on:vdropzone-queue-complete="onDropzoneUploadComplete"></vue-dropzone>
       
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
              </b-form-group>
                    </b-tab>
                          <!--  <b-button variant="danger" type="submit" class="mr-xs" v-if="pnfNew==true" @click="submitNewPNF()">Submit New Form</b-button> -->
                      <b-button variant="danger" type="submit" class="mr-xs"  @click="updatePNF()">Update Form</b-button>
                    </b-tabs>
                           
                </b-tab>





                   <b-tab title="BLIS Functional Assesment" v-if="bform.sbl=='true'">

                      <b-tabs nav-class="bg-tranparent">
                        <b-tab title="EMG" active>
                       <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Positions</th>
                  <th>Left</th>
                  <th>Right</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(table,index) in tables3" :key="table.id">
                  <td>{{table.position}}</td>
                  <td>
                      <input :id="'emgll'+table.position+table.left" type="number" class="form-control very-small"  v-model="sblform.emg1l[index]" :name="table.left" placeholder="μV ">
                  </td>
                  <td>
                      <input :id="'emgrr'+table.position+table.right" type="number" class="form-control very-small" v-model="sblform.emg1r[index]"  :name="table.right" placeholder="μV ">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <b-form-group>
            <label for="emgText">Physio Interpretation:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="sblform.emg2" 
            :min-height="35"
            class="form-control"
            id="emgText"
            />
            
        </b-form-group>
                        </b-tab>
                        <b-tab title="Coordination">
                        <b-row >
            <b-col xl="12">
                    <b-form-group
                    label="Test Weight"
                    label-for="testWeight"
                    label-class="text-md-left px-3"
                    label-cols="8"
                    breakpoint="md"
                    >
                        <b-row>
                            <input v-model="sblform.f1" id="testWeight" type="number" class="form-control very-small" name="testWeight" placeholder="0">
                            <input type="text" class="form-control input-transparent very-small" name="plates" placeholder="plates" disabled>
                        </b-row>  
                    </b-form-group> 
            </b-col>
        </b-row>
        <br>
        <b-row>
        <b-col xl="12">
            <b-row >
                <b-col xl="12">
                        <b-form-group
                        label="EMG Reading Left"
                        label-for="emgReadingLeft"
                        label-class="text-md-left px-3"
                        label-cols="8"
                        breakpoint="md"
                        >
                            <b-row>
                                <input v-model="sblform.f2" id="emgReadingLeft" type="number" class="form-control very-small" name="emgReadingLeft" placeholder="0">
                            </b-row>  
                        </b-form-group> 
                </b-col>
            </b-row>
            <b-row >
                <b-col xl="12">
                        <b-form-group
                        label="EMG Reading Right"
                        label-for="emgReadingRight"
                        label-class="text-md-left px-3"
                        label-cols="8"
                        breakpoint="md"
                        >
                            <b-row>
                                <input v-model="sblform.f3" id="emgReadingRight" type="number" class="form-control very-small" name="emgReadingRight" placeholder="0">
                            </b-row>  
                        </b-form-group> 
                </b-col>
            </b-row>
            <br>
      
            
            
            <br>
            <b-form class="form-label-left">
                <b-form-group
                label="Coordination Measurement Outcome"
                label-for="label"
                :label-cols="8"
                >
                    <b-row>
                        <b-col md='9' >
                            <v-select
                                id="coordinationMeasurementOutcome"
                                class="mt-xs"
                                :options="['Normal','Abnormal','Severely Abnormal']"
                                v-model="sblform.f5"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form> 
            <br>
            <b-form-group>
                <label for="fatigueText">Physio Interpretation:</label>
                <textarea-autosize 
                placeholder="Write here"
                :min-height="35"
                class="form-control"
                id="fatigueText"
                v-model="sblform.f6"
                />
                
            </b-form-group>
        </b-col>
        </b-row>
                        </b-tab>
                        <b-tab title="Strength">
                     <div class="table-resposive">
                <table class="table">
                <thead>
                    <tr>
                    <th class="hidden-sm-down">Type</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>Avg</th>
                    <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(table,index) in tables4" :key="table.id">
                    <td>{{table.type}}</td>
                    <td>
                        <input :id="'emg'+table.type+table.one" type="number" class="form-control very-small" :name="table.one" v-model="sblform.s1[index]" placeholder="kg " >
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.two" type="number" class="form-control very-small" :name="table.two" v-model="sblform.s2[index]"   placeholder="kg " >
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.three" type="number" class="form-control very-small" :name="table.three" v-model="sblform.s3[index]"  placeholder="kg " >
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.average" type="number" class="form-control very-small" :name="table.average"   :value="updateStrength(index)"  placeholder="kg " disabled>
                    </td>
                    <td>
                        <v-select
                            id="strengthResult"
                            class="mt-xs"
                            v-model="sblform.s5[index]" 
                            :options="['Poor','Average','Good']"
                        />
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <b-form-group>
                <label for="strengthText">Remarks</label>
                <textarea-autosize 
                placeholder="Write here"
                :min-height="35"
                class="form-control"
                v-model="sblform.s6" 
                id="strengthText"
                />
                
            </b-form-group>
            
                        </b-tab>
                        <b-tab title="Balance">
                    <b-form-group
        :label="scale.label" v-for="(scale,index) in scales" :key="scale.id"
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input type="number" :id="scale.id" class="form-control very-small" name="Left" placeholder="0" v-model="sblform.h1[index]">
                <input type="text" class="form-control input-transparent very-small" name="percent" placeholder="%" disabled>
            </b-row>  
        </b-form-group>

        <br>

        <b-form-group
        label="Weight Distribution"
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input type="text" class="form-control input-transparent very-small" name="Left" placeholder="Left" disabled>
                <input type="text" class="form-control input-transparent very-small" name="Right" placeholder="Right" disabled>
            </b-row>  
        </b-form-group>

        <b-form-group
        label=""
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input v-model="sblform.h2" id="sblform.h2" type="number" class="form-control very-small" name="sblform.h2" placeholder="0">
                <input  id="weightDistributionRight" :value="calculatedweightDistributionRight" type="number" class="form-control very-small input-transparent" name="weightDistributionRight" placeholder="0" disabled>
            </b-row>  
        </b-form-group>
                            <br>
            
                        </b-tab>
                             
                    </b-tabs>
                         <b-button variant="danger" type="submit" class="mr-xs" v-if="sblfNew==true" @click="submitNewSBLF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="sblfUpdate==true" @click="updateSBLF()">Update Form</b-button>
                   </b-tab>
                    <b-tab title="Bookings" >
           <div class="table-responsive">
           <table class="table table-hover" id="datatable">
             <thead>
               <tr>
                  <th>#</th>
                  <th>Reference ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Branch</th>
                  <th>Status</th>
                  
                     
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>
          </b-tab>
         
           <b-tab title="Reports">
             <b-tabs nav-class="bg-tranparent">
               <b-tab title="Reports Dashboard">
                  <table class="table table-lg mb-0 table-striped">
                  <thead>
                    <tr class="text-muted">
                      <th>TYPE</th>
                      <th>EXPORT</th>                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Doctor Baseline Report</td>
                    
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success" @click="downloadBaselineReport"
                        >
                       Download
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning" 
                        >
                        EMAIL DISABLED
                        </b-button>
                      </td>
                    </tr>
                     <tr>
                      <td>Doctor Mid Progress Report</td>
                 
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success"  @click="downloadMidProgressReport"
                        >
                       Download
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning"  
                        >
                        EMAIL DISABLED
                        </b-button>
                      </td>
                    </tr>
                     <tr>
                      <td>Doctor Outcome Report</td>
                    
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success"  @click="downloadOutcomeReport"
                        >
                       Download
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning" 
                        >
                        EMAIL DISABLED
                        </b-button>
                      </td>
                    </tr>
                                <tr>
                      <td>Back Protocol Report</td>
                     
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success" @click="downloadBackProtocolReport"
                        >
                       Download
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning" 
                        >
                        EMAIL DISABLED
                        </b-button>
                      </td>
                    </tr>
                               <tr>
                    <!--  <td>SBL Report</td>
               
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="success" 
                        >
                       Download (UNDER DEVELOPMENT)
                        </b-button> &nbsp;
                         <b-button
                         
                          class="p-1 px-3 btn-xs" variant="warning" 
                        >
                        EMAIL NOT AVAILABLE (UNDER DEVELOPMENT)
                        </b-button>
                      </td> -->
                    </tr> 
                                
                  </tbody>
                </table>
               </b-tab>
   
      <b-tab title="Doctor Baseline Report Form" >

                      <b-tabs nav-class="bg-tranparent">
                    <!--    <b-tab title="Core" active>
                               <b-form class="form-label-left">
                        <b-form-group
                        label="Full Name"
                        label-for="insuranceSelect"
                        :label-cols="4">
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                           disabled
                                    name="name"
                                         v-model="pform.name"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                  <b-form-group
                        label="Salutation"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                           
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="baseform.salutation"
                        :options="['Mr','Mrs','Ms','Dr','Datuk','Datin','Tun','Tan Sri','Datuk Seri','Datuk Sri','Dato']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                              <b-form class="form-label-left">
                        <b-form-group
                        label="Doctor"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             disabled
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.doctor"
                        :options="['Dr Deepak Ajit Singh ','Dr Ozlan Isma','Datuk Dr Mohd Asri B. Abd Ghapar  ','Dr Lim Sze Wei','Dr Dato Badrul Shah','Dr Ramesh Kumar','Prof Dr Zulmi Wan','Dr Mohd Azli bin Abdul Hamid','Dr Yeap Ewe Juan','Dr Palani Ramasamy ','Dr Yong Chee Khuen ','Dr Ng Swee Soon ','Dr Rameezan Begum ','Dr Hj Hamidon Basri ','Datuk Dr Mohammed Saffari ','Dato Dr Kantha Rasalingam','Dr Shahnaz Merican','Dr Rukmanikanthan Shanmugam','Dato Dr Mohd Shahdan','Dr Arshad Puji','Dato Dr Mohamad Saffari','Dr Amir Adham Ahmad','Prof Dr Sharifah Roohi','Dr Jagdeep Singh','Dr Samsuddin Osman','Dr Lim Heng Hing ','Dr Chin Chee How','Dr Charanjeet Singh','Dr Chan Kin Yuen ','Dato Sri Dr Zulkharnain','Dr Mohd Fadzil','Dr Abdul Razak Muhd','Dr. Ibtisam Binti Mokhtar ','Dr Abdul Jamal Mohd Thalha','Dato Dr Syed Abdul Latiff Alsagoff','Dr Ali Noor Ghani ','Dr Mak Choon Soon','Dr Rameezan Begam','Dr Abdul Wahab Ghani','Dr Abdul Malik','Dr Johan Ahmad ','Dr Gan Eng Cheng','Dr Rozman Md Idrus','Dr Samadon Kandar','Dr Naween (Radiology)','Dr Nawaz Husin','Dr Loo Jwin Thong ','Dr Jamal Azmi Mohamad','Dr Leong Kin Khan','Dr. Jagjit Singh','Dr Azmi Abd Latiff','Dr Abd Hadi bin Husin','Dr Sivakumar Arieratnam','Dr Siow Yew Siong','Dr Lee Chong Meng ','Dato Dr Anuar B Hj Masduki','Dr Muthurathinam Kathires','Dr. John De Cruz','Dr Chooi Yue Seng','Dr Suresh George','Dr Saw Lim Beng ','Dr Ong Shong Meng','Dr Suhail Suresh ','Dr. Rajesh Singh','Dr Harjeet Singh','Dr Paul Ngalap Ayu','Dr Izan Ibrahim','Dr Zanariah Othman','Dr Azmi Bt Abdul Latif ','Dr Sallehuddin Abdullah','Dr Mohd Noor Azam','Dr S Pasupathy','Dr Parameswaran','Dr Harwant Singh','Dr Gobinder Singh','Dr Noortheen Mustafa','Dr Peter Paul ','Dr Adrian Yeo ','Dr Vivekanda','Dr Mohd Shahir Bin Anuar ','Dato Dr Abdul Halim Bin Yusof','Dr Mohd Noor Hazrin Hashim','DR. PUTERI MELOR','Dr Shahrizal Abdul Rahman','Dr. Appasamy Velu ','Dr Soong Kean Leong','Dr Fong Tuck Shin ','DR AZLINA AMIR ABAS','Prof Dr Ng Weey Min','Dr Simrat Singh ','Dato Dr Azmi Baharuddin','Dr Mohd Nor','Dr Mohd Ramzan','Dr Erma Sharmila','Dr Premalatha','Dr Mimi Haya','Dr Shawn Low Jun Hao','Dr Hu Yoe Yin','Dr Ariff Arshad','Dr Liew Lee Huat','Dr Suhaili','Dr Chan Han Za','Dr Anita  Haji Alias','Dr N Vasuthevan','Dr Sujatha Veeraghavan','Dr Lai Wai Leong','Dr Aminuddin Mohd Shamsuddin','Dr Suntharalingam','Dr. Mohd Azfan Bin Che Yusoff','Others']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                     <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Doctor (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.doctor=='Others'"
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                           disabled
                                    name="name"
                                         v-model="pform.doctor_others"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
  <b-form class="form-label-left">
                        <b-form-group
                        label="Hospital"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                        id="workCategorySelect"
                               disabled
                        class="mt-xs"
                        v-model="pform.hospital"
                        :options="['Twin Tower Medical Centre','KPJ Hospital Ipoh','Asp Medical Clinic','Hospital Universiti Kebangsaan Malaysia (Hukm)','Prince Court Medical Centre','Gleaneagles Medical Centre','Kpj Sentosa Kl Specialist','Kpj Tawakkal Hospital','Kpj Ampang Puteri Specialist Hospital','Kpj Damansara Specialist Hospital','Kpj Kajang Specialist Hospital','Pantai Hospital Cheras','Pantai Hospital Kuala Lumpur','Pantai Hospital Ampang','Sunway Medical Centre','Subang Jaya Medical Centre','Ara Damansara Medical Centre','Park City Medical Centre','University Malaya Medical Centre','Columbia Asia Hospital Pj','Hospital Pusrawi','Assunta Hospital','Columbia Asia Hospital Bukit Rimau','Hospital An - Nur','Hospital Pakar Al-Islam','Klinik Medi Pesona','Columbia Asia  Hospital Setapak','Pantai Hospital Cheras','International Islamic University Malaysia','Klinik Horeb Services','Others']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                           <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Hospital (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.hospital=='Others'"
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                           disabled
                                         v-model="pform.hospital_others"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                   
                        </b-tab> -->
                  
                       
                      
                   <b-tab title="Information" active>
           <!--      <b-form-group>
            <label for="emgText3">Doctor's Diagnosis:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.p1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
         
                       <b-form-group>
            <label for="emgText3">Current Updates:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.p2" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
               
                               <b-form-group>
            <label for="emgText4">VAS:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Posture/Observation:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf2" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">ROM:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf3" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Muscle Power/ Flexibility:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf4" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Palpation/ Special test:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf5" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">General impression / any additional assessment:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf6" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                             <b-form-group>
            <label for="emgText4">Impairment Questionnaire :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf7" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group> -->
             <b-form-group

                label="Education"
                label-for="markdown-editor21"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor21" language="en" v-model="baseform.kp1"/>
              
            </b-form-group>
                     <b-form-group

                label="Pain relief Management"
                label-for="markdown-editor22"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor22" language="en" v-model="baseform.kp2"/>
               
            </b-form-group>
                 <b-form-group

                label="Manual Therapy"
                label-for="markdown-editor23"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor23" language="en" v-model="baseform.kp3"/>
               
              
            </b-form-group>

                       <b-form-group

                label="Exercises"
                label-for="markdown-editor24"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor24" language="en" v-model="baseform.kp4"/>
               
              
            </b-form-group>
                         
      
      <!--   <b-form-group>
            <label for="emgText4">Dbc Protocol :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="baseform.kp5" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
         <b-form-group>
            <label for="emgText4">Integrated Treatment :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="baseform.kp6" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group> -->
                 <b-form-group

                label="Summary"
                label-for="markdown-editor25"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
              
                <mavon-editor id="markdown-editor25" language="en" v-model="baseform.summary"/>
            </b-form-group>
                            <br>
            
                        </b-tab>
                                
                    </b-tabs>
                      <b-button variant="danger" type="submit" class="mr-xs" v-if="basefNew==true" @click="submitNewBASEF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="basefUpdate==true" @click="updateBASEF()">Update Form</b-button>
                   </b-tab>

       <b-tab title="Doctor Mid Progress Report Form" >

                      <b-tabs nav-class="bg-tranparent">
                     <!--   <b-tab title="Core" active>
                               <b-form class="form-label-left">
                        <b-form-group
                        label="Full Name"
                        label-for="insuranceSelect"
                        :label-cols="4">
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                           disabled
                                    name="name"
                                         v-model="pform.name"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                  <b-form-group
                        label="Salutation"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                            
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="mprform.salutation"
                        :options="['Mr','Mrs','Ms','Dr','Datuk','Datin','Tun','Tan Sri','Datuk Seri','Datuk Sri','Dato']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                              <b-form class="form-label-left">
                        <b-form-group
                        label="Doctor"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             disabled
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.doctor"
                        :options="['Dr Deepak Ajit Singh ','Dr Ozlan Isma','Datuk Dr Mohd Asri B. Abd Ghapar  ','Dr Lim Sze Wei','Dr Dato Badrul Shah','Dr Ramesh Kumar','Prof Dr Zulmi Wan','Dr Mohd Azli bin Abdul Hamid','Dr Yeap Ewe Juan','Dr Palani Ramasamy ','Dr Yong Chee Khuen ','Dr Ng Swee Soon ','Dr Rameezan Begum ','Dr Hj Hamidon Basri ','Datuk Dr Mohammed Saffari ','Dato Dr Kantha Rasalingam','Dr Shahnaz Merican','Dr Rukmanikanthan Shanmugam','Dato Dr Mohd Shahdan','Dr Arshad Puji','Dato Dr Mohamad Saffari','Dr Amir Adham Ahmad','Prof Dr Sharifah Roohi','Dr Jagdeep Singh','Dr Samsuddin Osman','Dr Lim Heng Hing ','Dr Chin Chee How','Dr Charanjeet Singh','Dr Chan Kin Yuen ','Dato Sri Dr Zulkharnain','Dr Mohd Fadzil','Dr Abdul Razak Muhd','Dr. Ibtisam Binti Mokhtar ','Dr Abdul Jamal Mohd Thalha','Dato Dr Syed Abdul Latiff Alsagoff','Dr Ali Noor Ghani ','Dr Mak Choon Soon','Dr Rameezan Begam','Dr Abdul Wahab Ghani','Dr Abdul Malik','Dr Johan Ahmad ','Dr Gan Eng Cheng','Dr Rozman Md Idrus','Dr Samadon Kandar','Dr Naween (Radiology)','Dr Nawaz Husin','Dr Loo Jwin Thong ','Dr Jamal Azmi Mohamad','Dr Leong Kin Khan','Dr. Jagjit Singh','Dr Azmi Abd Latiff','Dr Abd Hadi bin Husin','Dr Sivakumar Arieratnam','Dr Siow Yew Siong','Dr Lee Chong Meng ','Dato Dr Anuar B Hj Masduki','Dr Muthurathinam Kathires','Dr. John De Cruz','Dr Chooi Yue Seng','Dr Suresh George','Dr Saw Lim Beng ','Dr Ong Shong Meng','Dr Suhail Suresh ','Dr. Rajesh Singh','Dr Harjeet Singh','Dr Paul Ngalap Ayu','Dr Izan Ibrahim','Dr Zanariah Othman','Dr Azmi Bt Abdul Latif ','Dr Sallehuddin Abdullah','Dr Mohd Noor Azam','Dr S Pasupathy','Dr Parameswaran','Dr Harwant Singh','Dr Gobinder Singh','Dr Noortheen Mustafa','Dr Peter Paul ','Dr Adrian Yeo ','Dr Vivekanda','Dr Mohd Shahir Bin Anuar ','Dato Dr Abdul Halim Bin Yusof','Dr Mohd Noor Hazrin Hashim','DR. PUTERI MELOR','Dr Shahrizal Abdul Rahman','Dr. Appasamy Velu ','Dr Soong Kean Leong','Dr Fong Tuck Shin ','DR AZLINA AMIR ABAS','Prof Dr Ng Weey Min','Dr Simrat Singh ','Dato Dr Azmi Baharuddin','Dr Mohd Nor','Dr Mohd Ramzan','Dr Erma Sharmila','Dr Premalatha','Dr Mimi Haya','Dr Shawn Low Jun Hao','Dr Hu Yoe Yin','Dr Ariff Arshad','Dr Liew Lee Huat','Dr Suhaili','Dr Chan Han Za','Dr Anita  Haji Alias','Dr N Vasuthevan','Dr Sujatha Veeraghavan','Dr Lai Wai Leong','Dr Aminuddin Mohd Shamsuddin','Dr Suntharalingam','Dr. Mohd Azfan Bin Che Yusoff','Others']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                     <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Doctor (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.doctor=='Others'"
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                           disabled
                                    name="name"
                                         v-model="pform.doctor_others"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
  <b-form class="form-label-left">
                        <b-form-group
                        label="Hospital"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                        id="workCategorySelect"
                               disabled
                        class="mt-xs"
                        v-model="pform.hospital"
                        :options="['Twin Tower Medical Centre','KPJ Hospital Ipoh','Asp Medical Clinic','Hospital Universiti Kebangsaan Malaysia (Hukm)','Prince Court Medical Centre','Gleaneagles Medical Centre','Kpj Sentosa Kl Specialist','Kpj Tawakkal Hospital','Kpj Ampang Puteri Specialist Hospital','Kpj Damansara Specialist Hospital','Kpj Kajang Specialist Hospital','Pantai Hospital Cheras','Pantai Hospital Kuala Lumpur','Pantai Hospital Ampang','Sunway Medical Centre','Subang Jaya Medical Centre','Ara Damansara Medical Centre','Park City Medical Centre','University Malaya Medical Centre','Columbia Asia Hospital Pj','Hospital Pusrawi','Assunta Hospital','Columbia Asia Hospital Bukit Rimau','Hospital An - Nur','Hospital Pakar Al-Islam','Klinik Medi Pesona','Columbia Asia  Hospital Setapak','Pantai Hospital Cheras','International Islamic University Malaysia','Klinik Horeb Services','Others']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                           <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Hospital (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.hospital=='Others'"
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                           disabled
                                         v-model="pform.hospital_others"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                      <b-form class="form-label-left">
                        <b-form-group
                        label="Session"
                        label-for="insuranceSelect"
                        :label-cols="4">
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                      
                                    name="name"
                              v-model="mprform.session"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
 
                        </b-tab> -->
                  
                       
                        <b-tab title="Information">
                                  <!--      <b-form-group>
            <label for="emgText3">Doctor's Diagnosis:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.p1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
         
                       <b-form-group>
            <label for="emgText3">Current Updates:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.p2" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
               
                               <b-form-group>
            <label for="emgText4">VAS:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Posture/Observation:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf2" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">ROM:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf3" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Muscle Power/ Flexibility:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf4" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Palpation/ Special test:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf5" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">General impression / any additional assessment:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf6" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                             <b-form-group>
            <label for="emgText4">Impairment Questionnaire :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf7" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group> -->
             <b-form-group

                label="Education"
                label-for="markdown-editor21"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor21" language="en" v-model="mprform.kp1"/>
              
            </b-form-group>
                     <b-form-group

                label="Pain relief Management"
                label-for="markdown-editor22"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor22" language="en" v-model="mprform.kp2"/>
               
            </b-form-group>
                 <b-form-group

                label="Manual Therapy"
                label-for="markdown-editor23"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor23" language="en" v-model="mprform.kp3"/>
               
              
            </b-form-group>

                       <b-form-group

                label="Exercises"
                label-for="markdown-editor24"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor24" language="en" v-model="mprform.kp4"/>
               
              
            </b-form-group>
                         
      
      <!--   <b-form-group>
            <label for="emgText4">Dbc Protocol :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="mprform.kp5" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
         <b-form-group>
            <label for="emgText4">Integrated Treatment :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="mprform.kp6" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group> -->
                 <b-form-group

                label="Summary"
                label-for="markdown-editor25"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
              
                <mavon-editor id="markdown-editor25" language="en" v-model="mprform.summary"/>
            </b-form-group>
                            <br>
            
                        </b-tab>
                                
                    </b-tabs>
                      <b-button variant="danger" type="submit" class="mr-xs" v-if="mprfNew==true" @click="submitNewMPRF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="mprfUpdate==true" @click="updateMPRF()">Update Form</b-button>
                   </b-tab>
                     <b-tab title="Doctor Outcome Report Form" >

                      <b-tabs nav-class="bg-tranparent">
                       <!-- <b-tab title="Core" active>
                            <!--   <b-form class="form-label-left">
                        <b-form-group
                        label="Full Name"
                        label-for="insuranceSelect"
                        :label-cols="4">
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                           disabled
                                    name="name"
                                         v-model="pform.name"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                                  <b-form-group
                        label="Salutation"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                          
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="outform.salutation"
                        :options="['Mr','Mrs','Ms','Dr','Datuk','Datin','Tun','Tan Sri','Datuk Seri','Datuk Sri','Dato']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                              <b-form class="form-label-left">
                        <b-form-group
                        label="Doctor"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             disabled
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.doctor"
                        :options="['Dr Deepak Ajit Singh ','Dr Ozlan Isma','Datuk Dr Mohd Asri B. Abd Ghapar  ','Dr Lim Sze Wei','Dr Dato Badrul Shah','Dr Ramesh Kumar','Prof Dr Zulmi Wan','Dr Mohd Azli bin Abdul Hamid','Dr Yeap Ewe Juan','Dr Palani Ramasamy ','Dr Yong Chee Khuen ','Dr Ng Swee Soon ','Dr Rameezan Begum ','Dr Hj Hamidon Basri ','Datuk Dr Mohammed Saffari ','Dato Dr Kantha Rasalingam','Dr Shahnaz Merican','Dr Rukmanikanthan Shanmugam','Dato Dr Mohd Shahdan','Dr Arshad Puji','Dato Dr Mohamad Saffari','Dr Amir Adham Ahmad','Prof Dr Sharifah Roohi','Dr Jagdeep Singh','Dr Samsuddin Osman','Dr Lim Heng Hing ','Dr Chin Chee How','Dr Charanjeet Singh','Dr Chan Kin Yuen ','Dato Sri Dr Zulkharnain','Dr Mohd Fadzil','Dr Abdul Razak Muhd','Dr. Ibtisam Binti Mokhtar ','Dr Abdul Jamal Mohd Thalha','Dato Dr Syed Abdul Latiff Alsagoff','Dr Ali Noor Ghani ','Dr Mak Choon Soon','Dr Rameezan Begam','Dr Abdul Wahab Ghani','Dr Abdul Malik','Dr Johan Ahmad ','Dr Gan Eng Cheng','Dr Rozman Md Idrus','Dr Samadon Kandar','Dr Naween (Radiology)','Dr Nawaz Husin','Dr Loo Jwin Thong ','Dr Jamal Azmi Mohamad','Dr Leong Kin Khan','Dr. Jagjit Singh','Dr Azmi Abd Latiff','Dr Abd Hadi bin Husin','Dr Sivakumar Arieratnam','Dr Siow Yew Siong','Dr Lee Chong Meng ','Dato Dr Anuar B Hj Masduki','Dr Muthurathinam Kathires','Dr. John De Cruz','Dr Chooi Yue Seng','Dr Suresh George','Dr Saw Lim Beng ','Dr Ong Shong Meng','Dr Suhail Suresh ','Dr. Rajesh Singh','Dr Harjeet Singh','Dr Paul Ngalap Ayu','Dr Izan Ibrahim','Dr Zanariah Othman','Dr Azmi Bt Abdul Latif ','Dr Sallehuddin Abdullah','Dr Mohd Noor Azam','Dr S Pasupathy','Dr Parameswaran','Dr Harwant Singh','Dr Gobinder Singh','Dr Noortheen Mustafa','Dr Peter Paul ','Dr Adrian Yeo ','Dr Vivekanda','Dr Mohd Shahir Bin Anuar ','Dato Dr Abdul Halim Bin Yusof','Dr Mohd Noor Hazrin Hashim','DR. PUTERI MELOR','Dr Shahrizal Abdul Rahman','Dr. Appasamy Velu ','Dr Soong Kean Leong','Dr Fong Tuck Shin ','DR AZLINA AMIR ABAS','Prof Dr Ng Weey Min','Dr Simrat Singh ','Dato Dr Azmi Baharuddin','Dr Mohd Nor','Dr Mohd Ramzan','Dr Erma Sharmila','Dr Premalatha','Dr Mimi Haya','Dr Shawn Low Jun Hao','Dr Hu Yoe Yin','Dr Ariff Arshad','Dr Liew Lee Huat','Dr Suhaili','Dr Chan Han Za','Dr Anita  Haji Alias','Dr N Vasuthevan','Dr Sujatha Veeraghavan','Dr Lai Wai Leong','Dr Aminuddin Mohd Shamsuddin','Dr Suntharalingam','Dr. Mohd Azfan Bin Che Yusoff','Others']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                     <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Doctor (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.doctor=='Others'"
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                           disabled
                                    name="name"
                                         v-model="pform.doctor_others"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
  <b-form class="form-label-left">
                        <b-form-group
                        label="Hospital"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                        id="workCategorySelect"
                               disabled
                        class="mt-xs"
                        v-model="pform.hospital"
                        :options="['Twin Tower Medical Centre','KPJ Hospital Ipoh','Asp Medical Clinic','Hospital Universiti Kebangsaan Malaysia (Hukm)','Prince Court Medical Centre','Gleaneagles Medical Centre','Kpj Sentosa Kl Specialist','Kpj Tawakkal Hospital','Kpj Ampang Puteri Specialist Hospital','Kpj Damansara Specialist Hospital','Kpj Kajang Specialist Hospital','Pantai Hospital Cheras','Pantai Hospital Kuala Lumpur','Pantai Hospital Ampang','Sunway Medical Centre','Subang Jaya Medical Centre','Ara Damansara Medical Centre','Park City Medical Centre','University Malaya Medical Centre','Columbia Asia Hospital Pj','Hospital Pusrawi','Assunta Hospital','Columbia Asia Hospital Bukit Rimau','Hospital An - Nur','Hospital Pakar Al-Islam','Klinik Medi Pesona','Columbia Asia  Hospital Setapak','Pantai Hospital Cheras','International Islamic University Malaysia','Klinik Horeb Services','Others']"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                           <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Hospital (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.hospital=='Others'"
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                           disabled
                                         v-model="pform.hospital_others"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form> -->
                     <!-- <b-form class="form-label-left">
                        <b-form-group
                        label="Programme"
                        label-for="insuranceSelect"
                        :label-cols="4">
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                      
                                    name="name"
                              v-model="outform.programme"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
 
                        </b-tab> -->
                  
                       
                        <b-tab title="Information" active>
           <!--      <b-form-group>
            <label for="emgText3">Doctor's Diagnosis:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.p1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
         
                       <b-form-group>
            <label for="emgText3">Current Updates:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.p2" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
               
                               <b-form-group>
            <label for="emgText4">VAS:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf1" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Posture/Observation:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf2" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">ROM:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf3" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Muscle Power/ Flexibility:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf4" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">Palpation/ Special test:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf5" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                                       <b-form-group>
            <label for="emgText4">General impression / any additional assessment:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf6" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
                             <b-form-group>
            <label for="emgText4">Impairment Questionnaire :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.pf7" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group> -->
             <b-form-group

                label="Education"
                label-for="markdown-editor"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor" language="en" v-model="outform.kp1"/>
              
            </b-form-group>
                     <b-form-group

                label="Pain relief Management"
                label-for="markdown-editor2"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor2" language="en" v-model="outform.kp2"/>
               
            </b-form-group>
                 <b-form-group

                label="Manual Therapy"
                label-for="markdown-editor3"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor3" language="en" v-model="outform.kp3"/>
               
              
            </b-form-group>

                       <b-form-group

                label="Exercises"
                label-for="markdown-editor4"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
                <mavon-editor id="markdown-editor4" language="en" v-model="outform.kp4"/>
               
              
            </b-form-group>
                         
      
      <!--   <b-form-group>
            <label for="emgText4">Dbc Protocol :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.kp5" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group>
         <b-form-group>
            <label for="emgText4">Integrated Treatment :</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="outform.kp6" 
            :min-height="35"
            class="form-control"
            id="emgText2"
            />
            
        </b-form-group> -->
                 <b-form-group

                label="Summary"
                label-for="markdown-editor5"
                label-class="text-md-right px-3"
                :label-cols="2"
                breakpoint="md"
              >
              
                <mavon-editor id="markdown-editor5" language="en" v-model="outform.summary"/>
            </b-form-group>
      
                            <br>
            
                        </b-tab>
                            
                    </b-tabs>
                          <b-button variant="danger" type="submit" class="mr-xs" v-if="outfNew==true" @click="submitNewOUTF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="outfUpdate==true" @click="updateOUTF()">Update Form</b-button>
                   </b-tab>
      <b-tab title="SBL Report Form (UNDER DEVELOPMENT)" >

                      <b-tabs nav-class="bg-tranparent">
                        <b-tab title="EMG" active>
                       <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Positions</th>
                  <th>Left</th>
                  <th>Right</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(table,index) in tables3" :key="table.id">
                  <td>{{table.position}}</td>
                  <td>
                      <input :id="'emgll'+table.position+table.left" type="number" class="form-control very-small"  v-model="sblform.emg1l[index]" :name="table.left" placeholder="μV ">
                  </td>
                  <td>
                      <input :id="'emgrr'+table.position+table.right" type="number" class="form-control very-small" v-model="sblform.emg1r[index]"  :name="table.right" placeholder="μV ">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <b-form-group>
            <label for="emgText">Physio Interpretation:</label>
            <textarea-autosize 
            placeholder="Write here"
            v-model="sblform.emg2" 
            :min-height="35"
            class="form-control"
            id="emgText"
            />
            
        </b-form-group>
                        </b-tab>
                        <b-tab title="Coordination">
                        <b-row >
            <b-col xl="12">
                    <b-form-group
                    label="Test Weight"
                    label-for="testWeight"
                    label-class="text-md-left px-3"
                    label-cols="8"
                    breakpoint="md"
                    >
                        <b-row>
                            <input v-model="sblform.f1" id="testWeight" type="number" class="form-control very-small" name="testWeight" placeholder="0">
                            <input type="text" class="form-control input-transparent very-small" name="plates" placeholder="plates" disabled>
                        </b-row>  
                    </b-form-group> 
            </b-col>
        </b-row>
        <br>
        <b-row>
        <b-col xl="12">
            <b-row >
                <b-col xl="12">
                        <b-form-group
                        label="EMG Reading Left"
                        label-for="emgReadingLeft"
                        label-class="text-md-left px-3"
                        label-cols="8"
                        breakpoint="md"
                        >
                            <b-row>
                                <input v-model="sblform.f2" id="emgReadingLeft" type="number" class="form-control very-small" name="emgReadingLeft" placeholder="0">
                            </b-row>  
                        </b-form-group> 
                </b-col>
            </b-row>
            <b-row >
                <b-col xl="12">
                        <b-form-group
                        label="EMG Reading Right"
                        label-for="emgReadingRight"
                        label-class="text-md-left px-3"
                        label-cols="8"
                        breakpoint="md"
                        >
                            <b-row>
                                <input v-model="sblform.f3" id="emgReadingRight" type="number" class="form-control very-small" name="emgReadingRight" placeholder="0">
                            </b-row>  
                        </b-form-group> 
                </b-col>
            </b-row>
            <br>
      
            
            
            <br>
            <b-form class="form-label-left">
                <b-form-group
                label="Coordination Measurement Outcome"
                label-for="label"
                :label-cols="8"
                >
                    <b-row>
                        <b-col md='9' >
                            <v-select
                                id="coordinationMeasurementOutcome"
                                class="mt-xs"
                                :options="['Normal','Abnormal','Severely Abnormal']"
                                v-model="sblform.f5"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form> 
            <br>
            <b-form-group>
                <label for="fatigueText">Physio Interpretation:</label>
                <textarea-autosize 
                placeholder="Write here"
                :min-height="35"
                class="form-control"
                id="fatigueText"
                v-model="sblform.f6"
                />
                
            </b-form-group>
        </b-col>
        </b-row>
                        </b-tab>
                        <b-tab title="Strength">
                     <div class="table-resposive">
                <table class="table">
                <thead>
                    <tr>
                    <th class="hidden-sm-down">Type</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>Avg</th>
                    <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(table,index) in tables4" :key="table.id">
                    <td>{{table.type}}</td>
                    <td>
                        <input :id="'emg'+table.type+table.one" type="number" class="form-control very-small" :name="table.one" v-model="sblform.s1[index]" placeholder="kg " >
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.two" type="number" class="form-control very-small" :name="table.two" v-model="sblform.s2[index]"   placeholder="kg " >
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.three" type="number" class="form-control very-small" :name="table.three" v-model="sblform.s3[index]"  placeholder="kg " >
                    </td>
                    <td>
                        <input :id="'emg'+table.type+table.average" type="number" class="form-control very-small" :name="table.average"   :value="updateStrength(index)"  placeholder="kg " disabled>
                    </td>
                    <td>
                        <v-select
                            id="strengthResult"
                            class="mt-xs"
                            v-model="sblform.s5[index]" 
                            :options="['Poor','Average','Good']"
                        />
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <b-form-group>
                <label for="strengthText">Remarks</label>
                <textarea-autosize 
                placeholder="Write here"
                :min-height="35"
                class="form-control"
                v-model="sblform.s6" 
                id="strengthText"
                />
                
            </b-form-group>
                        </b-tab>
                        <b-tab title="HUR">
                    <b-form-group
        :label="scale.label" v-for="(scale,index) in scales" :key="scale.id"
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input type="number" :id="scale.id" class="form-control very-small" name="Left" placeholder="0" v-model="sblform.h1[index]">
                <input type="text" class="form-control input-transparent very-small" name="percent" placeholder="%" disabled>
            </b-row>  
        </b-form-group>

        <br>

        <b-form-group
        label="Weight Distribution"
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input type="text" class="form-control input-transparent very-small" name="Left" placeholder="Left" disabled>
                <input type="text" class="form-control input-transparent very-small" name="Right" placeholder="Right" disabled>
            </b-row>  
        </b-form-group>

        <b-form-group
        label=""
        label-for="weightDistribution"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input v-model="sblform.h2" id="sblform.h2" type="number" class="form-control very-small" name="sblform.h2" placeholder="0">
                <input  id="weightDistributionRight" :value="calculatedweightDistributionRight" type="number" class="form-control very-small input-transparent" name="weightDistributionRight" placeholder="0" disabled>
            </b-row>  
        </b-form-group>
                            <br>
            
                        </b-tab>
                                  <b-button variant="danger" type="submit" class="mr-xs" v-if="sblfNew==true" >Submit New Form (DISABLED)</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="sblfUpdate==true" >Update Form (DISABLED)</b-button>
                    </b-tabs>
                   </b-tab>
               </b-tabs>
             
          </b-tab>                             
        </b-tabs>
      </b-col>
     
    </b-row>
    
  </div>
</template>

<script>
import Vue from 'vue';
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger'; // eslint-disable-line
import Widget from '@/components/Widget/Widget';
import mock from './mock';
import moment from 'moment';
import personalInformation from '../DBC/PersonalForm/PersonalInformation'
import importantInfo from '../DBC/PersonalForm/Important'
import workInfo from '../DBC/PersonalForm/WorkInformation'
import DatePicker from 'vue2-datepicker';
import vSelect from 'vue-select';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
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
  components: { vueDropzone: vue2Dropzone ,Widget, DatePicker,
        vSelect,
        personalInformation,
        importantInfo,
        workInfo },
  data() {
    return {
   workforceId: window.localStorage.getItem("workforceId"),
          pains12: [
            {
              id: "1a",
              label: "Neck",
              style: {
                top: "40px",
                left: "-128px"
              }
            },
            {
              id: "1b",
              label: "Shoulder Left",
              style: {
                top: "39px",
                left: "-84px"
              }
            },
            {
              id: "1c",
              label: "Shoulder Right",
            //   style: {
            //     top: "0px",
            //     left: "282px"
            //   },
              style: {
                top: "0px",
                left: "-204px"
              }
            },
            {
              id: "1d",
              label: "Mid Thoracic",
              style: {
                top: "22px",
                left: "223px"
              }
            },
            {
              id: "1e",
              label: "Lower Back",
              style: {
                top: "48px",
                left: "223px"
              }
            },
            {
              id: "1h",
              label: "Hip Left",
              style: {
                top: "43px",
                left: "-108px"
              }
            },
            {
              id: "1i",
              label: "Hip Right",
              style: {
                top: "9px",
                left: "-180px"
              }
            },
            {
              id: "1f",
              label: "Hand Left",
              style: {
                top: "20px",
                left: "-68px"
              }
            },
            {
              id: "1g",
              label: "Hand Right",
            //   style: {
            //     top: "-10px",
            //     left: "296px"
            //   },
              style: {
                top: "-10px",
                left: "-233px"
              }
            },
            {
              id: "1j",
              label: "Knee Left",
              style: {
                top: "58px",
                left: "-128px"
              }
            },
            {
              id: "1k",
              label: "Knee Right",
              style: {
                top: "23px",
                left: "-169px"
              }
            },
            {
              id: "1l",
              label: "Ankle Left",
              style: {
                top: "105px",
                left: "-128px"
              }
            },
            {
              id: "1m",
              label: "Ankle Right",
            //   style: {
            //     top: "76px",
            //     left: "240px"
            //   },
              style: {
                top: "70px",
                left: "-172px"
              }
            }
          ],
       questions: [
                {
                    label: 'Light Aerobic Activities',
                    placeholder: 'min / week',
                },
                {
                    label: 'Moderate Intensity Aerobic Activity',
                    placeholder: 'min / week',
                },
                {
                    label: 'Vigorous Intensity Aerobic Activity',
                    placeholder: 'min / week',
                },
                {
                    label: 'Muscle-Strengthening Activities',
                    placeholder: 'times / week',
                },
                {
                    label: 'Sitting',
                    placeholder: 'hours / week',
                },
            ],
       pains9: [
                        {
                            id: '1a',
                            label: ' Relieve Pain ',
                        },
                        {
                            id: '1b',
                            label: 'Return to Work ',
                        },
                        {
                            id: '1c',
                            label: 'Resume Recreational Activities ',
                        },
                        {
                            id: '1d',
                            label: 'Restore of daily functioning',
                        },
                        {
                            id: '1e',
                            label: 'Resume sport activities ',
                        },
                        {
                            id: '1f',
                            label: 'Restore personal relationships  ',
                        },
                    ],
         pains8: [
                        {
                            id: '1a',
                            label: 'Analgesics / Anti-Inflammatory Medication ',
                        },
                        {
                            id: '1b',
                            label: 'Pain Threshold / Nerve Damage Medication',
                        },
                        {
                            id: '1c',
                            label: 'Cardiac Medication',
                        },
                        {
                            id: '1d',
                            label: 'Rheumatoid Arthritis ',
                        },
                        {
                            id: '1e',
                            label: 'Blood Pressure Medication ',
                        },
                        {
                            id: '1f',
                            label: 'Other Severe Joint Disorders',
                        },
                        {
                            id: '1g',
                            label: 'Hyperlipidemia Medication ',
                        },
                        {
                            id: '1h',
                            label: 'Diabetes Medication  ',
                        },
                        {
                            id: '1i',
                            label: 'Asthma Medication ',
                        },
                        {
                            id: '1j',
                            label: 'Corticosteroids ',
                        },
                        {
                            id: '1k',
                            label: 'Antiepileptic Medication ',
                        },
                        {
                            id: '1l',
                            label: 'Sleeping Pills ',
                        },
                        {
                            id: '1m',
                            label: 'Antidepressant Medication ',
                        },
                        {
                            id: '1n',
                            label: 'Psychiatric Medication',
                        },
                        {
                            id: '1o',
                            label: 'Hormones  ',
                        },
                        {
                            id: '1p',
                            label: 'Gastro-Intestinal Medication',
                        },
                        {
                            id: '1q',
                            label: 'Nutritional Supplements',
                        },
                        
                    ],
        pains7: [
                        {
                            id: '1a',
                            label: 'Malignant Disease ',
                        },
                        {
                            id: '1b',
                            label: 'Coronary Artery Disease ',
                        },
                        {
                            id: '1c',
                            label: 'Other Heart or Circulatory Disease',
                        },
                        {
                            id: '1d',
                            label: 'Rheumatoid Arthritis ',
                        },
                        {
                            id: '1e',
                            label: 'Spondylarthritis',
                        },
                        {
                            id: '1f',
                            label: 'Other Severe Joint Disorders',
                        },
                        {
                            id: '1g',
                            label: 'HIV',
                        },
                        {
                            id: '1h',
                            label: 'Osteoporosis ',
                        },
                        {
                            id: '1i',
                            label: 'Asthma, Ventilatory Disorder ',
                        },
                        {
                            id: '1j',
                            label: 'High Eye Pressure',
                        },
                        {
                            id: '1k',
                            label: 'High Blood Pressure',
                        },
                        {
                            id: '1l',
                            label: 'High Cholesterol Levels',
                        },
                        {
                            id: '1m',
                            label: 'Diabetes ',
                        },
                        {
                            id: '1n',
                            label: 'Hyperthyroidism or Hypothyroidism',
                        },
                        {
                            id: '1o',
                            label: 'Epilepsy ',
                        },
                        {
                            id: '1p',
                            label: 'Mental Disorder',
                        },
                        {
                            id: '1q',
                            label: 'Mental Disease',
                        },
                        
                    ],
     pains6: [
                        {
                            id: '1a',
                            label: 'Balancing of Activities',
                        },
                        {
                            id: '1b',
                            label: 'Muscle Exercises',
                        },
                        {
                            id: '1c',
                            label: 'Relaxation Exercises',
                        },
                        {
                            id: '1d',
                            label: 'Ice and/or Hot Packs',
                        },
                        {
                            id: '1e',
                            label: 'Electrostimulation ',
                        },
                        {
                            id: '1f',
                            label: 'With Other Modalities/ Methods',
                        },
                        
                    ],
                         tables13: [
        {
          machine: "PUSH UP / PULL DOWN",
          motions: "Push Up",
          weight: "",
          reps: ""
        },
        {
          machine: "PUSH UP / PULL DOWN",
          motions: "Pull Down",
          weight: "",
          reps: ""
        },
        {
          machine: "Abduction / Adduction",
          motions: "Abduction",
          weight: "",
          reps: ""
        },
        {
          machine: "Abduction / Adduction",
          motions: "Adduction",
          weight: "",
          reps: ""
        },
        {
          machine: "Chest Press",
          motions: "Chest Press",
          weight: "",
          reps: ""
        },
        {
          machine: "Twist",
          motions: "Twist Left",
          weight: "",
          reps: ""
        },
        {
          machine: "Twist",
          motions: "Twist Right",
          weight: "",
          reps: ""
        },
        {
          machine: "Optimal Rhomboid",
          motions: "Optimal Rhomboid",
          weight: "",
          reps: ""
        },
        {
          machine: "Abdomen / Back",
          motions: "Abdomen",
          weight: "",
          reps: ""
        },
        {
          machine: "Abdomen / Back",
          motions: "Back",
          weight: "",
          reps: ""
        },
        {
          machine: "Abdomen / Back",
          motions: "Abdomen Left",
          weight: "",
          reps: ""
        },
        {
          machine: "Abdomen / Back",
          motions: "Abdomen Right",
          weight: "",
          reps: ""
        },
        {
          machine: "Leg Press",
          motions: "Leg Press",
          weight: "",
          reps: ""
        },
        {
          machine: "Dip / Shrug",
          motions: "Dip",
          weight: "",
          reps: ""
        },
        {
          machine: "Dip / Shrug",
          motions: "Shrug",
          weight: "",
          reps: ""
        },
        {
          machine: "Leg Extension/Curl",
          motions: "Leg Extension",
          weight: "",
          reps: ""
        },
        {
          machine: "Leg Extension/Curl",
          motions: "Leg Curl",
          weight: "",
          reps: ""
        },
        {
          machine: "Back Extension",
          motions: "Back Extension",
          weight: "",
          reps: ""
        }
      ],
    pains5: [
                        {
                            id: '1a',
                            label: 'Physician',
                        },
                        {
                            id: '1b',
                            label: 'Medical Specialist ',
                        },
                        {
                            id: '1c',
                            label: 'Occupational Health Physician',
                        },
                        {
                            id: '1d',
                            label: 'Physiotherapist, Occupational Physiotherapist',
                        },
                        
                    ],
       pains4: [
                     {
                            id: '2a',
                            label: 'No',
                        },   {
                            id: '1a',
                            label: 'X-Ray',
                        },
                        {
                            id: '1b',
                            label: 'Ultrasonography',
                        },
                        {
                            id: '1c',
                            label: 'Computed Tomography (CT)',
                        },
                        {
                            id: '1d',
                            label: 'Magnetic Resonance Imaging (MRI)',
                        },
                        {
                            id: '1e',
                            label: 'Electroneuromyography (ENMG)',
                        },
                        {
                            id: '1f',
                            label: 'Laboratory Tests',
                        },
                        {
                            id: '1g',
                            label: 'Gamma Ray Study',
                        },
                        
                    ],
        pains3: [
                        {
                            id: '1a',
                            label: 'No other symptoms'
                        },
                        {
                            id: '1b',
                            label: 'Headache'
                        },
                        {
                            id: '1c',
                            label: 'Blurred Vision'
                        },
                        {
                            id: '1d',
                            label: 'Dizziness'
                        },
                        {
                            id: '1e',
                            label: 'Recurrent Stomach Pain'
                        },
                        {
                            id: '1f',
                            label: 'Lost of Weight'
                        },
                        {
                            id: '1g',
                            label: 'Abnormal Symptoms in Thorax Area'
                        },
                        {
                            id: '1h',
                            label: 'Shortness of Breath, Hyperventilation'
                        },
                        {
                            id: '1i',
                            label: 'Incontinency'
                        },
                        {
                            id: '1j',
                            label: 'General Fatigue, Tiredness'
                        },
                        {
                            id: '1k',
                            label: 'Concentration Difficulties'
                        },
                        {
                            id: '1l',
                            label: 'Nervousness, Anxiety'
                        },
                        {
                            id: '1m',
                            label: 'Low Mood'
                        },
                        
                    ],
       pains2: [
                        {
                            id: '1a',
                            label: 'Prevention, Conditioning'
                        },
                        {
                            id: '1b',
                            label: 'Musculoskeletal Problems'
                        },
                        {
                            id: '1c',
                            label: 'Several Musculoskeletal Problems'
                        },
                        {
                            id: '1d',
                            label: 'Neurological Symptoms or Condition'
                        },
                        {
                            id: '1e',
                            label: 'Cardiovascular Symptoms or Condition'
                        },
                        {
                            id: '1f',
                            label: 'Ventilator Symptoms or Condition'
                        },
                        {
                            id: '1g',
                            label: 'Psychosocial Symptoms or Condition'
                        },
                        {
                            id: '1h',
                            label: 'Wellness, Convenience'
                        },
                    ],
       pains: [
                        {
                            id: '1a',
                            label: 'Neck',
                        },
                        {
                            id: '1b',
                            label: 'Shoulder Left'
                        },
                        {
                            id: '1c',
                            label: 'Shoulder Right'
                        },
                        {
                            id: '1d',
                            label: 'Hand Left'
                        },
                        {
                            id: '1e',
                            label: 'Hand Right'
                        },
                        {
                            id: '1f',
                            label: 'Mid Thoracic'
                        },
                        {
                            id: '1g',
                            label: 'Lower Back'
                        },
                        {
                            id: '1h',
                            label: 'Hip Left'
                        },
                        {
                            id: '1i',
                            label: 'Hip Right'
                        },
                        {
                            id: '1j',
                            label: 'Knee Left'
                        },
                        {
                            id: '1k',
                            label: 'Knee Right'
                        },
                        {
                            id: '1l',
                            label: 'Ankle Left'
                        },
                        {
                            id: '1m',
                            label: 'Ankle Right'
                        },
                    ],
        shoulderSelect: 'none',
            kneeSelect: 'none',
            acuteSelect: 'none',
      mock,
          tables4: [
                {
                    type: 'Chest Press (Left)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Chest Press (Right)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Extension (Left)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Extension (Right)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Curls (Left)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
                {
                    type: 'Leg Curls (Right)',
                    one: '',
                    two: '',
                    three: '',
                    average: '',
                    result: '',
                },
            ],
      sblform:{
       emg1l:[0,0,0,0],
       emg1r:[0,0,0,0],
       emg2:'',
       f1:'',
       f2:'',
       f3:'',
       f4:'',
       f5:'',
       f6:'',
       s1:[0,0,0,0,0,0],
       s2:[0,0,0,0,0,0],
       s3:[0,0,0,0,0,0],
       s4:[0,0,0,0,0,0],
       s5:[],
       s6:'',
       h1:[0,0,0,0],
       h2:''
 
       
      },
          tables3: [
                {
                    position: 'Standing',
                    left: '',
                    right: '',
                },
                {
                    position: 'Forward Bending',
                    left: '',
                    right: '',
                },{
                    position: 'Back Extension',
                    left: '',
                    right: '',
                },{
                    position: 'Sitting',
                    left: '',
                    right: '',
                },
            ],
                tables5: [
                {
                    position: 'Standing',
                    left: '',
                    right: '',
                },
                {
                    position: 'Forward Bending',
                    left: '',
                    right: '',
                },{
                    position: 'Back Extension',
                    left: '',
                    right: '',
                },{
                    position: 'Sitting',
                    left: '',
                    right: '',
                },
            ],
            noteInfo:[],
            backInfo:[],
      data:{
        attachments:[],
      },
      bform:{
        sbl:'false',
        neck:'false',
        back:'false',
        shoulder:'none',
        knee:'none',
        acute:'none',
        session:'',
        diag:''
      },
      dropzoneOptions: {
          url: 'https://backend.medicodesolution.com/staging/progressnote/attachments/upload',
          thumbnailWidth: 150,
          maxFilesize: 10.0,
           maxFiles: 15,
          addRemoveLinks: true,
          //autoProcessQueue: false
          
      },
      blform:{
        pl1:'',
        pl2:'',
        pl3:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        bl1:'',
        bl2:'',
        bl3:'',
        bl4:'',
        bl5:'',
        bl6:'',
        bl7:'',
        bl8:'',
        bl9:'',
        bl10:'',
        bl11:''
      },
      bloform:{
        pl1:'',
        pl2:'',
        pl3:'',
        plremarks:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        bl1:'',
        bl2:'',
        bl3:'',
        bl4:'',
        bl5:'',
        bl6:'',
        bl7:'',
        bl8:'',
        bl9:'',
        bl10:'',
        bl11:''
      },
      nform:{
        pl1:'',
        pl2:'',
        pl3:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        bl1:'',
        bl2:'',
        bl3:'',
        bl4:'',
        bl5:'',
        bl6:'',
        bl7:'',
        bl8:'',
        bl9:'',
        bl10:'',
        bl11:'',
        bl12:'',
        bl13:''
      },
        noform:{
        pl1:'',
        pl2:'',
        pl3:'',
        plremarks:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        bl1:'',
        bl2:'',
        bl3:'',
        bl4:'',
        bl5:'',
        bl6:'',
        bl7:'',
        bl8:'',
        bl9:'',
        bl10:'',
        bl11:'',
        bl12:'',
        bl13:''
      },
      preform:{
        s1c1:[],
        s1c2:'',
        s1c3:'',
        s1c4:'',
        s2c1:[],
        s2c2:'',
        s3c1:'',
        s3c2:'',
        s3c3:'',
        s3c4:'',
        t1c1:[],
        t1c2:'',
        t2c1:'',
        t2c2:'',
        t2c3:'',
        t2c3:'',
        t2c4:'',
        t2c5:'',
        t3c1:[],
        t3c2:'',
        d1c1:[],
        d1c2:'',
        d2c1:[],
        d2c2:'',
        p1c1:'',
        p1c2:[0,0,0,0,0],
        p1c3:'',
        p2c1:'',
        p2c2:'',
        p2c3:'',
        p3c1:[],
        p3c2:'',
      
      },
      sform:{
        pl1:'',
        pl2:'',
        pl3:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        sb1:'',
        sbl1:'',
        sbr1:'',
        sbl2:'',
        sbr2:'',
        sbl3:'',
        sbr3:'',
        sbl4:'',
        sbr4:'',
        sbl5:'',
        sbr5:'',
        sbl6:'',
        sbr6:'',
        sbl7:'',
        sbr7:'',
        sbl8:'',
        sbr8:'',
        sbl9:'',
        sbr9:'',
        sbl10:'',
        sbr10:'',
         },
        soform:{
        pl1:'',
        pl2:'',
        pl3:'',
        plremarks:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        sb1:'',
        sbl1:'',
        sbr1:'',
        sbl2:'',
        sbr2:'',
        sbl3:'',
        sbr3:'',
        sbl4:'',
        sbr4:'',
        sbl5:'',
        sbr5:'',
        sbl6:'',
        sbr6:'',
        sbl7:'',
        sbr7:'',
        sbl8:'',
        sbr8:'',
        sbl9:'',
        sbr9:'',
        sbl10:'',
        sbr10:'',
         },
        kform:{
        pl1:'',
        pl2:'',
        pl3:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        h1:'',
        h2:'',
        h3:'',
        h4:'',
        h5:'',
        i1:'',
        i2:'',
        i3:'',
        i4:'',
        f1:'',
        f2:'',
        f3:'',
        f4:'',
        f5:'',
        f6:'',
        f7:'',
        f8:'',
        f9:'',
        f10:'',
        f11:'',
        a1:'',
        a2:'',
        a3:'',
        a4:''
     
      },
         koform:{
        pl1:'',
        pl2:'',
        pl3:'',
        plremarks:'',
        tl1:'',
        tl2:'',
        tl3:'',
        sl1:'',
        sl2:'',
        sl3:'',
        h1:'',
        h2:'',
        h3:'',
        h4:'',
        h5:'',
        i1:'',
        i2:'',
        i3:'',
        i4:'',
        f1:'',
        f2:'',
        f3:'',
        f4:'',
        f5:'',
        f6:'',
        f7:'',
        f8:'',
        f9:'',
        f10:'',
        f11:'',
        a1:'',
        a2:'',
        a3:'',
        a4:''
     
      },
   
            scales:[
                {
                    label: 'Static Balance Score',
                    id: 'staticBalance'
                },
                {
                    label: 'Visual Dependency Score',
                    id: 'visualDependency'
                },
                {
                    label: 'Proprioception Disturbance Score',
                    id: 'proprioceptionDisturbance'
                },
                {
                    label: 'Vestibular Dominant Score',
                    id: 'vestibularDominant'
                },
            ],
      aform:{
        ac1:'',
        ac2:'',
        ac3:'',
        ac4:'',
        ac5:'',
        ac6:'',
        ac7:'',
        pains:[],
        pl1:'',
        pl2:'',
        pl3:'',
        ac21:'',
        ac22:'',
        ac23:'',
        ac24:'',
        ac25:'',
        ac31:'',
        ac32:'',
        ac33:''
  
      },
      selectedNote:{},
      selectedNote2:{},
      selectedBackNote:{},
      selectedBackNote2:{},
      showNote:false,
      showBackNote:false,
      pnform:{
        attachments:[],
        g1:[],
        g2:'',
        pl1:'',
        pl2:'',
        pl3:'',
        f1:'',
        f2:'',
        f3:'',
        f4:'',
        f5:'',
        f6:'',
        t1:'',
        t2:'',
        t3:'',
        t4:'',
        r1:'',
        pw:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        pr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ml1:'',
        ml2:'',
        ml3:'',
        hur1:'',
        hur2:'',
        hur3:'',
        hw:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        hr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        amount:''

      },
      aformo:{
        ac1:'',
        ac2:'',
        ac3:'',
        ac4:'',
        ac5:'',
        ac6:'',
        ac7:'',
        pains:[],
        pl1:'',
        pl2:'',
        pl3:'',
        plremarks:'',
        ac21:'',
        ac22:'',
        ac23:'',
        ac24:'',
        ac25:'',
        ac31:'',
        ac32:'',
        ac33:''
  
      },
      user: {
      email: 'test@test.com',
      roles: [{id: 1, name: 'Client'}]
    },
    roles: [
      {
        id: 1,
        name: 'Client',
      },
      {
        id: 2,
        name: 'Admin',
      },
      {
        id: 3,
        name: 'Guest',
      }
    ],
  
            totalWeight: '0',
                 tables2: [
                {
                    strength: 'Lumbar Flexion ',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Extension',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
            ],
                tables: [
                {
                    strength: 'Double Leg Press',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Single Leg Press (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Single Leg Press (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Flexion',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Extension',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Side Flexion (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Left)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
                {
                    strength: 'Lumbar Rotation (Right)',
                    target: '',
                    ability: '',
                    deficit: '',
                    strengthDeficit: {
                        percent: 29,
                        colorClass: 'success',
                    },
                },
            ],
        mprform:{
          session:'',
          salutation:'',
          p1:'',
          p2:'',
          p3:'',
          pf1:'',
          pf2:'',
          pf3:'',
          pf4:'',
          pf5:'',
          pf6:'',
          kp1:'',
          kp2:'',
          kp3:'',
          kp4:'',
          kp5:'',
          kp6:'',
          summary:''
        },
                   tables12: [
                {
                    machine: 'LTE',
                    motions: 'Extension',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTF',
                    motions: 'Flexion',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTR',
                    motions: 'Left Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTR',
                    motions: 'Right Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTL',
                    motions: 'Left Lateral Flexion',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'LTL',
                    motions: 'Right Lateral Flexion',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'CEE',
                    motions: 'Extension',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'C3R',
                    motions: 'Left Rotation',
                    weight: '',
                    reps: '',
                },{
                    machine: 'C3R',
                    motions: 'Right Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'SBA',
                    motions: 'Retraction',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Left Internal Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Right Internal Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Left External Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'GHR',
                    motions: 'Right External Rotation',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Bilateral',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Single Left',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Single Right',
                    weight: '',
                    reps: '',
                },
                {
                    machine: 'MLP',
                    motions: 'Calf',
                    weight: '',
                    reps: '',
                },
            ],
        baseform:{
          salutation:'',
          p1:'',
          p2:'',
          p3:'',
          pf1:'',
          pf2:'',
          pf3:'',
          pf4:'',
          pf5:'',
          pf6:'',
          pf7:'',
          kp1:'',
          kp2:'',
          kp3:'',
          kp4:'',
          kp5:'',
          kp6:'',
          summary:''
        },
          outform:{
          programme:'',
          salutation:'',
          p1:'',
          p2:'',
          pf1:'',
          pf2:'',
          pf3:'',
          pf4:'',
          pf5:'',
          pf6:'',
          pf7:'',
          kp1:'',
          kp2:'',
          kp3:'',
          kp4:'',
          kp5:'',
          kp6:'',
          summary:''
        },
        backform:{
          salutation:'',
          p1:'',
          p2:'',
          summary:''
        },
        bpform:{
          w1:'',
          w2:'0',
          starget:[0,0,0,0,0,0,0,0,0],
          sability: [0,0,0,0,0,0,0,0,0],
          rtarget:[55,45,60,60,60,60],
          rability: [0,0,0,0,0,0],
        emg1l:[0,0,0,0],
       emg1r:[0,0,0,0],
       emg2:'',
       s2:'',
       r2:'',
        },
      pform:{  name:'',
                  dob:'',
                  tel:'',
                  address:'',
                  postal:'',
                  city:'',
                  email:'',
                  education:'',
                  operation:'',
                  module:'',
                  doctor:'',
                  hospital:'',
                  payment_mode:'',
                  payment_others:'',
                   payment_others2:'',
                  doctor_others:'',
                  hospital_others:'',
                  occupation:'',
                  employer:'',
                  com_tel:'',
                  com_fax:'',
                  com_address:'',
                  com_postal:'',
                  com_city:'',
                  com_category:'',
                  com_contact:'',
                  weight:'',
                  height:'',
                  gender:'',
                  race:'',
                  religion:''},
      memberId: this.$route.params.memberId,
      programmeId: this.$route.params.programmeId,
      isLoading:false,
      locationClasses: 'messenger-fixed messenger-on-top messenger-on-right',
      pfNew:null,
      pfUpdate:null,
      afNew:null,
      afUpdate:null,
      aofNew:null,
      aofUpdate:null,
       bfNew:null,
      bfUpdate:null,
      blfNew:null,
      blfUpdate:null,
           blofNew:null,
      blofUpdate:null,
      nfNew:null,
      nfUpdate:null,
      nofNew:null,
      nofUpdate:null,
      prefNew:null,
      prefUpdate:null,
      kfNew:null,
      kfUpdate:null,
      kofNew:null,
      kofUpdate:null,
      sfNew:null,
      sfUpdate:null,
      sofNew:null,
      sofUpdate:null,
      bpfNew:null,
      bpfUpdate:null,
      sblfNew:null,
      sblfUpdate:null,
      pnfNew:null,
      pnfUpdate:null,
      mprfNew:null,
      mprfUpdate:null,
      basefNew:null,
      basefUpdate:null,
      outfNew:null,
      outfUpdate:null,
      backfNew:null,
      backfUpdate:null,
moduleCount:101,
sessionCount:26,
            doctorSelect: 'Select Doctor',
            workCategorySelect: 'Select Work Category',
            hospitalSelect:'Select Hospital',
            insuranceSelect: 'Select Insurance Type',

            doctorSelect: 'Select Doctor',
            workCategorySelect: 'Select Work Category',
            hospitalSelect:'Select Hospital',
            insuranceSelect: 'Select Insurance Type',
         
            operationSelect:'Select Type',
          

            doctorSelect: 'Select Doctor',
           
            hospitalSelect:'Select Hospital',
            insuranceSelect: 'Select Insurance Type'
    };
  },
  watch:{
         kilometers:function(val) {
                  this.kilometers = val;
                  this.meters = val * 1000;
               },
  },
   computed: {
            calculatedFromAmount() {
                return  parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)
            },
            calculatedweightDistributionRight() {
            return 100 -  parseFloat(this.sblform.h2)
        }
        },
  methods:
   {
       removeOtherImage(i){
      this.data.attachments.splice(i,1);
    },
        checkOtherImage(file){
  
      if((this.data.attachments.length +  this.$refs.myVueDropzone.getQueuedFiles().length) > 14){
         this.$refs.myVueDropzone.removeAllFiles();
         return Messenger().post({ type:'error',message :"Maximum 15 items total. Remove at least one existing attachment before uploading new document!"});
      }
    },
        onDropzoneUploadComplete(file){
    //    console.log(this.images);
    var myfiles = this.$refs.myVueDropzone.getAcceptedFiles();
    var i = 0;
  for(i=0; i < myfiles.length;i++){
 // console.log(myfiles[i].xhr.response);
  this.data.attachments.push(myfiles[i].xhr.response);
   if(i == myfiles.length){
  
  }
  }
    this.upload++;
         console.log(this.upload);
 // console.log(this.images);
    },
         submitNewDailyNote(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/progressNoteForm', {
                  programmeId:self.programmeId,
                
                       
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
         
             Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return self.$router.go(0);
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
     checkEMGStatus(value){
      
      if(value<12){ 
       return 'success';}
     else  if(value>11 && value <17){ return 'warning';}
        else if(value>16){ return 'danger';}

     },
       updateStrength(index){
 return  ((parseFloat(this.sblform.s1[index]) + parseFloat(this.sblform.s2[index]) + parseFloat(this.sblform.s3[index]))/3).toFixed(2);
    }, 
        getStarget(index){
    if(index==0){
      return  parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2); 
    }
    else if(index==1 || index==2){
      return  (parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7; 
    }
        else if(index==3 || index==4 || index==5 || index==6 ){
      return  (parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5; 
    }
           else if(index==7 || index==8){
      return  (parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25; 
    }
        },
    getSDeficit(index){
        if(index==0){
      return   (parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)) -this.bpform.sability[index]; 
    }
    else if(index==1 || index==2){
      return  (parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7 - this.bpform.sability[index]; 
    }
            else if(index==3 || index==4 || index==5 || index==6 ){
      return (parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5 - this.bpform.sability[index]; 
    }
         else if(index==7 || index==8){
      return  (parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25 - this.bpform.sability[index] ; 
    } 
    },
      getSDeficitPercentage(index){
         let percentage = 0;
             if(index==0){
     percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)) -this.bpform.sability[index])/(parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)); 
    }
    else if(index==1 || index==2){
     percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7); 
    }
            else if(index==3 || index==4 || index==5 || index==6 ){
      percentage = parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5); 
    }
         else if(index==7 || index==8){
    percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25); 
    } 
    percentage = percentage*100;
    
    return percentage;
    },
       getSDeficitPercentage2(index){
        let percentage = 0;
             if(index==0){
     percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)) -this.bpform.sability[index])/(parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)); 
    }
    else if(index==1 || index==2){
     percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7); 
    }
            else if(index==3 || index==4 || index==5 || index==6 ){
      percentage = parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5); 
    }
         else if(index==7 || index==8){
    percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25); 
    } 
    percentage = percentage*100;
    
    return Math.abs(percentage);
    },
    getRDeficit(index){
     return  this.bpform.rtarget[index] - this.bpform.rability[index];
    },
    getRDeficitPercentage(index){
      let percentage =  ((this.bpform.rtarget[index] - this.bpform.rability[index])/this.bpform.rtarget[index]);
      percentage = percentage*100;
      return percentage;
    },
        getRDeficitPercentage2(index){
          let percentage =  ((this.bpform.rtarget[index] - this.bpform.rability[index])/this.bpform.rtarget[index]);
      percentage = percentage*100;
      return Math.abs(percentage);

    },
  
       checkRangeStatus(index){
               let percentage =  (( this.bpform.rtarget[index] - this.bpform.rability[index])/this.bpform.rtarget[index]);
      percentage = percentage*100;
      percentage=  Math.abs(percentage);

            if(percentage < 20){
                return 'success'
            }
            else if(percentage >= 20 && percentage < 40){
                return 'warning'
            }
            else{
                return 'danger'
            }
        },
  checkStrengthStatus(index){
      let percentage = 0;
             if(index==0){
     percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)) -this.bpform.sability[index])/(parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2)); 
    }
    else if(index==1 || index==2){
     percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.7); 
    }
            else if(index==3 || index==4 || index==5 || index==6 ){
      percentage = parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.5); 
    }
         else if(index==7 || index==8){
    percentage =  parseFloat((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25 - this.bpform.sability[index])/((parseFloat(this.bpform.w1) + parseFloat(this.bpform.w2))*0.25); 
    } 
    percentage = percentage*100;
    //percentage = Math.abs(percentage);
            if(percentage < 20){
           
                return 'success'
            }
            else if(percentage >= 20 && percentage < 40){
            
                return 'warning'
            }
            else{
               
                return 'danger'
            }
        },
        tableDeficit(target, ability){

            return target - ability;
        },
        getPercentage(target, ability){
            let deficit = target - ability;
            return (deficit/target) * 100;
        },
        tableDeficitRange(targetRange, abilityRange){
     
            return targetRange - abilityRange;
        },
        getPercentage(targetRange, abilityRange){
            let deficitRange = targetRange - abilityRange;
            return (deficitRange/targetRange) * 100;
        },
       changeSelectOption(field, value) {
        Vue.set(this, field, value);
        },
             submitNewBPF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/backprotocolForm', {
                  programmeId:self.programmeId,
                
                       
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
         
             Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return self.$router.go(0);
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },    updateBACKF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/reportBackProtocol/'+ this.programmeId, {
                   doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.backform.salutation,
                  name:self.pform.name,
                  p1:self.backform.p1,
                  p2:self.backform.p2,
                  summary:self.backform.summary
                            
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getBACKF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
    updateProgramme(){
  var self=this;
    if(this.data.selectedStatus=='Inactive'){
      this.data.status=0;
  }
      if(this.data.selectedStatus=='Active'){
      this.data.status=1;
  }
      if(this.data.selectedStatus=='Completed'){
      this.data.status=2;
  }
     if(this.data.selectedStatus=='***TO DELETE***'){
      this.data.status=-1;
  }
    
         self.axios.patch('https://backend.medicodesolution.com/staging/programme/'+ this.programmeId, {
                  title:self.data.title,
                  description:self.data.description,
                  status:self.data.status
                            
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getProgramme();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
              submitNewBACKF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/reportBackProtocol', {
                  id:self.programmeId,
                       doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.backform.salutation,
                  name:self.pform.name,
                  p1:self.backform.p1,
                  p2:self.backform.p2,
                  summary:self.backform.summary

                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBACKF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    }, 
        updateMPRF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/reportMidProgress/'+ this.programmeId, {
     doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.mprform.salutation,
                  name:self.pform.name,
                  session:self.mprform.session,
                  p1:self.mprform.p1,
                  p2:self.mprform.p2,
                  p3:self.mprform.p3,
                  pf1:self.mprform.pf1,
                  pf2:self.mprform.pf2,
                  pf3:self.mprform.pf3,
                  pf4:self.mprform.pf4,
                  pf5:self.mprform.pf5,
                  pf6:self.mprform.pf6,
                  kp1:self.mprform.kp1,
                  kp2:self.mprform.kp2,
                  kp3:self.mprform.kp3,
                  kp4:self.mprform.kp4,
                  kp5:self.mprform.kp5,
                  kp6:self.mprform.kp6,
                  summary:self.mprform.summary
                            
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getMPRF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
              submitNewMPRF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/reportMidProgress', {
                  id:self.programmeId,
                  doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.mprform.salutation,
                  name:self.pform.name,
                  session:self.mprform.session,
                  p1:self.mprform.p1,
                  p2:self.mprform.p2,
                  p3:self.mprform.p3,
                  pf1:self.mprform.pf1,
                  pf2:self.mprform.pf2,
                  pf3:self.mprform.pf3,
                  pf4:self.mprform.pf4,
                  pf5:self.mprform.pf5,
                  pf6:self.mprform.pf6,
                  kp1:self.mprform.kp1,
                  kp2:self.mprform.kp2,
                  kp3:self.mprform.kp3,
                  kp4:self.mprform.kp4,
                  kp5:self.mprform.kp5,
                  kp6:self.mprform.kp6,
                  summary:self.mprform.summary

                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getMPRF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    }, 
         updateBASEF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/reportBaseline/'+ this.programmeId, {
     doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.baseform.salutation,
                  name:self.pform.name,
                  p1:self.baseform.p1,
                  p2:self.baseform.p2,
                  p3:self.baseform.p3,
                  pf1:self.baseform.pf1,
                  pf2:self.baseform.pf2,
                  pf3:self.baseform.pf3,
                  pf4:self.baseform.pf4,
                  pf5:self.baseform.pf5,
                  pf6:self.baseform.pf6,
                  pf7:self.baseform.pf7,
                  kp1:self.baseform.kp1,
                  kp2:self.baseform.kp2,
                  kp3:self.baseform.kp3,
                  kp4:self.baseform.kp4,
                  kp5:self.baseform.kp5,
                  kp6:self.baseform.kp6,
                  summary:self.baseform.summary
                            
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getBASEF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
              submitNewBASEF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/reportBaseline', {
                  id:self.programmeId,
             doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.baseform.salutation,
                  name:self.pform.name,
                  p1:self.baseform.p1,
                  p2:self.baseform.p2,
                  p3:self.baseform.p3,
                  pf1:self.baseform.pf1,
                  pf2:self.baseform.pf2,
                  pf3:self.baseform.pf3,
                  pf4:self.baseform.pf4,
                  pf5:self.baseform.pf5,
                  pf6:self.baseform.pf6,
                  pf7:self.baseform.pf7,
                  kp1:self.baseform.kp1,
                  kp2:self.baseform.kp2,
                  kp3:self.baseform.kp3,
                  kp4:self.baseform.kp4,
                  kp5:self.baseform.kp5,
                  kp6:self.baseform.kp6,
                  summary:self.baseform.summary
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBASEF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    }, 
        updateOUTF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/reportOutcome/'+ this.programmeId, {
     doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.outform.salutation,
                  name:self.pform.name,
                  programme:self.outform.programme,
                  p1:self.outform.p1,
                  p2:self.outform.p2,
                  pf1:self.outform.pf1,
                  pf2:self.outform.pf2,
                  pf3:self.outform.pf3,
                  pf4:self.outform.pf4,
                  pf5:self.outform.pf5,
                  pf6:self.outform.pf6,
                  pf7:self.outform.pf7,
                  kp1:self.outform.kp1,
                  kp2:self.outform.kp2,
                  kp3:self.outform.kp3,
                  kp4:self.outform.kp4,
                  kp5:self.outform.kp5,
                  kp6:self.outform.kp6,
                  summary:self.outform.summary
                            
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getOUTF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
              submitNewOUTF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/reportOutcome', {
                  id:self.programmeId,
             doctor:self.pform.doctor,
                  doctor_others:self.pform.doctor_others,
                  hospital:self.pform.hospital,
                  hospital_others:self.pform.hospital_others,
                  salutation:self.outform.salutation,
                  name:self.pform.name,
                  programme:self.outform.programme,
                  p1:self.outform.p1,
                  p2:self.outform.p2,
                  pf1:self.outform.pf1,
                  pf2:self.outform.pf2,
                  pf3:self.outform.pf3,
                  pf4:self.outform.pf4,
                  pf5:self.outform.pf5,
                  pf6:self.outform.pf6,
                  pf7:self.outform.pf7,
                  kp1:self.outform.kp1,
                  kp2:self.outform.kp2,
                  kp3:self.outform.kp3,
                  kp4:self.outform.kp4,
                  kp5:self.outform.kp5,
                  kp6:self.outform.kp6,
                  summary:self.outform.summary

                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getOUTF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    }, 
        submitNewPREF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/preinformationForm', {
                  id:self.programmeId,
                  s1c1:self.preform.s1c1,
                  s1c2:self.preform.s1c2,
                  s1c3:self.preform.s1c3,
                  s1c4:self.preform.s1c4,
                  s2c1:self.preform.s2c1,
                  s2c2:self.preform.s2c2, 
                  s3c1:self.preform.s3c1,
                  s3c2:self.preform.s3c2,
                  s3c3:self.preform.s3c3,
                  s3c4:self.preform.s3c4, 
                  t1c1:self.preform.t1c1,
                  t1c2:self.preform.t1c2,
                   t2c1:self.preform.t2c1,
                   t2c2:self.preform.t2c2,
                 t2c3:self.preform.t2c3,
                t2c3:self.preform.t2c3,
                t2c4:self.preform.t2c4,
                  t2c5:self.preform.t2c5,
                  t3c1:self.preform.t3c1,
                   t3c2:self.preform.t3c2,
                   d1c1:self.preform.d1c1,
                 d1c2:self.preform.d1c2,
                  d2c1:self.preform.d2c1,
                   d2c2:self.preform.d2c2,
                   p1c1:self.preform.p1c1,
        p1c2:self.preform.p1c2,
        p1c3:self.preform.p1c3,
        p2c1:self.preform.p2c1,
        p2c2:self.preform.p2c2,
        p2c3:self.preform.p2c3,
          p3c1:self.preform.p3c1,
        p3c2:self.preform.p3c2,
                       
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getSBLF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
    submitNewSBLF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/sblForm', {
                  id:self.programmeId,
            emg1l:self.sblform.emg1l,
       emg1r:self.sblform.emg1r,
       emg2:self.sblform.emg2,
       f1:self.sblform.f1,
       f2:self.sblform.f2,
       f3:self.sblform.f3,
       f4:self.sblform.f4,
       f5:self.sblform.f5,
       f6:self.sblform.f6,
       s1:self.sblform.s1,
       s2:self.sblform.s2,
       s3:self.sblform.s3,
       s4:self.sblform.s4,
       s5:self.sblform.s5,
       s6:self.sblform.s6,
       h1:self.sblform.h1,
       h2:self.sblform.h2
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getSBLF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
      updatePNF(){
  var self=this;
     if(self.selectedNote.note.id=='' ||self.selectedNote.note.id==null){return true;}
         self.axios.patch('https://backend.medicodesolution.com/staging/progressNoteForm/'+ self.selectedNote.note.id, {
        attachments:self.data.attachments.join(),
        g1:self.pnform.g1,
        g2:self.pnform.g2,
        pl1:self.pnform.pl1,
        pl2:self.pnform.pl2,
        pl3:self.pnform.pl3,
        f1:self.pnform.f1,
        f2:self.pnform.f2,
        f3:self.pnform.f3,
        f4:self.pnform.f4,
        f5:self.pnform.f5,
        f6:self.pnform.f6,
        t1:self.pnform.t1,
        t2:self.pnform.t2,
        t3:self.pnform.t3,
         t4:self.pnform.t4,
        r1:self.pnform.r1,
        pw:self.pnform.pw,
        pr:self.pnform.pr,
        ml1:self.pnform.ml1,
        ml2:self.pnform.ml2,
        ml3:self.pnform.ml3,
        hur1:self.pnform.hur1,
        hur2:self.pnform.hur2,
        hur3:self.pnform.hur3,
        hw:self.pnform.hw,
        hr:self.pnform.hr,
        amount:self.pnform.amount
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               
               self.getPNF();

                self.selectedNote2.note=null;
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
      submitNewPNF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/progressNoteForm', {
                  id:self.programmeId,
                  g1:self.pnform.g1,
        g2:self.pnform.g2,
        pl1:self.pnform.pl1,
        pl2:self.pnform.pl2,
        pl3:self.pnform.pl3,
        f1:self.pnform.f1,
        f2:self.pnform.f2,
        f3:self.pnform.f3,
        f4:self.pnform.f4,
        f5:self.pnform.f5,
        f6:self.pnform.f6,
        t1:self.pnform.t1,
        t2:self.pnform.t2,
        t3:self.pnform.t3,
        r1:self.pnform.r1,
        pw:self.pnform.pw,
        pr:self.pnform.pr,
        ml1:self.pnform.ml1,
        ml2:self.pnform.ml2,
        ml3:self.pnform.ml3,
        hur1:self.pnform.hur1,
        hur2:self.pnform.hur2,
        hur3:self.pnform.hur3,
        hw:self.pnform.hw,
        hr:self.pnform.hr,
        amount:self.pnform.amount
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getPNF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
            submitNewSOF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/shoulderForm_outcome', {
                  id:self.programmeId,
          pl1:self.soform.pl1,
        pl2:self.soform.pl2,
        pl3:self.soform.pl3,
                 plremarks:self.soform.plremarks,
        tl1:self.soform.tl1,
        tl2:self.soform.tl2,
        tl3:self.soform.tl3,
        sl1:self.soform.sl1,
        sl2:self.soform.sl2,
        sl3:self.soform.sl3,
        sb1:self.soform.sb1,
        sbl1:self.soform.sbl1,
        sbr1:self.soform.sbr1,
        sbl2:self.soform.sbl2,
        sbr2:self.soform.sbr2,
        sbl3:self.soform.sbl3,
        sbr3:self.soform.sbr3,
        sbl4:self.soform.sbl4,
        sbr4:self.soform.sbr4,
        sbl5:self.soform.sbl5,
        sbr5:self.soform.sbr5,
        sbl6:self.soform.sbl6,
        sbr6:self.soform.sbr6,
        sbl7:self.soform.sbl7,
        sbr7:self.soform.sbr7,
        sbl8:self.soform.sbl8,
        sbr8:self.soform.sbr8,
        sbl9:self.soform.sbl9,
        sbr9:self.soform.sbr9,
        sbl10:self.soform.sbl10,
        sbr10:self.soform.sbr10,

                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getSOF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    }, 
            submitNewSF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/shoulderForm', {
                  id:self.programmeId,
          pl1:self.sform.pl1,
        pl2:self.sform.pl2,
        pl3:self.sform.pl3,
        tl1:self.sform.tl1,
        tl2:self.sform.tl2,
        tl3:self.sform.tl3,
        sl1:self.sform.sl1,
        sl2:self.sform.sl2,
        sl3:self.sform.sl3,
        sb1:self.sform.sb1,
        sbl1:self.sform.sbl1,
        sbr1:self.sform.sbr1,
        sbl2:self.sform.sbl2,
        sbr2:self.sform.sbr2,
        sbl3:self.sform.sbl3,
        sbr3:self.sform.sbr3,
        sbl4:self.sform.sbl4,
        sbr4:self.sform.sbr4,
        sbl5:self.sform.sbl5,
        sbr5:self.sform.sbr5,
        sbl6:self.sform.sbl6,
        sbr6:self.sform.sbr6,
        sbl7:self.sform.sbl7,
        sbr7:self.sform.sbr7,
        sbl8:self.sform.sbl8,
        sbr8:self.sform.sbr8,
        sbl9:self.sform.sbl9,
        sbr9:self.sform.sbr9,
        sbl10:self.sform.sbl10,
        sbr10:self.sform.sbr10,

                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getSF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    }, 
       submitNewKOF(){
         var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/kneeForm_outcome', {
                  id:self.programmeId,
             pl1:self.koform.pl1,
        pl2:self.koform.pl2,
        pl3:self.koform.pl3,
         plremarks:self.koform.plremarks,
        tl1:self.koform.tl1,
        tl2:self.koform.tl2,
        tl3:self.koform.tl3,
        sl1:self.koform.sl1,
        sl2:self.koform.sl2,
        sl3:self.koform.sl3,
        h1:self.koform.h1,
        h2:self.koform.h2,
        h3:self.koform.h3,
        h4:self.koform.h4,
        h5:self.koform.h5,
        i1:self.koform.i1,
        i2:self.koform.i2,
        i3:self.koform.i3,
        i4:self.koform.i4,
        f1:self.koform.f1,
        f2:self.koform.f2,
        f3:self.koform.f3,
        f4:self.koform.f4,
        f5:self.koform.f5,
        f6:self.koform.f6,
        f7:self.koform.f7,
        f8:self.koform.f8,
        f9:self.koform.f9,
        f10:self.koform.f10,
        f11:self.koform.f11,
        a1:self.koform.a1,
        a2:self.koform.a2,
        a3:self.koform.a3,
        a4:self.koform.a4
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getKOF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },  
           submitNewKF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/kneeForm', {
                  id:self.programmeId,
             pl1:self.kform.pl1,
        pl2:self.kform.pl2,
        pl3:self.kform.pl3,
        tl1:self.kform.tl1,
        tl2:self.kform.tl2,
        tl3:self.kform.tl3,
        sl1:self.kform.sl1,
        sl2:self.kform.sl2,
        sl3:self.kform.sl3,
        h1:self.kform.h1,
        h2:self.kform.h2,
        h3:self.kform.h3,
        h4:self.kform.h4,
        h5:self.kform.h5,
        i1:self.kform.i1,
        i2:self.kform.i2,
        i3:self.kform.i3,
        i4:self.kform.i4,
        f1:self.kform.f1,
        f2:self.kform.f2,
        f3:self.kform.f3,
        f4:self.kform.f4,
        f5:self.kform.f5,
        f6:self.kform.f6,
        f7:self.kform.f7,
        f8:self.kform.f8,
        f9:self.kform.f9,
        f10:self.kform.f10,
        f11:self.kform.f11,
        a1:self.kform.a1,
        a2:self.kform.a2,
        a3:self.kform.a3,
        a4:self.kform.a4
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getKF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
      submitNewBLOF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/backForm_outcome', {
                  id:self.programmeId,
                     pl1:self.bloform.pl1,
        pl2:self.bloform.pl2,
        pl3:self.bloform.pl3,
           plremarks:self.bloform.plremarks,
        tl1:self.bloform.tl1,
        tl2:self.bloform.tl2,
        tl3:self.bloform.tl3,
        sl1:self.bloform.sl1,
        sl2:self.bloform.sl2,
        sl3:self.bloform.sl3,
        bl1:self.bloform.bl1,
        bl2:self.bloform.bl2,
        bl3:self.bloform.bl3,
        bl4:self.bloform.bl4,
        bl5:self.bloform.bl5,
        bl6:self.bloform.bl6,
        bl7:self.bloform.bl7,
        bl8:self.bloform.bl8,
        bl9:self.bloform.bl9,
        bl10:self.bloform.bl10,
        bl11:self.bloform.bl11
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBLOF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
   submitNewBLF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/backForm', {
                  id:self.programmeId,
                     pl1:self.blform.pl1,
        pl2:self.blform.pl2,
        pl3:self.blform.pl3,
        tl1:self.blform.tl1,
        tl2:self.blform.tl2,
        tl3:self.blform.tl3,
        sl1:self.blform.sl1,
        sl2:self.blform.sl2,
        sl3:self.blform.sl3,
        bl1:self.blform.bl1,
        bl2:self.blform.bl2,
        bl3:self.blform.bl3,
        bl4:self.blform.bl4,
        bl5:self.blform.bl5,
        bl6:self.blform.bl6,
        bl7:self.blform.bl7,
        bl8:self.blform.bl8,
        bl9:self.blform.bl9,
        bl10:self.blform.bl10,
        bl11:self.blform.bl11
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBLF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
          submitNewNOF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/neckForm_outcome', {
                  id:self.programmeId,
                     pl1:self.noform.pl1,
        pl2:self.noform.pl2,
        pl3:self.noform.pl3,
         plremarks:self.noform.plremarks,
        tl1:self.noform.tl1,
        tl2:self.noform.tl2,
        tl3:self.noform.tl3,
        sl1:self.noform.sl1,
        sl2:self.noform.sl2,
        sl3:self.noform.sl3,
        bl1:self.noform.bl1,
        bl2:self.noform.bl2,
        bl3:self.noform.bl3,
        bl4:self.noform.bl4,
        bl5:self.noform.bl5,
        bl6:self.noform.bl6,
        bl7:self.noform.bl7,
        bl8:self.noform.bl8,
        bl9:self.noform.bl9,
        bl10:self.noform.bl10,
        bl11:self.noform.bl11,
        bl12:self.noform.bl12,
        bl13:self.noform.bl13,
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getNOF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
      submitNewNF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/neckForm', {
                  id:self.programmeId,
                     pl1:self.nform.pl1,
        pl2:self.nform.pl2,
        pl3:self.nform.pl3,
        tl1:self.nform.tl1,
        tl2:self.nform.tl2,
        tl3:self.nform.tl3,
        sl1:self.nform.sl1,
        sl2:self.nform.sl2,
        sl3:self.nform.sl3,
        bl1:self.nform.bl1,
        bl2:self.nform.bl2,
        bl3:self.nform.bl3,
        bl4:self.nform.bl4,
        bl5:self.nform.bl5,
        bl6:self.nform.bl6,
        bl7:self.nform.bl7,
        bl8:self.nform.bl8,
        bl9:self.nform.bl9,
        bl10:self.nform.bl10,
        bl11:self.nform.bl11,
        bl12:self.nform.bl12,
        bl13:self.nform.bl13,
                                      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getNF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
         updatePREF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/preinformationForm/'+ this.programmeId, {
    s1c1:self.preform.s1c1,
                  s1c2:self.preform.s1c2,
                  s1c3:self.preform.s1c3,
                  s1c4:self.preform.s1c4,
                  s2c1:self.preform.s2c1,
                  s2c2:self.preform.s2c2, 
                  s3c1:self.preform.s3c1,
                  s3c2:self.preform.s3c2,
                  s3c3:self.preform.s3c3,
                  s3c4:self.preform.s3c4, 
                    t1c1:self.preform.t1c1,
                  t1c2:self.preform.t1c2,
                   t2c1:self.preform.t2c1,
                   t2c2:self.preform.t2c2,
                 t2c3:self.preform.t2c3,
                t2c3:self.preform.t2c3,
                t2c4:self.preform.t2c4,
                  t2c5:self.preform.t2c5,
                  t3c1:self.preform.t3c1,
                   t3c2:self.preform.t3c2,
                      d1c1:self.preform.d1c1,
                 d1c2:self.preform.d1c2,
                  d2c1:self.preform.d2c1,
                   d2c2:self.preform.d2c2 ,
                 p1c1:self.preform.p1c1,
        p1c2:self.preform.p1c2,
        p1c3:self.preform.p1c3,
        p2c1:self.preform.p2c1,
        p2c2:self.preform.p2c2,
        p2c3:self.preform.p2c3,
          p3c1:self.preform.p3c1,
        p3c2:self.preform.p3c2,
                            
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getPREF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
            updateSBLF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/sblForm/'+ this.programmeId, {
         emg1l:self.sblform.emg1l,
       emg1r:self.sblform.emg1r,
       emg2:self.sblform.emg2,
       f1:self.sblform.f1,
       f2:self.sblform.f2,
       f3:self.sblform.f3,
       f4:self.sblform.f4,
       f5:self.sblform.f5,
       f6:self.sblform.f6,
       s1:self.sblform.s1,
       s2:self.sblform.s2,
       s3:self.sblform.s3,
       s4:self.sblform.s4,
       s5:self.sblform.s5,
       s6:self.sblform.s6,
       h1:self.sblform.h1,
       h2:self.sblform.h2
      
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getSBLF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
          updateBPF(){
   var self=this;
     if(self.selectedBackNote.note.id=='' ||self.selectedBackNote.note.id==null){return true;}
   
         self.axios.patch('https://backend.medicodesolution.com/staging/backprotocolForm/'+ self.selectedBackNote.note.id, {
         w1:self.bpform.w1,
          w2:self.bpform.w2,
          starget: self.bpform.starget,
          sability:self.bpform.sability,
          rtarget: self.bpform.rtarget,
          rability: self.bpform.rability,
     emg1l:self.bpform.emg1l,
       emg1r:self.bpform.emg1r,
       emg2:self.bpform.emg2,
        s2:self.bpform.s2,
         r2:self.bpform.r2,

                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getBPF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
           updateSOF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/shoulderForm_outcome/'+ this.programmeId, {
        pl1:self.soform.pl1,
        pl2:self.soform.pl2,
        pl3:self.soform.pl3,
         plremarks:self.soform.plremarks,
        tl1:self.soform.tl1,
        tl2:self.soform.tl2,
        tl3:self.soform.tl3,
        sl1:self.soform.sl1,
        sl2:self.soform.sl2,
        sl3:self.soform.sl3,
        sb1:self.soform.sb1,
        sbl1:self.soform.sbl1,
        sbr1:self.soform.sbr1,
        sbl2:self.soform.sbl2,
        sbr2:self.soform.sbr2,
        sbl3:self.soform.sbl3,
        sbr3:self.soform.sbr3,
        sbl4:self.soform.sbl4,
        sbr4:self.soform.sbr4,
        sbl5:self.soform.sbl5,
        sbr5:self.soform.sbr5,
        sbl6:self.soform.sbl6,
        sbr6:self.soform.sbr6,
        sbl7:self.soform.sbl7,
        sbr7:self.soform.sbr7,
        sbl8:self.soform.sbl8,
        sbr8:self.soform.sbr8,
        sbl9:self.soform.sbl9,
        sbr9:self.soform.sbr9,
        sbl10:self.soform.sbl10,
        sbr10:self.soform.sbr10,
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getSOF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
        updateSF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/shoulderForm/'+ this.programmeId, {
        pl1:self.sform.pl1,
        pl2:self.sform.pl2,
        pl3:self.sform.pl3,
        tl1:self.sform.tl1,
        tl2:self.sform.tl2,
        tl3:self.sform.tl3,
        sl1:self.sform.sl1,
        sl2:self.sform.sl2,
        sl3:self.sform.sl3,
        sb1:self.sform.sb1,
        sbl1:self.sform.sbl1,
        sbr1:self.sform.sbr1,
        sbl2:self.sform.sbl2,
        sbr2:self.sform.sbr2,
        sbl3:self.sform.sbl3,
        sbr3:self.sform.sbr3,
        sbl4:self.sform.sbl4,
        sbr4:self.sform.sbr4,
        sbl5:self.sform.sbl5,
        sbr5:self.sform.sbr5,
        sbl6:self.sform.sbl6,
        sbr6:self.sform.sbr6,
        sbl7:self.sform.sbl7,
        sbr7:self.sform.sbr7,
        sbl8:self.sform.sbl8,
        sbr8:self.sform.sbr8,
        sbl9:self.sform.sbl9,
        sbr9:self.sform.sbr9,
        sbl10:self.sform.sbl10,
        sbr10:self.sform.sbr10,
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getSF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
         updateBLOF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/backForm_outcome/'+ this.programmeId, {
        pl1:self.bloform.pl1,
        pl2:self.bloform.pl2,
        pl3:self.bloform.pl3,
         plremarks:self.bloform.plremarks,
        tl1:self.bloform.tl1,
        tl2:self.bloform.tl2,
        tl3:self.bloform.tl3,
        sl1:self.bloform.sl1,
        sl2:self.bloform.sl2,
        sl3:self.bloform.sl3,
        bl1:self.bloform.bl1,
        bl2:self.bloform.bl2,
        bl3:self.bloform.bl3,
        bl4:self.bloform.bl4,
        bl5:self.bloform.bl5,
        bl6:self.bloform.bl6,
        bl7:self.bloform.bl7,
        bl8:self.bloform.bl8,
        bl9:self.bloform.bl9,
        bl10:self.bloform.bl10,
        bl11:self.bloform.bl11
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getBLOF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
     updateBLF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/backForm/'+ this.programmeId, {
        pl1:self.blform.pl1,
        pl2:self.blform.pl2,
        pl3:self.blform.pl3,
        tl1:self.blform.tl1,
        tl2:self.blform.tl2,
        tl3:self.blform.tl3,
        sl1:self.blform.sl1,
        sl2:self.blform.sl2,
        sl3:self.blform.sl3,
        bl1:self.blform.bl1,
        bl2:self.blform.bl2,
        bl3:self.blform.bl3,
        bl4:self.blform.bl4,
        bl5:self.blform.bl5,
        bl6:self.blform.bl6,
        bl7:self.blform.bl7,
        bl8:self.blform.bl8,
        bl9:self.blform.bl9,
        bl10:self.blform.bl10,
        bl11:self.blform.bl11
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getBLF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
             updateKOF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/kneeForm_outcome/'+ this.programmeId, {
         pl1:self.koform.pl1,
        pl2:self.koform.pl2,
        pl3:self.koform.pl3,
         plremarks:self.koform.plremarks,
        tl1:self.koform.tl1,
        tl2:self.koform.tl2,
        tl3:self.koform.tl3,
        sl1:self.koform.sl1,
        sl2:self.koform.sl2,
        sl3:self.koform.sl3,
        h1:self.koform.h1,
        h2:self.koform.h2,
        h3:self.koform.h3,
        h4:self.koform.h4,
        h5:self.koform.h5,
        i1:self.koform.i1,
        i2:self.koform.i2,
        i3:self.koform.i3,
        i4:self.koform.i4,
        f1:self.koform.f1,
        f2:self.koform.f2,
        f3:self.koform.f3,
        f4:self.koform.f4,
        f5:self.koform.f5,
        f6:self.koform.f6,
        f7:self.koform.f7,
        f8:self.koform.f8,
        f9:self.koform.f9,
        f10:self.koform.f10,
        f11:self.koform.f11,
        a1:self.koform.a1,
        a2:self.koform.a2,
        a3:self.koform.a3,
        a4:self.koform.a4
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getKOF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
         updateKF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/kneeForm/'+ this.programmeId, {
         pl1:self.kform.pl1,
        pl2:self.kform.pl2,
        pl3:self.kform.pl3,
        tl1:self.kform.tl1,
        tl2:self.kform.tl2,
        tl3:self.kform.tl3,
        sl1:self.kform.sl1,
        sl2:self.kform.sl2,
        sl3:self.kform.sl3,
        h1:self.kform.h1,
        h2:self.kform.h2,
        h3:self.kform.h3,
        h4:self.kform.h4,
        h5:self.kform.h5,
        i1:self.kform.i1,
        i2:self.kform.i2,
        i3:self.kform.i3,
        i4:self.kform.i4,
        f1:self.kform.f1,
        f2:self.kform.f2,
        f3:self.kform.f3,
        f4:self.kform.f4,
        f5:self.kform.f5,
        f6:self.kform.f6,
        f7:self.kform.f7,
        f8:self.kform.f8,
        f9:self.kform.f9,
        f10:self.kform.f10,
        f11:self.kform.f11,
        a1:self.kform.a1,
        a2:self.kform.a2,
        a3:self.kform.a3,
        a4:self.kform.a4
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getKF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
    updateNF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/neckForm/'+ this.programmeId, {
        pl1:self.nform.pl1,
        pl2:self.nform.pl2,
        pl3:self.nform.pl3,
        tl1:self.nform.tl1,
        tl2:self.nform.tl2,
        tl3:self.nform.tl3,
        sl1:self.nform.sl1,
        sl2:self.nform.sl2,
        sl3:self.nform.sl3,
        bl1:self.nform.bl1,
        bl2:self.nform.bl2,
        bl3:self.nform.bl3,
        bl4:self.nform.bl4,
        bl5:self.nform.bl5,
        bl6:self.nform.bl6,
        bl7:self.nform.bl7,
        bl8:self.nform.bl8,
        bl9:self.nform.bl9,
        bl10:self.nform.bl10,
        bl11:self.nform.bl11,
        bl12:self.nform.bl12,
        bl13:self.nform.bl13
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getNF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
       updateNOF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/neckForm_outcome/'+ this.programmeId, {
        pl1:self.noform.pl1,
        pl2:self.noform.pl2,
        pl3:self.noform.pl3,
         plremarks:self.noform.plremarks,
        tl1:self.noform.tl1,
        tl2:self.noform.tl2,
        tl3:self.noform.tl3,
        sl1:self.noform.sl1,
        sl2:self.noform.sl2,
        sl3:self.noform.sl3,
        bl1:self.noform.bl1,
        bl2:self.noform.bl2,
        bl3:self.noform.bl3,
        bl4:self.noform.bl4,
        bl5:self.noform.bl5,
        bl6:self.noform.bl6,
        bl7:self.noform.bl7,
        bl8:self.noform.bl8,
        bl9:self.noform.bl9,
        bl10:self.noform.bl10,
        bl11:self.noform.bl11,
        bl12:self.noform.bl12,
        bl13:self.noform.bl13
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getNOF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
        updateAOF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/acuteForm_outcome/'+ this.programmeId, {
                  ac1:self.aformo.ac1,
                  ac2:self.aformo.ac2,
                  ac3:self.aformo.ac3,
                  ac4:self.aformo.ac4,
                  ac5:self.aformo.ac5,
                  ac6:self.aformo.ac6,
                   ac7:self.aformo.ac7,
                  pains:self.aformo.pains,
                  pl1:self.aformo.pl1,
                  pl2:self.aformo.pl2,
                  pl3:self.aformo.pl3,
                  plremarks:self.aformo.plremarks,
                  ac21:self.aformo.ac21,
                  ac22:self.aformo.ac22,
                  ac23:self.aformo.ac23,
                  ac24:self.aformo.ac24,
                  ac25:self.aformo.ac25, 
                  ac31:self.aformo.ac31,
                  ac32:self.aformo.ac32,
                  ac33:self.aformo.ac33,  
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getAOF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
      updateAF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/acuteForm/'+ this.programmeId, {
                  ac1:self.aform.ac1,
                  ac2:self.aform.ac2,
                  ac3:self.aform.ac3,
                  ac4:self.aform.ac4,
                  ac5:self.aform.ac5,
                  ac6:self.aform.ac6,
                     ac7:self.aform.ac7,
                  pains:self.aform.pains,
                  pl1:self.aform.pl1,
                  pl2:self.aform.pl2,
                  pl3:self.aform.pl3,
                  ac21:self.aform.ac21,
                  ac22:self.aform.ac22,
                  ac23:self.aform.ac23,
                  ac24:self.aform.ac24,
                  ac25:self.aform.ac25, 
                  ac31:self.aform.ac31,
                  ac32:self.aform.ac32,
                  ac33:self.aform.ac33,  
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getAF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
    submitNewAF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/acuteForm', {
                  id:self.programmeId,
                  ac1:self.aform.ac1,
                  ac2:self.aform.ac2,
                  ac3:self.aform.ac3,
                  ac4:self.aform.ac4,
                  ac5:self.aform.ac5,
                  ac6:self.aform.ac6,
                  ac7:self.aform.ac7,
                  pains:self.aform.pains,
                  pl1:self.aform.pl1,
                  pl2:self.aform.pl2,
                  pl3:self.aform.pl3,
                  ac21:self.aform.ac21,
                  ac22:self.aform.ac22,
                  ac23:self.aform.ac23,
                  ac24:self.aform.ac24,
                  ac25:self.aform.ac25, 
                  ac31:self.aform.ac31,
                  ac32:self.aform.ac32,
                  ac33:self.aform.ac33,                                
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getAF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
    duplicateAOF(){
      this.aformo = this.aform;
        return Messenger().post({message:"Copy complete!", hideAfter: 3,showCloseButton:true});
    },
       submitNewAOF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/acuteForm_outcome', {
                  id:self.programmeId,
                  ac1:self.aformo.ac1,
                  ac2:self.aformo.ac2,
                  ac3:self.aformo.ac3,
                  ac4:self.aformo.ac4,
                  ac5:self.aformo.ac5,
                  ac6:self.aformo.ac6,
                    ac7:self.aformo.ac7,
                  pains:self.aformo.pains,
                  pl1:self.aformo.pl1,
                  pl2:self.aformo.pl2,
                  pl3:self.aformo.pl3,
                  plremarks:self.aformo.plremarks,
                  ac21:self.aformo.ac21,
                  ac22:self.aformo.ac22,
                  ac23:self.aformo.ac23,
                  ac24:self.aformo.ac24,
                  ac25:self.aformo.ac25, 
                  ac31:self.aformo.ac31,
                  ac32:self.aformo.ac32,
                  ac33:self.aformo.ac33,                                
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getAOF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
        submitNewPF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/personalForm', {
                  id:self.programmeId,
                   name:self.pform.name,
                  dob:self.pform.dob,
                  tel:self.pform.tel,
                  address:self.pform.address,
                  postal:self.pform.postal,
                  city:self.pform.city,
                  email:self.pform.email,
                  education:self.pform.education,
                  operation:self.pform.operation,
                  module:self.pform.module,
                  doctor:self.pform.doctor,
                  hospital:self.pform.hospital,
                  payment_mode:self.pform.payment_mode,
                  payment_others:self.pform.payment_others,
                      payment_others2:self.pform.payment_others2,
                  doctor_others:self.pform.doctor_others,
                  hospital_others:self.pform.hospital_others,
                  occupation:self.pform.occupation,
                  employer:self.pform.employer,
                  com_tel:self.pform.com_tel,
                  com_fax:self.pform.com_fax,
                  com_address:self.pform.com_address,
                  com_postal:self.pform.com_postal,
                  com_city:self.pform.com_city,
                  com_category:self.pform.com_category,
                  com_contact:self.pform.com_contact,
                  weight:self.pform.weight,
                  height:self.pform.height,
                  gender:self.pform.gender,
                  race:self.pform.race,
                  religion:self.pform.religion

                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getPF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
       submitNewBF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/baselineForm', {
                  id:self.programmeId,
                    sbl:self.bform.sbl,
                  back:self.bform.back,
                  neck:self.bform.neck,
                  shoulder:self.bform.shoulder,
                  knee:self.bform.knee,
                  acute:self.bform.acute,
                  session:self.bform.session,
                  diag:self.bform.diag
                
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getBF();
          
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
       updateBF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/baselineForm/'+ this.programmeId, {
                 
                  sbl:self.bform.sbl,
                  back:self.bform.back,
                  neck:self.bform.neck,
                  shoulder:self.bform.shoulder,
                  knee:self.bform.knee,
                  acute:self.bform.acute,
                  session:self.bform.session,
                    diag:self.bform.diag
                  
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getPF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },
  
    updatePF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/personalForm/'+ this.programmeId, {
                 
                  name:self.pform.name,
                  dob:self.pform.dob,
                  tel:self.pform.tel,
                  address:self.pform.address,
                  postal:self.pform.postal,
                  city:self.pform.city,
                  email:self.pform.email,
                  education:self.pform.education,
                  operation:self.pform.operation,
                  module:self.pform.module,
                  doctor:self.pform.doctor,
                  hospital:self.pform.hospital,
                   doctor_others:self.pform.doctor_others,
                  hospital_others:self.pform.hospital_others,
                  payment_mode:self.pform.payment_mode,
                  payment_others:self.pform.payment_others,
                    payment_others2:self.pform.payment_others2,
                  occupation:self.pform.occupation,
                  employer:self.pform.employer,
                  com_tel:self.pform.com_tel,
                  com_fax:self.pform.com_fax,
                  com_address:self.pform.com_address,
                  com_postal:self.pform.com_postal,
                  com_city:self.pform.com_city,
                  com_category:self.pform.com_category,
                  com_contact:self.pform.com_contact,
                        weight:self.pform.weight,
                  height:self.pform.height,
                  gender:self.pform.gender,
                  race:self.pform.race,
                  religion:self.pform.religion
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
                  self.isLoading = false;
               self.getPF();
             
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                }); 
    },

    sendBaseline(){

      var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/baselineReport', {
                   email:self.data.email
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
           
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
        sendOutcome(){

      var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/outcomeReport', {
                   email:self.data.email
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
           
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
        sendMidProgress(){

      var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/midProgressReport', {
                   email:self.data.email
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             
           
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
       downloadBaselineReport(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/download/reportBaseline/'+self.programmeId, {
                    memberId:self.data.memberId,
                  workforceId:self.workforceId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
           downloadOutcomeReport(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/download/reportOutcome/'+self.programmeId, {
                  memberId:self.data.memberId,
                  workforceId:self.workforceId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
           downloadMidProgressReport(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/download/reportMidProgress/'+self.programmeId, {
                   memberId:self.data.memberId,
                  workforceId:self.workforceId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
             downloadSBLReport(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/download/reportSBL/'+self.programmeId, {
                
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
           downloadBackProtocolReport(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/download/reportBackProtocol/'+self.programmeId, {
                     memberId:self.data.memberId,
                  workforceId:self.workforceId
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
           downloadMidProgress(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/downloadMidProgressReport', {
                
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
           downloadOutcome(){
      var self=this;
         self.axios.post('https://backend.medicodesolution.com/staging/downloadOutcomeReport', {
                
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
              return window.open(response.data.pdfLink);
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });  
    },
    forgotPassword(){
       var self = this;
       self.isLoading = true;
      self.axios.post('https://backend.medicodesolution.com/staging/members/forgot-password/'+this.data.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });   
    },
    activationEmail(){
      var self = this;
       self.isLoading = true;
      self.axios.post('https://backend.medicodesolution.com/staging/members/activation-email/'+this.data.email)
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
              
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });
    },
    navigateToUpdate(){
        this.$router.push({name:'MembersUpdate', params: { memberId :this.memberId}});
    },
    activateAccount(){
         var self = this;
       self.isLoading = true;
  
                self.axios.patch('https://backend.medicodesolution.com/staging/members/status/'+this.memberId, {
                   status:1
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getUser();
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });   

    },
    selectDate(val) {
        Vue.set(this, 'pform.dob', val.toLocaleDateString());
        },
    suspendAccount(){
         var self = this;
       self.isLoading = true;
          self.axios.patch('https://backend.medicodesolution.com/staging/members/status/'+this.memberId, {
                   status:-1
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
                self.isLoading = false;
               self.getUser();
               return Messenger().post({message:response.data.success, hideAfter: 3,showCloseButton:true});
               
                }
                else {
                  if(response.data.error){
                    self.isLoading = false;
                  return Messenger().post({ type:'error',message :response.data.error, hideAfter: 3,showCloseButton:true});
          
                  }
                 else {
                   self.isLoading = false;
                 return Messenger().post({ type:'error',message :response.error, hideAfter: 3,showCloseButton:true});
                   }
                }
                })
                .catch(function (error) {
                  self.isLoading = false;
                  return Messenger().post({ type:'error',message :error, hideAfter: 3,showCloseButton:true});                
                });   
	
    },    
    async getProgramme() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/programme/'+ this.programmeId)
   this.data = response.data.programmeInfo[0];
  if(this.data.status==0){
    this.data.selectedStatus = 'Inactive';
  }
    if(this.data.status==1){
    this.data.selectedStatus = 'Active';
  }
    if(this.data.status==2){
    this.data.selectedStatus = 'Completed';
  }
     if(this.data.status==-1){
    this.data.selectedStatus = '***TO DELETE***';
  }
  } catch (error) {
    console.error(error);
  }
},
    async getPF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/personalForm/'+ this.programmeId)
 //  console.log(response)
  if(response.data.success){
    self.pform = response.data.formInfo[0];
    self.pfUpdate = true;
  }
  else {self.pfNew = true;}
 
  } catch (error) {
    console.error(error);self.pfNew = true;
  }
},
    async getNF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/neckForm/'+ this.programmeId)
 //  console.log(response)
  if(response.data.success){
    self.nform = response.data.formInfo[0];
    self.nfUpdate = true;
  }
  else {self.nfNew = true;}
 
  } catch (error) {
    console.error(error);self.nfNew = true;
  }
},
 async getBPF() {
      const self = this;
    self.showBackNote = false;
    if(self.selectedBackNote.note.id=='' || self.selectedBackNote.note.id==null){return false;}
        var id =self.selectedBackNote.note.id;
      
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/backprotocolForm/'+ id)
 
  if(response.data.success){
   
    
    self.bpform = response.data.formInfo[0];
       self.showBackNote = true;
      var str1 = self.bpform.starget;
       var str2 = self.bpform.sability;
        var str3 = self.bpform.rtarget;
         var str4 = self.bpform.rability;
           var str5 = self.bpform.emg1l;
         var str6 = self.bpform.emg1r;
    self.bpform.starget = str1.split(',');
    self.bpform.sability = str2.split(',');
    self.bpform.rtarget = str3.split(',');
    self.bpform.rability = str4.split(',');
    self.bpform.emg1l = str5.split(',');
    self.bpform.emg1r = str6.split(',');
   
  }
 
 
  } catch (error) {
    console.error(error);
  }
},
  async getPNF() {

      const self = this;
    self.showNote = false;
    

      if(self.selectedNote.note.id=='' || self.selectedNote.note.id==null){return false;}
        var id =self.selectedNote.note.id;
     
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/progressNoteForm/'+ id)
   console.log(response)
  if(response.data.success){
    self.pnform = response.data.formInfo[0];
    self.data.attachments = response.data.formInfo[0].attachments.split(',');
    self.showNote = true;
    console.log(self.showBackNote);
     var str1 = self.pnform.pw;
      var str2 = self.pnform.pr;
       var str3 = self.pnform.hw;
        var str4 = self.pnform.hr;
         var str5 = self.pnform.g1;

    self.pnform.pw = str1.split(',');
        self.pnform.pr = str2.split(',');
            self.pnform.hw = str3.split(',');
                self.pnform.hr = str4.split(',');
                     self.pnform.g1 = str5.split(',');

  }
  else {self.pnfNew = true;}
 
  } catch (error) {
    console.error(error);self.pnfNew = true;
  }
},
async loadBPFTemplate(){
       const self = this;
 //   self.showBackNote = false;
    if(self.selectedBackNote2.note.id=='' || self.selectedBackNote2.note.id==null){return false;}
        var id =self.selectedBackNote2.note.id;
      
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/backprotocolForm/'+ id)
 
  if(response.data.success){
   
    
    self.bpform = response.data.formInfo[0];
      // self.showBackNote = true;
      var str1 = self.bpform.starget;
       var str2 = self.bpform.sability;
        var str3 = self.bpform.rtarget;
         var str4 = self.bpform.rability;
           var str5 = self.bpform.emg1l;
         var str6 = self.bpform.emg1r;
    self.bpform.starget = str1.split(',');
    self.bpform.sability = str2.split(',');
    self.bpform.rtarget = str3.split(',');
    self.bpform.rability = str4.split(',');
    self.bpform.emg1l = str5.split(',');
    self.bpform.emg1r = str6.split(',');
   
  }
 
 
  } catch (error) {
    console.error(error);
  }
},
 async loadPNFTemplate() {

      const self = this;
    //self.showNote = false;
    

            if(self.selectedNote2.note=='' || self.selectedNote2.note==null){return self.getPNF();}
        var id =self.selectedNote2.note.id;
     
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/progressNoteForm/'+ id)
   console.log(response)
  if(response.data.success){
    self.pnform = response.data.formInfo[0];
    self.data.attachments = response.data.formInfo[0].attachments.split(',');
    self.showNote = true;
    console.log(self.showNote);
     var str1 = self.pnform.pw;
      var str2 = self.pnform.pr;
       var str3 = self.pnform.hw;
        var str4 = self.pnform.hr;
         var str5 = self.pnform.g1;

    self.pnform.pw = str1.split(',');
        self.pnform.pr = str2.split(',');
            self.pnform.hw = str3.split(',');
                self.pnform.hr = str4.split(',');
                     self.pnform.g1 = str5.split(',');
 return Messenger().post({message:'Template loaded successfully!', hideAfter: 3,showCloseButton:true});
  }
  else {self.pnfNew = true;}
 
  } catch (error) {
    console.error(error);self.pnfNew = true;
  }
},
  async getAllPNF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/progressNoteForm/programme/'+ this.programmeId)
 //  console.log(response)
  if(response.data.success){
   
   self.noteInfo = response.data.formInfo;

  }

 
  } catch (error) {
    console.error(error);
  }
},
  async getAllBPF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/backProtocolForm/programme/'+ this.programmeId)
 //  console.log(response)
  if(response.data.success){
   
   self.backInfo = response.data.formInfo;

  }

 
  } catch (error) {
    console.error(error);
  }
},
    async getNOF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/neckForm_outcome/'+ this.programmeId)
 //  console.log(response)
  if(response.data.success){
    self.noform = response.data.formInfo[0];
    self.nofUpdate = true;
  }
  else {self.nofNew = true;}
 
  } catch (error) {
    console.error(error);self.nofNew = true;
  }
},
    async getPREF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/preinformationForm/'+ this.programmeId)
 //  console.log(response)
  if(response.data.success){
  
    self.preform = response.data.formInfo[0];
    var str1 = self.preform.s1c1;
    var str2 = self.preform.s2c1;
    var str3 = self.preform.t1c1;
    var str4 = self.preform.t2c1;
    var str5 = self.preform.t3c1;
        var str6 = self.preform.d1c1;
    var str7 = self.preform.d2c1;
     var str8 = self.preform.p3c1;
     var str9 = self.preform.p1c2;
    self.preform.s1c1 = str1.split(',');
    self.preform.s2c1 = str2.split(',');
    self.preform.t1c1 = str3.split(',');
    self.preform.t2c1 = str4.split(',');
        self.preform.t3c1 = str5.split(',');
            self.preform.d1c1 = str6.split(',');
    self.preform.d2c1 = str7.split(',');
        self.preform.p3c1 = str8.split(',');
             self.preform.p1c2 = str9.split(',');
            //   console.log(self.preform.p1c2)
    self.prefUpdate = true;
  }
  else {self.prefNew = true;}
 
  } catch (error) {
    console.error(error);self.prefNew = true;
  }
},
    async getSF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/shoulderForm/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.sform = response.data.formInfo[0];
    self.sfUpdate = true;
  }
  else {self.sfNew = true;}
 
  } catch (error) {
    console.error(error);self.sfNew = true;
  }
},
    async getSOF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/shoulderForm_outcome/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.soform = response.data.formInfo[0];
    self.sofUpdate = true;
  }
  else {self.sofNew = true;}
 
  } catch (error) {
    console.error(error);self.sofNew = true;
  }
},
    async getSBLF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/sblForm/'+ this.programmeId)
 //  console.log(response)
  if(response.data.success){
    self.sblform = response.data.formInfo[0];
        var str1 = self.sblform.emg1l;
          var str2 = self.sblform.emg1r;
            var str3 = self.sblform.s1;
              var str4 = self.sblform.s2;
                var str5 = self.sblform.s3;
                  var str6 = self.sblform.s4;
                    var str7 = self.sblform.s5;
                      var str8 = self.sblform.h1;
    self.sblform.emg1l = str1.split(',');
    self.sblform.emg1r = str2.split(',');
    self.sblform.s1 = str3.split(',');
    self.sblform.s2 = str4.split(',');
   self.sblform.s3 = str5.split(',');
    self.sblform.s4 = str6.split(',');
   self.sblform.s5 = str7.split(',');
    self.sblform.h1 = str8.split(',');
    self.sblfUpdate = true;
  }
  else {self.sblfNew = true;}
 
  } catch (error) {
    console.error(error);self.sblfNew = true;
  }
},

    async getAF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/acuteForm/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.aform = response.data.formInfo[0];
    var str = self.aform.pains;
    self.aform.pains = str.split(',');
    //console.log(self.aform.pains)
    self.afUpdate = true;
  }
  else {self.afNew = true;}
 
  } catch (error) {
    console.error(error);self.afNew = true;
  }
},
    async getAOF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/acuteForm_outcome/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.aformo = response.data.formInfo[0];
    var str = self.aformo.pains;
    self.aformo.pains = str.split(',');
    //console.log(self.aform.pains)
    self.aofUpdate = true;
  }
  else {self.aofNew = true;}
 
  } catch (error) {
    console.error(error);self.aofNew = true;
  }
},
    async getKF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/kneeForm/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.kform = response.data.formInfo[0];

    self.kfUpdate = true;
  }
  else {self.kfNew = true;}
 
  } catch (error) {
    console.error(error);self.kfNew = true;
  }
},
    async getKOF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/kneeForm_outcome/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.koform = response.data.formInfo[0];

    self.kofUpdate = true;
  }
  else {self.kofNew = true;}
 
  } catch (error) {
    console.error(error);self.kofNew = true;
  }
},
    async getBLF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/backForm/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.blform = response.data.formInfo[0];
    self.blfUpdate = true;
  }
  else {self.blfNew = true;}
 
  } catch (error) {
    console.error(error);self.blfNew = true;
  }
},
    async getBLOF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/backForm_outcome/'+ this.programmeId)
  // console.log(response)
  if(response.data.success){
    self.bloform = response.data.formInfo[0];
    self.blofUpdate = true;
  }
  else {self.blofNew = true;}
 
  } catch (error) {
    console.error(error);self.blofNew = true;
  }
},
async getBF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/baselineForm/'+ this.programmeId)
   //console.log(response)
  if(response.data.success){
    self.bform = response.data.formInfo[0];
    self.bfUpdate = true;
  }
  else {self.bfNew = true;}
 
  } catch (error) {
    console.error(error);self.bfNew = true;
  }
},
async getMPRF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/reportMidProgress/'+ this.programmeId)
   //console.log(response)
  if(response.data.success){
    self.mprform = response.data.formInfo[0];
    self.mprfUpdate = true;
  }
  else {self.mprfNew = true;}
 
  } catch (error) {
    console.error(error);self.mprfNew = true;
  }
},
async getOUTF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/reportOutcome/'+ this.programmeId)
   //console.log(response)
  if(response.data.success){
    self.outform = response.data.formInfo[0];
    self.outfUpdate = true;
  }
  else {self.outfNew = true;}
 
  } catch (error) {
    console.error(error);self.outfNew = true;
  }
},
async getBASEF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/reportBaseline/'+ this.programmeId)
   //console.log(response)
  if(response.data.success){
    self.baseform = response.data.formInfo[0];
    self.basefUpdate = true;
  }
  else {self.basefNew = true;}
 
  } catch (error) {
    console.error(error);self.basefNew = true;
  }
},
async getBACKF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/reportBackProtocol/'+ this.programmeId)
   //console.log(response)
  if(response.data.success){
    self.backform = response.data.formInfo[0];
    self.backfUpdate = true;
  }
  else {self.backfNew = true;}
 
  } catch (error) {
    console.error(error);self.backfNew = true;
  }
},
format_date(value){
         if (value) {
           return moment(value).format('Do MMMM YYYY, h:mm:ss a')
          }
      },
  },
   mounted(){
        this.getProgramme();
        this.getPF();
        this.getAF();
        this.getAOF();
        this.getBF();
        this.getNF();
        this.getNOF();
        this.getKF();
        this.getKOF();
        this.getBLF();
        this.getBLOF();
        this.getSF();
        this.getAllPNF();
        this.getAllBPF();
        this.getSOF();
        this.getSBLF(); 
        this.getPREF(); 
        this.getMPRF(); 
        this.getOUTF(); 
        this.getBASEF(); 
        this.getBACKF();
 
      $(document).ready(function() {
       var programmeId = $("#programmeId").attr("data-id");
     //   console.log(programmeId);
     var table =  $('#datatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/staging/bookingslist2/"+programmeId,
		"columnDefs": [
        {
      "data": null,
      "defaultContent": "<button class='btn' id='view' title='View Booking'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
  	{ "targets" : 5,
          "render" : function (data, type, row) {
            if(data == 0) return 'Upcoming/Confirmed';
           else if(data == 1) return 'Completed';
             else if(data == -2) return 'No Show';
           else if(data == -1) return 'Cancelled';
            
          },
        }	
	
  ]
	} );
	




    $('#datatable tbody').on( 'click', '#view', function () {
		var data = table.row( $(this).parents('tr') ).data();
	  window.open('https://physio.dbcphysioasia.com/app/bookingsview/' + data[0]);
    } );
      });
  
      
   },
     created() {
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.locationClasses,
      theme: 'air',
      showCloseButton: true,//    "vue-select": "^2.6.4",
    };
  
  },
};
</script>

<style scoped>
.image-container {
  /* background: #000000; */
  height: 577px;
  width: 600px;
  overflow: auto;
  position: relative;
}
.body-front {
  background-image: url("./body-chart-front.png");
  background-position: center;
  background-repeat: no-repeat;
  width: 230px;
  position: absolute;
  height: 577px;
}
.body-back {
  background-image: url("./body-chart-back.png");
  background-position: center;
  background-repeat: no-repeat;
  width: 230px;
  position: absolute;
  height: 577px;
  right: 0;
}
.selection {
  position: absolute;
  height: 100%;
  width: 100%;
  /* aligning the points to the bg */
  padding-top: 30px;
}
.selection > p {
  position: relative;
  width: fit-content;
  left: 50%;
  transform: translateX(-30%);
}
.checkboxes {
  position: relative;
  width: fit-content;
  left: 43%;
}
.svg-style {
  position: absolute;
}
.st0 {
  fill: #0066ff;
  transition-duration: 0.5s;
}
.point {
  position: absolute;
  height: 20px;
  width: 20px;
  background: #00ff00;
  border-radius: 50%;
  border: 3px solid #0066ff;
  /* left: 40%;
  top: 12%; */
  transition-duration: 0.3s;
  cursor: pointer;
}
.point::before {
  visibility: hidden;
}
.point:hover {
  transform: scale(1.2);
  transition-duration: 0.3s;
}
.move-abit {
  transform: translateX(10px);
}
input[type="checkbox"]:checked ~ .point {
  border-color: #eeff00;
  background: #ff0000;
  transition-duration: 0.3s;
}
input[type="checkbox"]:checked ~ .point::before {
  border-color: #eeff00;
  background: #ff0000;
  transition-duration: 0.3s;
}
.hide {
  display: none;
}
</style>