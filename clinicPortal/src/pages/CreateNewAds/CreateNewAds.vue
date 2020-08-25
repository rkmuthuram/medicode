<template>
  <b-row>
    <b-col xl='8' lg='12'>
      <Widget
        title="
        <div>
          <h4>
            Create New Ads Wizard&nbsp;
            <small></small>
          </h4>
          <p class='text-muted'>Follow these 4 simple steps to register your first campaign!</p>
        </div>"
        customHeader close collapse
      >
        <form-wizard
          shape="tab"
          color="#3498db"
          title=""
          subtitle=""
          @on-change="updateProgress"
          @on-loading="updateProgress(1, 1)"
        >
          <b-progress class="progress-xs" variant="gray-light" :value="progress" :max="4" />
          <b-button slot="prev" variant="primary">
            <i class="fa fa-caret-left" /> Previous
          </b-button>
          <b-button slot="next" variant="primary">
            Next <i class="fa fa-caret-right" />
          </b-button>
          <b-button slot="finish" variant="success">
            Finish <i class="fa fa-check" />
          </b-button>
            <tab-content title="1. Ad Content">
              <b-form>
                <b-form-group
                  label="Campaign Title"
                  label-for="username"
                  description="Title can contain any letters or numbers, with spaces"
                >
                  <b-form-input id="username" type="text" />
                </b-form-group>
                <b-form-group
                  label="Preferred Route"
                  label-for="destination"
                  description="Please choose your preferred city/route"
                >
                  <v-select
                    searchable
                    id="destination"
                    v-model="destinationSelect"
                    :options="countries"
                  />
                </b-form-group>
                <b-form-group
                  label="Description"
                  label-for="description"
                  description="Enter Ads Description"
                >
                 <b-form-textarea :rows="3" id="default-textarea" v-model="textAreaContent"/>
                </b-form-group>
                  <b-form-group
                  label="Launch Date"
                  label-for="description"
                  description="Select Launch Date"
                >
                  <DatePicker lang="en" :placeholder="datepickerText"
                    input-class="form-control" @change="selectDate">
                    <i class="glyphicon glyphicon-th" slot="calendar-icon" />
                  </DatePicker>
                </b-form-group>
                  <b-form-group
                  label="Upload Ad Content"
                  label-for="description"
                  description="Drag and Drop Files / Click on the box to start uploading"
                >
                 <vue-dropzone id="dropzone" :options="{ url: '/' }" />
             
                </b-form-group>
              </b-form>
            </tab-content>
            <tab-content title="2. Package Selection">
              <b-form>
               <b-card class="border-0" :img-src="rns">
          <small>25 rotations per day</small><br />
          <h4 class="mb mt-xs">
            Gold Package
          </h4>
          <hr />
          <div class="w-100 d-flex justify-content-between align-items-center">
            <span class="text-muted fw-semi-bold">from $49.95</span>
            <b-button variant="info">Select</b-button>
          </div>
        </b-card>
        <b-card class="border-0" :img-src="rns">
          <small>75 rotations per day</small><br />
          <h4 class="mb mt-xs">
            Platinum Package
          </h4>
          <hr />
          <div class="w-100 d-flex justify-content-between align-items-center">
            <span class="text-muted fw-semi-bold">from $49.95</span>
            <b-button variant="info">Select</b-button>
          </div>
        </b-card>
              </b-form>
            </tab-content>
            <tab-content title="3.Payment">
              <b-form>
                <b-form-group
                  label="Name on the Card"
                  label-for="cardname"
                >
                  <b-form-input id="cardname" />
                </b-form-group>
                <b-form-group
                  label="Credit card type"
                  label-for="cardtype"
                >
                  <v-select
                    searchable
                    id="cardtype"
                    v-model="cardtypeSelect"
                    :options="cardtype"
                  />
                </b-form-group>
                <b-form-group
                  label="Credit Card Number"
                  label-for="cardnumber"
                >
                  <b-form-input id="cardnumber" v-model="cardnumber"
                    type="text" v-mask="'#### #### #### ####'"/>
                </b-form-group>
                <b-form-group
                  label="Expiration Date"
                  label-for="exp"
                >
                  <b-form-input id="exp" v-model="exp"
                    type="text" v-mask="'##/##'"/>
                </b-form-group>
              </b-form>
            </tab-content>
            <tab-content title="4.Complete Submission">
              <fieldset>
                <h2>Thank you!</h2>
                <p>Your submission has been received.</p>
              </fieldset>
            </tab-content>
        </form-wizard>
      </Widget>
    </b-col>
  </b-row>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import Widget from '@/components/Widget/Widget';
import DatePicker from 'vue2-datepicker';
import vueDropzone from 'vue2-dropzone';
import { select2CountriesData, select2ShipmentData, cardTypesData } from './data';
import rns from '../../assets/cards/rns.png';

export default {
  name: 'FormWizardPage',
  components: { Widget, vSelect, DatePicker,vueDropzone },
  data() {
    return {
      progress: 1,
      destinationSelect: '',
      shippingSelect: '',
      cardtypeSelect: '',
      countries: select2CountriesData.map(c => c.text),
      shipping: select2ShipmentData.map(s => s.text),
      cardtype: cardTypesData.map(c => c.text),
      zip: '',
      cardnumber: '',
      exp: '',
      rns
    };
  },
  methods: {
    updateProgress(prevIndex, nextIndex) {
      if (nextIndex >= 0) {
        Vue.set(this, 'progress', nextIndex + 1);
      }
    },
  },
};
</script>

<style src="./CreateNewAds.scss" lang="scss" />
