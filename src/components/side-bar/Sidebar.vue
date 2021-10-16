<!--侧边栏组件-->
<template>
  <div id="Sidebar">

    <aside class="main-sidebar">
      <!-- sidebar-->
      <section class="sidebar">

        <div class="user-profile">
          <div class="ulogo">
            <!-- logo for regular state and mobile devices -->
            <div class="d-flex align-items-center justify-content-center">
              <!--<img src="./../assets/images/logo.png" alt="" height="40" width="40" style="margin-right: 20px">-->
              <h4><b>第二课堂</b></h4>
            </div>
          </div>
        </div>

        <!-- sidebar menu-->

        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :default-active="$route.path"
              :collapse="isCollapse"
              router
              class="sidebar-menu el-menu-vertical-demo"
              style="width: 260px"
              background-color="#ffffff"
              text-color="#919ebc"
              active-text-color="#1bc5bd"
              @open="handleOpen"
              @close="handleClose">
              <el-menu-item index="/overview">
                <i class="fa-icon fa fa-desktop"/>
                <span>预警与总览</span>
              </el-menu-item>
              <el-submenu index="1" v-if="checkModulePermission('/inquiry')||checkModulePermission('/approval')||checkModulePermission('/authority')">
                <template slot="title">
                  <i class="fa-icon fa fa-camera-retro" />
                  <span>活动模块</span>
                </template>
                <el-menu-item index="/inquiry" v-if="checkModulePermission('/inquiry')"><i class="fa fa-ellipsis-h"/>活动查询与创建</el-menu-item>
                <el-menu-item index="/approval" v-if="checkModulePermission('/approval')"><i class="fa fa-ellipsis-h"/>活动审批</el-menu-item>
                <el-menu-item index="/authority" v-if="checkModulePermission('/authority')"><i class="fa fa-ellipsis-h"/>权限分配</el-menu-item>
              </el-submenu>
              <el-submenu index="2" v-if="checkModulePermission('/import')||checkModulePermission('/manage')">
                <template slot="title">
                  <i class="fa-icon fa fa-cloud-upload" />
                  <span>活动章模块</span>
                </template>
                <el-menu-item index="/import" v-if="checkModulePermission('/import')"><i class="fa fa-ellipsis-h"/>导入章</el-menu-item>
                <el-menu-item index="/manage" v-if="checkModulePermission('/manage')"><i class="fa fa-ellipsis-h"/>导入/导出章</el-menu-item>
              </el-submenu>
              <el-submenu index="3" v-if="checkModulePermission('/infoentry')">
                <template slot="title">
                  <i class="fa-icon fa fa-vcard-o"/>
                  <span>教务模块</span>
                </template>
                <el-menu-item index="/infoentry" v-if="checkModulePermission('/infoentry')"><i class="fa fa-ellipsis-h"/>新生信息录入</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </section>
    </aside>

  </div>
</template>

<script>
// import checkModulePermission from '@/utils/check-module-permission'
import { localStorageGet } from '@/utils/util'

export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapse: false,
      routers: []
    }
  },
  mounted() {
    
  },
  methods: {
    checkModulePermission(index) {
      const arr = localStorageGet('routers')
      return arr.includes(index)
    },
    tologin() {
      const _this = this
      // request.$post('/user/logout', {}, (res) => {
      //   console.log(res.data);
      //   request.localStorageSet('token', null);
      setTimeout(function() {
        _this.$router.push('/signin')
        // location.reload();
      }, 3000)
      // let message = res.data.message;
      // }, _this)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/Sidebar.less';
</style>
