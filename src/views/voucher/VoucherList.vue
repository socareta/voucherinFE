<template>
    <div>
        <div class="row">
            <div class="col-lg-4 md-lg-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Voucher Code ir voucher id" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="search">Search</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-6" style="display:inline-flex">
                <div class="dropdown">
                    <a class="btn btn-info btn-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Bulk Edit
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item">Redeem</a>
                        <a class="dropdown-item" >Deactive</a>
                        <a class="dropdown-item" >Download Voucher</a>
                    </div>
                </div>
                <div class="dropdown ml-2">
                    <a class="btn btn-info btn-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Bulk Reedem
                    </a>
                </div>
            </div>
            <div class="col-12">
                <table class="table">
                    <thead>
                        <th>Voucher Name</th>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="(voucherList, index) in voucherLists" :key="index">
                            <td><input type="checkbox" name="" id=""> {{ voucher.voucher_title }}</td>
                            <td>{{ voucherList.voucher_code }}</td>
                            <td>{{ voucherList.type }}</td>
                            <td>{{ voucherList.status }}</td>
                            <td>
                                <div class="dropdown">
                                    <a class="btn btn-secondary dropdown-toggle btn-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Action
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a class="dropdown-item">Redeem</a>
                                    <a class="dropdown-item" >Deactive</a>
                                    <a class="dropdown-item" >Download Voucher</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <ConfirmationModal
        v-if="confirmationModal"
        @closeConfirmationModal="closeConfirmationModal"
        isSuccess="isSuccess"
        title="confirmationTitle"
        message="confirmationMessage"
        @isConfirmed="isConfirmed"/>
    </div>
</template>
<script>
import Axios from 'axios'
import ConfirmationModal from '@/components/Confirmation.vue'

export default {
  components: { ConfirmationModal },
  data () {
    return {
      voucherLists: [],
      voucher: null,
      query: null,
      confirmationModal: false,
      confirmationTitle: null,
      confirmationMessage: null,
      param: null
    }
  },
  created () {
    this.checkParam()
  },
  methods: {
    search: function () {
      if (!this.query) {
        Axios.get('voucher/list' + this.query).then(response => {
          if (response.data.success === true) {
            this.voucherLists = response.data.data
          } else {
            alert(response.data.errors)
          }
        })
      }
    },
    getVoucherList: function () {
      Axios.post('voucher/list', this.query).then(response => {
        alert()
      })
    },
    bulkReedem: function () {
      this.confirmationModal = true
      if (this.isConfirmed) {
        Axios.post('voucher/list/redem').then(response => {
          alert()
        })
      }
      this.confirmationModal = false
    },
    closeConfirmationModal: function () {
      this.confirmationModal = false
    },
    isConfirmed: function () {
      return true
    },
    checkParam: function () {
      const voucherId = this.$route.params.id
      if (voucherId) {
        Axios.get('voucher/list/' + voucherId).then(response => {
          if (response.data.success === true) {
            this.voucherLists = response.data.data
            this.voucher = response.data.voucher
          }
        })
      }
    }
  }
}
</script>
<style lang="css">
  table.table tr td, .table th{
    padding:5px
  }
</style>
