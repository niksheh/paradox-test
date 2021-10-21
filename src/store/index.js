import Vue from 'vue'
import Vuex from 'vuex'
import ITEMS from '../data/items'
import CATEGORIES from '../data/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: ITEMS,
    categories: CATEGORIES
  }
})
