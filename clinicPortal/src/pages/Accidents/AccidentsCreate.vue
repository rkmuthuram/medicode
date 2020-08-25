<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Create New Booking</li>
    </ol>


    <b-row>
      <b-col xs='0' lg='1' />
      <b-col lg='8' xs='12'>
        <Widget
          title="<h5>        
            <small> Fill up & click Submit</small>
          </h5>"
          customHeader 
        >
          <b-form @submit="onSubmit">
            <fieldset>
              <legend>
               
              </legend>
                <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="username"
                    description="Full / Nick name of member"
              >
                <div slot="label">
                  User ID
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:5'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
                v-model="user_id"
                />
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
              </b-form-group>
                <b-form-group
                horizontal
                label="E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="email"
                description="Primary login / Must be unique for every member"
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                  type="text"
                 v-model="email"
                />
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </span>
              </b-form-group>

            <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="tel_no"
                description="Contact number / If overseas include call code"
              >
                <div slot="label">
                  Telephone Number
                </div>
                <input
                  data-vv-validate-on="change"
                  v-validate="'required|min:7'"
                  name="minlength"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('minlength')}"
                  type="text"
               v-model="tel_no"
                />
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
              </b-form-group>
              
           <b-form-group
                horizontal
                label="Password helpers"
                :label-cols="3"
                label-breakpoint="md"
                label-for="password"
              >
                <input
                  v-validate="'required|min:6'"
                  name="password"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('password')}"
                  type="password"
                  id="password"
                  v-model="password"
                  ref="password"
                />
                <span class="text-danger" v-if="errors.has('password')">
                  {{ errors.first('password') }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                :label-cols="3"
                label-breakpoint="md"
                label-for="password_repeat"
              >
                <input
                  v-validate="'required|min:6|confirmed:password'"
                  name="password_repeat"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('password_repeat')}"
                  type="password"
                  id="password_repeat"
                />
                <span class="text-danger" v-if="errors.has('password_repeat')">
                  {{errors.first('password_repeat')}}
                </span>
              </b-form-group>
                
            </fieldset>
            <div class="form-action">
              <b-button type="submit" variant="danger" class="btn-rounded float-right">
                Submit
              </b-button>
              <b-button type="button" variant="default" class="btn-rounded" @click="navigateToList()" >
                Cancel
              </b-button>
            </div>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'FormValidation',
  components: { Widget },
  data() {
    return {
      username: '',
      email: '',
      tel_no: '',
      password: '',
    };
  },
  methods: {
    navigateToList(){
        this.$router.push({name:'MembersListing'});
    },

    onSubmit(e) {
      e.preventDefault();
    this.$validator.validateAll().then((result) => {
		  if (result) {
                this.axios.post('https://backend.medicodesolution.com/staging/members', {
                    username: this.username,
                    email:this.email,
                    tel_no:this.tel_no,
                    password: this.password,
                })
                .then(function (response) {
                if(response.status == 200 && response.data.success){
             		window.location.href = 'app/memberslisting' ;
                }
                else {
                     console.log(response.error);
                     alert(response.error);
                }
                })
                .catch(function (error) {
                    console.log(error);
                        alert(error);
                });   
		  }
                  if(!result){
        	          
                  }
		});
    },


  },
};
</script>
