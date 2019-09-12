import Cookies from 'js-cookie'
import config from '@/config'
import Exif from 'exif-js'
export const TOKEN_KEY = 'token'
export const UID_KEY = 'uid'
export const CITY_KEY = 'city'
export const BRAND_KEY = 'brand'
const { cookieExpires } = config

// 获取scroll高度
function getScorllBoxHeight($d) {
  let $bHeight = document.body.clientHeight;
  let $bhtml = document.getElementsByTagName('html')[0];
  let $bFontSize = $bhtml.style.fontSize.split('px')[0]*1;
  let hh = ($bHeight*1-$bFontSize*1)
  $d.setAttribute("style","height:"+hh+"px;")
}
// 压缩图片
function imgPreview (file,that,fn,$f,list) {
  let Orientation;
  //去获取拍照时的信息，解决拍出来的照片旋转问题
  Exif.getData(file, function(){
      Orientation = Exif.getTag(that, 'Orientation');
  });
  // 看支持不支持FileReader
  if (!file || !window.FileReader) return;
  if (/^image/.test(file.type)) {
    // 创建一个reader
    let reader = new FileReader();
    // 将图片2将转成 base64 格式
    reader.readAsDataURL(file);
    // 读取成功后的回调
    reader.onloadend = function (res) {
      let img = new Image();
      img.src = res.target.result;
      //判断图片是否大于100K,是就直接上传，反之压缩图片
      img.onload = function () {
        let data = compress(img,Orientation);
        let cfile = dataURLtoFile(data,file.name);
        cfile.then((file)=>{
          fn(file,$f,list);
        })
      }
    } 
  }
}
// 转file
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  let file = new File([u8arr], filename, {type:mime});
  let formdata = new FormData();
  formdata.append("file", file);
  let p = new Promise((resolve)=>{
      resolve(formdata);
  });
  return p;
}
// 旋转
function rotateImg (img, direction,canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向    
    const min_step = 0;    
    const max_step = 3;      
    if (img == null)return;    
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
    let height = img.height;    
    let width = img.width;      
    let step = 2;    
    if (step == null) {    
        step = min_step;    
    }    
    if (direction == 'right') {    
        step++;    
        //旋转到原位置，即超过最大值    
        step > max_step && (step = min_step);    
    } else {    
        step--;    
        step < min_step && (step = max_step);    
    }     
    //旋转角度以弧度值为参数    
    let degree = step * 90 * Math.PI / 180;    
    let ctx = canvas.getContext('2d');    
    switch (step) {    
      case 0:    
          canvas.width = width;    
          canvas.height = height;    
          ctx.drawImage(img, 0, 0);    
          break;    
      case 1:    
          canvas.width = height;    
          canvas.height = width;    
          ctx.rotate(degree);    
          ctx.drawImage(img, 0, -height);    
          break;    
      case 2:    
          canvas.width = width;    
          canvas.height = height;    
          ctx.rotate(degree);    
          ctx.drawImage(img, -width, -height);    
          break;    
      case 3:    
          canvas.width = height;    
          canvas.height = width;    
          ctx.rotate(degree);    
          ctx.drawImage(img, -width, 0);    
          break;
    }    
}
// 压缩
function compress(img,Orientation) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
    //瓦片canvas
  let tCanvas = document.createElement("canvas");
  let tctx = tCanvas.getContext("2d");
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  //        铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //            计算每块瓦片的宽和高
    let nw = ~~(width / count);
    let nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  //修复ios上传图片的时候 被旋转的问题
  if(Orientation != "" && Orientation != 1){
    switch(Orientation){
      case 6://需要顺时针（向左）90度旋转
          rotateImg(img,'left',canvas);
          break;
      case 8://需要逆时针（向右）90度旋转
          rotateImg(img,'right',canvas);
          break;
      case 3://需要180度旋转
          rotateImg(img,'right',canvas);//转两次
          rotateImg(img,'right',canvas);
          break;
    }
  }
  //进行最小压缩
  let ndata = canvas.toDataURL('image/jpeg', 0.5);
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
}
// 获取当前时间距离
function timeForMat(count) {
  // 拼接时间
  const time1 = new Date()
  const time2 = new Date()
  if (count === 1) {
    time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
  } else {
    if (count >= 0) {
      time1.setTime(time1.getTime())
    } else {
      if (count === -2) {
        time1.setTime(time1.getTime() + (24 * 60 * 60 * 1000) * 2)
      } else {
        time1.setTime(time1.getTime() + (24 * 60 * 60 * 1000))
      }
    }
  }

  const Y1 = time1.getFullYear()
  const M1 = ((time1.getMonth() + 1) > 9 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  const D1 = (time1.getDate() > 9 ? time1.getDate() : '0' + time1.getDate())
  const timer1 = Y1 + '-' + M1 + '-' + D1  // 当前时间

  time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
  const Y2 = time2.getFullYear()
  const M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
  const D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate())
  const timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
  return [timer2, timer1]
}

