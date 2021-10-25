<template>
  <div id="editPwd">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">修改密码</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/activityapproval"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">账户模块</li>
                        <li class="breadcrumb-item active" aria-current="page">修改密码</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div class="col-6">
                <div class="box box-default">
                  <div class="box-body">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                      <el-form-item label="原密码" prop="password">
                        <el-input v-model="form.password" placeholder="请输入原密码" type="password" />
                      </el-form-item>
                      <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="form.newPassword" placeholder="请输入新密码" type="password" />
                      </el-form-item>
                      <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input v-model="form.confirmPassword" placeholder="请确认密码" type="password" />
                      </el-form-item>
                      <button type="button" class="btn btn-sm btn-primary waves-effect waves-light m-1" style="float:right" @click="submitForm">确认修改</button>
                    </el-form>
                  </div>
                  <!-- /.box-body -->
                </div>
                <!-- /.box -->
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
// import { updateUserPwd } from '../../api/user'
// import { messageInfo } from '@/utils/util'
import request from '../../utils/request'
export default {
  name: 'EditPwd',
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.form.newPassword !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 表单校验
      rules: {
        password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      let _this = this;
      // this.$refs.form.validate((valid) => {
      //   if (valid){ 
          request.$put('/user/pwd', {
          password: _this.form.password,
          newPassword: _this.form.newPassword
          }, (res) => {
            console.log('res.data', res.data);
            let message = res.data.errorMsg;
            setTimeout(() => {
                _this.form.password = '';
                _this.form.newPassword = '';
                _this.form.confirmPassword = ''
            }, 1000);
            request.message(_this, message, 'success')
          }, this)
      //   }
      // })
    }
  }
}
</script>

<style lang="less"></style>