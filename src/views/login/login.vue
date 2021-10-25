<!--登录模块-->
<template>
  <div class="login">
    <div class="hold-transition theme-success bg-lighter" style="height:100vh;width:100vw">
      <div class="container h-p100">
        <div class="row align-items-center justify-content-md-center h-p100">

          <div class="col-12">
            <div class="row justify-content-center no-gutters">
              <div class="col-lg-4 col-md-5 col-12">
                <div class="p-30 rounded30 box-shadowed b-2 b-dashed bg-white">
                  <div class="content-top-agile p-10">
                    <h2 class="text-primary">第二课堂</h2>
                    <p class="text-primary-50">The Secondary Studies Management</p>
                  </div>
                  <form>
                    <div class="form-group">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-transparent text-primary"><i class="fa fa-user-o"/></span>
                        </div>
                        <input v-model="loginForm.username" type="text" class="form-control pl-15 bg-transparent text-dark plc-white" placeholder="帐号">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text  bg-transparent text-primary"><i class="fa fa-unlock"/></span>
                        </div>
                        <input v-model="loginForm.password" type="password" class="form-control pl-15 bg-transparent text-dark plc-white" placeholder="密码">
                      </div>
                    </div>
                    <div class="row">
                      <!-- /.col -->
                      <div class="col-12 text-center">
                        <button type="button" class="btn btn-primary btn-rounded mt-20" @click.prevent="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
                      </div>
                      <!-- /.col -->
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import request from '../../utils/request'
import { login, getRouters } from '@/api/user'
import { localStorageSet, messageInfo } from '@/utils/util'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      let _this = this;
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        // request.message(this, '账号或密码不能为空', 'warning')
      } else {
        // let params = {username: _this.loginForm.username, password: _this.loginForm.password}
        login({username: _this.loginForm.username, password: _this.loginForm.password}).then((res) => {
          console.log('res.data', res.data);
          let message = res.errorMsg;
          let token = res.data.token;
          let userId = res.data.userId;
          let userInfo = res.data.userInfo;
          localStorageSet('token', token);
          localStorageSet('userId', userId);
          localStorageSet('userInfo', userInfo);
          let routers = []
          getRouters().then((res) => {
            console.log('resrouter', res.data)
            res && res.data.map((item) => {
              item.path && routers.push(item.path)
              if(item.haveChildren) {
                item.children.map((item2) => {
                  item2.path && routers.push(item2.path)
                })
              }
            })
            localStorageSet('routers', routers)
          })
          setTimeout(function() {
            if (_this.$route.query.redirect) {
              _this.$router.push({ path: decodeURIComponent(_this.$route.query.redirect) }) //跳转到原页面
            } else {
              _this.$router.push({ path: '/' })// 正常登录流程进入的页面
            }
            // getRouters().then((res) => {
            //   console.log('routers', res)
            // })
          }, 2000)
          messageInfo(this, message, 'success')
        })
        // request.$post('/user/managetoken', {
        //   username: _this.loginForm.username,
        //   password: _this.loginForm.password
        // }, (res) => {
        //   console.log('res.data', res.data);
        //   let message = res.data.errorMsg;
        //   let token = res.data.data.token;
        //   request.localStorageSet('token', token);
        //   setTimeout(function() {
        //     if (_this.$route.query.redirect) {
        //       _this.$router.push({ path: decodeURIComponent(_this.$route.query.redirect) }) //跳转到原页面
        //     } else {
        //       _this.$router.push({ path: '/' })// 正常登录流程进入的页面
        //     }
        //     request.$get('/user/routingtable', {},(res) => {
        //       console.log('res.data', res.data);
        //     }, this)
        //     // location.reload()
        //   }, 2000)
        //   request.message(_this, message, 'success')
        //   }, this)
      }
    }
  }
}
</script>

<style lang="less"></style>