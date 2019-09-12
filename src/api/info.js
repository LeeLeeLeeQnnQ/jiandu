import axios from '@/js/api.request.js'

export const editShopInfo = (data) => {
  data.lease_type = '1'
  return axios.request({
    url: '/api/StoreLease/edit',
    data,
    method: 'post'
  })
}


export const getShopDetail = (data) => {
  return axios.request({
    url: '/api/StoreLease/show',
    data,
    method: 'post'
  })
}

export const setPreBuild = ( data ) => {
  return axios.request({
    url: '/api/StoreReady/add',
    data,
    method: 'post'
  })
}