import Vue from 'Vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions.js'
import mutations from './mutations.js'

export default new Vuex.Store({
    modules:{
        mutations
    },
    actions
})