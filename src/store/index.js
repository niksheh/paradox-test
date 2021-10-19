import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movedItem: undefined
  },
  mutations: {
    setMovedItem(state, value) {
      state.movedItem = value
    }
  },
  actions: {
  },
  modules: {
  }
})
