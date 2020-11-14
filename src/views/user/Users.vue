<template>
    <div>
        <button class="btn btn-info" @click="addUser()">Add User</button>
        <p></p>
        <table class="table">
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Property</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(user,index) in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{  user.email }}</td>
              <td>{{  user.role }}</td>
              <td>
                <ul>
                  <li v-for=" property in user.property" :key="property.id">{{ property.property_name }}</li>
                </ul>
              </td>
              <td><div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle btn-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Action
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" @click="editUser(user,index)">Edit</a>
                  <a class="dropdown-item" @click="deleteUser(user,index)">Delete</a>
                  <a class="dropdown-item" @click="mapToProperty(user,index)">Maps property</a>
                  <a class="dropdown-item" @click="updatePassword(user)">Update Password</a>
                </div>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
         <div v-if="showModal">
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ action }} User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="closeModal">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                       <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul class="errors">
                          <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
                        </ul>
                      </p>

                       <form  v-if="action==='Edit'">
                            <label for="name">Name: </label><input type="text" class="form-control" name="name" id="name" v-model="userDetail.name">
                            <label for="email">Email: </label><input type="email" class="form-control" name="email" id="email" v-model="userDetail.email">
                            <label for="role">Role: </label><select name="Role" id="Role" class="form-control" v-model="userDetail.role">
                                <option value="" >--Select Role--</option>
                                <option v-bind:value="role.value" v-bind="{ 'selected':(userDetail.role===role.value)}" v-for="role in roles" :key="role.id">{{ role.value }}</option>
                            </select>
                            <label for="satus">Status: </label><select name="status" id="status" class="form-control" v-model="userDetail.status">
                                <option value="" >--Select Status--</option>
                                <option v-bind:value="status.value" v-bind="{ 'selected':(userDetail.status==='active')}" v-for=" status in statuses" :key="status.id">{{ status.value }}</option>
                            </select>
                       </form>
                       <form  v-if="action==='Add'">
                            <label for="name">Name: </label><input type="text" class="form-control" name="name" id="name" v-model="newUser.name">
                            <label for="email">Email: </label><input type="email" class="form-control" name="email" id="email" v-model="newUser.email">
                            <p>
                              <label for="password">Password: </label><input type="password" class="form-control" name="password" id="password" v-model="newUser.password">
                               <small>Minumum 6 characther</small>
                            </p>
                            <label for="role">Role: </label><select name="Role" id="Role" class="form-control" v-model="newUser.role">
                                <option value="" >--Select Role--</option>
                                <option v-bind:value="role.value" v-for="role in roles" :key="role.id">{{ role.value }}</option>
                            </select>
                            <label for="satus">Status: </label><select name="status" id="status" class="form-control" v-model="newUser.status">
                                <option value="" >--Select Status--</option>
                                <option v-bind:value="status.value"  v-for=" status in statuses" :key="status.id">{{ status.value }}</option>
                            </select>
                       </form>
                       <form v-if="action==='updatePassword'">
                         <div>
                            <label for="chgPassword">
                              Password</label><input type="password" class="form-control"  id="chgPassword" v-model="newUser.password" >
                              <small>Minumum 6 characther</small>
                            <p>
                              <label for="chgPassword2">Retype Password</label><input type="password" class="form-control"  id="chgPassword2" v-model="newUser.rePassword" >
                              <small>Minumum 6 characther</small>
                            </p>
                        </div>
                       </form>
                       <div v-if="action==='MapsProperty'">
                         <label for="propertyList">Propery List</label>
                         <select name="" id="multiSelect" class="form-control" v-model="tProperty" @change="pushProperty()">
                           <option :value="property" v-for="property in properties" :key="property.id">{{property.property_name}}</option>
                         </select>
                         <p class="propertySelected">
                           <ul>
                             <li :id="'propertySelected'+index" v-for="(list,index) in propertySelected" :key="index">{{ list.property_name }} <button @click="removePS(index)" class="btn btn-sm btn-info">X</button></li>
                           </ul>
                        </p>
                       </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveChange">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </transition>
        </div>
        <Loading v-if="showLoading" />

    </div>
</template>
<script>
import Axios from 'axios'
import Loading from '@/components/Loading'
import { mapGetters } from 'vuex'