function showToast(content) {
  return this.$createToast({
    txt: content,
    type:'warn'
  }).show()
}

function showLoading() {
  return this.$createToast({
    txt: 'Loading...',
    mask: true
  }).show()
}

function confirmDialog(title, content, $confirm) {
  return this.$createDialog({
    type: "confirm",
    icon: "",
    title: title,
    content: content,
    confirmBtn: {
      text: "确定",
      active: false,
      disabled: false,
      href: "javascript:;"
    },
    cancelBtn: {
      text: "取消",
      active: true,
      disabled: false,
      href: "javascript:;"
    },
    onConfirm: $confirm, // 取消事件为空，弹窗也消失
    onCancel: () => {}
  }).show();
}


function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}

function deepAssign(to, from) {
  for (let key in from) {
    if (!to[key] || typeof to[key] !== 'object') {
      to[key] = from[key]
    } else {
      deepAssign(to[key], from[key])
    }
  }
}

function createAddAPI(baseObj) {
  return function add(...args) {
    if (typeof args[0] === 'string') {
      args[0] = {
        [args[0]]: args[1]
      }
    }
    deepAssign(baseObj, args[0])
  }
}

function toLocaleDateString(timestamp, locale) {
  const date = new Date(timestamp)

  if (locale === 'zh') {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  } else {
    return date.toDateString()
  }
}

const typesReset = {
  _set(obj, key, value) {
    obj[key] = value
  },
  string(obj, key) {
    typesReset._set(obj, key, '')
  },
  number(obj, key) {
    typesReset._set(obj, key, 0)
  },
  boolean(obj, key) {
    typesReset._set(obj, key, false)
  },
  object(obj, key, value) {
    if (Array.isArray(value)) {
      typesReset._set(obj, key, [])
    } else {
      typesReset._set(obj, key, {})
    }
  }
}
function resetTypeValue(obj, key, defVal) {
  if (defVal !== undefined) {
    return typesReset._set(obj, key, defVal)
  }
  if (key) {
    const value = obj[key]
    const resetHandler = typesReset[typeof value]
    resetHandler && resetHandler(obj, key, value)
  } else {
    Object.keys(obj).forEach((key) => {
      resetTypeValue(obj, key)
    })
  }
}

function parallel(tasks, cb) {
  let doneCount = 0
  let results = []
  const tasksLen = tasks.length
  if (!tasksLen) {
    return cb(results)
  }
  tasks.forEach((task, i) => {
    task((ret) => {
      doneCount += 1
      results[i] = ret
      if (doneCount === tasksLen) {
        // all tasks done
        cb(results)
      }
    })
  })
}

function cb2PromiseWithResolve(cb) {
  let promise
  if (typeof window.Promise !== 'undefined') {
    const _cb = cb
    promise = new window.Promise((resolve) => {
      cb = (data) => {
        _cb && _cb(data)
        resolve(data)
      }
    })
    promise.resolve = cb
  }
  return promise
}

function debounce(func, wait, immediate, initValue) {
  let timeout
  let result = initValue

  const later = function (context, args) {
    timeout = null
    if (args) {
      result = func.apply(context, args)
    }
  }

  const debounced = function (...args) {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(this, args)
      }
    } else {
      timeout = setTimeout(() => {
        later(this, args)
      }, wait)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}



const getToken = () => {
  const token = window.sessionStorage.getItem('gdjumaotoken')
  if (token) {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
    return token
  } else { return false }
}

const setToken = (token) => {
  window.sessionStorage.setItem('gdjumaotoken', token)
  Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
}


const getUid = () => {
  const id = window.sessionStorage.getItem('gdjumaoid')
  if (id) {
    Cookies.set(UID_KEY, id, {expires: cookieExpires || 1})
    return id
  } else { return false }
}

const setUid = (id) => {
  window.sessionStorage.setItem('gdjumaoid', id)
  Cookies.set(UID_KEY, id, {expires: cookieExpires || 1})
}

const setCity = (city) => {
  window.sessionStorage.setItem('gdjumaoidcity', city)
  Cookies.set(CITY_KEY, city, {expires: cookieExpires || 1})
}

const setBrand = (brand) => {
  window.sessionStorage.setItem('gdjumaoidbrand', brand)
  Cookies.set(BRAND_KEY, brand, {expires: cookieExpires || 1})
}


export {
  findIndex,
  deepAssign,
  createAddAPI,
  toLocaleDateString,
  resetTypeValue,
  parallel,
  cb2PromiseWithResolve,
  debounce,
  processComponentName,
  getToken,
  setToken,
  confirmDialog,
  showToast,
  showLoading,
  getWindowHeight,
  getScorllBoxHeight,
  imgPreview,
  timeForMat,
  getUid,
  setUid,
  setCity,
  setBrand
}