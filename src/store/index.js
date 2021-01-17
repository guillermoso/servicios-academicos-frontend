import Vue from 'vue'
import Vuex from 'vuex'
import { state } from '@/store/state.js'
import { getters } from '@/store/getters'
import { mutations } from '@/store/mutations.js'
import { actions } from '@/store/actions.js'
import { auth } from '@/store/modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    auth: auth,
  },
  state,
  getters,
  mutations,
  actions
})
