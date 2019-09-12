import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import { setToken, getToken , setUid , setBrand, setCity } from '@/js/util'

export default {
  state: {
    userName: '',
    uid:'',
    token: '',
    hasGetInfo: false,
    storeInfo:{}
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    setUid (state, id) {
      state.uid = id
      setUid(id)
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    sethasGetInfo (state, isGetInfo) {
      state.hasGetInfo = isGetInfo
    },
    setCity(state, city){
      setCity(city)
    },
    setBrand(state, brand){
      setBrand(brand)
    },
  },
  getters: {
    
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password, captcha}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          captcha
        }).then(res => {
          const dbody = res.data
          if (dbody.code == 0) {
            const data = dbody.data
            // 存储用户token
            commit('setToken', data.token)
            commit('setCity', data.info.city_id[0])
            commit('setBrand', data.info.brand_id[0])
            // 存储用户uid
            commit('setUid', data.info.id)
            // 存储信息成功开关
            commit('sethasGetInfo', true)
            // 存储用户名字
            commit('setUsername', data.info.fullname)
          }
          resolve(dbody)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    setUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          let token = getToken() || state.token
          if (token) {
            getUserInfo(token).then(res => {
              const dbody = res.data
              const data = dbody.data
              if (dbody.code != 0) {
                // 存储用户token
                commit('setToken', '')
                commit('setCity', '')
                commit('setBrand', '')
                // 存储用户uid
                commit('setUid', '')
                // 存储信息成功开关
                commit('sethasGetInfo', false)
                // 存储用户名字
                commit('setUsername', '')
                resolve(data)
                return
              }
              // 存储信息成功开关
              commit('sethasGetInfo', true)
              // 存储用户名字
              commit('setUsername', data.fullname)
              commit('setCity', data.city_id[0])
              commit('setBrand', data.brand_id[0])
              resolve(dbody)
            }).catch(err => {
              reject(err)
            })
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    // // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          // 存储用户token
          commit('setToken', '')
          commit('setCity', '')
          commit('setBrand', '')
          // 存储用户uid
          commit('setUid', '')
          // 存储信息成功开关
          commit('sethasGetInfo', '')
          // 存储用户名字
          commit('setUsername', '')
          resolve()
        }).catch(err => {
          reject(err)
        })
        resolve()
      })
    }
  }
}
