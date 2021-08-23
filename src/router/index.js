import Vue from 'vue'
import VueRouter from 'vue-router'
// import request from '../utils/request'
// import _this from './../main.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/login')
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/layout'),
    redirect: '/overview',
    children: [
      {
        path: '/overview',
        name: 'overView',
        component: () => import('../views/overview/overView')
      },
      {
        path: '/inquiry',
        name: 'inquiry',
        component: () => import('../views/activity/inquiry')
      },
      {
        path: '/approval',
        name: 'approval',
        component: () => import('../views/activity/approval')
      },
      {
        path: '/approvedetail',
        name: 'approveDetail',
        component: () => import('../views/activity/approveDetail')
      },
      {
        path: '/authority',
        name: 'authority',
        component: () => import('../views/activity/authority')
      },
      {
        path: '/import',
        name: 'importChapter',
        component: () => import('../views/chapter/import')
      },
      {
        path: '/manage',
        name: 'manageChapter',
        component: () => import('../views/chapter/manage')
      },
      {
        path: '/infoentry',
        name: 'infoEntry',
        component: () => import('../views/office/infoEntry')
      },
      {
        path: '/userinfo',
        name: 'userInfo',
        component: () => import('../views/account/userInfo')
      },
      {
        path: '/editpwd',
        name: 'editPwd',
        component: () => import('../views/account/editPwd')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// // 全局路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     // next();
//     // request.localStorageSet('token',null)
//     let token = request.localStorageGet('token');
//     console.log(token)
//     if (!token) {
//       next();
//     } else {
//       next('index');
//       request.message(_this, '您已登陆', 'warning')
//     }
//   } else {
//     let token = request.localStorageGet('token');
//     console.log(token)
//     if (!token) {
//       // next('/login');
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//       request.message(_this, '请先登陆' ,'warning')
//     } else {
//       next()
//     }
//   }
// })

export default router
