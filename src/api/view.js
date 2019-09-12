import axios from '@/js/api.request.js'


// 获取带看列表
export const getClueList = ( obj ) => {
  return axios.request({
    url: '/api/Clue/index',
    params: obj,
    method: 'get'
  })
}

// 查询客户状态
export const queryCustomer = ( data ) => {
  return axios.request({
    url: '/api/Clue/queryCustomer',
    data,
    method: 'post'
  })
}


/*
  增加一条带看
*/
/*
  area: (...)
  category: (...)
  clue_date: "2019-04-09"
  consider: (...)
  contact: "13326545665"
  customer_name: (...)
  employee_id: (...)
  employee_name: "招商人员"
  kitchen_id: (...)
  remark: (...)
  source: (...)
  total_count: 1
*/
export const addNewClue = ( data ) => {
  return axios.request({
    url: '/api/Clue/add',
    data,
    method: 'post'
  })
}



/*
  编辑一条带看
*/
/*
  id:id
  area: (...)
  category: (...)
  clue_date: "2019-04-09"
  consider: (...)
  contact: "13326545665"
  customer_name: (...)
  employee_id: (...)
  employee_name: "招商人员"
  kitchen_id: (...)
  remark: (...)
  source: (...)
  total_count: 1
*/
export const editOldClue = ( data ) => {
  return axios.request({
    url: '/api/Clue/edit',
    data,
    method: 'post'
  })
}


/*
  删除一条带看
*/
/*
  id:id
*/
/*
  canvass-store-view --  编辑一条带看
*/
export const deleteClue = ( id ) => {
  let data = { id : id }
  return axios.request({
    url: '/api/Clue/delete',
    data,
    method: 'post'
  })
}

