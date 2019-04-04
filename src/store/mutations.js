import * as types from './type.js'

const state = {
  showLoading: false
}

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
  state, mutations, getters
}
