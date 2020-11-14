<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <div class="alert alert-danger" v-if="errors != null">
            {{ errors }}
          </div>
          <form @submit.prevent="userLogin">
            <div class="form-group">
              <label for="email">Email address</label>
              <input v-model="form.email" type="email" required class="form-control" placeholder="Email..">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model='form.password' type="password" required    class="form-control" placeholder="Password..">
            </div>
            <button type="submit" class="btn btn-primary">{{ btnText }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      btnText: 'Submit',
      errors: null
    }
  },
  created () {
    this.checkStatus()
  },
  methods: {
    checkStatus: function () {
      if (this.$store.state.auth.isLoggedIn === true) {
        this.$router.push({ name: 'Home2' })
      }
    },
    userLogin () {
      this.btnText = 'Please wait...'
      this.$store.dispatch('login', this.form)
        .then(Response => {
          this.$router.push({ name: 'Home2' })
        // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          console.log(err)
          this.errors = 'Incorect password or email  '
          this.btnText = 'Submit'
        })
    }
  }
}
</script>
