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






Vue.use(Vuetify)
Vue.use(ChartKick.use(Chart)) 
Vue.use(VueEllipseProgress);
Vue.config.productionTip = false;
Vue.use(VCalendar);
Vue.component('calendar', Calendar);
Vue.component('date-picker', DatePicker);


/* store.subscribe( (mutation, state) => {
  localStorage.setItem('purchases', JSON.stringify(state.purchases));  
  
})  */

new Vue({
  render: h => h(App)
 
}).$mount('#app')
