import Vue from "vue";
import Vuex from "vuex";
import state from './modules/state.js'
import getters from './modules/getters.js'
import actions from './modules/actions.js'
import mut from './modules/mut.js'

import localStore from './persistState.js'
Vue.use(Vuex);
let store = new Vuex.Store({
state:state,
mutations:mut,
actions:actions,
getters:getters,
})

 store.subscribe(localStore) 
export default store