<template>
  <div id="app" class="main">
    <keep-alive :exclude="excludeList">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      // excludeList:['viewEdit','infoEdit','addView']
      excludeList:['checkItem']
    }
  },
  methods: {
     // 返回上一页
    goBack(){
      this.$router.go(-1);
    },
    // goQuit
    goQuit(){
      this.$router.push({
        name: 'login'
      })
    },
  },
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
