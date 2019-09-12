import axios from '@/js/api.request.js'


// 获取厨房列表 无权限
export const getKitchenList = () => {
  return axios.request({
    url: '/api/Index/getKitchenList',
    method: 'get'
  })
}


// 获取招商经理
export const getLeasingList = (data) => {
  return axios.request({
    url: '/api/Index/getSalesList',
    data,
    method: 'post'
  })
}


// 获取信息
export const showEmployee = (data) => {
  return axios.request({
    url: '/api/Employee/show',
    data,
    method: 'post'
  })
}


// 获取店铺运营
export const getManageList = () => {
  const data = { group_id: '7' }
  return axios.request({
    url: '/api/Index/getEmployeeList',
    data,
    method: 'post'
  })
}

// 获取我的带看
export const getMyViewList = (data) => {
  return axios.request({
    url: '/api/Clue/index',
    data,
    method: 'post'
  })
}
// api/Clue/index

/*
  获取厨房下的档口列表
*/
/*
  kitchen_id
*/
export const getStoreNoList = ( obj ) => {
  return axios.request({
    url: '/api/Index/getStoreNo',
    params: obj,
    method: 'get'
  })
}

// 
export const uploadImg = (data) => {
  return axios.request({
    url: '/api/index/upload',
    data,
    method: 'POST',
  })
}

// 获取全部商户
export const getAllShopList = ( info ) => {
  return axios.request({
    url: '/api/StoreLease/index',
    params: info,
    method: 'get'
  })
}