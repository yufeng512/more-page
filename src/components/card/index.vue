<template>
    <div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.name" v-for="(item, index) in tags" :key="index">
                <div class="list-box" v-if="couponList.length>0">
                    <div class="list-item flex-btw" v-for="(item,index) in couponList" :key="index">
                        <div>
                            <h4>{{item.couponName}}</h4>
                            <p>有效期：{{item.beginDate}} - {{item.endDate}} </p>
                        </div>
                        <div class="item-code flex-column" @click="use(item)">
                            <div class="flex-column">
                                <img src="@/assets/qrcode.png" alt="">
                            </div>
                            <span>点击使用</span>
                        </div>
                    </div>
                </div>
                <div v-show="isShowCard">
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
import { DecryptCode } from '@/api/memberPolicy/index'
import QRCode from 'qrcode'
import _ from 'lodash'

export default {
    data () {
        return {
            tags:[ {name:'未使用'}, {name:'已使用'}, {name:'已过期'}],
            activeName: '',
            isShow: false,
            isShowCard: false,
            url: '',
            target: [],
            couponList: [],
            title: '',
            beginDate: '',
            endDate: ''
        }
    },
    methods: {
      getDecryptCode () {
        var obj = this.getCode()
        var params = {
          card_id: obj.card_id,
          encrypt_code: obj.encrypt_code
        }
        DecryptCode(params).then(res=>{
          // alert('res'+JSON.stringify(res))
          if(res.code == 0){
            this.memberCouponList(res.data.memberCode)
          }
        })
      },
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
        let self = this
        self.isShow = true
        self.title = item.couponName
        self.beginDate = item.beginDate
        self.endDate = item.endDate
        var opts = {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          rendererOpts: {
            quality: 0.3
          }
        }
        
        QRCode.toDataURL(item.couponNo, opts, function (err, url) {
          if (err) throw err
          // console.log(url)
          self.url = url
        })
      },
      close(){
        this.isShow = false
      },
      getCode() {
        //encrypt_code=ENCRYPT_CODE&card_id=CARDID
        var obj={}
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?")
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
          num=arr[i].split("=");
          if(num[0]=='encrypt_code'){
            obj.encrypt_code=num[1]
          }
          if(num[0]=='card_id'){
            obj.card_id=num[1]
          }
        }
        return obj
      },
      memberCouponList(no) {
        getMemberNoCoupon(no).then(res=>{
          // alert('res111'+JSON.stringify(obj))
          if(res.length>0){
            this.target = res
            this.couponList = _.filter(res,(item)=>{ return item.status == 1 })
          }else{
            this.isShowCard = true
          }
        })
      }
    },
    mounted () {
      this.getDecryptCode()
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
      margin: 20px 0 15px
      text-align: center
    p
      text-align: center
      font-size: 12px
      color: #999999
</style>