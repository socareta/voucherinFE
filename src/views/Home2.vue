<template>
  <div class="home">
    <h1>Welcome to voucherin  Dashboard</h1>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-12">
        <div class="card" style="width: 18rem;">
          <div class="card-header">
            Featured
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12">
        <div class="card" style="width: 18rem;">
          <div class="card-header">
            Featured
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import Axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Home2',
  data () {
    return {
      users: [],
      errors: null
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  created () {
    this.checkStatus()
  },
  methods: {
    checkStatus: function () {
      if (this.isLoggedIn === false) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>
