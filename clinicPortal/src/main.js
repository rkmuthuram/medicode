// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'expose-loader?jQuery!jquery' // eslint-disable-line
import 'expose-loader?$!jquery' // eslint-disable-line
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VCalendar from 'v-calendar';

import VueTextareaAutosize from 'vue-textarea-autosize';
import trumbowyg from 'vue-trumbowyg';
import mavonEditor from 'mavon-editor';
import { VueMaskDirective } from 'v-mask';
import VueSlider from 'vue-slider-component';
import VeeValidate from 'vee-validate';
import VueFormWizard from 'vue-form-wizard';
import { ClientTable } from 'vue-tables-2';
import Trend from 'vuetrend';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import store from './store';
import router from './Routes';
import App from './App';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts';
import moment from 'moment';
import PrettyCheckbox from 'pretty-checkbox-vue';
Vue.use(BootstrapVue);
Vue.component('apexchart', VueApexCharts);

Vue.use(PrettyCheckbox);

Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
});

Vue.use(VueTextareaAutosize);
Vue.use(trumbowyg);
Vue.use(moment);
Vue.use(mavonEditor);
Vue.directive('mask', VueMaskDirective);
Vue.component('VueSlider', VueSlider);
Vue.use(VeeValidate, { fieldsBagName: 'fieldsbag' });
Vue.use(VueFormWizard);

Vue.use(ClientTable, { theme: 'bootstrap4' });
Vue.use(Trend);
Vue.use(VueReCaptcha, {
  siteKey: '6Lcs2rUUAAAAALkEBfuXdF9iiXg66yhqIvn40jEo',
  loaderOptions: {
    autoHideBadge: true
  }
});
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
//Vue.prototype.$link = 'https://backend.medicodesolution.com/staging';
//Vue.prototype.$link = 'https://backend.medicodesolution.com/staging';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
