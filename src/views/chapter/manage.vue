<template>
  <div id="manageChapter">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">导入/导出章</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/manage"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">活动章模块</li>
                        <li class="breadcrumb-item active" aria-current="page">导入/导出章</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div>
                <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                <el-table
                  v-loading="loading"
                  :data="activityData"
                  :header-cell-style="{color: 'black', fontSize: '13px'}"
                  style="width: 100%"
                  cell-style="font-size: 13px">
                  <el-table-column>
                    <!-- eslint-disable-next-line -->
                    <template slot="header" slot-scope="scope">
                      <div style="display: flex;flex-direction: row;justify-content: space-between">
                        <el-input
                          v-model="search_stuId"
                          scope
                          style="width: 15%"
                          size="mini"
                          placeholder="按照负责人学号搜索"/>
                        <el-input
                          v-model="search_activityName"
                          scope
                          style="width: 15%"
                          size="mini"
                          placeholder="按照活动名称搜索"/>
                        <el-input
                          v-model="search_organizationMessage"
                          scope
                          style="width: 20%"
                          size="mini"
                          placeholder="按照举办单位搜索"/>
                        <el-date-picker
                          v-model="search_activityStamped"
                          :default-time="['12:00:00']"
                          style="width: 30%"
                          size="mini"
                          type="datetimerange"
                          start-placeholder="搜索扫章开始时间"
                          end-placeholder="扫章结束时间内"/>
                        <button type="button" class="btn btn-sm btn-primary waves-effect waves-light m-1" @click="reset">重置</button>
                      </div>
                    </template>
                    <el-table-column
                      label="负责人"
                      prop="account"
                      width="150">
                      <template slot-scope="scope">
                        {{ scope.row.stuId }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="活动名称"
                      prop="activename">
                      <template slot-scope="scope">
                        <span class="badge badge-dark" style="margin-right: 5px" v-if="scope.row.type === 'lectureActivity'">
                          讲座活动
                        </span>
                        <span class="badge badge-dark" style="margin-right: 5px" v-if="scope.row.type === 'schoolActivity'">
                          校园活动
                        </span>
                        <span class="badge badge-dark" style="margin-right: 5px" v-if="scope.row.type === 'volunteerActivity'">
                          志愿活动
                        </span>
                        <span class="badge badge-dark" style="margin-right: 5px" v-if="scope.row.type === 'practiceActivity'">
                          实践活动
                        </span>
                        {{ scope.row.activityName }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="举办单位"
                      prop="organization"
                      width="140">
                      <template slot-scope="scope">
                        {{ scope.row.organizationMessage }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="活动地点"
                      prop="place"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.location }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="扫章时间"
                      prop="time"
                      width="180">
                      <template slot-scope="scope">
                         {{scope.row.activityStampedStart | dateFormat}}<br>——{{scope.row.activityStampedEnd | dateFormat}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="申请章数"
                      prop="action"
                      width="100">
                      <!-- eslint-disable-next-line -->
                      <template slot-scope="scope">
                        {{ scope.row.applicationStamper }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="导入/导出名单"
                      prop="action"
                      width="150">
                      <!-- eslint-disable-next-line -->
                      <template slot-scope="scope">
                        <button type="button" class="btn btn-sm btn-success waves-effect waves-light m-1" @click="getid(scope.row.activityId);dialogchapers = true">导入</button>
                        <button type="button" class="btn btn-sm btn-success btn-outline waves-effect waves-light m-1" @click="getDownload(scope.row.activityId)">导出</button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>

                <div class="block" style="margin-top: 30px;float: right;margin-bottom: 30px">
                  <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[10,20,50]"
                    :page-size="pageSize"
                    :total="activityData_length"
                    align="center"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
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
import { exportExcel } from '@/api/activity'
import request from '../../utils/request'
export default {
  name: 'ManageChapter',
  inject: ['reload'],
  data() {
    return {
      userId: '', //用户ID
      activityId: '', //活动ID
      search_stuId: '',
      search_activityName: '',
      search_organizationMessage: '',
      search_activityStamped: '',
      search_activityStampedStart: '',
      search_activityStampedEnd: '',
      dialogchapers: false,
      loading: true,
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
  watch: {
    // watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    search_stuId(newVal) {
      this.handleSearch_stuId(newVal)
    },
    search_activityName(newVal) {
      this.handleSearch_activityName(newVal)
    },
    search_organizationMessage(newVal) {
      this.handleSearch_organizationMessage(newVal)
    },
    search_activityStamped(newVal) {
      this.handleSearch_activityStamped(newVal)
    }
  },
  methods: {
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.getActivityData();
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getActivityData();
    },
    reset() {
      this.search_stuId = ''
      this.search_activityName = ''
      this.search_organizationMessage = ''
      this.search_activityStamped = ''
      this.search_activityStampedStart = ''
      this.search_activityStampedEnd = ''
      request.message(this, '重置成功', 'success')
      this.getActivityData();
    },
    handleSearch_stuId(val) {
      const search = val
      this.search_stuId = search
      this.currentPage = 1;
      this.getActivityData();
    },
    handleSearch_activityName(val) {
      const search = val
      this.search_activityName = search
      this.currentPage = 1;
      this.getActivityData();
    },
    handleSearch_organizationMessage(val) {
      const search = val
      this.search_organizationMessage = search
      this.currentPage = 1;
      this.getActivityData();
    },
    formateTime (time) {
      let times = new Date(time)
      let year = times.getFullYear()
      let month = times.getMonth() + 1 > 9 ? times.getMonth() + 1 : 0 + (times.getMonth() + 1)
      let date = times.getDate() > 9 ? times.getDate() : 0 + times.getDate()
      let hour = times.getHours() > 9 ? times.getHours() : 0 + times.getHours()
      let minute = times.getMinutes() > 9 ? times.getMinutes() : 0 + times.getMinutes()
      let second = times.getSeconds() > 9 ? times.getSeconds() : 0 + times.getMinutes()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },
    handleSearch_activityStamped(val) {
      const _this = this
      console.log(val)
      if (val === null || val === '') {
        _this.search_activityStamped = ''
        _this.search_activityStampedStart = ''
        _this.search_activityStampedEnd = ''
      } else {
        var dateStart = new Date(_this.formateTime(val[0]));
        var dateEnd = new Date(_this.formateTime(val[1]));
        var search1 = dateStart.getTime();
        var search2 = dateEnd.getTime();
        console.log(search1)
        console.log(search2)
        _this.search_activityStampedStart = search1
        _this.search_activityStampedEnd = search2
        _this.currentPage = 1;
        _this.getActivityData();
      }
    },
    getActivityData() {
      let _this = this;
      request.$get('/activity/getApprovedActivityList', {
        searchCreatorStuId: _this.search_stuId,
        activityName: _this.search_activityName,
        organizationMessage: _this.search_organizationMessage,
        activityStampedStart: _this.search_activityStampedStart,
        activityStampedEnd: _this.search_activityStampedEnd,
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
        _this.loading = false;
      }, _this)
    },
    getid(e) {
      this.activityId = e;
    },
     // 点击触发下载，逻辑在invoke.js
    getDownload(e) {
      this.activityId = e;
      let _this = this;
      exportExcel({ activityId: _this.activityId }).then((res) => {
        console.log(res)
        setTimeout(() => {
          request.message(_this, '导出成功', 'success')
        }, 1000);
      })
    },
    clearFiles() {
      this.fileList = [];
      this.dialogchapers = false;
    },
    submitUpload () {
      let _this = this
      // const loading = _this.$loading({
      //   lock: true,
      //   text: '操作执行中，请稍后',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
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
          // setTimeout(() => {
          //   loading.close();
          // }, 2000);
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
