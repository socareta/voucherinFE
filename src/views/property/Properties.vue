<template>
    <div>
        <button class="btn btn-info " @click="addProperty">Add Property</button><p></p>
        <p>
           <table class="table table-bordered">
                <thead>
                    <th>Name</th>
                    <th>Star</th>
                    <th>Room</th>
                    <th>State</th>
                    <th>reservation Email</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="(property,index) in properties" :key="property.id">
                        <td>{{ property.property_name }}</td>
                        <td>{{ property.star }}</td>
                        <td>{{ property.rooms }}</td>
                        <td>{{ property.property_state }}</td>
                        <td>{{ property.property_reservation_email }}</td>
                        <td><div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle btn-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Action
                            </a>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              <a class="dropdown-item" @click="editProperty(property,index)">Edit</a>
                              <a class="dropdown-item" @click="deleteProperty(property,index)">Delete</a>
                              <a class="dropdown-item" @click="deleteProperty(property,index)">Photo</a>
                            </div>
                          </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </p>
         <div v-if="showModal">
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">{{ action }} Property</h5>
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
                        <form >
                          <div class="row">
                            <div class="col-md-6">
                                <label for="property_name">Name: </label><input type="text" class="form-control" name="property_name" id="property_name" v-model="propertyDetail.property_name">
                                <label for="property_type">Property Type: </label>
                                <select class="form-control" name="property_type"  id="property_type" v-model="propertyDetail.property_type">
                                  <option :value="propertyType.value" v-for="propertyType in propertyTypes" :key="propertyType.id">{{ propertyType.value }}</option>
                                </select>
                                <label for="property_address">Property Address: </label><input type="text" class="form-control" name="property_address"  id="property_address" v-model="propertyDetail.property_address">
                                <label for="property_state">Property State: </label><input type="text" class="form-control" name="property_state"  id="property_state" v-model="propertyDetail.property_state">
                                <label for="property_country">Property Country: </label><input type="text" class="form-control" name="property_country"  id="property_country" v-model="propertyDetail.property_country">
                                <label for="property_website">Property Website: </label><input type="text" class="form-control" name="property_website"  id="property_website" v-model="propertyDetail.property_website">
                                <label for="star">Property Star: </label>
                                <select class="form-control" name="star"  id="star" v-model="propertyDetail.star">
                                  <option :value="star.value " v-for="star in stars" :key="star.id">{{ star.value }}</option>
                                </select>
                                <label for="rooms">Property Rooms: </label><input type="text" class="form-control" name="rooms"  id="rooms" v-model="propertyDetail.rooms">
                            </div>
                            <div class="col-md-6">
                                <label for="property_phone">Property Phone Number: </label><input type="text" class="form-control" name="property_phone"  id="property_phone" v-model="propertyDetail.property_phone">
                                <label for="property_facilties">Property Facilties: </label><input type="text" class="form-control" name="property_facilties"  id="property_facilties" v-model="propertyDetail.property_facilties">
                                <label for="property_PIC">Property Person Incharge(PIC): </label><input type="text" class="form-control" name="property_PIC"  id="property_PIC" v-model="propertyDetail.property_PIC">
                                <label for="property_PIC_title">Property PIC Title: </label><input type="text" class="form-control" name="property_PIC_title"  id="property_PIC_title" v-model="propertyDetail.property_PIC_title">
                                <label for="property_PIC_email">Property PIC Email: </label><input type="text" class="form-control" name="property_PIC_email"  id="property_PIC_email" v-model="propertyDetail.property_PIC_email">
                                <label for="property_reservation">Property Reservation: </label><input type="text" class="form-control" name="property_reservation"  id="property_reservation" v-model="propertyDetail.property_reservation">
                                <label for="property_reservation_email">Property Reservation Email: </label><input type="text" class="form-control" name="property_reservation_email"  id="property_reservation_email" v-model="propertyDetail.property_reservation_email">
                                <label for="status">status: </label>
                                <select class="form-control" name="status"  id="status" v-model="propertyDetail.status">
                                  <option v-bind:value="status.value" v-for="status in statuses" :key="status.id">{{ status.value }}</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                              <label for="">Logo</label>
                              <input type="file" id="logo" ref="logo" v class="form-control" v-on:change="logoSelected()"/>
                              <p><br><img v-bind:src="logo"  width="40%" height="40%" ></p>
                            </div>
                            <div class="col-md-6" >
                              <label for="">Cover Image</label>
                              <input type="file" id="cover" ref="cover" class="form-control" v-on:change="coverSelected()"/>
                              <p><br><img v-bind:src="cover"  width="40%" height="40%" ></p>
                            </div>
                          </div>
                          </form>
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
        <loading v-if="showLoading"/>
    </div>
