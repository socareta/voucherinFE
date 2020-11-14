<template>
  <div id="app">
    <Navbar/>
    <div class="container pt-4">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/header/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
 .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    width: 100%;
    height: 100vh;
    overflow: auto;
    }
a.dropdown-item {
    cursor: pointer;
}
 table.table tr td, .table th{
    padding:2px!important;
    vertical-align: middle;
  }
</style>
