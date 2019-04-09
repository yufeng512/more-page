<template>
    <div class="point-box">
        <div v-if="orderList.length>0">
            <div class="point-item" v-for="(items,index) in orderList" :key="index" @click="isOpen(index)">
                <h4 class="flex-btw" >
                    <span>{{items.storeName}}</span>
                    <img :class="{active: current == index}"  src="@/assets/down.png" alt="">
                </h4>
                <p class="flex-btw"><span>金额：{{items.amount}}</span><span>消费时间：{{items.transDate}}</span></p>
                <div class="good-box" v-if="current == index && items.goods.length > 0">
                    <div class="good-item"   v-for="(item,index) in items.goods" :key="index">
                        <p>名称：{{item.goodsName}}</p>
                        <p>价格：{{item.goodsPrice}}</p>
                        <p>份数：{{item.goodsQry}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="no-list">当前没有消费历史</p>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { getMemberOrderQuery } from '@/api/memberCenter/index'
export default {
    data () {
        return {
            orderList: [],
            current: 0
        }
    },
    methods:{
        getMemberOrder(no) {
            getMemberOrderQuery(no).then((res)=>{
                // alert('订单'+JSON.stringify(res))
                this.orderList = res
            })
        },
        isLogin (){
            let self = this
            let code = self.UrlSearch()
            self.code = code
            let params ={
                code: code
            }
            $.ajax({ url: process.env.BASE_API+"mobile/auth/login", type:"post", data: params,
                success:function(res){
                    // alert(JSON.stringify(res))
                    if(res.code==0){
                        localStorage.setItem("openId",res.data.openId)
                        localStorage.setItem("unionId",res.data.unionId)
                        if(res.data.member){
                            localStorage.setItem("memberCode",res.data.member.memberCode)
                            self.getMemberOrder(res.data.member.memberCode)
                        }
                    }else {
                        self.getMemberOrder(localStorage.getItem("memberCode"))
                    }
                },
                error:function(e){
                    console.log(e)
                }
            })
        },
        UrlSearch() {
            var name,value;
            var str=location.href; //取得整个地址栏
            var num=str.indexOf("?")
            str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
            var arr=str.split("&"); //各个参数放到数组里
            for(var i=0;i < arr.length;i++){
                num=arr[i].split("=");
                if(num[0]=='code'){
                value = num[1]
                }
            }
            return value
        }
    },
    mounted () {
        this.isLogin()
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
    &:last-child
      border-bottom: none
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
    margin: 15px 0 5px
    .good-item
      padding: 5px 0
      border-bottom: 1px dashed #dbdbdb
      &:last-child
        border-bottom: none
      p
        font-size: 14px 
        color: #999999
        line-height: 20px
        margin-bottom: 0
.no-list
  text-align: center
  line-height: 32px
  color: #666666
</style>