</template>
<script>
import Axios from 'axios'
import Loading from '@/components/Loading.vue'

export default {
  components: { Loading },
  data () {
    return {
      properties: [],
      statuses: [],
      propertyTypes: [],
      stars: [],
      errors: [],
      showModal: false,
      showLoading: false,
      showMedia: false,
      propertyDetail: [],
      action: null,
      indexActive: null,
      fileLogo: null,
      fileCover: null,
      logo: 'http://localhost:8000/images/placeholder-image.png',
      cover: 'http://localhost:8000/images/placeholder-image.png'
    }
  },
  created () {
    this.getProperties()
    this.getMeta()
  },
  methods: {
    getProperties: function () {
      if (this.$store.state.auth.isLoggedIn === true) {
        Axios.get('property').then(response => {
          this.properties = response.data.data
        }).catch(err => {
          this.errors = err
        })
      }
    },
    getMeta: function () {
      Axios.get('property-meta').then(response => {
        if (response.data.success) {
          this.propertyTypes = response.data.data.propertyType
          this.statuses = response.data.data.status
          this.stars = response.data.data.star
        } else {
          console.log(response.data.errors)
        }
      }).catch(err => {
        this.errors = err.data
      })
    },
    editProperty: function (data, index) {
      this.showModal = true
      this.propertyDetail = data
      this.action = 'Edit'
      this.indexActive = index
      this.logo = data.logo.url
      this.cover = data.cover.url
    },
    addProperty: function () {
      this.showModal = true
      this.propertyDetail = []
      this.action = 'Add'
      this.genEmptyProperty()
      this.logo = 'http://localhost:8000/images/placeholder-image.png'
      this.cover = 'http://localhost:8000/images/placeholder-image.png'
    },
    deleteProperty: function (data, index) {
      this.showLoading = true
      Axios.delete('property/' + data.id).then(response => {
        if (response.data.success === true) {
          this.properties[index] = response.data.data
          alert(response.data.message)
          this.showLoading = false
        } else {
          alert(response.data.errors)
          this.showLoading = false
        }
        this.showLoading = false
      })
    },
    saveChange: function () {
      if (this.validateForm()) {
        this.showLoading = true
        if (this.action === 'Edit') {
          const id = this.propertyDetail.id
          Axios.put('property/' + id, this.propertyDetail).then(response => {
            if (response.data.success === true) {
              this.propertyDetail = response.data.data
              this.properties[this.indexActive] = response.data.data
              this.uploadImage()
            } else {
              this.errors = response.data.errors
              this.showLoading = false
            }
          }).catch(err => {
            this.errors = err
            console.log(this.errors)
            this.showLoading = false
          })
        }
        if (this.action === 'Add') {
          console.log(this.propertyDetail)
          Axios.post('property', this.propertyDetail).then(response => {
            if (response.data.success === true) {
              this.properties.unshift(response.data.data)
              this.propertyDetail = response.data.data
              this.uploadImage()
            } else {
              this.errors = response.data.errors
              this.showLoading = false
            //  console.log(this.errors)
            }
          }).catch(err => {
            this.errors = err
            console.log(this.errors)
            this.showLoading = false
          })
        }
      }
    },
    closeModal: function () {
      this.indexActive = null
      this.showModal = false
    },
    validateForm: function () {
      const errorsContainer = []
      if (this.propertyDetail.property_name && this.propertyDetail.property_type && this.propertyDetail.property_address && this.propertyDetail.property_state && this.propertyDetail.property_country && this.propertyDetail.property_website && this.propertyDetail.property_phone && this.propertyDetail.property_PIC && this.propertyDetail.property_PIC_title && this.propertyDetail.property_PIC_email && this.propertyDetail.property_reservation && this.propertyDetail.property_reservation_email && this.propertyDetail.status) {
        return true
      } else {
        if (!this.propertyDetail.property_name) {
          errorsContainer.push('Property Name Required')
        }
        if (!this.propertyDetail.property_type) {
          errorsContainer.push('Property Type Required')
        }
        if (!this.propertyDetail.property_address) {
          errorsContainer.push('Property Address Required')
        }
        if (!this.propertyDetail.property_state) {
          errorsContainer.push('Property State Required')
        }
        if (!this.propertyDetail.property_country) {
          errorsContainer.push('Property Country Required')
        }
        if (!this.propertyDetail.property_website) {
          errorsContainer.push('Property Website Required')
        }
        if (!this.propertyDetail.property_phone) {
          errorsContainer.push('Property Phone Number Required')
        }
        if (!this.propertyDetail.property_PIC) {
          errorsContainer.push('Property Person Incharge(PIC) Required')
        }
        if (!this.propertyDetail.property_PIC_title) {
          errorsContainer.push('Property PIC Title Required')
        }
        if (!this.propertyDetail.property_PIC_email) {
          errorsContainer.push('Property PIC meail Required')
        } else if (!this.validEmail(this.propertyDetail.property_PIC_email)) {
          errorsContainer.push('Property PIC meail inValid email.')
        }
        if (!this.propertyDetail.property_reservation) {
          errorsContainer.push('Property Reservation Required')
        }
        if (!this.propertyDetail.property_reservation_email) {
          errorsContainer.push('Property Reservation Email Required')
        } else if (!this.validEmail(this.propertyDetail.property_reservation_email)) {
          errorsContainer.push('Property Reservation Email inValid email')
        }
        if (!this.propertyDetail.status) {
          errorsContainer.push('Property Status Required')
        }
        this.errors = errorsContainer
        return false
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    genEmptyProperty: function () {
      const prt = {
        property_name: '',
        property_type: '',
        property_address: '',
        property_state: '',
        property_country: '',
        property_website: '',
        property_phone: '',
        property_PIC: '',
        property_PIC_title: '',
        property_PIC_email: '',
        property_reservation: '',
        property_reservation_email: '',
        status: ''
      }
      this.propertyDetail = prt
    },
    uploadImage: function () {
      if (this.fileCover !== null || this.fileLogo !== null) {
        const formData = new FormData()
        formData.append('logo', this.fileLogo)
        formData.append('cover', this.fileCover)
        Axios.post('image/store/' + this.propertyDetail.id, formData, { headers: { 'content-type': 'multipart/form-data' } })
          .then(response => {
            if (response.data.success === true) {
              alert(response.data.message)
              this.showLoading = false
              this.logo = response.data.data.logo
              this.cover = response.data.data.cover
              this.getProperties()
            } else {
              alert(response.data.errors)
              this.showLoading = false
            }
          })
      } else {
        this.showLoading = false
        this.showModal = false
        alert('Data has Save Successfuly')
      }
    },
    logoSelected: function () {
      const logo = this.$refs.logo.files[0]
      this.logo = URL.createObjectURL(logo)
      this.fileLogo = logo
    },
    coverSelected: function () {
      const cover = this.$refs.cover.files[0]
      this.cover = URL.createObjectURL(cover)
      this.fileCover = cover
    }
  }
}
</script>
<style lang="css">
  .modal-body {
    overflow-y: auto;
    height: 66vh;
  }
  .modal-dialog {
    max-width: 80%;
    margin: 1.75rem auto;
}
</style>
