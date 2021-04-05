<template>
  <div id="app">
   <!-- <nav-home></nav-home> -->
    <router-view></router-view>
  </div>
</template>

<script>
//import NavHome from './pages/home.vue'
import storage from './storage/index'
export default {
  name: 'app',
  // components: {
  //   NavHome
  // }
  mounted(){
   // storage.setItem('a',1)
   //storage.setItem('user',{a:1})
   //storage.setItem('abc',{a:1},'user')
   storage.clear('a')
  }
}
</script>

<style>

</style>
