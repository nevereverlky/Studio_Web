<template>
  <div id="inquiry">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto col-sm-7">
                  <h4 class="page-title">活动查询与创建</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/activity"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">活动模块</li>
                        <li class="breadcrumb-item active" aria-current="page">活动查询与创建</li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <div class="col-sm-5">
                  <div class="btn-group float-sm-right">
                    <button type="button" class="btn btn-primary btn-sm waves-effect waves-light" @click="addFormVisible = true"><i class="fa fa-plus-square mr-1"/>创建活动</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div class="col-12">
                <div class="box box-default">
                  <!--<div class="box-header with-border">-->
                  <!--<h5 class="box-title">活动审批状态</h5>-->
                  <!--</div>-->
                  <!-- /.box-header -->
                  <div class="box-body">
                    <!-- Nav tabs -->
                    <ul class="nav nav-pills justify-content-start mb-20">
                      <li class="nav-item" @click="getstatus('PASS')">
                        <a href="#navpills2-1" class="nav-link active" data-toggle="tab" aria-expanded="false">审批已通过</a> 
                      </li>
                      <li class="nav-item" @click="getstatus('FAIL')">
                        <a href="#navpills2-2" class="nav-link" data-toggle="tab" aria-expanded="false">审批未通过</a>
                      </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                      <div id="navpills2-1" class="tab-pane active">

                        <div v-if="activityData.length !== 0">
                          <div class="row">
                            <div class="col-md-9">
                              <el-timeline>
                                  <el-timeline-item 
                                  v-for="(item,index) in activityData"
                                  :key="index"
                                  :timestamp="item.timestamp" 
                                  placement="top"
                                  >
                                    <div class="box bl-3 border-secondary">
                                      <div class="box-body" style="display: flex">
                                        <div style="flex: 1">
                                          <p><b>活动名称</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.activityName}}
                                            <span class="badge badge-default" style="margin-left: 10px" v-if="item.type === 'lectureActivity'">
                                              讲座活动
                                            </span>
                                            <!-- <span class="badge badge-default" style="margin-left: 10px" v-if="item.type === 'lectureActivity'">
                                              校园活动
                                            </span>
                                            <span class="badge badge-default" style="margin-left: 10px" v-if="item.type === 'lectureActivity'">
                                              志愿活动
                                            </span>
                                            <span class="badge badge-default" style="margin-left: 10px" v-if="item.type === 'lectureActivity'">
                                              实践活动
                                            </span> -->
                                          </p>
                                          <p><b>举办单位</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.organizationMessage}}</p>
                                          <p><b>活动地点</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.location}}</p>
                                        </div>
                                        <div style="flex: 1">
                                          <p><b>申请章数</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge badge-primary">{{item.applicationStamper}}</span></p>
                                          <p><b>活动时间</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.activityStampedStart}}--{{item.activityStampedEnd}}</p>
                                          <p><b>扫章时间</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.activityStampedStart}}--{{item.activityStampedEnd}}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </el-timeline-item>
                              </el-timeline>
                            </div>
                          </div>

                          <div class="block" style="margin-top:15px;float: right">
                            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                          :current-page="currentPage"
                                          :page-sizes="[20,50,80]"
                                          :page-size="pageSize"
                                          layout="total, sizes, prev, pager, next, jumper"
                                          :total="activityData_length">
                            </el-pagination>
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

                      </div>
                      <div id="navpills2-2" class="tab-pane">
                        <div v-if="activityData.length !== 0">
                          <div class="row">
                            <div class="col-md-9">
                              <el-timeline>
                                  <el-timeline-item 
                                  v-for="(item,index) in activityData"
                                  :key="index"
                                  :timestamp="item.timestamp" 
                                  placement="top"
                                  >
                                    <div class="box bl-3 border-secondary">
                                      <div class="box-body" style="display: flex">
                                        <div style="flex: 1">
                                          <p><b>活动名称</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.activityName}}
                                            <span class="badge badge-default" style="margin-left: 10px" v-if="item.type === 'lectureActivity'">
                                              讲座活动
                                            </span>
                                          </p>
                                          <p><b>举办单位</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.organizationMessage}}</p>
                                          <p><b>活动地点</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.location}}</p>
                                        </div>
                                        <div style="flex: 1">
                                          <p><b>申请章数</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          <span class="badge badge-primary">{{item.applicationStamper}}</span>
                                          </p>
                                          <p><b>活动学期</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.activityStampedStart}}--{{item.activityStampedEnd}}</p>
                                          <p><b>扫章时间</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.activityStampedStart}}--{{item.activityStampedEnd}}</p>
                                        </div>
                                      </div>
                                      <div class="box-footer text-right p-0">
                                      <div class="px-25 py-5 w-100" style="float:left">
                                        <span class="badge badge-warning">已驳回</span>
                                      </div>
                                      <div class="px-25 py-5 w-400" style="float:left">
                                        驳回原因驳回原因驳回原因驳回原因
                                      </div>
                                      <button class="btn btn-outline btn-warning btn-sm"><i class="fa fa-pencil"/></button>
                                    </div>
                                      <div class="box-footer text-right p-0">
                                        <div class="px-25 py-5 w-100" style="float:left"><span class="badge badge-success">待审批</span></div>
                                        <el-tooltip class="item" effect="dark" content="仅可修改一次" placement="bottom">
                                          <button class="btn btn-outline btn-success btn-sm" @click="editFormVisible = true"><i class="fa fa-pencil"/></button>
                                        </el-tooltip>
                                      </div>
                                    </div>
                                  </el-timeline-item>
                              </el-timeline>
                            </div>
                          </div>

                          <div class="block" style="margin-top:15px;float: right">
                            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                          :current-page="currentPage"
                                          :page-sizes="[20,50,80]"
                                          :page-size="pageSize"
                                          layout="total, sizes, prev, pager, next, jumper"
                                          :total="activityData_length">
                            </el-pagination>
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

                      </div>
                    </div>
                  </div>
                  <!-- /.box-body -->
                </div>
                <!-- /.box -->
              </div>
            </section>
            <!-- /.content -->
          </div>
        </div>

        <el-dialog :visible.sync="addFormVisible" title="创建活动" width="60%">

          <el-form :model="form" size="small">
            <div style="display:flex">
              <div style="flex:1">
                <el-form-item :label-width="formLabelWidth" label="活动名称">
                  <el-input v-model="form.activityName" autocomplete="off"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="举办单位">
                  <el-select v-model="form.organizationMessage" placeholder="请选择活动主办方">
                    <el-option label="计算机系学生会" value="shanghai"/>
                    <el-option label="β-house工作室" value="beijing"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="活动地点">
                  <el-input v-model="form.location" autocomplete="off"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="活动类型">
                  <el-select v-model="form.activityType" placeholder="请选择活动类型">
                    <el-option label="校园活动" value="shanghai"/>
                    <el-option label="志愿活动" value="beijing"/>
                    <el-option label="实践活动" value="beijing"/>
                    <el-option label="讲座活动" value="beijing"/>
                  </el-select>
                </el-form-item>
              </div>
              <div style="flex:1">
                <el-form-item :label-width="formLabelWidth" label="活动时间">
                  <el-date-picker
                    v-model="form.timevalue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="扫章时间">
                  <el-date-picker
                    v-model="form.timevalue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="申请章数">
                  <el-input-number v-model="form.applicationStamper" :min="1" :max="1000" size="small" label="描述文字" @change="handleChange"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="钉钉截图">
                  <el-upload
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    class="upload-demo"
                    action=""
                    multiple>
                    <el-button size="small" type="primary" plain>点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" size="small" @click="addActivity">确认创建</el-button>
          </div>

        </el-dialog>

        <el-dialog :visible.sync="editFormVisible" title="修改申请" width="60%">

          <el-form :model="form" size="small">
            <div style="display:flex">
              <div style="flex:1">
                <el-form-item :label-width="formLabelWidth" label="活动名称">
                  <el-input v-model="form.activityName" autocomplete="off"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="举办单位">
                  <el-select v-model="form.organizationMessage" placeholder="请选择活动主办方">
                    <el-option label="计算机系学生会" value="shanghai"/>
                    <el-option label="β-house工作室" value="beijing"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="活动地点">
                  <el-input v-model="form.location" autocomplete="off"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="活动类型">
                  <el-select v-model="form.activityType" placeholder="请选择活动类型">
                    <el-option label="校园活动" value="shanghai"/>
                    <el-option label="志愿活动" value="beijing"/>
                    <el-option label="实践活动" value="beijing"/>
                    <el-option label="讲座活动" value="beijing"/>
                  </el-select>
                </el-form-item>
              </div>
              <div style="flex:1">
                <el-form-item :label-width="formLabelWidth" label="活动时间">
                  <el-date-picker
                    v-model="form.activityTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="扫章时间">
                  <el-date-picker
                    v-model="form.stampedTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="申请章数">
                  <el-input-number v-model="form.applicationStamper" :min="1" :max="1000" size="small" label="描述文字" @change="handleChange"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="钉钉截图">
                  <el-upload
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    class="upload-demo"
                    action=""
                    multiple>
                    <el-button size="small" type="primary" plain>点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="editFormVisible = false">取 消</el-button>
            <el-button type="primary" size="small" @click="editFormVisible = false">重新提交</el-button>
          </div>

        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Inquiry',
  data() {
    return {
      userId: '', //用户ID
      activityData: [
        {
          timestamp: '2021-01-15 12:00:00',
          approved: 'PASS',
          activityId: '201812011',
          activityName: '图书馆数字资源培训讲座',
          type: 'lectureActivity',
          organizationMessage: '学生社团联合会',
          location: '图书馆讲堂',
          applicationStamper: 150,
          activityStampedStart: '',
          activityStampedEnd: ''
        },
        {
          timestamp: '2021-01-13 12:00:00',
          approved: 'WAIT',
          activityId: '201812011',
          activityName: '图书馆数字资源培训讲座',
          type: 'lectureActivity',
          organizationMessage: '学生社团联合会',
          location: '图书馆讲堂',
          applicationStamper: 150,
          activityStampedStart: '',
          activityStampedEnd: ''
        },
        {
          timestamp: '2021-01-13 12:00:00',
          approved: 'BACK',
          activityId: '201812011',
          activityName: '图书馆数字资源培训讲座',
          type: 'lectureActivity',
          organizationMessage: '学生社团联合会',
          location: '图书馆讲堂',
          applicationStamper: 150,
          activityStampedStart: '',
          activityStampedEnd: ''
        }
      ],
      formLabelWidth: '80px',
      activityStatus: '', //活动状态（'PASS'/'FAIL'）
      addFormVisible: false,
      editFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      activityData_length: 0, // 总条目数
      pageSize: 10, // 每页的数据条数
      form: {
        activityName: '',
        organizationMessage: '',
        location: '',
        activityType: '',
        activityStampedStart: '',
        activityStampedEnd: '',
        activityStartTime: '',
        activityEndTime: '',
        activityTime: [new Date(), new Date()],
        stampedTime: [new Date(), new Date()],
        applicationStamper: '',
        fileList: []
      }
    }
  },
  created () {
    let userId = request.localStorageGet('userId');
    this.userId = userId;
    // this.getActivityData();
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
    getstatus(e) {
      this.activityStatus = e;
      this.getActivityData();
    },
    getActivityData() {
      let _this = this
      request.$get('', {
        // userId: _this.userId,
        // page: _this.currentPage,
        // limit: _this.pageSize,
        // orderRule: 'DESC'
      }, (res) => {
        console.log(res.data);
        // let totalPages = res.data.data.totalPages;
        // let activityData = res.data.data.content;
        // _this.activityData = activityData;
        // // _this.finalShow = activityData;
        // _this.activityData_length = totalPages;
      }, _this)
    },
    addActivity() {
      let _this = this
      request.$post('/activity/add', {
        location: _this.form.location,
        activityName: _this.form.activityName,
        activityType: _this.form.activityType,
        organizationMessage: _this.form.organizationMessage,
        userId: _this.userId,
        activityStampedEnd: _this.form.activityStampedEnd,
        activityStampedStart: _this.form.activityStampedStart,
        activityStartTime: _this.form.activityStartTime,
        activityEndTime: _this.form.activityEndTime,
        applicationStamper: _this.form.applicationStamper
      }, (res) => {
        console.log(res.data);
        _this.addFormVisible = false;
        setTimeout(function () {
          _this.getActivityData();
          // _this.reload();
          request.message(_this, '活动创建成功', 'success');
        }, 1000)
      }, _this)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  }
}
</script>

<style lang="less"></style>
