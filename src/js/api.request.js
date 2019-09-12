import HttpRequest from '@/js/axios.js'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : 'http://s.baitime.cn'

const axios = new HttpRequest(baseUrl)

export default axios
