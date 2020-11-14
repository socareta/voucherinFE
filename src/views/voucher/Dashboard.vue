<template>
    <div>
        <button class="btn btn-info" @click="addVoucher()">Add Voucher</button>
       <a href="/voucher-list" class="btn btn-info ml-2">Voucher List</a>
        <br><br>
        <table class="table table-hover">
            <thead>
               <th>id</th>
               <th>Name</th>
               <th>Valid Start</th>
               <th>Valid End</th>
               <th>Generate</th>
               <th>status</th>
               <th></th>
            </thead>
            <tbody>
                <tr v-for="(voucher, index) in vouchers" :key="index">
                    <td>{{ voucher.id }}</td>
                    <td>{{ voucher.voucher_title }}</td>
                    <td>{{ voucher.valid_start }}</td>
                    <td>{{ voucher.valid_end }}</td>
                    <td>{{ voucher.generate }}</td>
                    <td>{{ voucher.status }}</td>
                    <td>
                      <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle btn-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Action
                            </a>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              <a class="dropdown-item" @click="editVoucher(voucher,index)">Edit</a>
                              <a class="dropdown-item" @click="alert('Please try later')">Delete</a>
                              <a class="dropdown-item" @click="generateVoucher(voucher,index)">Generate</a>
                              <a v-if="voucher.generate" class="dropdown-item" @click="$root.$router.push({ path: 'voucher-list/' + voucher.id})">Voucher List</a>
                            </div>
                      </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <Loading v-if="showLoading"/>
        <Form v-if="showModal"
          :voucher="voucherDetail"
          @updateVoucher="updateVoucher"
          @closeModal="closeModal"
          :action="action"
          @getDataForm="getDataForm"
          @setShowLoading="setShowLoading"
          @closeLoading="closeLoading"
          @getVouchers="getVouchers"/>
        <GenerateForm v-if="showGenerateForm"
          :voucher="voucherDetail"
          @closeGenerateForm="closeGenerateForm"
          :index="indexActive"
          @setShowLoading="setShowLoading"
          @closeLoading="closeLoading"/>
    </div>
</template>
<script>
import Axios from 'axios'
import Loading from '@/components/Loading.vue'
import Form from './Form.vue'
import GenerateForm from './GenerateVoucher.vue'

export default {
  name: 'voucher',
  components: { Loading, Form, GenerateForm },
  data () {
    return {
      vouchers: [],
      voucherDetail: [],
      showModal: false,
      showGenerateForm: false,
      showLoading: false,
      action: null,
      indexActive: null
    }
  },
  created () {
    this.getVouchers()
  },
  methods: {
    getVouchers: function () {
      Axios.get('voucher/' + localStorage.getItem('propertyActive')).then(response => {
        if (response.data.success === true) {
          this.vouchers = response.data.data
        } else {
          alert(response.data.message)
        }
      })
    },
    getDataForm: function (data) {
      this.voucherDetail = data
      this.vouchers.unshift(data)
      this.showModal = false
      this.showLoading = false
    },
    updateVoucher: function (data) {
      this.voucherDetail = data
      this.vouchers[this.indexActive] = data
      this.showModal = false
      this.showLoading = false
    },
    addVoucher: function () {
      this.emptyForm()
      this.showModal = true
      this.action = 'Add'
    },
    editVoucher: function (data, index) {
      this.voucherDetail = data
      this.showModal = true
      this.indexActive = index
      this.action = 'Edit'
    },
    generateVoucher: function (data, index) {
      this.showGenerateForm = true
      this.voucherDetail = data
      this.indexActive = index
    },
    emptyForm: function () {
      const voucher = {
        property_id: '',
        voucher_title: '',
        voucher_value: '',
        voucher_amount: '',
        voucher_description: '',
        voucher_inclusion: '',
        voucher_tnc: '',
        valid_start: '',
        valid_end: '',
        black_out_start: '',
        black_out_end: '',
        status: ''
      }
      this.voucherDetail = voucher
    },
    closeModal: function () {
      this.showModal = false
    },
    closeGenerateForm: function () {
      this.showGenerateForm = false
    },
    setShowLoading: function () {
      this.showLoading = true
    },
    closeLoading: function () {
      this.showLoading = false
    }
  }
}
</script>
<style lang="css">
  table.table tr td, .table th{
    padding:5px
  }
</style>
