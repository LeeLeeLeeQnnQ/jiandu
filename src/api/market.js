import axios from '@/js/api.request.js'

export const getKitchenStoreQueryList = ( data ) => {
  return axios.request({
    url: '/api/KitchenStore/querylist',
    params: data,
    method: 'get'
  })
}