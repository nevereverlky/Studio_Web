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
                        <li class="breadcrumb-item"><router-link tag="a" to="/activityapproval"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
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
                        <button type="button" class="btn btn-sm btn-primary" style="float:right">上传服务器</button>
                        <button type="button" class="btn btn-sm btn-primary btn-flat" style="float:right;margin-right: 10px">下载模板</button>
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
export default {
  name: 'InfoEntry',
  data() {
    return {
        checked: false,
    }
  },
  methods: {
  }
}
</script>

<style lang="less"></style>