export default {
  components: { Loading },
  data () {
    return {
      users: [],
      properties: [],
      propertySelected: [],
      tProperty: [],
      errors: [],
      showModal: false,
      showLoading: false,
      userDetail: [],
      action: null,
      indexActive: null,
      newUser: {
        name: null,
        email: null,
        password: null,
        rePassword: null,
        role: null,
        status: 'active'
      }
    }
  },
  created () {
    this.checkStatus()
    this.getUsers()
  },
  computed: {
    ...mapGetters({
      roles: 'roles',
      statuses: 'statuses'
    })
  },
  methods: {
    checkStatus: function () {
      if (this.$store.state.auth.isLoggedIn === false) {
        this.$router.push({ name: 'Login' })
      } else {
        if (this.$store.state.auth.user.role === 'assistance') {
          this.$router.push({ name: 'Home' })
        }
      }
    },
    getUsers: function () {
      Axios.get('user').then(response => {
        if (response.data.success === false) {
          console.log(response.data.errors)
        } else {
          this.users = response.data.data
        }
      }).catch(err => {
        this.errors = err
      })
    },
    editUser: function (data, index) {
      this.showModal = true
      this.userDetail = data
      this.action = 'Edit'
      this.indexActive = index
      this.newUser.name = data.name
      this.newUser.email = data.email
      this.newUser.role = data.role
    },
    addUser: function () {
      this.showModal = true
      this.userDetail = []
      this.newUser.name = ''
      this.newUser.email = ''
      this.newUser.role = ''
      this.newUser.status = ''
      this.action = 'Add'
    },
    updatePassword: function (data, index) {
      this.showModal = true
      this.userDetail = data
      this.action = 'updatePassword'
      this.newUser.password = null
      this.newUser.rePassword = null
    },
    saveChange: function () {
      if (this.validationForm()) {
        if (this.action === 'Edit') {
          const id = this.userDetail.id
          this.showLoading = true
          Axios.put('user/' + id, this.userDetail).then(response => {
            const res = response.data
            if (res.success === false) {
              this.errors = res.errors
            } else {
              this.userDetail = response.data.data
              this.users[this.indexActive] = response.data.data
              this.errors = []
              alert('data updated succesfuly')
              this.showModal = false
              this.showLoading = false
            }
          }).catch(err => {
            this.errors = err
            console.log(this.errors)
            this.showLoading = false
          })
        }
        if (this.action === 'Add') {
          this.showLoading = true
          Axios.post('user', this.newUser).then(response => {
            const res = response.data
            if (res.success === false) {
              this.errors = res.errors
              this.showLoading = false
            } else {
              this.users.unshift(res.data)
              alert('data Saved succesfuly')
              this.newUser = []
              this.errors = []
              this.showModal = false
              this.showLoading = false
            }
          }).catch(err => {
            this.errors = err
            console.log(this.errors)
            this.showLoading = false
          })
        }
        if (this.action === 'updatePassword') {
          this.showLoading = true
          const id = this.userDetail.id
          Axios.put('changePassword/' + id, this.newUser).then(response => {
            this.showLoading = false
            if (response.data.success === false) {
              this.errors = response.data.errors
            } else {
              alert(response.data.message)
              this.showModal = false
              this.showLoading = false
            }
          }).catch(err => {
            this.errors = err.data
            this.showLoading = false
          })
        }
      }
      if (this.action === 'MapsProperty') {
        Axios.put('userProperty/' + this.userDetail.id, this.propertySelected).then(response => {
          if (response.data.success === true) {
            alert(response.data.message)
            this.getUsers()
            this.showModal = false
            this.propertySelected = []
            this.userDetail = []
          } else {
            alert(response.data.errors)
          }
        })
      }
    },
    deleteUser: function (data, index) {
      Axios.delete('user/' + data.id).then(response => {
        if (response.data.success === false) {
          this.errors = response.data.errors
        } else {
          this.showModal = false
          alert(response.data.message)
          this.users[index].status = response.data.data.status
        }
      }).catch(err => {
        this.errors = err.data
      })
    },
    mapToProperty: function (user, index) {
      this.showLoading = true
      this.showModal = true
      this.action = 'MapsProperty'
      this.userDetail = user
      this.propertySelected = user.property
      Axios.get('property').then(response => {
        if (response.data.success === true) {
          this.properties = response.data.data
        } else {
          alert(response.data.errors)
        }
        this.showLoading = false
      })
    },
    removePS: function (index) {
      this.propertySelected.splice(index, 1)
    },
    pushProperty: function (index) {
      var l = this.propertySelected.length
      var exist = false
      for (var i = 0; i < l; i++) {
        if (this.propertySelected[i].id === this.tProperty.id) {
          exist = true
        }
      }
      if (exist === false) {
        this.propertySelected.push(this.tProperty)
      } else {
        alert('already Exist')
      }
    },
    closeModal: function () {
      this.indexActive = null
      this.showModal = false
      this.errors = []
    },
    validationForm: function () {
      var cErrors = []
      if (this.action === 'Edit') {
        if (this.userDetail.name && this.userDetail.email && this.userDetail.role && this.userDetail.status) {
          return true
        } else {
          if (!this.userDetail.name) {
            cErrors.push('Name required.')
          }
          if (!this.userDetail.email) {
            cErrors.push('Email required.')
          } else if (!this.validEmail(this.newUser.email)) {
            cErrors.push('Valid email required.')
          }
          if (!this.userDetail.role) {
            cErrors.push('Role required.')
          }
          if (!this.userDetail.status) {
            cErrors.push('Status required.')
          }
          this.errors = cErrors
          return false
        }
      }
      if (this.action === 'Add') {
        if (this.newUser.name && this.newUser.email && this.newUser.role && this.newUser.status && this.newUser.password) {
          if (this.newUser.password.length < 6) {
            cErrors.push('Password minimum 6 characther.')
            this.errors = cErrors
            return false
          } else {
            return true
          }
        } else {
          if (!this.newUser.name) {
            cErrors.push('Name required.')
          }
          if (!this.newUser.email) {
            cErrors.push('Email required.')
          } else if (!this.validEmail(this.newUser.email)) {
            cErrors.push('Valid email required.')
          }

          if (!this.newUser.password) {
            cErrors.push('Password required.')
          }
          if (!this.newUser.role) {
            cErrors.push('Role required.')
          }
          if (!this.newUser.status) {
            cErrors.push('Status required.')
          }
          this.errors = cErrors
          return false
        }
      }
      if (this.action === 'updatePassword') {
        if (this.newUser.rePassword && this.newUser.password) {
          if (this.newUser.password.length < 6 || this.newUser.rePassword.length < 6) {
            cErrors.push('Password minimum 6 characther.')
            this.errors = cErrors
            return false
          } else {
            return true
          }
        } else {
          if (!this.newUser.password) {
            cErrors.push('Password required.')
          }
          if (!this.newUser.rePassword) {
            cErrors.push('Retype Password required.')
          }
          this.errors = cErrors
          return false
        }
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>
<style lang="css" scoped>
  ul.errors>li {
    color:red;
  }
</style>
