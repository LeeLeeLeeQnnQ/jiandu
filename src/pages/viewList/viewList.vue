<template>
  <div class="info-sreach">
    <CHeader></CHeader>
    <div class="info-sreach_box scrollBox" ref="scrollBox">
      <cube-scroll
        ref="scroll">
        <div class="info-sreach_card-info">
          <div class="info-sreach_card-info-item" >
            <span class="info-sreach_card-info-item-span">厨房选择：</span>
            <cube-select
              class="info-sreach_card-info-item-span info-sreach_card-info-item-input"
              v-model="sreachInfo.kitchen_id"
              placeholder="请选择"
              :options="kitchenList">
            </cube-select>
          </div>
          <div class="info-sreach_card-info-item" >
            <span class="info-sreach_card-info-item-span">检查时间：</span>
            <span 
              class="info-sreach_card-info-item-span info-sreach_card-info-item-time"
              @click= "selectDate"
            >{{sreachInfo.date}}</span>
          </div>
          <div class="info-sreach_card-info-btnbox" >
            <cube-button
              @click="sreachInfo"
              class="info-sreach_card-info-btnbox-button"
              :primary="true"
              :inline="true">
              搜索
            </cube-button>
          </div>
        </div>
        <hr>
        <ul>
          <li class="check-list_item" @click="goViewItem">
            <h3 class="check-list_item-h3">2019-10-20</h3>
            <div class="check-list_item-content">
              <span class="check-list_item-content-span">ID:1</span>
              <span class="check-list_item-content-span">四道口一店铺</span>
            </div>
            <div class="check-list_item-content">
              <span class="check-list_item-content-span">超级管理元</span>
              <span class="check-list_item-content-span orange">100分</span>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import { getScorllBoxHeight } from "@/js/util.js";
import { getKitchenList  } from '@/api/data'
export default {
  name: 'viewList',
  components: {
    CHeader
  },
  data () {
    return {
      sreachInfo:{
        date:'',
        kitchen_id:'',
      },
      nextPage:1,
      kitchenList:[],
      checkList:[],
    }
  },
  methods: {
    initInfo(){
      this.getKitchenList()
    },
    // 获取厨房列表
    getKitchenList(){
      getKitchenList().then(res => {
        const dbody = res.data;
        if(dbody.code !=  0){
          this.showToast(dbody.msg)
          return
        }
        let arr = [];
        let list =  dbody.data || [];
        list.forEach((item)=>{
          let obj = {};
          obj.value = item.id+'';
          obj.text = item.kitchen_name;
          arr.push(obj)
        });
        this.kitchenList = arr;
      }) 
    },
    // 选择日期
    selectDate() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '带看时间',
          value: new Date(),
          onSelect: this.selectHandle,
        })
      }
      this.datePicker.show()
    },
    // 日期存储
    selectHandle(date, selectedVal, selectedText) {
      selectedVal[1] = selectedVal[1] < 10 ? '0' + selectedVal[1] : selectedVal[1];
      selectedVal[2] = selectedVal[2] < 10 ? '0' + selectedVal[2] : selectedVal[2];
      this.sreachInfo.date = selectedVal.join('-');
    },
    // 添加一条新检查
    sreachInfo(){
      console.log(this.sreachInfo)
    },
    goViewItem(){
      this.$router.push({
        name: 'viewItem'
      })
    },
  },
  created(){
    this.initInfo();
  },
  mounted(){
    this.$nextTick(() => {
      getScorllBoxHeight(this.$refs.scrollBox);
    })
  },
}
</script>
<style lang="less">
  .info-sreach{
    .before-trigger span{
      font-size: 0.5rem;
    }
  }
</style>
<style scoped lang="less">
  .scrollBox{
    background-color: #ddd;
    box-sizing: border-box;
  }
  .info-sreach{
    height: 100%;
    width: 100%;
    &_card-info{
      box-sizing: border-box;
      width: 100%;
      padding: 0.5rem;
      padding-bottom: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin: 0 auto;
      background-color: rgba(0,0,0,0.5);
      &-h3{
        margin: 0.5rem 0;
        text-indent: center;
        color: #fff;
        font-size: 0.7rem;
      }
      &-item{
        width: 100%;
        color: #fff;
        height: 1.5rem;
        display: flex;
        box-sizing: border-box;
        padding: 0 0.2rem;
        align-items: center;
        justify-content: space-between;
        span{
          font-size: 0.5rem;
        }
        &-input{
          width: 50%;
        }
        &-time{
          width: 50%;
          background-color: #fff;
          height: 1rem;
          color: #000;
          line-height: 1rem;
        }
        &-remark{
          width: 100%;
        }
      }
      &-btnbox{
        margin-top: 0.5rem;
        &-button{
          height: 1rem;
          font-size: 0.5rem;
        }
      }
    }
    &_card-shop{
      padding: 0.5rem;
      &-item{
        background-color: rgba(0,0,0,0.6);
        padding: 0.3rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        border-bottom: 1px solid #fff;
        &-h3{
          font-size: 0.5rem;
          color: #fff;
          height: 0.8rem;
          margin: 0.2rem;
        }
        &-p{
          font-size: 0.4rem;
          color: #fff;
          height: 0.6rem;
          margin: 0.2rem;
        }
        &-div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.2rem;
          span{
            font-size: 0.4rem;
            color: #fff;
            height: 0.6rem;
          }
        }
      }
    }
  }
  .check-list{
    height: 100%;
    width: 100%;
    &_item{
      background-color: rgba(0,0,0,0.2);
      width: 80%;
      margin: 0.2rem auto;
      padding: 0.5rem;
      border-radius: 0.2rem;
      border:1px solid #ddd;
      box-shadow: 0 0 8px #ddd;
      &-h3{
        font-size: 0.5rem;
        text-align: left;
        margin-bottom: 0.2rem;
        padding: 0.2rem 0;
        border-bottom: 1.5px solid orange;
      }
      &-content{
        display: flex;
        justify-content: space-between;
        padding: 0.1rem 0;
        &-span{
          color: #fff;
          font-size: 0.45rem;
        }
      }
    }
  }
</style>
