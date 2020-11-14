import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    properties: null,
    statuses: null,
    roles: null,
    propertyType: null,
    propertyActive: null,
    getMeta: false
  },
  mutations: {
    setProperties (state, data) {
      state.properties = data
    },
    setStatuses (state, data) {
      state.statuses = data
    },
    setRoles (state, data) {
      state.roles = data
    },
    setPropertyTypes (state, data) {
      state.propertyType = data
    },
    setPropertyActive (state, data) {
      state.propertyActive = data
    },
    setGetMeta (state) {
      state.getMeta = true
    },
    resetMeta (state) {
      state.properties = null
      state.statuses = null
      state.roles = null
      state.propertyType = null
      state.propertyActive = null
      state.getMeta = false
    }
  },
  getters: {
    properties (state) {
      return state.properties
    },
    propertySelected (state) {
      return state.propertyActive
    },
    grabGetMeta (state) {
      return state.getMeta
    },
    getStatuses (state) {
      return state.statuses
    },
    roles (state) {
      return state.roles
    },
    statuses (state) {
      return state.statuses
    }
  },
  actions: {
    setPropertyActive ({ commit }, data) {
      return new Promise((resolve) => {
        commit('setPropertyActive', data)
        resolve()
      })
    }
  },
  modules: {
    auth
  }
})
