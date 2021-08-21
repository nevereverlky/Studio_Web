<template>
  <div id="Index">
    <div class="hold-transition light-skin sidebar-mini theme-primary" style="height:100vh;width:100vw">
      <div class="wrapper" style="background-color: #eef0f8">
        <Topbar/>
        <Sidebar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/side-bar/Sidebar'
import Topbar from '../components/top-bar/Topbar'
export default {
  name: 'Index',
  components: { Topbar, Sidebar }
}
</script>

<style scoped>

</style>
