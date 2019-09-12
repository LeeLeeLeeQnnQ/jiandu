<template>
  <div class="tHeader">
    <div class="posLeft">
      <a href="#" type="text" @click.prevent="goBack">返回上一页</a>
    </div>
    <div class="posRight">
      <a href="#" type="text" @click.prevent="goQuit">登出</a>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'CHeader',
    methods: {
    ...mapActions([
      'handleLogOut'
    ]),
     // 返回上一页
    goBack(){
      this.$router.go(-1);
    },
    // goQuit
    goQuit(){
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
  },
  }
</script>
<style lang="less" scoped>
  .tHeader{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: orange;
    a{
      color:#fff;
      font-size: 0.35rem;
    }
  }
  .posLeft{
    position: absolute;
    left: 0.3rem;
  }
  .posRight{
    position: absolute;
    right: 0.3rem;
  }
</style>