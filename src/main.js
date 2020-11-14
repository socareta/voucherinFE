import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { setHeaderToken } from './utils/auth'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  setHeaderToken(token)
  store.dispatch('getMeta')
}

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    checkStatus: function () {
      if (this.$store.state.auth.isLoggedIn === false) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}).$mount('#app')

Vue.config.productionTip = false
