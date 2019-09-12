<template>
  <div class="check-item">
    <CHeader></CHeader>
    <div class="check-item_paper_box scrollBox" ref="scrollBox">
      <div class="check-item_paper_box_item" v-for="(item,index) in paperList">
        <div class="check-item_paper_box_item_title b_green" @click="showCheckItem(index,item)" v-if="item.status == 1">
          {{index*1+1}}.{{ item.title }}
        </div>
        <div class="check-item_paper_box_item_title" @click="showCheckItem(index,item)" v-else>
          {{index*1+1}}.{{ item.title }}
        </div>
        <div 
          class="slide-active" 
          :ref="'checkItem_'+ index">
          <div class="info-edit_card-info-warp">
            <div class="info-edit_card-info-warp-item" v-for="i in item.images">
              <div class="info-edit_card-info-warp-item-img">
                <img :src="i" @click="showImagePreview(i)">
              </div>
            </div>
            <div class="info-edit_card-info-warp">
              <cube-textarea class="info-edit_card-info-warp-mark" v-model="item.mark"></cube-textarea>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/data'
import CHeader from '@/components/CHeader'
import { getScorllBoxHeight , imgPreview } from "@/js/util.js";

export default {
  name: 'viewItem',
  components: {
    CHeader
  },
  data () {
    return {
      paperId:'1',
      paperList:[
        {
          title:"洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗？",
          status:'1',
          id:'1',
          images:[],
          mark:'',
        },
        {
          title:"洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗洗没洗碗？",
          status:'2',
          id:'2',
          images:[],
          mark:'',
        }
      ],
      start_other:[],
      checkItemInfo:{},
    }
  },
  methods: {
    // init
    initInfo(){
      this.getPaper()
    },
    // 获取题目列表
    getPaper(){
      
    },
    // 展示图片
    showImagePreview(img) {
      this.currentImgs = [];
      this.currentImgs.push(img)
      this.$createImagePreview({
        imgs: this.currentImgs
      }).show()
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
<style scoped lang="less">
  .slide-active{
      background-color: #fff;
      margin-top: 0.1rem;
      padding:0.5rem 0;
  }
  .scrollBox{
    background-color: #ddd;
    box-sizing: border-box;
  }
  .b_green{
    background-color: rgba(21,162,62,1) !important;
    color: #fff;
  }
  .check-item{
    height: 100%;
    width: 100%;
    &_paper_box{
      padding: 0.3rem 0;
      &_item{
        font-size: 0.55rem;
        line-height: 0.65rem;
        text-align: left;
        margin: 0.3rem;
        &_title{
          padding: 0.3rem;
          border-radius: 0.3rem;
          background-color: #fff;
        }
      }
    }
  }
  .info-edit{
    height: 100%;
    width: 100%;
    &_card-info{
      box-sizing: border-box;
      width: 100%;
      padding: 0.5rem;
      padding-bottom: 1.5rem;
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
        font-size: 0.5rem;
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
        &-time{
          width: 50%;
          background-color: #fff;
          height: 1rem;
          color: #000;
          line-height: 1rem;
        }
        &-title{
          font-size: 0.5rem;
        }
      }
      &-warp{
        width: 100%;
        color: #fff;
        display: flex;
        box-sizing: border-box;
        padding: 0 0.2rem;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        &-item{
          width: 25%;
          height: 1.8rem;
          &-img{
            width: 1.5rem;
            height:1.5rem;
            border:1px solid #fff;
            background-color: rgba(225,225,225);
            border-radius: 0.5rem;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              border-radius: 0.5rem;
            }
            &-remove{
              position: absolute;
              width: 0.5rem;
              height: 0.5rem;
              right:-0.25rem;
              top:-0.15rem;
              overflow: hidden;
              line-height: 0.5rem;
              text-align: center;
              border-radius: 50%;
              background-color: #000;
              color: #fff;
              font-size: 0.8rem;
            }
          }
        }
        &-mark{
          margin-bottom: 0.5rem;
          width: 100%;
        }
      }
      &-btnbox{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:0 0.5rem;
        &-button{
          height: 1rem;
          font-size: 0.5rem;
        }
      }
    }
  }
  .file{
      position: relative;
      display: inline-block;
      border:1px solid #fff;
      background-color: rgba(200,200,200);
      border-radius: 0.5rem;
      overflow: hidden;
      text-decoration: none;
      text-indent: 0;
      width: 1.5rem;
      height:1.5rem;
      line-height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .file span{
    position: absolute;
    height: 1.5rem;
    width: 1.5rem;
    font-size: 0.5rem;
    line-height: 1.6rem;
    text-align: center;
    right: 0;
    top: 0;
    color: #666;
  }
  .file input{
      position: absolute;
      font-size: 10rem;
      right: 0;
      top: 0;
      opacity: 0;
      z-index: 2;
  }
  .file:hover{
      text-decoration: none;
  }
</style>
