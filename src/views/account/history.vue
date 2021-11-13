<template>
  <div id="userInfo">
    <div class="hold-transition sidebar-mini">
      <div class="wrapper">

        <div class="content-wrapper">
          <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
              <div class="d-flex align-items-center">
                <div class="mr-auto">
                  <h4 class="page-title">更新日志</h4>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link tag="a" to="/activityapproval"><i class="fa fa-home" aria-hidden="true"/></router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">更新日志</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            
              <!-- Main content -->
            <section class="content">
                <div class="block col-md-6">
                <el-timeline>
                    <el-timeline-item 
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp"
                    placement="top">
                    <el-card>
                        <p>{{activity.content}}</p>
                    </el-card>
                    </el-timeline-item>
                </el-timeline>
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
  name: 'History',
  data() {
      return {
        activities: [
          {
            content: '测试',
            timestamp: '2021-11-01 9:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more'
          }, 
          {
            content: '完成活动负责人模块接口',
            timestamp: '2021-10-23 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more'
          },
          {
            content: '完成管理员模块接口',
            timestamp: '2021-10-20 22:40',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more'
          }
        ]
      };
    },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
