import axios from '@/js/api.request.js'

export const getCaptcha = () => {
  return axios.request({
    url: '/api/Login/captcha',
    method: 'get'
  })
}


export const login = ({ username, password, captcha}) => {
  const data = {
    username,
    password,
    captcha
  }
  return axios.request({
    url: '/api/Login/login',
    data,
    method: 'post'
  })
}


export const getUserInfo = (token) => {
  let data = { token: token }
  return axios.request({
    url: '/api/Employee/getEmployeeInfo',
    data,
    method: 'post'
  })
}


export const logout = (token) => {
  return axios.request({
    url: '/api/Login/logout',
    method: 'post'
  })
}