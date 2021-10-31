<template>
  <div id="overView">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">预警与总览</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/overallview"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">预警与总览</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div class="row">
                <div class="col-xl-3 col-md-6 col-12">
                  <div class="box box-success pull-up">
                    <el-tooltip class="item" effect="dark" content="点击显示本周创建的活动数" placement="top">
                      <div class="box-body" @click="showCurweek">
                        <div class="d-flex align-items-center font-size-18">
                          <div class="icon">
                            <i class="fa fa-puzzle-piece text-white mr-10"/>
                          </div>
                          <p class="font-weight-medium mb-0 text-white">本周创建的活动数</p>
                        </div>
                        <div class="d-flex align-items-center flex-wrap">
                          <h2 class="font-weight-normal text-white">965</h2>
                          <div class="badge badge-light badge-pill ml-10">
                            <div class="d-flex align-items-baseline">
                              <span class="mr-2">增加</span>
                              <span class="mb-0">485</span>
                              <span class="fa fa-arrow-up" style="margin-left: 5px"/>
                            </div>
                          </div>
                        </div>
                        <small class="font-weight-medium d-block text-white-50">Total for this month</small>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 col-12">
                  <div class="box box-primary pull-up">
                    <el-tooltip class="item" effect="dark" content="点击显示本周审批通过的活动数" placement="top">
                      <div class="box-body" @click="showApproved">
                        <div class="d-flex align-items-center font-size-18">
                          <div class="icon">
                            <i class="fa fa-paper-plane text-white mr-10"/>
                          </div>
                          <p class="font-weight-medium mb-0 text-white">本周审批通过的活动数</p>
                        </div>
                        <div class="d-flex align-items-center flex-wrap">
                          <h2 class="font-weight-normal text-white">854</h2>
                          <div class="badge badge-light badge-pill ml-10">
                            <div class="d-flex align-items-baseline">
                              <span class="mr-2">增加</span>
                              <span class="mb-0">563</span>
                              <span class="fa fa-arrow-up" style="margin-left: 5px"/>
                            </div>
                          </div>
                        </div>
                        <small class="font-weight-medium d-block text-white-50">Total for this month</small>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 col-12">
                  <div class="box box-success pull-up">
                    <el-tooltip class="item" effect="dark" content="点击显示本周未达标的活动数" placement="top">
                      <div class="box-body" @click="showUnqualified">
                        <div class="d-flex align-items-center font-size-18">
                          <div class="icon">
                            <i class="fa fa-exclamation-triangle text-white mr-10"/>
                          </div>
                          <p class="font-weight-small mb-0 text-white">本周未达标的活动数</p>
                        </div>
                        <div class="d-flex align-items-center flex-wrap">
                          <h2 class="font-weight-normal text-white">745</h2>
                          <div class="badge badge-light badge-pill ml-10">
                            <div class="d-flex align-items-baseline">
                              <span class="mr-2">减少</span>
                              <span class="mb-0">123</span>
                              <span class="fa fa-arrow-down" style="margin-left: 5px"/>
                            </div>
                          </div>
                        </div>
                        <small class="font-weight-medium d-block text-white-50">Total for this month</small>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 col-12">
                  <div class="box box-primary pull-up">
                    <el-tooltip class="item" effect="dark" content="点击显示未达毕业要求的毕业数" placement="top">
                      <div class="box-body" @click="showNotgraduate">
                        <div class="d-flex align-items-center font-size-18">
                          <div class="icon">
                            <i class="fa fa-mortar-board text-white mr-10"/>
                          </div>
                          <p class="font-weight-medium mb-0 text-white">未达毕业要求的毕业数</p>
                        </div>
                        <div class="d-flex align-items-center flex-wrap">
                          <h2 class="font-weight-normal text-white">254</h2>
                          <div class="badge badge-light badge-pill ml-10">
                            <div class="d-flex align-items-baseline">
                              <span class="mr-2">减少</span>
                              <span class="mb-0">235</span>
                              <span class="fa fa-arrow-down" style="margin-left: 5px"/>
                            </div>
                          </div>
                        </div>
                        <small class="font-weight-medium d-block text-white-50">Total for this year</small>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
              </div>

              <div v-if="showNotgraduation">
                <div>
                  <div class="btn-group float-sm-right" style="margin-bottom: 20px">
                    <button type="button" class="btn btn-primary btn-sm waves-effect waves-light"><i class="fa fa-download mr-1"/>导出名单</button>
                  </div>
                </div>
                <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                <el-table
                  :data="stuData"
                  :header-cell-style="{color: '#000000', fontSize: '14px'}"
                  style="width: 100%"
                  cell-style="font-size:13px">
                  <el-table-column label="未达毕业要求的毕业生如下">
                    <el-table-column
                      label="姓名学号"
                      prop="name"
                      width="180">
                      <template slot-scope="scope">
                        {{ scope.row.name }}<span class="badge badge-success" style="margin-left: 10px">{{ scope.row.account }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="班级"
                      prop="class"
                      width="140">
                      <template slot-scope="scope">
                        {{ scope.row.class }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="辅导员"
                      prop="teacher"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.teacher }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="联系方式"
                      prop="phone"
                      width="180">
                      <template slot-scope="scope">
                        {{ scope.row.phone }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="未达标的要求"
                      prop="result">
                      <template slot-scope="scope">
                        {{ scope.row.result }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="action"
                      width="200">
                      <!-- eslint-disable-next-line -->
                      <template slot="header" slot-scope="scope">
                        <el-input
                          v-model="search_name"
                          scope
                          style="width: 100%"
                          size="mini"
                          placeholder="输入姓名搜索"/>
                      </template>
                      <!-- eslint-disable-next-line -->
                      <template slot-scope="scope">
                        <button type="button" class="btn btn-outline btn-rounded btn-success btn-sm mb-0">推送消息</button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>

                <div class="block" style="margin-top:30px;float: right">
                  <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[10,20,50]"
                    :page-size="pageSize"
                    :total="activeData_length"
                    align="center"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
                </div>
              </div>

              <div v-if="showCurWeekList">
                <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                <el-table
                  :data="createdList"
                  :header-cell-style="{color: '#000000', fontSize: '14px'}"
                  style="width: 100%"
                  cell-style="font-size:13px">
                  <el-table-column label="本周创建的活动如下">
                    <el-table-column
                      label="负责人"
                      prop="creatorId"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.creatorId }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="活动名称"
                      prop="activityName">
                      <template slot-scope="scope">
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
                      prop="start"
                      width="280">
                      <template slot-scope="scope">
                        {{ parseTime(scope.row.activityStampedStart)+'-'+parseTime(scope.row.activityStampedEnd) }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="action"
                      width="200">
                      <!-- eslint-disable-next-line -->
                      <template slot="header" slot-scope="scope">
                        <el-input
                          v-model="created_search_activename"
                          scope
                          style="width: 100%"
                          size="mini"
                          placeholder="输入活动名称搜索"/>
                      </template>
                      <template slot-scope="scope">
                        <span class="badge badge-dark">{{ scope.row.type }}</span>
                      </template>
                    </el-table-column>
                </el-table-column></el-table>

                <div class="block" style="margin-top:30px;float: right">
                  <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[10,20,50]"
                    :page-size="pageSize"
                    :total="activeData_length"
                    align="center"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
                </div>
              </div>

              <div v-if="showApprovedList">
                <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                <el-table
                  :data="approvedList"
                  :header-cell-style="{color: '#000000', fontSize: '14px'}"
                  style="width: 100%"
                  cell-style="font-size:13px">
                  <el-table-column label="本周审批通过的活动如下">
                    <el-table-column
                      label="负责人"
                      prop="creatorId"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.creatorId }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="活动名称"
                      prop="activeName">
                      <template slot-scope="scope">
                        {{ scope.row.activeName }}
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
                      prop="start"
                      width="280">
                      <template slot-scope="scope">
                        {{ parseTime(scope.row.activityStampedStart)+'-'+parseTime(scope.row.activityStampedEnd) }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="action"
                      width="200">
                      <!-- eslint-disable-next-line -->
                      <template slot="header" slot-scope="scope">
                        <el-input
                          v-model="approved_search_activename"
                          scope
                          style="width: 100%"
                          size="mini"
                          placeholder="输入活动名称搜索"/>
                      </template>
                      <template slot-scope="scope">
                        <span class="badge badge-dark">{{ scope.row.type }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>

                <div class="block" style="margin-top:30px;float: right">
                  <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[10,20,50]"
                    :page-size="pageSize"
                    :total="activeData_length"
                    align="center"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
                </div>
              </div>

              <div v-if="showUnqualifiedList">
                <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                <el-table
                  :data="unqualifiedList"
                  :header-cell-style="{color: '#000000', fontSize: '14px'}"
                  style="width: 100%"
                  cell-style="font-size:13px">
                  <el-table-column label="本周未达标的活动如下（即申请章数与实际章数大于小于一定的比例）">
                    <el-table-column
                      label="负责人"
                      prop="creatorId"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.creatorId }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="活动名称"
                      prop="activeName">
                      <template slot-scope="scope">
                        {{ scope.row.activeName }}
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
                      prop="start"
                      width="180">
                      <template slot-scope="scope">
                        {{ parseTime(scope.row.activityStampedStart)+'-'+parseTime(scope.row.activityStampedEnd) }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="action"
                      width="200">
                      <!-- eslint-disable-next-line -->
                      <template slot="header" slot-scope="scope">
                        <el-input
                          v-model="unqualified_search_activename"
                          scope
                          style="width: 100%"
                          size="mini"
                          placeholder="输入活动名称搜索"/>
                      </template>
                      <template slot-scope="scope">
                        <span class="badge badge-danger">{{ scope.row.percent }}</span>
                        <span class="badge badge-warning">{{ scope.row.percent }}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>

                <div class="block" style="margin-top:30px;float: right">
                  <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[10,20,50]"
                    :page-size="pageSize"
                    :total="activeData_length"
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

      </div>
    </div>
  </div>
</template>

<script>
// import request from '/../../utils/request'
import { getWeekCreated, getWeekApproved, getWeekUnqualified } from '@/api/activity'
import { parseTime } from '@/utils/util'
import { debounce } from 'lodash'

export default {
  name: 'OverView',
  data() {
    return {
      created_search_activename: '', // input的值
      approved_search_activename: '', // input的值
      unqualified_search_activename: '', // input的值
      search_name: '',
      activeData: [
        {
          account: '199050702',
          activename: 'XXXXX活动',
          organization: '社团联',
          place: 'C楼511',
          time: '2021.7.16 12:00 ~ 14:00',
          type: '志愿活动',
          percent: '15%'
        },
        {
          account: '199050702',
          activename: 'XXXXX活动',
          organization: '社团联',
          place: 'C楼511',
          time: '2021.7.16 12:00 ~ 14:00',
          type: '讲座活动',
          percent: '-15%'
        }
      ],
      stuData: [
        {
          name: 'XXXX',
          account: '1XXXXXXXX',
          class: '1XXXXX104',
          teacher: '宋华江',
          phone: '19858100000',
          result: '活动章少于8个，社会实践少于1次'
        }
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      activeData_length: 0, // 总条目数
      pageSize: 10,// 每页的数据条数
      curWeekActivity: [],
      curWeekPaas: [],
      curWeekUnqualified: [],
      createdList: [],
      approvedList: [],
      unqualifiedList: [],
      showCurWeekList: true,
      showApprovedList: false,
      showUnqualifiedList: false,
      showNotgraduation: false,
    }
  },
  watch: {
    // watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    created_search_activename(newVal) {
      this.created_handleSearch(newVal)
    },
    // watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    approved_search_activename(newVal) {
      this.approved_handleSearch(newVal)
    },
    // watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    unqualified_search_activename(newVal) {
      this.unqualified_handleSearch(newVal)
    }
  },
  mounted() {
    this.getWeekCreatedList();
    this.getWeekApprovedList();
    this.getWeekUnqualifiedList();
  },
  methods: {
    showCurweek() {
      this.showApprovedList = false;
      this.showCurWeekList = true;
      this.showUnqualifiedList = false;
      this.showNotgraduation = false;
    },
    showApproved() {
      this.showApprovedList = true;
      this.showCurWeekList = false;
      this.showUnqualifiedList = false;
      this.showNotgraduation = false;
    },
    showUnqualified() {
      this.showUnqualifiedList = true;
      this.showApprovedList = false;
      this.showCurWeekList = false;
      this.showNotgraduation = false;
    },
    showNotgraduate() {
      this.showNotgraduation = true;
      this.showUnqualifiedList = false;
      this.showApprovedList = false;
      this.showCurWeekList = false;
    },
    // 时间戳转换
    parseTime(st) {
      return parseTime(st)
    },
    // 获取本周创建的活动列表
    getWeekCreatedList(params) {
      getWeekCreated(params).then((res) => {
        this.createdList = res.data.content;
        console.log('getWeekCreatedList', res);
      })
    },
    // 获取本周审批通过的活动列表
    getWeekApprovedList(params) {
      getWeekApproved(params).then((res) => {
        this.approvedList = res.data.content;
        console.log('getWeekApprovedList', res);
      })
    },
    // 获取本周未达标的活动列表
    getWeekUnqualifiedList(params) {
      getWeekUnqualified(params).then((res) => {
        this.unqualifiedList = res.data.content;
        console.log('getWeekUnqualifiedList', res);
      })
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    created_handleSearch: debounce(function(val) {
      this.getWeekCreatedList({activityName: val})
    },1000),
    approved_handleSearch: debounce(function(val) {
      this.getWeekApprovedList({activityName: val})
    },1000),
    unqualified_handleSearch: debounce(function(val) {
      this.getWeekUnqualifiedList({activityName: val});
    },1000),
  }
}
</script>

<style lang="less"></style>