<template>
    <div class="modal-confirmation-container">
        <div class="modal-confirmation-wrap">
            <img :src="isSuccess === true ? imageSuccess : imageFailed" alt="" class="animation">
            <h4 class="title">{{ title }}</h4>
            <p class="message">{{ message }}</p>
            <button class="btn btn-warning" v-if="!isAllert" @click="closeConfirmationModal">No</button>
            <button class="btn btn-info ml-2" @click="closeConfirmationModal">OK</button>

        </div>
    </div>
</template>
<script>
export default {
  name: 'confirmationModal',
  data () {
    return {
      imageSuccess: null,
      imageFailed: null
    }
  },
  props: {
    title: String,
    message: String,
    isSuccess: Boolean,
    isAllert: Boolean

  },
  methods: {
    closeModal: function () {
      this.isAllert ? this.$emit('closeConfirmationModal') : this.$emit('isConfirmed')
    }
  }
}
</script>
<style lang="css">
.modal-confirmation-container {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.6);
}
.modal-confirmation-wrap {
    max-width: 400px;
    background: #fff;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    margin-top: 20%;
}
</style>
