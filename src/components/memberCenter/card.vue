<template>
    <div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.name" v-for="(item, index) in tags" :key="index">
                <div class="list-box" v-if="couponList.length>0">
                    <div class="list-item flex-btw" v-for="(item,index) in couponList" :key="index">
                        <div>
                            <h4>{{item.couponName}}}</h4>
                            <p>有效期：{{item.beginDate}}-{{item.endDate}} </p>
                        </div>
                        <div class="item-code flex-column" @click="use(item)">
                            <div class="flex-column">
                                <img src="@/assets/qrcode.png" alt="">
                            </div>
                            <span>点击使用</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>当前没有卡券</p>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="popup" v-if="isShow">
            <div class="content">
                <img class="close" src="@/assets/close.png" alt="" @click="close">
                <h4>{{title}}</h4>
                <p>有效期：{{beginDate}}-{{endDate}} </p>
                <img class="" :src="url" alt="">
                <p>扫码核销</p>
            </div>
        </div>
    </div>
</template>
<script>
import { getMemberNoCoupon } from '@/api/memberCenter/index'
import QRCode from 'qrcode'
import _ from 'lodash'

export default {
    data () {
        return {
            tags:[ {name:'未使用'}, {name:'已使用'}, {name:'已过期'}],
            activeName: '',
            isShow: false,
            url: '',
            target: [],
            couponList: [],
            title: '',
            beginDate: '',
            endDate: ''
        }
    },
    methods: {
      handleClick(tab, event) {
        let n = this.activeName
        if(n==0){ n=1 } else 
        if(n==1){ n=2 }else 
        if(n==2){ n = 3 }
        this.couponList = _.filter(this.target, (item)=>{
            return item.status == n
        })
      },
      use(item){
        this.isShow = true
        this.title = item.couponName
        this.beginDate = item.beginDate
        this.endDate = item.endDate
        QRCode.toDataURL(item.couponNo).then(url => {
            this.url = url
        }).catch(err => {
            console.error(err)
        })
      },
      close(){
        this.isShow = false
      }
    },
    mounted () {
        let no = localStorage.getItem("memberCode")
        getMemberNoCoupon(no).then(res=>{
           this.couponList = _.filter(res,(item)=>{ return item.status == 1 })
           this.target = res
        })
    }
}
</script>

<style lang="sass" scoped>
.list-box
  .list-item
    border-bottom: 1px solid #dbdbdb
    padding: 10px 0 
    color: #666666
    .item-code
      width: 60px
      img
        width: 40%
      span
        margin-top: 5px
        font-size: 12px  
    h4
      font-size: 16px
      padding: 5px 0 10px
    p
      font-size: 12px
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
      margin: 10px 0
      text-align: center
    p
      text-align: center
      font-size: 12px
      color: #999999
</style>