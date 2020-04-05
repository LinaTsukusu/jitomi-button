import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertConfig: {}
  },
  mutations: {
    showAlert(state, alertConfig: {msg: string; color: string}) {
      state.alertConfig = alertConfig
    }
  },
  actions: {
  },
  modules: {
  }
})
