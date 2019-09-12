<template>
  <div class="login">
    <h3>监督后台</h3>
    <div class="login-form">
      <cube-input
        v-model="uname.value"
        :placeholder="uname.placeholder"
        class="login-input"
      ></cube-input>
      <cube-input
        v-model="pwd.value"
        :placeholder="pwd.placeholder"
        :type="pwd.type"
        :eye="pwd.eye"
        class="login-input"
        autocomplete
      ></cube-input>
      <cube-input
        v-model="code.value"
        :placeholder="code.placeholder"
        class="login-input"
      ></cube-input>
      <img ref="captcha"
        :src="captcha_src"
        class="login-captcha"
        name="verify"
        title="看不清,点击更换验证码"
        @click="changeCaptcha"/>
      <cube-button
        @click="handleSubmit"
        class="login-button"
        :primary="true"
        :inline="true">
        登录
      </cube-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { getCaptcha } from '@/api/user'
export default {
  components: {

  },
  data () {
    return {
      uname:{
        value: '',
        placeholder: '请输入用户名',
      },
      pwd:{
        value: '',
        placeholder: '请输入密码',
        type: 'password',
        eye: {
          open: false,
          reverse: false
        }
      },
      code:{
        value: '',
        placeholder: '请输入验证码',
      },
      // 二维码
      captcha_src:"",
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'setUserInfo'
    ]),
    changeCaptcha () {
      getCaptcha().then(res => {
        this.$refs.captcha.src = res.data.data
      })
    },
    setCaptcha () {
      getCaptcha().then(res => {
        this.captcha_src = res.data.data
      })
    },
    handleSubmit () {
      if(!this.uname.value){
        this.showToast('请输入用户名')
        return
      }
      if(!this.pwd.value){
        this.showToast('请输入密码')
        return
      }
      if(!this.code.value){
        this.showToast('请输入验证码')
        return
      }
      let that = this;
      // 数据请求增容
      let data = { 
        username:this.uname.value,
        password:this.pwd.value,
        captcha:this.code.value,
      }
      this.handleLogin(data).then(res => {
        if (res.code != 0) {
          this.showToast(res.msg)
          return
        }
        this.setUserInfo().then(res => {
          if(res.code == 0){
            this.$nextTick(function () {
              setTimeout(()=>{
                this.$router.push({
                  name: this.$config.homeName
                })
              }, 500)
            })
          }
        })
      })
    }
  },
  created: function () {
    this.setCaptcha()
  },
}
</script>
<style scoped lang="less">
  .login{
    background-image: url('../../assets/bg.jpg');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 2rem;
    h3{
      margin-bottom: 0.5rem;
      color: #fff;
      font-size: 0.6rem;
    }
    .login-form{
      background-color: transparent;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0.5rem;
      width: 100%;
      .login-input{
        width: 100%;
        margin: 0.3rem 0;
      }
      .login-captcha{
        width: 100%;
        height: 2.5rem;
      }
      .login-button{
        margin: 0.3rem 0;
        width: 100%;
        height: 1rem;
      }
    }  
  }
</style>
