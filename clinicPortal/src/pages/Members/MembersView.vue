<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Patient Dashboard - {{data.username}}</li>
    </ol>


    <b-row>
      <b-col md="12" xs="12">
        <b-tabs class="mb-lg">
          <b-tab title="Profile" active>
            
              <div class="profileContactContainer">
                <span class="thumb-xl mb-3">
                  <img v-if="data.photoUrl" class="profileAvatar rounded-circle"
                    v-bind:src="data.photoUrl" alt="..." />
                         <img v-if="!data.photoUrl" class="profileAvatar rounded-circle"
                    src="https://storage.cloud.google.com/dbc-asia/resources/user.png" alt="..." />
                   
                </span>
                <h5 class="fw-normal">{{data.username}} </h5>
                <p>{{data.gender}} | {{data.branch}} &nbsp;&nbsp;<a class="btn btn-danger btn-sm mb-3" @click="navigateToUpdate()">
                  &nbsp;Manage Profile
                  <i class="fa fa-pencil ml-2" />&nbsp;
                </a></p>
                
                <div>
                
                    
                      <i class="fa fa-lg fa-phone fa-fw mr-2" /><a>{{data.tel_no}}</a> &nbsp;
                  
                      <i class="fa fa-lg fa-envelope fa-fw mr-2" />
                      <a> {{data.email}}</a> &nbsp;
                
                 
                      <i class="fa fa-lg fa-map-marker fa-fw mr-2" /><a> {{data.address}}</a>
                   
                </div>
              </div>
              <br>
       <b-form>
         
            <fieldset>
              
   <legend>Complete Information</legend>
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
                v-model="data.id"
                id="memberId"
                v-bind:data-id="memberId"
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
                  Name 
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
                label="E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="email"
                
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                  type="text"
                 v-model="data.email"
                  disabled 
                />
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                description=""
              >
                <div slot="label">
                  Telephone Number
                </div>
                <input
                 disabled 
                  data-vv-validate-on="change"
             
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.tel_no"
                />
              </b-form-group>             
            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
                  Provider
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.provider"
                disabled 
                />
              </b-form-group>      
                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
                  IC Number
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.ic"
                disabled 
                />
              </b-form-group>    
                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
                 DOB
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.dob"
                disabled 
                />
              </b-form-group>      
                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
                Address
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.address"
                disabled 
                />
              </b-form-group>   
                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
               Gender
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.gender"
                disabled 
                />
              </b-form-group>     
                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
                 Preferred Branch
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.branch"
                disabled 
                />
              </b-form-group>  
                          <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                >
                <div slot="label">
                 How Did You Find Us?
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.how"
                disabled 
                />
              </b-form-group>                                  
            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                description=""
              >
                <div slot="label">
                  Registration Date
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
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
                label-for="last_updated"
                description=""
              >
                <div slot="label">
                  Last Updated
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="data.update_time"
                disabled 
                />
              </b-form-group>                         
            </fieldset>
           
          </b-form>
          </b-tab>
         <b-tab title="Bookings">
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
                  <th>Actions</th>
                     
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>
          </b-tab>
           <b-tab title="Personal Form">
        <b-col xl="8" lg="10" md="12" >
                    <b-tabs nav-class="bg-tranparent">
                        <b-tab title="Personal Information" active>
                        <b-form-group label-for="name">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Full Name" size="16" 
                            
                                    name="name"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    v-model="pform.name"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('name')">
                        {{ errors.first('name') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Date of Birth">
                        <b-row>
                            <b-col> 
                                <b-input-group>
                                    <DatePicker lang="en"    v-model="pform.dob" placeholder="Date of Birth" format="DD-MM-YYYY"
                                                input-class="form-control"  id="datetimepicker">
                                        <i class="glyphicon glyphicon-th" slot="calendar-icon"/>
                                    </DatePicker>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-form-group>

                    <b-form-group label-for="Phone">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-input-group-text slot="prepend" class="bg-default text-white">
                                    <i class="la la-phone" />
                                    </b-input-group-text>
                                    <b-form-input class="input-transparent small-form" type="text" id="Phone"
                                    placeholder="(60)12-345-6789"
                                    v-mask="'(60)##-###-#######'"
                                   
                                   
                                    name="Phone"
                                       v-model="pform.tel"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Phone')}"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Phone')">
                        {{ errors.first('Phone') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Address">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Address" size="16" 
                                   
                                    name="Address"
                                       v-model="pform.address"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Address')}"
                                    id="Address"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Address')">
                        {{ errors.first('Address') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Postal">
                        <b-row >
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Postal Code" size="16" class="small-form"
                                   
                                    name="Postal"
                                       v-model="pform.postal"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Postal')}"
                                    id="Postal"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Postal')">
                        {{ errors.first('Postal') }}
                        </span>
                    </b-form-group>
                    
                    <b-form-group label-for="City">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="City" size="16" class="small-form"
                               
                                       v-model="pform.city"
                                    name="City"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('City')}"
                                    id="City"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('City')">
                        {{ errors.first('City') }}
                        </span>
                    </b-form-group>   

                            <b-form-group label-for="Weight">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Weight" size="16" class="small-form"
                               
                                       v-model="pform.weight"
                                    name="City"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Weight')}"
                                    id="Weight"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Weigth')">
                        {{ errors.first('Weight') }}
                        </span>
                    </b-form-group>   
                            <b-form-group label-for="height">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="height" size="16" class="small-form"
                               
                                       v-model="pform.height"
                                    name="height"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('height')}"
                                    id="height"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('height')">
                        {{ errors.first('height') }}
                        </span>
                    </b-form-group>                    

                    <b-form-group label-for="email">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                  
                                    <b-form-input type="email" placeholder="Email" size="16" class="small-form"
                               
                                       v-model="pform.email"
                                    name="email"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                                    id="email"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('email')">
                        {{ errors.first('email') }}
                        </span>
                    </b-form-group>

                    Education
                    <v-select
                        id="educationSelect"
                        
                        class="mt-xs"
                        v-model="pform.education"
                        :options="['primary', 'secondary', 'upper secondary', 'vocational/professional', 'polytechnic', 'university']"
                    />

                       Gender
                    <v-select
                        id="educationSelect"
                        
                        class="mt-xs"
                        v-model="pform.gender"
                        :options="['Male', 'Female']"
                    />
                            <b-form class="form-label-left">
                        <b-form-group
                        label="Race"
                        label-for="insuranceSelect2"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             taggable
                        id="insuranceSelect2"
                        class="mt-xs"
                        v-model="pform.race"
                        :options="extras.race" 
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                           <b-form class="form-label-left">
                        <b-form-group
                        label="Religion"
                        label-for="insuranceSelect22"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             taggable
                        id="insuranceSelect22"
                        class="mt-xs"
                        v-model="pform.religion"
                        :options="extras.religion" 
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                        <b-form class="form-label-left">
                        <b-form-group
                        label="Nationality"
                        label-for="insuranceSelect222"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             taggable
                        id="insuranceSelect222"
                        class="mt-xs"
                        v-model="pform.nationality"
                        :options="extras.nationality" 
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                              <b-form class="form-label-left">
                        <b-form-group
                        label="Salutation"
                        label-for="insuranceSelect222"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             taggable
                        id="insuranceSelect222"
                        class="mt-xs"
                        v-model="pform.salutation"
                        :options="extras.salutation" 
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                        </b-tab>
                        <b-tab title="Important Information">
                 <b-form class="form-label-left">
                        <b-form-group
                        label="Doctor Management"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="doctorSelect"
                                class="mt-xs"
                                v-model="pform.operation"
                                :options="['Pre-Operation','Post-Operation']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                        
                    
                    </b-form>
                           <b-form class="form-label-left">
                        <b-form-group
                        label="Module Number"
                        label-for="doctorSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                    <select v-model="pform.module" >
    <option v-for="n in moduleCount" :value="n-1">{{ n-1 }}</option>
  </select>
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
                             taggable
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.doctor"
                        :options="extras.doctors" 
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                            <b-form class="form-label-left">
                        <b-form-group
                        label="Doctor Type"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             taggable
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.doctor_others"
                        :options="extras.doctor_types" 
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
                               taggable
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.hospital"
                        :options="extras.hospitals"
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                
                    

                    <b-form class="form-label-left">
                        <b-form-group
                        label="Payment Mode"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="pform.payment_mode"
                                :options="['Panel Insurance','Pay & Claim','Cash','FOC','Perkeso','Others']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                       <b-form class="form-label-left">
                        <b-form-group
                        label="Enter Payment Mode Details"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.payment_mode=='Others'"
                      
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                         v-model="pform.payment_others"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                    
                    <b-form class="form-label-left">
                        <b-form-group
                        v-if="pform.payment_mode=='Pay & Claim'"
                        label="Pay & Claim"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="insuranceSelect"
                                class="mt-xs"
                                v-model="pform.payment_others"
                                :options="['Allianz','Asia Assistance','Prudential','Great Eastern','AIA Personal','AXA','Zurich','TNB','Others']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                        
                    </b-form>
                       <b-form class="form-label-left">
                        <b-form-group
                        v-if="pform.payment_mode=='Panel Insurance'"
                        label="Panel Insurance"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="insuranceSelect"
                                class="mt-xs"
                                v-model="pform.payment_others"
                                :options="['Tricare','Aetna','PNS','AIA','BANK OF TOKYO(MUFG BANK)','BUPA','CIGNA','EMAS(PERKESO STAFF)','ETIQA','HEALTHCONNECT','HTH WORLWIDE','PM CARE','PNB(PERMODALAN NASIONAL BERHAD)','REPUBLIC OF BANGLADESH','ASIA ASSISTANCE(EMBASSY OF KUWAIT)','UNITED HEALTHCARE','RETURNTOWORK(PERKESO)']"
                            />
                            </b-col>
                        </b-row>
                             </b-form-group>
                    </b-form>
                           <b-form class="form-label-left">
                        <b-form-group
                        v-if="pform.payment_mode=='Perkeso'"
                        label="Case Managers"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                            <v-select
                                id="insuranceSelect"
                                class="mt-xs"
                                v-model="pform.payment_others"
                                :options="['Nurul Amanina Binti Ahmad Sabki','Siti Fazrina Binti Suboh','\u00a0Muhammad Bin Abu Bakar','Siti Hajar Binti Mohd Fami','\u00a0Anusuya A\/P Paramasivam','Nur Amirah Binti Mazlan','Siti Norain Binti Abd Samad','Wong Fong Wei','Muhammad Taufiq Fauzan Bin Azmi','Emy Baizura Azrin Binti Mohamed Hakke','Nurul Nadia Md Arif','CHE FAEZAH BINTI CHE YUSOFF','NUR ATIQAH BINTI RAHIM','NUR ISNEY BINTI IBRAHIM','Aidayu Binti Ahmad','Fatimahwati Binti Ahmad Nazir','Annis Fadilla Binti Mohd Sukery','Pannirselvam AL Rajamanikam','Muaz bin abdullah','Mustaqim bin Abdul Khalid','Faizlinda bt mohd yusof','Noor Halim Bin Noor Hamal','Mohamad Isamuddin Bin Md. Ali','Siti Munirah Binti Mohd Bhokhari','Che Gayah@Rogayah binti Mohammad','Others']"
                            />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                    <b-form class="form-label-left">
                        <b-form-group
                        label="Perkeso (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.payment_others=='Others' && pform.payment_mode=='Perkeso' "
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                         v-model="pform.payment_others2"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                        <b-form class="form-label-left">
                        <b-form-group
                        label="Pay & Claim (Others)"
                        label-for="insuranceSelect"
                        :label-cols="4"
                          v-if="pform.payment_others=='Others' && pform.payment_mode=='Pay & Claim' "
                       
                        >
                        <b-row>
                            <b-col md='9'>
                        <b-form-input type="text" placeholder="" size="16" 
                                    v-validate="'required|min:1'"
                                    name="name"
                                         v-model="pform.payment_others2"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('name')}"
                                    id="name"
                                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>
                    
                        </b-tab>
                        <b-tab title="Work Information">
                     <b-form-group label-for="Occupation">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Occupation" size="16" 
                             
                                    name="Occupation"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Occupation')}"
                                    id="Occupation"
                                      v-model="pform.occupation"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Occupation')">
                        {{ errors.first('Occupation') }}
                        </span>
                    </b-form-group>

                     <b-form class="form-label-left">
                        <b-form-group
                        label="Employer"
                        label-for="insuranceSelect"
                        :label-cols="4"
                        >
                        <b-row>
                            <b-col md='9'>
                             <v-select
                             taggable
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.employer"
                        :options="extras.employers" 
                    />
                            </b-col>
                        </b-row>
                        </b-form-group>
                    </b-form>

                    <b-form-group label-for="Company Phone">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-input-group-text slot="prepend" class="bg-default text-white">
                                    <i class="la la-phone" />
                                    </b-input-group-text>
                                    <b-form-input class="input-transparent small-form" type="text" id="CompanyPhone"
                                    placeholder="Company Phone"
                                    v-mask="'(60)##-###-#######'"
                           
                                    v-model="pform.com_tel"
                                    name="Company Phone"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Phone')}"
                                    />
                                </b-input-group>
                            </b-col>

                            <b-col>
                                <b-input-group>
                                    <b-input-group-text slot="prepend" class="bg-default text-white">
                                    <i class="la la-phone" />
                                    </b-input-group-text>
                                    <b-form-input class="input-transparent small-form" type="text" id="CompanyFax"
                                    placeholder="Company Fax"
                                    v-mask="'(60)##-###-#######'"
                                  v-model="pform.com_fax"
                                    name="Company Fax"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Fax')}"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company Phone')">
                        {{ errors.first('Company Phone') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="CompanyAddress">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Company Address" size="16" 
                                    v-validate="'required|min:1'"
                                    name="Company Address"
                                    v-model="pform.com_address"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Address')}"
                                    id="CompanyAddress"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company Address')">
                        {{ errors.first('Company Address') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="CompanyPostal">
                        <b-row >
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Postal Code" size="16" class="small-form"
                                    v-validate="'required|min:1|numeric'"
                                    name="Company Postal"
                                    v-model="pform.com_postal"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company Postal')}"
                                    id="CompanyPostal"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company Postal')">
                        {{ errors.first('Company Postal') }}
                        </span>
                    </b-form-group>
                    
                    <b-form-group label-for="City">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="City" size="16" class="small-form"
                                    v-validate="'required|min:1'"
                                    name="Company City"
                                    v-model="pform.com_city"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Company City')}"
                                    id="CompanyCity"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Company City')">
                        {{ errors.first('Company City') }}
                        </span>
                    </b-form-group>

                    <b-form-group label-for="Contact Person">
                        <b-row>
                            <b-col>
                                <b-input-group>
                                    <b-form-input type="text" placeholder="Contact Person" size="16" 
                                    v-validate="'required|min:1'"
                                    name="Contact Person"
                                    v-model="pform.com_contact"
                                    :class="{ 'form-control': true, 'is-invalid': errors.has('Contact Person')}"
                                    id="ContactPerson"
                                    />
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <span class="text-danger" v-if="errors.has('Contact Person')">
                        {{ errors.first('Contact Person') }}
                        </span>
                    </b-form-group>

                    Work Category
                    <v-select
                        id="workCategorySelect"
                        class="mt-xs"
                        v-model="pform.com_category"
                        :options="['technical', 'scientific', 'juridical', 'humanitarian', 'agricultural', 'forestry', 'fishing', 'industrial work', 'machinery', 'mining', 'quarry', 'construction work', 'service work', 'pensioner', 'student', 'unemployed']"
                    />
                           
                        </b-tab>
                       
                    </b-tabs>
                      <br>
                            <b-button variant="danger" type="submit" class="mr-xs" v-if="pfNew==true" @click="submitNewPF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="pfUpdate==true" @click="updatePF()">Update Form</b-button>
            </b-col>
             
          </b-tab>

              <b-tab title="Baseline Questionnaire">
      
           <b-tabs nav-class="bg-tranparent">
                        <b-tab title="Section 1" active>
                            <b-tabs nav-class="bg-tranparent">
                                <b-tab title="Current Symptoms" active>
                                  <p>
       What is your primary reason for seeking physiotherapy?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains2" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'currentSymp'+pain.id"
                v-model="preform.s1c1"
                />
                <label :for="'currentSymp'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br>            
  <b-form-group
                    label="What is the duration of the current episode?"
                    label-for="What is the duration of the current episode?"
                    :label-cols="4"
                    >
                      <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="preform.s1c2"
                                :options="['Week or less','One Week to One month','One month to three months','Three to six months','Six to twelve months','One Year to Two Years','More than two years']"
                            />
                                    
                    </b-form-group>

                      <b-form-group
                    label="How regular are your symptoms?"
                    label-for="How regular are your symptoms?"
                    :label-cols="4"
                    >
                      <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="preform.s1c3"
                                :options="['No symptoms','First time','Sporadic','Repeated (almost once a year','Constant (almost constant continuous)']"
                            />
                                    
                    </b-form-group>

                                          <b-form-group
                    label="How did the pain start/ injury occur?"
                    label-for="How did the pain start/ injury occur?"
                    :label-cols="4"
                    >
                      <v-select
                                id="paymentSelect"
                                class="mt-xs"
                                v-model="preform.s1c4"
                               :options="['Abruptly without any specific reason','Abruptly due to injury or extrinsic factor','Gradually without any specific reason','Gradually due to overuse or extrinsic factor',]"
                            />
                                    
                    </b-form-group>


                                </b-tab>
                                <b-tab title="Other Symptoms">
                        <p>
    Other Symptoms?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains3" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'otherSymp'+pain.id"
                v-model="preform.s2c1"
                />
                <label :for="'otherSymp'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br> 
                 <b-form-group 
                    label="Have you experienced other associated symptoms?"
                    id="Have you experienced other associated symptoms?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.s2c2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Have you experienced other associated symptoms?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group>            
                                </b-tab>
                                <b-tab title="Pain Medication">
                               <p>Do you use pain and/or anti-inflammatory medications?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="preforms3c1"
                        v-model="preform.s3c1"
                        value="Yes"
                      />
                      <label for="preforms3c1">Yes</label>
                    </b-form-group>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="preforms3c2"
                        v-model="preform.s3c1"
                        value="No"
                      />
                      <label for="preforms3c2">No</label>
                    </b-form-group>
            <br>       

                                  <b-form-group 
                    label="Please specify your pain medication"
                    id="Please specify your pain medication"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.s3c2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Please specify your pain medication"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 

                  <b-form-group 
                    label="Dosage (times/day)"
                    id="Dosage (times/day)"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.s3c3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Dosage (times/day)"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                                </b-tab>                       
                            </b-tabs>
                        </b-tab>

                        <b-tab title="Section 2">
                        <b-tabs nav-class="bg-tranparent">
                <b-tab title="Diagnostic Tests" active>
            <p>
   What tests/ evaluation have you done in the past year?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains4" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'diagn'+pain.id"
                v-model="preform.t1c1"
                />
                <label :for="'diagn'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br> 
   <b-form-group 
                    label="Other, please specify"
                    id="Other, please specify"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.t1c2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Other, please specify"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 






                </b-tab>
                <b-tab title="Health Care">

                     <p>
   What health care professionals have you consulted to treat these symptoms?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains5" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'hc'+pain.id"
                v-model="preform.t2c1"
                />
                <label :for="'hc'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br> 

         <b-form-group 
                    label="Other, please specify"
                    id="Other, please specify"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.t2c2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Other, please specify2"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                       <b-form-group 
                    label="By immobilization, when removed?"
                    id="By immobilization, when removed?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.t2c3"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="By immobilization, when removed?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                       <b-form-group 
                    label="Surgical operation, when operated?"
                    id="Surgical operation, when operated?"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.t2c4"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Surgical operation, when operated?"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                       <b-form-group 
                    label="Other treatment or modalities? Please specify"
                    id="Other treatment or modalities? Please specify"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.t2c5"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Other treatment or modalities? Please specify"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                
                </b-tab>
                <b-tab title="Self Treatment">
                  <p>
   Have you treated the symptoms yourself in any way?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains6" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'st'+pain.id"
                v-model="preform.t3c1"
                />
                <label :for="'st'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br> 

         <b-form-group 
                    label="Other, please specify"
                    id="Other, please specify"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.t3c2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Other, please specify2"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                </b-tab>                       
            </b-tabs>
                        </b-tab>
                        <b-tab title="Section 3">
                          <b-tabs nav-class="bg-tranparent">
                <b-tab title="General Disease" active>
                    <p>
  Do you have, or have you had, any of the following conditions?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains7" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'gd'+pain.id"
                v-model="preform.d1c1"
                />
                <label :for="'gd'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br> 
                <b-form-group 
                    label="Other chronic disease or condition, please specify"
                    id="Other chronic disease or condition, please specify"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.d1c2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Other chronic disease or condition, please specify"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                </b-tab>
                <b-tab title="Regular Medication">
             
     <p>
What medications are you regularly using (more than once per week) ?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains8" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'rm'+pain.id"
                v-model="preform.d2c1"
                />
                <label :for="'rm'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br> 
              <b-form-group 
                    label="Other medication, please specify"
                    id="Other medication, please specify"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <textarea-autosize
                                 v-model="preform.d2c2"
                                placeholder=""
                                :min-height="35"
                                class="form-control"
                                id="Other medication, please specify"
                                />
                            </b-col>
                        </b-row>
                </b-form-group> 
                </b-tab>                      
            </b-tabs>
                        </b-tab>
                        <b-tab title="Section 4" >
                            <b-tabs nav-class="bg-tranparent" >
                                <b-tab title="Physical Activity" active>

                                    <p>
           What physical activities do you participate in during your free time? 
        </p>
                         <b-form-group class="abc-checkbox abc-checkbox-danger">
            <input
            value="No"
            type="checkbox"
            id="NoActive"
            v-model="preform.p1c1"
            />
            <label for="NoActive">I am not physically active </label>
               </b-form-group>

     <b-form-group v-for="(repeat,index) in questions" :key="repeat.id" 
        :label="repeat.label"
        :label-for="repeat.label"
        label-class="text-md-left px-3"
        label-cols="5"
        breakpoint="md"
        >
            <b-row>
                <input :id="'physicalActive'+repeat.id" type="number" class="form-control very-small" name="bodyWeight" v-model="preform.p1c2[index]" placeholder="0" >
                <input type="text" class="form-control input-transparent very-small" :name="repeat.placeholder" :placeholder="repeat.placeholder" disabled>
            </b-row>  
        </b-form-group>


 <b-form-group >
            <label for="otherActive">Please specify 1-5 most typical types of activity</label>
            <textarea-autosize 
              v-model="preform.p1c3"
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherActive"
            />
            
        </b-form-group>
                                </b-tab>
                                <b-tab title="Working Status">
       <p>Are you currently continuing with your work duties?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio1"
                        id="prefor1"
                        v-model="preform.p2c1"
                        value="Full Time Working"
                      />
                      <label for="prefor1">Full Time Working</label>
                    </b-form-group>
                               <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio2"
                        id="prefor2"
                        v-model="preform.p2c1"
                        value="Part Time Working"
                      />
                      <label for="prefor2">Part Time Working</label>
                    </b-form-group>
                              <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio3"
                        id="prefor3"
                        v-model="preform.p2c1"
                        value="Not Working Currently"
                      />
                      <label for="prefor3">Not Working Currently</label>
                    </b-form-group>

                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio4"
                        id="prefor4"
                        v-model="preform.p2c1"
                        value="Currently on Sick Leave due to This Problem"
                      />
                      <label for="prefor4">Currently on Sick Leave due to This Problem</label>
                    </b-form-group>
                                 <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio5"
                        id="prefor5"
                        v-model="preform.p2c1"
                        value="Currently on Sick Leave due to Other Problem"
                      />
                      <label for="prefor5">Currently on Sick Leave due to Other Problem</label>
                    </b-form-group>


         
            <br>       

             <p>What type of work do you do?</p>
           <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="prefor12"
                        v-model="preform.p2c2"
                        value="Sedentary Work"
                      />
                      <label for="prefor12">Sedentary Work</label>
                    </b-form-group>
                               <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="prefor22"
                        v-model="preform.p2c2"
                        value="Light Work"
                      />
                      <label for="prefor22">Light Work</label>
                    </b-form-group>
                              <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="prefor32"
                        v-model="preform.p2c2"
                        value="Medium Work"
                      />
                      <label for="prefor32">Medium Work</label>
                    </b-form-group>

                         <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="prefor42"
                        v-model="preform.p2c2"
                        value="Heavy Work"
                      />
                      <label for="prefor42">Heavy Work</label>
                    </b-form-group>
                                 <b-form-group class="radio abc-radio">
                      <input
                        type="radio"
                        name="radio"
                        id="prefor52"
                        v-model="preform.p2c2"
                        value="Very Heavy Work"
                      />
                      <label for="prefor52">Very Heavy Work</label>
                    </b-form-group>

         
            <br>       
    
 <b-form-group >
            <label for="otherActive">How many days have you missed from work in the past 12 months due to these symptoms?</label>
            <textarea-autosize 
              v-model="preform.p2c3"
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherActive"
        
            />
            
        </b-form-group>
                         

                                </b-tab>
                                <b-tab title="Personal Goals">

   <p>
What goals do you have for the physiotherapy and rehabilitation program ?
            </p>
            <b-form-group class="abc-checkbox abc-checkbox-inverse" v-for="pain in pains9" :key="pain.id">
                <input v-if="pain.label"
                :value="pain.label"
                type="checkbox"
                :id="'pg'+pain.id"
                v-model="preform.p3c1"
                />
                <label :for="'pg'+pain.id">{{pain.label}}</label>
            </b-form-group>       
            <br> 

                                 <b-form-group >
            <label for="otherActive">Other personal goals. If you want please tell more about your goals and expectations</label>
            <textarea-autosize 
              v-model="preform.p3c2"
            placeholder="Write here"
            :min-height="35"
            class="form-control"
            id="otherActive"
            />
            
        </b-form-group>  
                                    
                                    <!-- <b-button v-if="showButton" variant="danger" type="submit" class="mr-xs">Submit {{$route.name}}</b-button>                                -->
                                </b-tab>                       
                            </b-tabs>
                            <br>
                           
                        </b-tab>                      
                    </b-tabs>
                       <br>
 <b-button variant="danger" type="submit" class="mr-xs" v-if="prefNew==true" @click="submitNewPREF()">Submit New Form</b-button>
                             <b-button variant="danger" type="submit" class="mr-xs" v-if="prefUpdate==true" @click="updatePREF()">Update Form</b-button> 

            </b-tab>
               <b-tab title="Programmes" >
                  <b-button variant="primary" type="submit" class="mr-xs"  @click="submitNewProgramme()">Create New Programme</b-button><br><br><br>
           <div class="table-responsive">
           <table class="table table-hover" id="datatable2">
             <thead>
               <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                  <th>Actions</th>
                     
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>
           </div>
          </b-tab>
       <!--   <b-tab title="Surveys">
         <table class="table table-lg mb-0 table-striped">
                  <thead>
                    <tr class="text-muted">
                      <th>TYPE</th>
                      <th>DATE</th>
                      <th>Actions</th>                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Customer Satisfaction Survey (1 MONTH)</td>
                      <td>22nd March 2020</td>
                      <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="primary" 
                        >
                    View Results
                        </b-button> &nbsp;
                        
                      </td>
                    </tr>
                     <tr>
                  <td>Customer Satisfaction Survey (3 MONTHS)</td>
                      <td>22nd MAY 2020</td>
                     <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="primary" 
                        >
                    View Results
                        </b-button> &nbsp;
                        
                      </td>
                    </tr>
                     <tr>
                    <td>Customer Satisfaction Survey (6 MONTHS)</td>
                      <td>22nd September 2020</td>
                     <td>
                        <b-button
                                                    class="p-1 px-3 btn-xs" variant="primary" 
                        >
                    View Results
                        </b-button> &nbsp;
                        
                      </td>
                    </tr>
                  </tbody>
                </table>
          </b-tab>
         
        <b-tab title="Actions">
              <b-form>
            <fieldset>
   <legend>Account Recovery </legend>
     <b-badge variant="success" v-if="data.status==1">STATUS : ACTIVE ACCOUNT</b-badge><b-badge variant="warning" v-if="data.status==0">STATUS : EMAIL NOT VERIFIED</b-badge><b-badge variant="danger" v-if="data.status==-1">STATUS : ACCOUNT SUSPENDED</b-badge> <br><br>
       <b-button type="button" variant="success" class="btn-rounded" @click="activateAccount()" v-if="data.status==-1">
           Activate Account    
        </b-button>      
        <b-button type="button" variant="danger" class="btn-rounded" @click="suspendAccount()" v-if="data.status!= -1">
          Suspend Account    
        </b-button> 
      &nbsp;  <b-button type="button" variant="primary" class="btn-rounded" @click="forgotPassword()" >
         Forgot Password / Send Password Reset E-mail
        </b-button>    
      &nbsp;&nbsp;  <b-button type="button" variant="info" class="btn-rounded" @click="activationEmail()" >
         Send Account Activation Email
        </b-button>                              
            </fieldset>
<br>
                    
          </b-form>
          </b-tab>
          
                    <b-tab title="History">
        
              <div v-for="notification in mock.notifications"
                class="d-flex align-items-start" :key="notification.id">
                <i :class="`la la-${notification.icon} mr text-${notification.color}`" />
                <p
                  :class="{ 'mb-0': notification.id === mock.notifications.length - 1 }"
                  v-html="notification.content"
                />
              </div>
       
          </b-tab> -->
                              
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
import personalInformation from '../DBC/PersonalForm/PersonalInformation'
import importantInfo from '../DBC/PersonalForm/Important'
import workInfo from '../DBC/PersonalForm/WorkInformation'
import DatePicker from 'vue2-datepicker';
import vSelect from 'vue-select';
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
  components: { Widget, DatePicker,
        vSelect,
        personalInformation,
        importantInfo,
        workInfo },
  data() {
    return {
          extras:{
            doctors:[],
            hospitals:[],
            doctor_types:[],
            employers:[],
            race:[],
            religion:[],
            nationality:[],
            salutation:[],
          },
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
              style: {
                top: "0px",
                left: "282px"
              },
              style2: {
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
              id: "1f",
              label: "Hand Left",
              style: {
                top: "89px",
                left: "-68px"
              }
            },
            {
              id: "1g",
              label: "Hand Right",
              style: {
                top: "61px",
                left: "296px"
              },
              style2: {
                top: "61px",
                left: "-233px"
              }
            },
            {
              id: "1h",
              label: "Hip Left",
              style: {
                top: "35px",
                left: "198px"
              },
              style2: {
                top: "35px",
                left: "-117px"
              }
            },
            {
              id: "1i",
              label: "Hip Right",
              style: {
                top: "39px",
                left: "251px"
              },
              style2: {
                top: "0px",
                left: "-175px"
              }
            },
            {
              id: "1j",
              label: "Knee Left",
              style: {
                top: "58px",
                left: "-169px"
              }
            },
            {
              id: "1k",
              label: "Knee Right",
              style: {
                top: "25px",
                left: "-128px"
              }
            },
            {
              id: "1l",
              label: "Ankle Left",
              style: {
                top: "115px",
                left: "-128px"
              }
            },
            {
              id: "1m",
              label: "Ankle Right",
              style: {
                top: "91px",
                left: "245px"
              },
              style2: {
                top: "80px",
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
                            id: '1x',
                            label: 'No regular medication ',
                        },
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
                            label: 'Hormone Therapy  ',
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
                            id: '1x',
                            label: 'No Disease and health risk factors below',
                        },

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
                            label: 'Physiotherapist Or Occupational Therapist',
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
      data:{},
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
        t2c1:[],
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
      pnform:{
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
                  religion:'',
                  nationality:'',
                  salutation:''},
      memberId: this.$route.params.memberId,
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
 
  methods:
   {
 async getAllDoctors() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/doctors')
 //  console.log(response)
  if(response.data.success){
   
   self.extras.doctors = response.data.doctorInfo;
  
  }

 
  } catch (error) {
    console.error(error);
  }
},
 async getAllRace() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/race')
 //  console.log(response)
  if(response.data.success){

   self.extras.race = response.data.raceInfo;
 
  }

 
  } catch (error) {
    console.error(error);
  }
},
 async getAllReligion() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/religion')
 //  console.log(response)
  if(response.data.success){
   
   self.extras.religion = response.data.religionInfo;
  
  }

 
  } catch (error) {
    console.error(error);
  }
},
 async getAllNationality() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/nationality')
 //  console.log(response)
  if(response.data.success){
   
   self.extras.nationality = response.data.nationalityInfo;
  
  }

 
  } catch (error) {
    console.error(error);
  }
},
 async getAllDoctorTypes() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/doctortypes')
 //  console.log(response)
  if(response.data.success){
   
   self.extras.doctor_types = response.data.doctorTypeInfo;
  
  }

 
  } catch (error) {
    console.error(error);
  }
},
 async getAllHospitals() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/hospitals')
 //  console.log(response)
  if(response.data.success){
   
   self.extras.hospitals = response.data.hospitalInfo;
  
  }

 
  } catch (error) {
    console.error(error);
  }
},
 async getAllEmployers() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/employers')
 //  console.log(response)
  if(response.data.success){
   
   self.extras.employers = response.data.employerInfo;
  
  }

 
  } catch (error) {
    console.error(error);
  }
},
 async getAllSalutation() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/all/salutation')
 //  console.log(response)
  if(response.data.success){
   
   self.extras.salutation = response.data.salutationInfo;
  
  }

 
  } catch (error) {
    console.error(error);
  }
},
        submitNewPREF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/preinformationForm', {
                  id:self.memberId,
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
            submitNewProgramme(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/programme', {
                  memberId:self.memberId,
                  username:self.data.username
                       
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
         updatePREF(){
  var self=this;
   
         self.axios.patch('https://backend.medicodesolution.com/staging/preinformationForm/'+ this.memberId, {
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
        submitNewPF(){
    var self=this;
   
         self.axios.post('https://backend.medicodesolution.com/staging/personalForm', {
                  id:self.memberId,
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
                  religion:self.pform.religion,
                  nationality:self.pform.nationality,
                  salutation:self.pform.salutation

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
   
         self.axios.patch('https://backend.medicodesolution.com/staging/personalForm/'+ this.memberId, {
                 
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
                  religion:self.pform.religion,
                   nationality:self.pform.nationality,
                     salutation:self.pform.salutation
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
    async getUser() {
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/members/'+ this.memberId)
   this.data = response.data.memberInfo[0];
   if(this.data.photoUrl!='' && this.data.photoUrl!=null){
     this.photoUrl = this.data.photoUrl;
   }
 
  } catch (error) {
    console.error(error);
  }
},
    async getPF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/personalForm/'+ this.memberId)
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
    
 
    async getPREF() {
      const self = this;
  try {
   const response = await this.axios.get('https://backend.medicodesolution.com/staging/preinformationForm/'+ this.memberId)
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
   
  },
   mounted(){
        this.getUser();
        this.getPF();
        this.getPREF(); 
        this.getAllDoctors();
         this.getAllDoctorTypes();
        this.getAllHospitals();
         this.getAllEmployers();
          this.getAllRace();
           this.getAllReligion();
            this.getAllNationality();
            this.getAllSalutation();
 
      $(document).ready(function() {
       var memberId = $("#memberId").attr("data-id");
       
     var table =  $('#datatable').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/staging/bookingslist/"+memberId,
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
  
       var table2 =  $('#datatable2').DataTable( {
		"processing": true,
		"order": [[ 0, "id" ]],
        "serverSide": true,
          "dom": 'Bfrtip',
		"ajax": "https://backend.medicodesolution.com/staging/programmeslist/"+memberId,
		"columnDefs": [
       {
      "data": null,
      "defaultContent": "<button class='btn' id='view' title='View Programme'><i class='fa fa-pencil'></i></button>",
      "targets": -1,
       "searchable": false,
      "orderable": false,
    },
  	{ "targets" : 5,
          "render" : function (data, type, row) {
            if(data == 0) return 'Inactive';
           else if(data == 1) return 'Active';
             else if(data == 2) return 'Completed';
              else if(data == -1) return '***TO DELETE***';
            
          },
        }	
	
  ]
	} );
	




    $('#datatable tbody').on( 'click', '#view', function () {
		var data = table.row( $(this).parents('tr') ).data();
  //  window.location.href = 'bookingsview/' + data[0] ;
     window.open('https://physio.dbcphysioasia.com/app/bookingsview/' + data[0]);
    } );

       $('#datatable2 tbody').on( 'click', '#view', function () {
		var data = table2.row( $(this).parents('tr') ).data();
  //  window.location.href = 'membersprogramme/' + data[0] ;
  window.open('https://physio.dbcphysioasia.com/app/membersprogramme/' + data[0]);
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