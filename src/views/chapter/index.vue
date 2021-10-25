<template>
  <div id="index">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'Index',
  provide () { // 注册一个方法
    return {
      reload: this.reload
      // notice: ''
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less"></style>
