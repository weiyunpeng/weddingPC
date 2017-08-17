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
import mealDetails from './modules/mealDetails'
import thisMealList from './modules/thisMealList'
import camaraman from './modules/camaraman'
import makeupman from './modules/makeupman'
import busSample from './modules/busSample'
import busSampleTag from './modules/busSampleTag'
import thisMealTag from './modules/thisMealTag'
import index from './modules/index'
import viewPhoto from './modules/viewPhoto'
import authInfo from './modules/auth'
import user from './modules/user'
import guide from './modules/guide'
import collect from './modules/collect'
import shopStore from './modules/shopStore'

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
      mealDetails,
      thisMealList,
      camaraman,
      makeupman,
      busSample,
      busSampleTag,
      thisMealTag,
      index,
      viewPhoto,
      authInfo,
      user,
      guide,
      collect,
      shopStore
  },
  strict: debug
})
