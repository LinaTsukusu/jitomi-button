import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state: {voiceData?: VoiceData} = {
}

export default new Vuex.Store({
  state,
  mutations: {
    setVoiceData: (state, payload) => {
      state.voiceData = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
