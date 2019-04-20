<template>
    <!-- <div>即将上线,敬请期待...</div> -->
    <div class="container">
        <div class="banner-box">
            <img src="@/assets/memberCenter/ponit-head.png" alt="">
        </div>
        <div class="banner-text flex-btw">
            <p>等级: {{info.gradeDesc}}</p>
            <p>会员积分：{{info.point||'0'}}</p>
            <p>天猫积分：{{info.tmallPoint||'0'}}</p>
        </div>
        <div>
            <div class="tab-box flex-box">
                <div class="tab-item" :class="{active: current == index}" v-for="(item, index) in tags" :key="index" @click="handleClick(index)">{{item.name}}</div>
            </div>
            <div class="list-box" v-if="couponList.length>0">
                <div class="list-item flex-btw" v-for="(item,index) in couponList" :key="index">
                    <div class="img-box">
                        <img src="@/assets/memberCenter/product.jpg" alt="">
                    </div>
                    <div class="content-box">
                        <h4>{{item.name}}</h4>
                        <p>积分: {{item.availablePoint}} </p>
                        <div class="btn-box" @click="use(item)">
                            <el-button type="primary">立即兑换</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>当前没有卡券</p>
            </div>
        </div>
        <div class="popup" v-if="isShow">
            <div class="content">
                <img class="close" src="@/assets/close.png" alt="" @click="close">
                <div>
                    <h4>{{couponName}}</h4>
                    <p>分值：{{ nums * point }}</p>
                    <div class="number-box">
                        <el-input-number v-model="nums" @change="handleChange"  size="small" :min="1" :max="10" label="描述文字"></el-input-number>
                    </div>
                </div>
                <div class="btn-box">
                    <el-button size="small" type="primary" @click="exchange">立即兑换</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
import store from '@/store/index'
import { getMemberInfo } from '@/api/memberCenter/index'
import { getMemberCouponList, getMemberCouponExchange, getMemberCouponReturnBack } from '@/api/memberCenter/index'
export default {
    data () {
        return {
            tags:[ {name:'1-1000'}, {name:'1001-3000'}, {name:'3000以上'}],
            couponList: [],
            targetList: [],
            isShow: false,
            point: 0,
            ids: '',
            couponName: '',
            nums: 0,
            activeName: '',
            current: 0,
            info:{}
        }
    },
    methods:{
        getMemberCouponList() {
            getMemberCouponList().then((res)=>{
                this.couponList = res.data.rows.filter((item)=>{
                    return item.availablePoint <= 1000
                })
                this.targetList = res.data.rows
            })
        },
        handleClick (i) {
            this.current = i
            if(this.current==0){
                this.couponList = this.targetList.filter((item)=>{
                    return item.availablePoint <= 1000
                }) 
            }else if(this.current == 1) {
                this.couponList = this.targetList.filter((item)=>{
                    return item.availablePoint > 1000 && item.availablePoint <= 3000
                }) 
            }else {
                this.couponList = this.targetList.filter((item)=>{
                    return item.availablePoint > 3000
                }) 
            }
        },
        exchange () {
            let self = this
            let params = {
                ids: self.ids,
                nums: self.nums,
                memberId: '12370434'
            }
            getMemberCouponExchange(params).then(res=>{
                alert(JSON.stringify(res))
            })
        },
        close(){
            this.isShow = false
        },
        use (item) {
            this.ids = item.id
            this.couponName = item.name
            this.point = item.availablePoint
            this.isShow = true
        },
        getMobileInfo(mobile){
            getMemberInfo(mobile).then(res=>{
                // alert(JSON.stringify(res))
                if(res.code == 0){
                    this.info = res.data
                }
            })

        }
    },
    mounted () {
        // let no = localStorage.getItem("memberCode")
        // this.getMemberPoint(no)
        this.getMemberCouponList()
        this.getMobileInfo(localStorage.getItem("mobile"))
    }
}
</script>

<style lang="sass" scoped>
.active
  color: #f5f7fa
  border-radius: 4px 4px 0 0
  background: #f8bc32
.container
  height: 100%
  background: #f5f7fa
.banner-box
  margin-bottom: 5px
  img
    width: 100%
.banner-text
  margin: 5px 20px
  p
    margin: 5px 10px
    font-size: 14px
    color: #333333
    line-height: 24px
    text-align: center
.tab-box
  height: 40px
  padding-left: 20px
  align-items: center
  background: #ffffff
  border-bottom: 1px solid #f8bc32
  .tab-item
    height: 40px
    line-height: 40px
    width: 90px
    font-size: 14px
    text-align: center
.list-box
  padding-top: 20px
.list-item
  border-radius: 10px
  background: #ffffff
  width: 80%
  padding: 25px 5%
  margin-bottom: 20px
  margin-left: 5%
  text-align: center
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.12)
  .img-box
    width: 25%
    img
      width: 100%
  .content-box
    width: 75%
    .btn-box
      text-align: right
    h4
        font-size: 14px
    h4,p
        text-align: left
        padding-left: 20px
        height: 32px
        line-height: 32px
    p
        color: #666666
        font-size: 12px
    button
        margin-top: 10px
        border: none
        border-radius: 20px
        width: 120px
        font-size: 14px
        padding: 5px 8px
        color: #fff
        outline: none
.popup
  position: fixed
  width: 100%
  height: 100%
  top: 0
  background: rgba(0,0,0,0.7)
  z-index: 9999
  .content
    width: 70%
    margin-left: 15%
    margin-top: 50%
    height: 220px
    padding: 5px 0 10px
    background: #ffffff
    border-radius: 4px
    text-align: center
    .close 
      position: absolute
      right: 16%
    h4
      font-size: 18px
      margin: 20px 0 15px
      text-align: center
    p
      text-align: center
      font-size: 14px
      margin: 20px 0 15px
      color: #999999
    button
      margin-top: 20px
      width: 100px
      color: #ffffff
      outline: none
      border: none
</style>
