<template>
  <div id="userInfo">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">账户</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/userinfo"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">账户模块</li>
                        <li class="breadcrumb-item active" aria-current="page">账户</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div class="col-md-6 col-12">
                <div class="box box-outline-primary">
                  <div class="box-header">
                    <h4 class="box-title"><strong>个人信息</strong></h4>
                  </div>
                  <div class="box-body">
                    <ul class="list-group list-group-striped">
                      <li class="list-group-item">
                        姓名学号
                        <div class="pull-right">{{ userInfo.realName }}【{{ userInfo.stuId }}】</div>
                      </li>
                      <li class="list-group-item">
                        性别
                        <div class="pull-right">{{ userInfo.sex }}</div>
                      </li>
                      <li class="list-group-item">
                        专业年级
                        <div class="pull-right">{{ userInfo.grade }}{{ userInfo.major }}</div>
                      </li>
                      <li class="list-group-item">
                        班级
                        <div class="pull-right">{{ userInfo.classId }}</div>
                      </li>
                      <li class="list-group-item">
                        入学时间
                        <div class="pull-right">{{ enrollDate | dateFormat}}</div>
                      </li>
                      <li class="list-group-item">
                        辅导员
                        <div class="pull-right">{{ userInfo.counsellorName }}</div>
                      </li>
                      <li class="list-group-item">
                        联系方式
                        <div class="pull-right">{{ userInfo.phoneNumber }}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <!-- /.content -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: {},
      enrollDate: 0,
    }
  },
  created() {
    let userInfo = request.localStorageGet('userInfo');
    let enrollDate = parseInt(userInfo.enrollDate)
    console.log(enrollDate)
    this.userInfo = userInfo;
    this.enrollDate = enrollDate;
  }
}
</script>

<style lang="less">
.content .box-body i{
    margin-right:15px
}
</style>
