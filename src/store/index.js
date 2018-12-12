import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classList: []
  },
  mutations: {
    saveClassList(state, classList) {
      state.classList = classList
    }
  }
})
