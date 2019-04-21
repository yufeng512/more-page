<template>
<div>
  <div class="banner-box">
    <el-carousel height="375px" indicator-position="none">
      <el-carousel-item>
        <img src="@/assets/tiandun/banner-01.png" alt="">
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/tiandun/banner-02.png" alt="">
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/tiandun/banner-03.png" alt="">
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/tiandun/banner-04.png" alt="">
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/tiandun/banner-05.png" alt="">
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/tiandun/banner-06.png" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="product-box">
    <div v-for="(item,index) in productList" :key="index">
      <h4>{{item.categoryName}}</h4>
      <div class="line"></div>
      <div class="product-content flex-box">
        <div class="item-box" v-for="(_item,index) in item.product" :key="index">
          <div class="img-box">
            <img :src="'http://sc.lgxk-soft.com'+_item.thumbnailFront" alt="">
          </div>
          <h3><span>名称：</span>{{_item.goodsName}}</h3>
          <p><span>规格：</span>{{_item.specification}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import request from '@/utils/requestApi'
export default {
  data () {
    return {
      productList: []
    }
  },
  methods: {
    getProductList () {
      let params = {
      url: 'http://sc.lgxk-soft.com/product/proList',
      method: 'get'
      }
      request(params).then(res=>{
        this.productList = res
      })
    }
  },
  mounted() {
    this.getProductList()
  }
}
</script>
<style scoped>
</style>

<style lang="sass" scoped>
.banner-box
  img
    display: block
    width: 100%
.product-box
  background: #6bbdf1
  h4
    font-size: 18px
    padding: 15px
    color: #ffffff
    text-align: center
  .line
    width: 100px
    height: 2px
    margin-left: 50%
    transform: translateX(-50%)
    background: #ffffff
  .product-content
    padding: 15px
    .item-box
      margin-top: 20px
      margin-bottom: 10px
      width: 50%
      .img-box
        text-align: center
        margin-left: 10%
        padding: 10px 0
        width: 80%
        border-radius: 20px
        background: #ffffff
        box-shadow: -5px -3px 0 #333
        img
          width: 72%
      h3,p
        padding-left: 5%
        span
          font-size: 14px

      h3
        margin-top: 15px
        font-size: 14px
        line-height: 24px
        color: #ffffff
      p
        font-size: 14px
        color: #ffffff
</style>


