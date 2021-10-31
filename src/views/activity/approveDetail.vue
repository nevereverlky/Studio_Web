<template>
  <div id="approveDetail">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto col-sm-7">
                  <h4 class="page-title">审批详情</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/activityinquiry"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item" aria-current="page">活动模块</li>
                        <li class="breadcrumb-item" aria-current="page">活动审批</li>
                        <li class="breadcrumb-item active" aria-current="page">审批详情</li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <div class="col-sm-5">
                  <div class="btn-group float-sm-right">
                    <button type="button" class="btn btn-primary btn-sm waves-effect waves-light" @click="$router.back()">返回列表</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <section class="content">
              <div class="col-12" style="display: flex">
                <div class="col-md-5">
                  <div class="box bt-3 border-success">
                    <div class="box-header">
                      <h4 class="box-title">钉钉审批截图</h4>
                    </div>

                    <div class="box-body">
                      <p><code>.bt-3.border-info</code></p>
                      <p>Which is the same as saying through shrinking from toil and pain.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="box box-solid bg-success">
                    <div class="box-header">
                      <h6 class="box-title"><strong>第三届田径运动会开幕式活动礼仪</strong></h6>
                    </div>
                    <div class="box-body">
                      <p><b style="padding-right: 20px;">举办单位</b>{{organizationMessage}}</p>
                      <p><b style="padding-right: 20px;">活动地点</b>{{location}}</p>
                      <p><b style="padding-right: 20px;">申请章数</b><span class="badge badge-success">{{applicationStamper}}</span></p>
                      <p><b style="padding-right: 20px;">活动类型</b>{{type}}</p>
                      <p><b style="padding-right: 20px;">活动学期</b>{{term}}</p>
                      <p><b style="padding-right: 20px;">扫章时间</b>{{parseTime(activityStampedStart)+'--'+parseTime(activityStampedEnd)}}</p>
                      <div class="row">
                        <div class="col-12">
                          <div style="display: flex;justify-content:flex-end;">
                            <div>
                              <el-radio v-model="pass" :label="true" size="small" border>通过</el-radio>
                              <el-radio v-model="pass" :label="false" size="small" border>驳回</el-radio>
                            </div>
                            <div v-if="pass === false" style="margin-left: 10px">
                              <el-input
                                v-model="denyReason"
                                placeholder="请输入驳回理由"
                                size="small"
                                style="width: 300px;"/>
                            </div>
                          </div>
                          <button type="button" @click="activityPass" class="btn btn-primary btn-sm waves-effect waves-light" style="float: right;margin-top:20px"><i class="icon-lock" style="margin-right:10px"/>提 交</button>
                        </div>
                      </div><!--End Row-->
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
import {  queryActivityDetail, publishActivity, cancelActivity } from '@/api/activity';
import { parseTime } from '@/utils/util'

export default {
  name: 'ApproveDetail',
  data() {
    return {
      pass: '',
      denyReason: '',
      organizationMessage: '',
      location: '',
      applicationStamper: 0,
      modified: '普通类型',
      term: '',
      type: '',
      activityStampedEnd: null,
      activityStampedStart: null,
    }
  },
  created() {
    this.getActivityId()
  },
  methods: {
    // 时间戳转换
    parseTime(st) {
      return parseTime(st)
    },
    getActivityId() {
      // 此处注意是$route
      const activeId = this.$route.query.activeId;
      queryActivityDetail({activityId: activeId}).then((res) => {
        console.log('queryActivityDetail', res)
        const data = res.data;
        this.organizationMessage =  data.organizationMessage;
        this.location = data.location;
        this.applicationStamper = data.applicationStamper;
        this.modified = data.modified;
        this.term = data.term;
        this.type = data.type;
        this.activityStampedEnd = data.activityStampedEnd;
        this.activityStampedStart = data.activityStampedStart;
      })
    },
    activityPass() {
      const activeId = this.$route.query.activeId;
      if(this.pass) {
        publishActivity({activityId: activeId}).then(() => {
         this.$message.success('审批通过')
        })
      } else {
        (this.denyReason === '') && (this.denyReason = '未填写');
        console.log({activityId: activeId,cancelReason: this.denyReason})
        cancelActivity({activityId: activeId,cancelReason: this.denyReason}).then(() => {
          this.$message.success('已驳回')
        })
      }
    }
  }
}
</script>

<style lang="less"></style>
