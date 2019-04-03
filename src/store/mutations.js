import * as types from './type.js'

const mutations = {
  [types.SHOWLOADING](state) {
    state.showLoading = true
  },
  [types.HIDELOADING](state) {
    state.showLoading = false
  }
}

const getters = {
  showLoading(state) {
    return state.showLoading
  }
}

export default {
  mutations, getters
}
