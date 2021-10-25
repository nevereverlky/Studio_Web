import request from '@/utils/invoke';

// 需求2 总览+预警模块（面向的是管理员角色，即团委老师与开发者）
// 获取本周创建的活动列表
export function getWeekCreated(data) {
  return request({
    url: "/activity/week/created",
    method: 'get',
    data
  })
}

// 创建活动时需要的下拉列表
export function getActivityOrganizers() {
  return request({
    url: "/activity/organizers",
    method: 'get'
  })
}

// 获取本周审批通过的活动列表
export function getWeekApproved() {
  return request({
    url: "/activity/week/approved",
    method: 'get'
  })
}

// 获取本周未达标的活动列表
export function getWeekUnqualified() {
  return request({
    url: "/activity/week/unQualified",
    method: 'get'
  })
}

// 需求3: 活动查询与创建（面向的是活动负责人角色）
// 图片上传
export function picUpload() {
  return request({
    url: "/common/aliyun/ding",
    method: 'post'
  })
}

// 创建活动申请
export function createActivity(data) {
  return request({
    url: "/activity",
    method: 'post',
    data
  })
}

// 查看自己申请的已审批通过的活动
export function queryApprovedListByUserID() {
  return request({
    url: "/activity/approved/byUserID",
    method: 'get'
  })
}

// 查看自己申请的未审批通过（驳回、待审批）的活动
export function queryCanceledListByUserID() {
  return request({
    url: "/activity/canceled/byUserID",
    method: 'get'
  })
}

// 修改活动申请
export function changeModify() {
  return request({
    url: "/activity/modify",
    method: 'put'
  })
}

// 需求4: 活动审批（面向的是管理员角色）
// 获取已审批通过的活动列表
export function queryApprovedListAll(data) {
  return request({
    url: "/activity/approved/by",
    method: 'get',
    data
  })
}

// 获取未审批通过的活动列表
export function queryCanceledAll(data) {
  return request({
    url: "/activity/canceled/by",
    method: 'get',
    data
  })
}

// 获取审批详情
export function queryActivityDetail() {
  return request({
    url: "/activity/ByActivityId",
    method: 'get'
  })
}

// 审批通过
export function publishActivity() {
  return request({
    url: "/activity/publish",
    method: 'put'
  })
}

// 审批驳回
export function cancelActivity() {
  return request({
    url: "/activity/cancel",
    method: 'put'
  })
}

// 导出Excel
export function exportExcel(data) {
  return request({
    url: "/activityStamp/exportExcel",
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

// 导出Excel
export function getApprovedActivityList() {
  return request({
    url: "/activity/getApprovedActivityList",
    method: 'get'
  })
}
