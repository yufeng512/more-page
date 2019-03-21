<template>
    <div class="point-box">
        <div class="point-item" v-for="(items,index) in orderList" :key="index" @click="isOpen(index)">
            <h4 class="flex-btw" >
                <span>{{items.storeName}}</span>
                <img :class="{active: current == index}"  src="@/assets/down.png" alt="">
            </h4>
            <p class="flex-btw"><span>金额：{{items.amount}}</span><span>消费时间：{{items.transDate}}</span></p>
            <div class="good-box" v-if="current == index">
                <div class="good-item"   v-for="(item,index) in items.goods" :key="index">
                    <p>名称：{{item.goodsName}}</p>
                    <p>价格：{{item.goodsPrice}}</p>
                    <p>份数：{{item.goodsQry}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getMemberOrderQuery } from '@/api/memberCenter/index'
export default {
    data () {
        return {
            orderList: [],
            current: 0
        }
    },
    methods:{
        isOpen (i) {
            this.current = i
        },
        getMemberOrder(no) {
            getMemberOrderQuery(no).then((res)=>{
                this.orderList = res
            })
        }
    },
    mounted () {
        let no = localStorage.getItem("memberCode")
        this.getMemberOrder(no)
    }
}
</script>
<style lang="sass" scoped>
.active
  transform: rotate(0deg)!important
.point-box
  padding: 0 15px
  .point-item
    border-bottom: 1px solid #dbdbdb
    padding: 10px 10px 0
    color: #666666
    h4
      color: #333333
      font-size: 16px
      padding: 10px 0 15px
      img
        transform: rotate(-90deg)
    p
      font-size: 14px
      color: #666666
      margin-bottom: 10px
  .good-box
    border-top: 1px solid #dbdbdb
    margin: 15px 0
    .good-item
      padding: 10px 10px
      border-bottom: 1px dashed #dbdbdb
      &:last-child
        border-bottom: none
      p
        font-size: 14px 
        line-height: 18px
        margin-bottom: 0
</style>

