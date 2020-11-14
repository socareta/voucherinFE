import Axios from 'axios'
import { removeHeaderToken, setHeaderToken } from '../utils/auth'

export default {
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    set_user (state, data) {
      state.user = data
      state.isLoggedIn = true
    },
    reset_user (state) {
      state.user = null
      state.isLoggedIn = false
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.isLoggedIn
    },
    user (state) {
      return state.user
    }
  },
  actions: {
    login ({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        Axios.post('login', data)
          .then(Response => {
            const token = Response.data.access_token
            setHeaderToken(token)
            localStorage.setItem('token', token)
            commit('set_user', Response.data.user)
            dispatch('getMeta')
            commit('setGetMeta')
            resolve(Response)
          })
          .catch(err => {
            commit('reset_user')
            commit('resetMeta')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    async get_user ({ commit }) {
      if (!localStorage.getItem('token')) {
        return
      }
      try {
        const response = await Axios.get('user-meta')
        commit('set_user', response.data.user)
        commit('setRoles', response.data.roles)
        commit('setStatuses', response.data.statuses)
        commit('setProperties', response.data.properties)
        commit('setPropertyActive', response.data.propertyActive)
        commit('setPropertyTypes', response.data.propertyTypes)
      } catch (error) {
        alert(error)
        commit('reset_user')
        commit('resetMeta')
        removeHeaderToken()
        localStorage.removeItem('token')
        location.href = 'login'
        return error
      }
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('reset_user')
        commit('resetMeta')
        localStorage.removeItem('token')
        localStorage.removeItem('vMeta')
        resolve()
      })
    },
    getMeta ({ commit }) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!localStorage.hasOwnProperty('vMeta')) {
          Axios.get('user-meta').then(response => {
            commit('set_user', response.data.user)
            commit('setRoles', response.data.roles)
            commit('setStatuses', response.data.statuses)
            commit('setProperties', response.data.properties)
            commit('setPropertyActive', response.data.propertyActive)
            commit('setPropertyTypes', response.data.propertyTypes)
            localStorage.setItem('vMeta', JSON.stringify({
              user: response.data.user,
              roles: response.data.roles,
              statuses: response.data.statuses,
              properties: response.data.properties,
              propertyTypes: response.data.propertyTypes
            }))
            localStorage.setItem('propertyActive', response.data.properties[0].id)
            resolve()
          })
        } else {
          const vMeta = JSON.parse(localStorage.getItem('vMeta'))
          commit('set_user', vMeta.user)
          commit('setRoles', vMeta.roles)
          commit('setStatuses', vMeta.statuses)
          commit('setProperties', vMeta.properties)
          commit('setPropertyTypes', vMeta.propertyTypes)
        }
      })
    }
  }
}
