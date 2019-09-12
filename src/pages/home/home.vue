<template>
  <div class="home">
    <CHeader></CHeader>
    <div class="scrollBox" ref="scrollBox">
      <cube-scroll
        ref="scroll">
      <div class="home-button-box">
        <cube-button
          @click="goCheck"
          class="home-button"
          :primary="true"
          :inline="true">
          监督检查
        </cube-button>
      </div>
      <div class="home-button-box">
        <cube-button
          @click="goViewList"
          class="home-button"
          :primary="true"
          :inline="true">
          查看检查列表
        </cube-button>
      </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import { getScorllBoxHeight } from "@/js/util.js";
export default {
  name: 'home',
  components: {
    CHeader
  },
  data () {
    return {
      
    }
  },
  methods: {
    goCheck(){
      this.$router.push({
        name: 'check'
      })
    },
    // 选择检查日期
    goViewEdit() {
      this.info_date = '';
      if (!this.info_date) {
        this.info_date = this.$createDatePicker({
          title: '选择检查日期',
          value: new Date(),
          onSelect: this.selectInfoDateHandle,
        })
      }
      this.info_date.show()
    },
    selectInfoDateHandle(date, selectedVal, selectedText) {
      selectedVal[1] = selectedVal[1] < 10 ? '0' + selectedVal[1] : selectedVal[1];
      selectedVal[2] = selectedVal[2] < 10 ? '0' + selectedVal[2] : selectedVal[2];
      this.info_date = selectedVal.join('-');
    },
    goViewList(){
      this.$router.push({
        name: 'viewList'
      })
    },
  },
  mounted(){
    this.$nextTick(() => {
      getScorllBoxHeight(this.$refs.scrollBox);
    })
  },
  created: function () {

  },
}
</script>

<style scoped lang="less">
  .home-button-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    .home-button{
      margin: 0.8rem 0;
      width: 90%;
      height: 1.2rem;
      font-size: 0.4rem;
    }
  }
</style>
