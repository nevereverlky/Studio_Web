<template>
  <div id="layout">
    <div class="hold-transition light-skin sidebar-mini theme-success" style="height:100vh;width:100vw">
      <div class="wrapper" style="background-color: #eef0f8">
        <Topbar/>
        <Sidebar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/side-bar/Sidebar'
import Topbar from '../../components/top-bar/Topbar'
export default {
  name: 'LayoutIndex',
  components: { Topbar, Sidebar }
}
</script>

<style lang="less"></style>
