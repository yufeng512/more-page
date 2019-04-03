import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    showLoading: false
  },
  modules: {
    mutations
  },
  actions
})
console.log(store)
export default store