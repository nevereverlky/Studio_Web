<template>
  <div id="approval">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">活动审批</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/approval"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">活动模块</li>
                        <li class="breadcrumb-item active" aria-current="page">活动审批</li>
                      </ol>
                    </nav>
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
                      <li class="nav-item"><a href="#navpills2-1" class="nav-link active" data-toggle="tab" aria-expanded="false">待审批</a> </li>
                      <li class="nav-item"><a href="#navpills2-2" class="nav-link" data-toggle="tab" aria-expanded="false">已审批</a> </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                      <div id="navpills2-1" class="tab-pane active">
                        <div class="row">
                          <div class="col-md-12">
                            <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                            <el-table
                              :data="canceledList"
                              v-loading="canceledLoading"
                              :header-cell-style="{color: 'black', fontSize: '13px'}"
                              style="width: 100%"
                              :cell-style="{fontSize: '13px'}">
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
                                  prop="stuId"
                                  width="100">
                                  <template slot-scope="scope">
                                    {{ scope.row.stuId }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="活动名称"
                                  prop="activityName">
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
                                  prop="organizationMessage"
                                  width="140">
                                  <template slot-scope="scope">
                                    {{ scope.row.organizationMessage }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="活动地点"
                                  prop="location"
                                  width="100">
                                  <template slot-scope="scope">
                                    {{ scope.row.location }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="扫章时间"
                                  prop="activityStamped"
                                  width="180">
                                  <template slot-scope="scope">
                                    {{ scope.row.activityStampedStart | dateFormat}}-{{ scope.row.activityStampedEnd | dateFormat}}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="申请章数"
                                  prop="applicationStamper"
                                  width="100">
                                  <!-- eslint-disable-next-line -->
                                  <template slot-scope="scope">
                                    {{ scope.row.applicationStamper }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="操作"
                                  prop="action"
                                  width="100">
                                  <!-- eslint-disable-next-line -->
                                  <template slot-scope="scope">
                                    <button type="button" class="btn btn-sm btn-success waves-effect waves-light m-1" @click="toApprove(scope.row.activityId)">审批</button>
                                  </template>
                                </el-table-column>
                              </el-table-column>
                            </el-table>

                            <div class="block" style="margin-top:30px;float: right">
                              <el-pagination
                                :current-page="currentPage"
                                :page-sizes="[10,20,50]"
                                :page-size="pageSize"
                                :total="canceledList_length"
                                align="center"
                                layout="total, sizes, prev, pager, next, jumper"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="navpills2-2" class="tab-pane">
                        <div class="row">
                          <div class="col-md-12">
                            <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                            <el-table
                              :data="approvedList"
                              v-loading="approvedLoading"
                              :header-cell-style="{color: 'black', fontSize: '13px'}"
                              style="width: 100%"
                              :cell-style="{fontSize: '13px'}">
                              <el-table-column>
                                <!-- eslint-disable-next-line -->
                                <template slot="header" slot-scope="scope">
                                  <div style="display: flex;flex-direction: row;justify-content: space-between">
                                    <el-input
                                      v-model="done_search_stuId"
                                      scope
                                      style="width: 15%"
                                      size="mini"
                                      placeholder="按照负责人学号搜索"/>
                                    <el-input
                                      v-model="done_search_activityName"
                                      scope
                                      style="width: 15%"
                                      size="mini"
                                      placeholder="按照活动名称搜索"/>
                                    <el-input
                                      v-model="done_search_organizationMessage"
                                      scope
                                      style="width: 20%"
                                      size="mini"
                                      placeholder="按照举办单位搜索"/>
                                    <el-date-picker
                                      v-model="done_search_activityStamped"
                                      :default-time="['12:00:00']"
                                      style="width: 30%"
                                      size="mini"
                                      type="datetimerange"
                                      start-placeholder="搜索扫章开始时间"
                                      end-placeholder="扫章结束时间内"/>
                                    <button type="button" class="btn btn-sm btn-primary waves-effect waves-light m-1" @click="done_reset">重置</button>
                                  </div>
                                </template>
                                <el-table-column
                                  label="负责人"
                                  prop="stuId"
                                  width="100">
                                  <template slot-scope="scope">
                                    {{ scope.row.stuId }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="活动名称"
                                  prop="activityName">
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
                                  prop="organizationMessage"
                                  width="140">
                                  <template slot-scope="scope">
                                    {{ scope.row.organizationMessage }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="活动地点"
                                  prop="location"
                                  width="100">
                                  <template slot-scope="scope">
                                    {{ scope.row.location }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="扫章时间"
                                  prop="activityStamped"
                                  width="180">
                                  <template slot-scope="scope">
                                    {{ scope.row.activityStampedStart | dateFormat}}-{{ scope.row.activityStampedEnd | dateFormat }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="申请章数"
                                  prop="applicationStamper"
                                  width="100">
                                  <!-- eslint-disable-next-line -->
                                  <template slot-scope="scope">
                                    {{ scope.row.applicationStamper }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="状态"
                                  prop="action"
                                  width="100">
                                  <!-- eslint-disable-next-line -->
                                   <template slot-scope="scope">
                                    <span :class="scope.row.state === 'PUBLISHED'?'badge-success':'badge-warning'" class="badge"> {{ scope.row.state === 'PUBLISHED'? '已通过':'已驳回' }}</span>
                                  </template>
                                </el-table-column>
                              </el-table-column>
                            </el-table>

                            <div class="block" style="margin-top:30px;float: right">
                              <el-pagination
                                :current-page="done_currentPage"
                                :page-sizes="[10,20,50]"
                                :page-size="done_pageSize"
                                :total="approvedList_length"
                                align="center"
                                layout="total, sizes, prev, pager, next, jumper"
                                @size-change="done_handleSizeChange"
                                @current-change="done_handleCurrentChange"/>
                            </div>
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

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
import {  queryApprovedListAll,
          queryCanceledListAll} from '@/api/activity';
import { parseTime } from '@/utils/util'
import { debounce } from 'lodash'
import { formateTime } from '../../utils/util'

export default {
  name: 'Approval',
  data() {
    return {
      //待审批表格
      search_stuId: '',
      search_activityName: '',
      search_organizationMessage: '',
      search_activityStamped: '',
      search_activityStampedStart: '',
      search_activityStampedEnd: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      canceledList: [],
      canceledList_length: 0, // 总条目数
      canceledLoading: false,
      //已审批表格
      done_search_stuId: '',
      done_search_activityName: '',
      done_search_organizationMessage: '',
      done_search_activityStamped: '',
      done_search_activityStampedStart: '',
      done_search_activityStampedEnd: '',
      done_currentPage: 1, // 当前页码
      done_total: 20, // 总条数
      done_pageSize: 10, // 每页的数据条数
      approvedList: [],
      approvedList_length: 0, // 总条目数
      approvedLoading: false,
    }
  },
  watch: {
    // watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    search_stuId(newVal) {
      this.debounce_handleSearch_stuId(newVal)
    },
    search_activityName(newVal) {
      this.debounce_handleSearch_activityName(newVal)
    },
    search_organizationMessage(newVal) {
      this.debounce_handleSearch_organizationMessage(newVal)
    },
    search_activityStamped(newVal) {
      this.debounce_handleSearch_activityStamped(newVal)
    },
    done_search_stuId(newVal) {
      this.done_debounce_handleSearch_stuId(newVal)
    },
    done_search_activityName(newVal) {
      this.done_debounce_handleSearch_activityName(newVal)
    },
    done_search_organizationMessage(newVal) {
      this.done_debounce_handleSearch_organizationMessage(newVal)
    },
    done_search_activityStamped(newVal) {
      this.done_debounce_handleSearch_activityStamped(newVal)
    }
  },
  created() {
    this.queryApprovedListAll();
    this.queryCanceledListAll();
  },
  methods: {
    // 时间戳解析
    parseT(t) {
      return parseTime(t)
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
      this.queryCanceledListAll()
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.queryCanceledListAll()
    },
        // 每页条数改变时触发 选择一页显示多少行
    done_handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.done_currentPage = 1
      this.done_pageSize = val
      this.queryApprovedListAll()
    },
    // 当前页改变时触发 跳转其他页
    done_handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.done_currentPage = val
      this.queryApprovedListAll()
    },
    reset() {
      this.search_stuId = ''
      this.search_activityName = ''
      this.search_organizationMessage = ''
      this.search_activityStamped = ''
      this.search_activityStampedStart = ''
      this.search_activityStampedEnd = ''
      request.message(this, '重置成功', 'success')
      this.queryCanceledListAll()
    },
    done_reset() {
      this.done_search_stuId = ''
      this.done_search_activityName = ''
      this.done_search_organizationMessage = ''
      this.done_search_activityStamped = ''
      this.done_search_activityStampedStart = ''
      this.done_search_activityStampedEnd = ''
      request.message(this, '重置成功', 'success')
      this.queryApprovedListAll()
    },
    debounce_handleSearch_stuId: debounce(function (val) {
      const search = val
      this.search_stuId = search
      this.currentPage = 1;
      this.queryCanceledListAll()
    }, 1000) ,
    debounce_handleSearch_activityName: debounce(function (val) {
      const search = val
      this.search_activityName = search
      this.currentPage = 1;
      this.queryCanceledListAll()
    }, 1000),
    debounce_handleSearch_organizationMessage: debounce( function (val) {
      const search = val
      this.search_organizationMessage = search
      this.currentPage = 1;
      this.queryCanceledListAll()
    }, 1000),
    debounce_handleSearch_activityStamped: debounce( function (val) {
      let _this = this
      console.log('curSearchData', val)
      if (val === null || val === '') {
        this.search_activityStamped = ''
        this.search_activityStampedStart = ''
        this.search_activityStampedEnd = ''
      } else {
        var dateStart = new Date(formateTime(val[0]));
        var dateEnd = new Date(formateTime(val[1]));
        var search1 = dateStart.getTime();
        var search2 = dateEnd.getTime();
        console.log(search1)
        console.log(search2)
        _this.search_activityStampedStart = search1
        _this.search_activityStampedEnd = search2
        _this.currentPage = 1
        _this.queryCanceledListAll()
      }
    }, 1000),
    done_debounce_handleSearch_stuId: debounce(function (val) {
      const search = val
      this.done_search_stuId = search
      this.done_currentPage = 1;
      this.queryApprovedListAll()
    }, 1000) ,
    done_debounce_handleSearch_activityName: debounce(function (val) {
      const search = val
      this.done_search_activityName = search
      this.done_currentPage = 1;
      this.queryApprovedListAll()
    }, 1000),
    done_debounce_handleSearch_organizationMessage: debounce( function (val) {
      const search = val
      this.done_search_organizationMessage = search
      this.done_currentPage = 1
      this.queryApprovedListAll()
    }, 1000),
    done_debounce_handleSearch_activityStamped: debounce( function (val) {
      let _this = this
      console.log('curSearchData', val)
      if (val === null || val === '') {
        this.done_search_activityStamped = ''
        this.done_search_activityStampedStart = ''
        this.done_search_activityStampedEnd = ''
      } else {
        var dateStart = new Date(formateTime(val[0]));
        var dateEnd = new Date(formateTime(val[1]));
        var search1 = dateStart.getTime();
        var search2 = dateEnd.getTime();
        console.log(search1)
        console.log(search2)
        _this.done_search_activityStampedStart = search1
        _this.done_search_activityStampedEnd = search2
        _this.done_currentPage = 1
        _this.queryApprovedListAll()
      }
    }, 1000),
    // 获取已审批通过的活动列表
    queryApprovedListAll() {
      let _this = this
      this.approvedLoading = true,
      queryApprovedListAll({
          searchCreatorStuId: _this.done_search_stuId,
          activityName: _this.done_search_activityName,
          organizationMessage: _this.done_search_organizationMessage,
          activityStampedStart: _this.done_search_activityStampedStart,
          activityStampedEnd: _this.done_search_activityStampedEnd,
          page: _this.done_currentPage-1,
          limit: _this.done_pageSize,
          orderRule: ''
      }).then((res) => {
        _this.approvedList = res.data.content;
        _this.approvedList_length = res.data.totalElements;
        console.log('queryApprovedListAll', res)
      }).finally(() => {
        _this.approvedLoading = false
      })
    },
    // 获取未审批通过的活动列表
    queryCanceledListAll() {
      let _this = this
      this.canceledLoading = true,
      queryCanceledListAll({
          searchCreatorStuId: _this.search_stuId,
          activityName: _this.search_activityName,
          organizationMessage: _this.search_organizationMessage,
          activityStampedStart: _this.search_activityStampedStart,
          activityStampedEnd: _this.search_activityStampedEnd,
          page: _this.currentPage-1,
          limit: _this.pageSize,
          orderRule: ''
        }).then((res) => {
          _this.canceledList = res.data.content;
          _this.canceledList_length = res.data.totalElements;
          console.log('queryCanceledListAll', res)
        }).finally(() => {
          _this.canceledLoading = false
        })
    },
    toApprove(id) {
      console.log('toApprove', id)
      this.$router.push({
        path: '/approvedetail',
        name: 'approveDetail',
        query: {
          activityId: id
        }
      })
    }
  }
}
</script>

<style lang="less"></style>
