<template>
    <div>
        <div>
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-dialog modal-dialog2" role="document">
                  <div class="modal-content">
                    <form  @submit.prevent="generate">
                    <div class="modal-header">
                        <h3 class="modal-title">Generate Voucher</h3>
                    </div>
                    <div class="modal-body modal-body2">
                       <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul class="errors">
                          <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
                        </ul>
                      </p>
                         <div class="row">
                           <div class="col-12">
                            <label for="generate">Count Voucher to genereate </label>
                            <input type="number" class="form-control" name="count" v-model="countGenerate">
                          </div>
                          <div class="col-12">
                            <ul>
                              <li v-for="result in results" :key="result.id">{{ result.voucher_code }}</li>
                            </ul>
                          </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                        <button v-if="results" type="button" class="btn btn-warning" @click="$root.$router.push({ path: 'voucher-list/' + voucher.id})">Voucher List</button>
                        <button type="submit" class="btn btn-primary">Generate</button>
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

export default {
  data () {
    return {
      countGenerate: null,
      results: null,
      errors: []
    }
  },
  props: {
    voucher: Object,
    index: Number
  },
  methods: {
    generate: function () {
      this.loading(true)
      const data = new FormData()
      data.append('voucherId', this.voucher.id)
      data.append('propertyId', this.voucher.property_id)
      data.append('count', this.countGenerate)
      Axios.post('voucher/generate', data).then(response => {
        if (response.data.success === true) {
          this.results = response.data.data
          this.$emit('getVouchers', response.data.voucher)
          alert(response.data.message)
          this.loading(false)
        } else {
          alert(response.data.errors)
          this.loading(false)
        }
      })
    },
    closeModal: function () {
      this.$emit('closeGenerateForm')
    },
    loading: function (type) {
      type === true ? this.$emit('setShowLoading') : this.$emit('closeLoading')
    }
  }
}
</script>
<style lang="css" scope>
  .modal-body2 {
    overflow-y: auto;
    height: auto;
  }
  .modal-dialog2 {
    max-width: 330px;
    margin: 1.75rem auto;
}
</style>
