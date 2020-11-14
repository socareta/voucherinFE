
<template>
    <div>
        <div>
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <form  @submit.prevent="saveChange">
                    <div class="modal-header">
                        <h3 class="modal-title">{{ action }} Voucher</h3>
                    </div>
                    <div class="modal-body">
                       <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul class="errors">
                          <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
                        </ul>
                      </p>
                         <div class="row">
                           <div class="col-lg-6 col-md-6 col-xs-12">
                            <label for="voucher_title">voucher_title*: </label>
                                <input type="text" class="form-control" name="voucher_title" required id="voucher_title" v-model="voucher.voucher_title">
                            <label for="voucher_description">Description: </label>
                                <textarea class="form-control" name="voucher_description" id="voucher_description" v-model="voucher.voucher_description">
                                </textarea>
                            <label for="voucher_inclusion">Inclusion*: </label>
                                <textarea class="form-control" name="voucher_inclusion" required id="voucher_inclusion" v-model="voucher.voucher_inclusion">
                                </textarea>
                            <label for="voucher_tnc">Term adn Condition: </label>
                                <textarea class="form-control" name="voucher_tnc" id="voucher_tnc" v-model="voucher.voucher_tnc">
                                </textarea>
                           </div>
                           <div class="col-lg-6 col-md-6 col-xs-12">
                             <label for="voucher_value">voucher_value: </label>
                                <input type="text" class="form-control" name="voucher_value" id="voucher_value" v-model="voucher.voucher_value">
                            <label for="voucher_amount">voucher_amount: </label>
                                <input type="text" class="form-control" name="voucher_amount" id="voucher_amount" v-model="voucher.voucher_amount">
                            <label for="valid_start">valid_start*: </label>
                                <input type="date" class="form-control" required name="valid_start" id="valid_start" v-model="voucher.valid_start">
                            <label for="valid_end">valid_end*: </label>
                                <input type="date" class="form-control" required name="valid_end" id="valid_end" v-model="voucher.valid_end">
                            <label for="black_out_start">black_out_start: </label>
                                <input type="date" class="form-control" name="black_out_start" id="black_out_start" v-model="voucher.black_out_start">
                            <label for="black_out_end">black_out_end: </label>
                                <input type="date" class="form-control" name="black_out_end" id="black_out_end" v-model="voucher.black_out_end">
                            <label for="satus">Status: </label>
                            <select name="status" id="status" class="form-control" v-model="voucher.status" required>
                                <option value="" >--Select Status--</option>
                                <option v-bind:value="status.value"  v-for=" status in statuses" :key="status.id">{{ status.value }}</option>
                            </select>
                           </div>
                         </div>
                         <div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </transition>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Form',
  data () {
    return {
      errors: [],
      newStatus: []
    }
  },
  computed: {
    ...mapGetters({
      statuses: 'getStatuses'
    })
  },
  props: {
    voucher: Object,
    action: null
  },
  created () {
    this.getMeta()
    this.setPropertyActive()
  },
  methods: {
    getMeta: function () {
      this.newStatus = this.statuses
    },
    setPropertyActive: function () {
      this.voucher.property_id = localStorage.getItem('propertyActive')
    },
    saveChange: function (e) {
      if (this.validateForm) {
        e.preventDefault()
        this.loading(true)
        if (this.action === 'Edit') {
          Axios.put('voucher/' + this.voucher.id, this.voucher).then(response => {
            if (response.data.success === true) {
              this.$emit('updateVoucher', response.data.data)
              this.closeModal()
              alert(response.data.message)
              this.loading(false)
            } else {
              this.errors = response.data.errors
              alert(response.data.errors)
              this.loading(false)
            }
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            alert()
            this.loading(false)
          })
        }
        if (this.action === 'Add') {
          Axios.post('voucher', this.voucher).then(response => {
            if (response.data.success === true) {
              this.$emit('getDataForm', response.data.data)
              this.closeModal()
              this.loading(false)
            } else {
              this.errors = response.data.errors
              alert(response.data.errors)
              this.loading(false)
            }
          })
        }
      }
    },
    validateForm: function () {
      if (this.voucher.voucher_title &&
         this.voucher.voucher_value &&
         this.voucher.voucher_amount &&
         this.voucher.voucher_description &&
         this.voucher.voucher_inclusion &&
         this.voucher.voucher_tnc &&
         this.voucher.valid_start &&
         this.voucher.valid_end &&
         this.voucher.black_out_start &&
         this.voucher.black_out_end &&
         this.voucher.status &&
         this.voucher.user_id) {
        return true
      } else {
        this.errors = []
        if (this.voucher.voucher_title) {
          this.errors = ''
        }
        if (this.voucher.voucher_value) {
          this.errors = ''
        }
        if (this.voucher.voucher_amount) {
          this.errors = ''
        }
        if (this.voucher.voucher_description) {
          this.errors = ''
        }
        if (this.voucher.voucher_inclusion) {
          this.errors = ''
        }
        if (this.voucher.voucher_tnc) {
          this.errors = ''
        }
        if (this.voucher.valid_start) {
          this.errors = ''
        }
        if (this.voucher.valid_end) {
          this.errors = ''
        }
        if (this.voucher.black_out_start) {
          this.errors = ''
        }
        if (this.voucher.black_out_end) {
          this.errors = ''
        }
        if (this.voucher.status) {
          this.errors = ''
        }
        if (this.voucher.user_id) {
          this.errors = ''
        }
        return false
      }
    },
    modal: function () {
      this.showModal = true
    },
    closeModal: function () {
      this.$emit('closeModal')
    },
    loading: function (type) {
      type === true ? this.$emit('setShowLoading') : this.$emit('closeLoading')
    }
  }
}
</script>
<style lang="css" scope>
  .modal-body {
    overflow-y: auto;
    height: 66vh;
  }
  .modal-dialog {
    max-width: 80%;
    margin: 1.75rem auto;
}
</style>
