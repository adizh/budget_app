import Vue from 'vue';
import App from './App.vue';
import FlagIcon from 'vue-flag-icon';
import VCalendar from 'v-calendar';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import VueEllipseProgress from 'vue-ellipse-progress';
import ChartKick from 'vue-chartkick';
import Chart from 'chart.js';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import './assets/css/styles.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import i18n from "./plugins/i18n.js";


import store from './vuex/store.js'



Vue.use(BootstrapVue)

Vue.use(IconsPlugin)



Vue.use(Vuetify)
Vue.use(ChartKick.use(Chart)) 
Vue.use(VueEllipseProgress);
Vue.config.productionTip = false;
Vue.use(VCalendar);
Vue.component('calendar', Calendar);
Vue.component('date-picker', DatePicker);
Vue.use(FlagIcon);



new Vue({
  render: (h) => h(App),
  i18n,
 beforeCreate() {
		this.$store.commit('initialiseStore');
	}, 
  store
  
}).$mount("#app");


