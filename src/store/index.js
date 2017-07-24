import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import msg from './modules/msg'
import modal from './modules/modal'
import busList from './modules/busList'
import mealList from './modules/mealList'
import busTag from './modules/busTag'
import mealTag from './modules/mealTag'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
      msg,
      modal,
      busList,
      mealList,
      busTag,
      mealTag,
  },
  strict: debug
})
