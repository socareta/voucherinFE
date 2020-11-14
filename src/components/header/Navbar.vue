/* eslint-disable handle-callback-err */
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
          <router-link class="navbar-brand" to="/">VOUCHERIN</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <template v-if="isLoggedIn">
              <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Setup
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/users">Users</a>
                  <a class="dropdown-item" href="/property">Property</a>
                </div>
              </li>
              <li class="nav-item">
              <router-link class="nav-link" to="/voucher">Voucher</router-link>
              </li>
            </template>
          </ul>
          <ul class="navbar-nav">
            <template v-if="isLoggedIn">
              <li class="nav-item dropdown">
                <select name="" id="" class="form-control" v-model="propertySelected" v-on:change="propertyChange">
                  <option :value="property.id" v-for="(property, index) in properties" :key="index" :selected="property.id == propertyActive? true: false">{{ property.property_name }}</option>
                </select>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="ddUser" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {{ user.name }}
                </a>
                <div class="dropdown-menu" aria-labelledby="ddUser">
                  <router-link class="dropdown-item" to="/profile">Profile </router-link>
                  <a class="dropdown-item" href="/property">Property</a>
                  <a class="dropdown-item" @click="logout">Logout</a>
                </div>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
            </template>
          </ul>
          </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      propertyActive: null,
      propertySelected: []
    }
  },
  created () {
    this.checkpropertySelected()
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      user: 'user',
      properties: 'properties'
    })
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'Login' })
        alert('You Are logout')
      })
    },
    propertyChange: function () {
      localStorage.setItem('propertyActive', this.propertySelected)
      location.reload()
    },
    checkpropertySelected: function () {
      if (this.isLoggedIn) {
        if (localStorage.getItem('propertyActive') == null) {
          this.propertyActive = this.properties !== null ? this.properties[0] : 0
          localStorage.setItem('propertyActive', this.propertyActive.id)
        } else {
          this.propertySelected = localStorage.getItem('propertyActive')
        }
      }
    }
  }
}
</script>
