<template>
  <div id="importChapter">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">导入章</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/import"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">活动章模块</li>
                        <li class="breadcrumb-item active" aria-current="page">导入章</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div v-if="activityData.length !== 0">
                <el-row>
                  <div v-for="item in activityData" :key="item.activityId">
                    <el-col :span="7" style="margin: 10px 15px">
                      <div class="box box-solid bg-success">
                        <div class="box-header">
                          <h6 class="box-title"><strong>{{item.activityName}}</strong></h6>
                        </div>
                        <div class="box-body">
                          <p><b style="margin-right: 20px">举办单位</b>{{item.organizationMessage}}</p>
                          <p><b style="margin-right: 20px">活动地点</b>{{item.location}}</p>
                          <p><b style="margin-right: 20px">申请章数</b><span class="badge badge-primary">{{item.applicationStamper}}</span></p>
                          <p><b style="margin-right: 20px">活动时间</b>
                          {{item.start | dateFormat}}<br>——{{item.end | dateFormat}}</p>
                          <p><b style="margin-right: 20px">扫章时间</b>
                          {{item.activityStampedStart | dateFormat}}<br>——{{item.activityStampedEnd | dateFormat}}</p>
                          <center><el-tooltip class="item" effect="dark" content="仅可导章一次" placement="bottom">
                            <button class="btn btn-primary btn-flat btn-sm center" @click="getid(item.activityId);dialogchapers = true" :disabled="item.state === 'FINISHED'">Excel批量导章</button>
                          </el-tooltip></center>
                        </div>
                      </div>
                    </el-col>
                  </div>
                </el-row>

                 <div class="block" style="margin-top:15px;margin-bottom:40px;float: right">
                    <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[6,12,18]"
                    :page-size="pageSize"
                    :total="activityData_length"
                    align="center"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
                </div>
              </div>

              <div v-else class="col-12 col-lg-2 col-xl-2 text-center" style="display: flex;align-items: center;margin-left: 40%">
                <div class="card-body">
                  <div class="icon-box">
                    <i class="fa fa-file-o"></i>                 
                  </div>
                  <hr>
                    <h5 class="mb-0 mt-3">暂无</h5>
                </div>
              </div>
            </section>
            <!-- /.content -->

          </div>
        </div>

        <el-dialog :visible.sync="dialogchapers" :show-close="false" title="Excel批量导章" width="30%">
          <div style="display: flex;justify-content: center">
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
              <div slot="tip" class="el-upload__tip">只能上传一个.xls,.xlsx文件，且不超过10mb<br><b style="color: red">*</b>
                文件格式规定如下：<br>
                <img src="../../assets/images/model.png" alt="">
              </div>
            </el-upload>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="clearFiles">取 消</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" plain @click="submitUpload">上传到服务器</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'ImportChapter',
  data() {
    return {
      userId: '', //用户ID
      activityId: '', //活动ID
      dialogchapers: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      activityData_length: 0, // 总条目数
      pageSize: 10, // 每页的数据条数
      fileList: [],
      activityData: []
    }
  },
  created () {
    let userId = request.localStorageGet('userId');
    this.userId = userId;
    this.getActivityData();
  },
  methods: {
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.getActivityData();
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getActivityData();
    },
    getActivityData() {
      let _this = this;
      request.$get('/activity/getActivityListByUserID', {
        userId: _this.userId,
        page: _this.currentPage,
        limit: _this.pageSize,
        orderRule: ''
      }, (res) => {
        console.log(res.data);
        console.log(_this.userId);
        let totalPages = res.data.data.totalPages;
        let activityData = res.data.data.content;
        _this.activityData = activityData;
        // _this.finalShow = activityData;
        _this.activityData_length = totalPages;
      }, _this)
    },
    getid(e) {
      this.activityId = e;
    },
    clearFiles() {
      this.fileList = [];
      this.dialogchapers = false
    },
    submitUpload () {
      let _this = this
      const loading = _this.$loading({
        lock: true,
        text: '操作执行中，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
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
          request.$postFileList('/activityStamp/importExcel', formData, 
          {
            userId: _this.userId,
            activityId: _this.activityId
          }, (res) => {
            console.log(res.data)
            let message = res.data.errorMsg
            setTimeout(() => {
              request.closeFullScreen(request.openFullScreen(_this));
              _this.reload();
              request.message(_this, message, 'success');
              _this.fileList = [];
              _this.dialogchapers = false;
            }, 1000);
          }, _this);
          setTimeout(() => {
            loading.close();
          }, 2000);
        }
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
