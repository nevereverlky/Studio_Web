import Vue from 'vue'
import VueRouter from 'vue-router'
import request from '@/utils/request'
import _this from './../main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/overview',
    children: [
      {
        path: '/overview',
        authname: '预警与总览',
        name: 'overView',
        component: () => import('@/views/overview/overView'),
        children: []
      },
      {
        path: '/activity',
        authname: '活动模块',
        component: () => import('@/views/activity'),
        children: [
          {
            path: '/inquiry',
            authname: '活动查询与创建',
            name: 'inquiry',
            component: () => import('@/views/activity/inquiry')
          },
          {
            path: '/approval',
            authname: '活动审批',
            name: 'approval',
            component: () => import('@/views/activity/approval')
          },
          {
            path: '/approvedetail',
            authname: '活动审批详情',
            name: 'approveDetail',
            component: () => import('@/views/activity/approveDetail')
          },
          {
            path: '/authority',
            authname: '权限分配',
            name: 'authority',
            component: () => import('@/views/activity/authority')
          },
        ]
      },
      {
        path: '/chapter',
        authname: '活动章模块',
        component: () => import('@/views/chapter'),
        children: [
          {
            path: '/import',
            authname: '导入章',
            name: 'importChapter',
            component: () => import('@/views/chapter/import')
          },
          {
            path: '/manage',
            authname: '导入/导出章',
            name: 'manageChapter',
            component: () => import('@/views/chapter/manage')
          },
        ]
      },
      {
        path: '/office',
        authname: '教务模块',
        component: () => import('@/views/office'),
        children: [
          {
            path: '/infoentry',
            authname: '新生信息录入',
            name: 'infoEntry',
            component: () => import('@/views/office/infoEntry')
          },
        ]
      },
      {
        path: '/userinfo',
        name: 'userInfo',
        component: () => import('@/views/account/userInfo')
      },
      {
        path: '/editpwd',
        name: 'editPwd',
        component: () => import('@/views/account/editPwd')
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('@/views/account/history')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // next();
    // request.localStorageSet('token',null)
    let token = request.localStorageGet('token');
    console.log(token)
    if (!token) {
      next();
    } else {
      next('/');
      request.message(_this, '您已登陆', 'warning')
    }
  } else {
    let token = request.localStorageGet('token');
    console.log(token)
    if (!token) {
      // next('/login');
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
      request.message(_this, '请先登陆' ,'warning')
    } else {
      next()
    }
  }
})

export default router
