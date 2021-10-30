<template>
  <div id="authority">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">权限分配</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/authority"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">活动模块</li>
                        <li class="breadcrumb-item active" aria-current="page">权限分配</li>
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
                  :data="activityData"
                  v-loading="loading"
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
                      label="开放导章权限"
                      prop="action"
                      width="100">
                      <!-- eslint-disable-next-line -->
                      <template slot-scope="scope">
                          <el-switch
                            v-model="canStamp"
                            @change="changeAuthority"
                            :validate-event="getevent(scope.row.stuId)"
                            active-color="#6993ff"
                            inactive-color="#eeeeee"
                            active-value="true"
                            inactive-value="false"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      prop="action"
                      width="100">
                      <!-- eslint-disable-next-line -->
                      <template slot-scope="scope">
                        <button type="button" class="btn btn-sm btn-success waves-effect waves-light m-1" @click="getdetail(scope.row.activityId, scope.row.activityStampedStart, scope.row.activityStampedEnd, scope.row.activityName);edittimeVisible = true">修改</button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>

                <div class="block" style="margin-top:30px;float: right;margin-bottom: 30px">
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

        <el-dialog :visible.sync="edittimeVisible" title="修改扫章时间" width="35%">
          <p>当前选中活动：{{activityName}}</p>
          <el-form :model="form" size="small">
            <el-form-item :label-width="formLabelWidth" label="扫章时间">
              <el-date-picker
                v-model="form.activityStamped"
                type="datetimerange"
                range-separator="至"
                :start-placeholder="form.activityStampedStart"
                :end-placeholder="form.activityStampedEnd"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="edittimeVisible = false">取 消</el-button>
            <el-button type="primary" size="small" @click="submitEdit">确 认</el-button>
          </div>

        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Authority',
  data() {
    return {
      userId: '', //用户ID
      activityId: '', //活动ID
      activityName: '', //活动名称
      stuId: '', //活动负责人ID
      search_stuId: '',
      search_activityName: '',
      search_organizationMessage: '',
      search_activityStamped: '',
      search_activityStampedStart: '',
      search_activityStampedEnd: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      activityData_length: 0, // 总条目数
      pageSize: 10, // 每页的数据条数
      canStamp: false,
      loading: true,
      activityData: [],
      edittimeVisible: false,
      formLabelWidth: '80px',
      form: {
        activityStamped: '',
        activityStampedStart: '开始日期',
        activityStampedEnd: '结束日期',
      }
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
      request.message(this, '重置成功', 'success');
      this.getActivityData();
    },
    handleSearch_stuId(val) {
      const search = val
      this.search_stuId = search
      this.currentPage = 1
      this.getActivityData()
    },
    handleSearch_activityName(val) {
      const search = val
      this.search_activityName = search
      this.currentPage = 1
      this.getActivityData();
    },
    handleSearch_organizationMessage(val) {
      const search = val
      this.search_organizationMessage = search
      this.currentPage = 1
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
      request.$get('/activity/approved', {
        searchCreatorStuId: _this.search_stuId,
        activityName: _this.search_activityName,
        organizationMessage: _this.search_organizationMessage,
        activityStampedStart: _this.search_activityStampedStart,
        activityStampedEnd: _this.search_activityStampedEnd,
        page: _this.currentPage,
        limit: _this.pageSize
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
    getevent(e) {
      console.log(e);
      this.stuId = e
    },
    changeAuthority($event) {
      let _this = this;
      console.log($event);
      request.$put('/user/stampmanager', {
        operatedId: '',
        stuId: _this.stuId,
        canStamp: $event
      }, (res) => {
        console.log(res.data);
        let message = res.data.errorMsg;
        setTimeout(function () {
          request.message(_this, message, 'success');
        }, 1000)
      }, _this)
    },
    getdetail(e, r, s, n) {
      this.activityId = e;
      this.form.activityStampedStart = this.formateTime(r);
      this.form.activityStampedEnd = this.formateTime(s);
      this.activityName = n;
    },
    submitEdit() {
      let _this= this;
      let value = _this.form.activityStamped;
      var dateStart = new Date(_this.formateTime(value[0]));
      var dateEnd = new Date(_this.formateTime(value[1]));
      var search1 = dateStart.getTime();
      var search2 = dateEnd.getTime();
      console.log(search1)
      console.log(search2)
      _this.form.activityStampedStart = search1
      _this.form.activityStampedEnd = search2
      request.$put('/activity/updatestampedtime', {
        activityId: _this.activityId,
        activityStampedStart: _this.form.activityStampedStart,
        activityStampedEnd: _this.form.activityStampedEnd
      }, (res) => {
        console.log(res.data);
        _this.edittimeVisible = false;
        _this.getActivityData();
      }, _this)
    }
  }
}
</script>

<style lang="less"></style>
