import Vue from 'vue';
import App from './App.vue';

import VCalendar from 'v-calendar';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import VueEllipseProgress from 'vue-ellipse-progress';
import ChartKick from 'vue-chartkick';
import Chart from 'chart.js';
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";

// custom styles
import './assets/css/styles.scss'


import i18n from "./plugins/i18n.js";




Vue.use(Vuetify)
Vue.use(ChartKick.use(Chart)) 
Vue.use(VueEllipseProgress);
Vue.config.productionTip = false;
Vue.use(VCalendar);
Vue.component('calendar', Calendar);
Vue.component('date-picker', DatePicker);

import FlagIcon from 'vue-flag-icon';

Vue.use(FlagIcon);


new Vue({
  i18n,
  render: (h) => h(App),
}).$mount("#app");
