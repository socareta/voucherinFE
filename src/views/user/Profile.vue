<template>
    <div>
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <form >
                    <label for="name">Name:
                        </label><input type="text" class="form-control" name="name" id="name" v-model="user.name">
                    <label for="email">Email:
                        </label><input type="email" class="form-control" name="email" id="email" v-model="user.email">
                    <label for="role">Role: </label>
                        <input type="text" name="Role" id="Role" class="form-control" v-model="user.role" disabled>
                    <label for="satus">Status: </label>
                        <input type="text" name="status" id="status" class="form-control" v-model="user.status" disabled>
                </form>
            </div>
            <div class="col-lg-6 col-md-6">
                <input type="file" name="" id="" class="form Control">
                <img src="@/assets/placeholder-image.png">
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      img: '../assets/placeholder-image.png'
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>
