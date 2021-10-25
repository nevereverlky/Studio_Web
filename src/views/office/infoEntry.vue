<template>
  <div id="infoEntry">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">新生信息录入</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/infoentry"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">教务模块</li>
                        <li class="breadcrumb-item active" aria-current="page">新生信息录入</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div class="col-md-8 col-12">
                <div class="box">
                  <div class="box-body">
                    <el-upload
                        ref="upload"
                        :limit="1"
                        :on-preview="handlePreview"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        :show-file-list="fileList"
                        :auto-upload="false"
                        class="upload-demo"
                        action="#"
                        multiple
                        accept=".xls,.xlsx"
                        drag>
                        <i class="el-icon-upload"/>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div slot="tip" class="el-upload__tip">只能上传一个.xls,.xlsx文件，且不超过10mb<br><br>
                        <el-checkbox v-model="checked">是否确认新生信息无误，不再更改</el-checkbox>
                        </div>
                    </el-upload>
                    <div style="margin-top: 20px">
                        <button type="button" class="btn btn-sm btn-primary" style="float:right" @click="submitUpload">上传服务器</button>
                        <button type="button" class="btn btn-sm btn-primary btn-flat" style="float:right;margin-right: 10px" @click="getDownload">下载模板</button>
                    </div>
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
  name: 'InfoEntry',
  data() {
    return {
      checked: false,
      fileList: []
    }
  },
  methods: {
    getDownload() {
      let _this = this;
      request.$get('/user/downloadtemplate', {}, () => {
        // console.log(res.data)
        // let message = res.data.errorMsg;
        // request.message(_this, message, 'success')
      }, _this)
    },
    submitUpload () {
      let _this = this
      // const loading = _this.$loading({
      //   lock: true,
      //   text: '操作执行中，请稍后',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      if(this.checked === true) {
        request.openFullScreen(_this);
        if (_this.fileList.length === 0) {
          request.message(_this, '请先选择文件', 'warning');
          request.closeFullScreen(request.openFullScreen(_this));
        } else {
          const isLt10240K = _this.fileList.every(file => file.size / 1024 / 1024 / 1024 < 10240);
          if (!isLt10240K) {
            request.message(_this, '请检查，上传文件大小不能超过10MB!', 'error');
            request.closeFullScreen(request.openFullScreen(_this));
          } else {
            var formData = new FormData(); //  用FormData存放上传文件
            _this.fileList.forEach(file => {
              formData.append('file', file.raw, file.raw.name);
            })
            // 向webapi发起请求，等待后台接收
            request.$postFileList('/user/uploaduserexcel', formData, {}, (res) => {
              console.log(res.data)
              let message = res.data.errorMsg
              setTimeout(() => {
                request.closeFullScreen(request.openFullScreen(_this));
                _this.reload();
                request.message(_this, message, 'success');
                _this.fileList = []
              }, 1000);
            }, _this);
            // setTimeout(() => {
            //   loading.close();
            // }, 2000);
          }
        }
      } else {
        request.message(_this, '请先确认信息无误', 'warning')
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    //移除
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 选取文件超过数量提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //监控上传文件列表
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      if (existFile) {
        this.$message.error('当前文件已经存在!');
        fileList.pop();
      }
      this.fileList = fileList;
    }
  }
}
</script>

<style lang="less"></style>
