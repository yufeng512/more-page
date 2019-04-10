<template>
    <!-- <div>即将上线,敬请期待...</div> -->
    <div>
        <div class="banner-box">
            <img src="@/assets/memberCenter/logo.jpg" alt="">
        </div>
        <div>
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="item.name" v-for="(item, index) in tags" :key="index">
                    <div class="list-box flex-box" v-if="couponList.length>0">
                        <div class="list-item" v-for="(item,index) in couponList" :key="index">
                            <div class="img-box">
                                <img src="@/assets/memberCenter/logo.jpg" alt="">
                            </div>
                            <div>
                                <h4>{{item.name}}</h4>
                                <p>{{item.exchangeStartDate}} - {{item.exchangeEndDate}} </p>
                            </div>
                            <div class="btn-box" @click="use(item)">
                                <button>立即兑换</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>当前没有卡券</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
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
                    <el-button type="primary" size="small" @click="exchange">立即兑换</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
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
            activeName: ''
        }
    },
    methods:{
        getMemberCouponList() {
            getMemberCouponList().then((res)=>{
                console.log(res)
                this.couponList = res.data.rows.filter((item)=>{
                    return item.availablePoint <= 1000
                })
                this.targetList = res.data.rows
            })
        },
        handleClick () {
            let key = this.activeName
            if(key==0){
                this.couponList = this.targetList.filter((item)=>{
                    return item.availablePoint <= 1000
                }) 
            }else if(key == 1) {
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
        handleChange () {

        }
    },
    mounted () {
        // let no = localStorage.getItem("memberCode")
        // this.getMemberPoint(no)
        this.getMemberCouponList()
    }
}
</script>
<style>
.el-tabs--border-card>.el-tabs__content{
  padding: 0
}
.el-tabs--border-card{
    border: none
}
</style>
<style lang="sass" scoped>
.banner-box
  height: 120px
  overflow: hidden
  margin-bottom: 20px
  img
    width: 100%
.list-box
//   height: 520px
//   overflow-y: auto
.list-item
  padding: 10px 0
  width: 50%
  text-align: center
  .img-box
    padding: 0 10px
    img
      width: 100%
  h4
    font-size: 14px
  h4,p
    text-align: left
    padding-left: 10px
    height: 32px
    line-height: 32px
  p
    color: #666666
    font-size: 12px
  button
    margin-top: 10px
    border: none
    width: 120px
    background: #dbdbdb
    padding: 4px 8px
    color: #333
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
</style>
