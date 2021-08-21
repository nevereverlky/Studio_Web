import Vue from 'vue'
import VueRouter from 'vue-router'
// import request from '../utils/request'
// import _this from './../main.js'

import Index from '@/views/Index.vue'
// import activityInquiry from '@/components/ActivityManage/activityInquiry'
// import activityApproval from '@/components/ActivityManage/activityApproval'
// import approveCard from '@/components/ActivityManage/approveCard'
// import activityChapter from '@/components/ActivityManage/activityChapter'
// import chapterInout from '@/components/ActivityManage/chapterInout'
// import Authorization from '@/components/ActivityManage/Authorization'
// import InformationEntry from '@/components/InformationEntry'
import OverallView from '@/components/OverallView'
// import userInfo from '@/components/userInfo'
// import EditPassword from '@/components/EditPassword'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/signin'
  },
  {
    path: '/signin',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/index',
    name: 'Index',
    // component: () => import('../views/Index.vue'),
    component: Index,
    redirect: '/overallview',
    children: [
      {
        path: '/activityinquiry',
        name: 'activityInquiry',
        component: () => import('../components/ActivityManage/activityInquiry.vue')
      },
      {
        path: '/activityapproval',
        name: 'activityApproval',
        component: () => import('../components/ActivityManage/activityApproval.vue')
      },
      {
        path: '/approvecard',
        name: 'approveCard',
        component: () => import('../components/ActivityManage/approveCard.vue')
      },
      {
        path: '/activitychapter',
        name: 'activityChapter',
        component: () => import('../components/ActivityManage/activityChapter.vue')
      },
      {
        path: '/chapterinout',
        name: 'chapterInout',
        component: () => import('../components/ActivityManage/chapterInout.vue')
      },
      {
        path: '/authorization',
        name: 'Authorization',
        component: () => import('../components/ActivityManage/Authorization')
      },
      {
        path: '/informationentry',
        name: 'InformationEntry',
        component: () => import('../components/InformationEntry')
      },
      {
        path: '/overallview',
        name: 'OverallView',
        // component: () => import('../components/OverallView')
        component: OverallView
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('../components/UserInfo')
      },
      {
        path: '/EditPassword',
        name: 'EditPassword',
        component: () => import('../components/EditPassword')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
