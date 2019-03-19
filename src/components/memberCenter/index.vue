<template>
    <div>
        <div class="member-box">
            <img src="@/assets/memberCenter/logo.jpg" alt="">
            <div class="card-code"  @click="use">
                <img  src="@/assets/qrcode.png" alt="">
            </div>
            <div class="info-box">
                <div class="info-item">
                    <span>姓名:</span>
                    <span>{{info.name}}</span>
                </div>
                <div class="info-item">
                    <span>手机:</span>
                    <span>{{info.mobile}}</span>
                </div>
                <div class="info-item">
                    <span>等级:</span>
                    <span>{{info.mobilegrade}}</span>
                </div>
                <div class="info-item">
                    <span>积分:</span>
                    <span>{{info.point}}</span>
                </div>
            </div>
            <div class="btn-box flex-btw">
                <div class="btn-item flex-column" @click="goPage('info')">
                    <div class="img-box flex-column">
                        <img src="@/assets/memberCenter/member-info.png" alt="">
                    </div>
                    <p>会员信息</p>
                </div>
                <div class="btn-item flex-column">
                    <div class="img-box flex-column" @click="goPage('point')">
                        <img src="@/assets/memberCenter/point.png" alt="">
                    </div>
                    <p>积分商城</p>
                </div>
                <div class="btn-item flex-column">
                    <div class="img-box flex-column" @click="goPage('card')">
                        <img src="@/assets/memberCenter/card.png" alt="">
                    </div>
                    <p>卡券包</p>
                </div>
            </div>
            <div class="btn-box flex-btw">
                <div class="btn-item flex-column" @click="goPage('')">
                    <div class="img-box flex-column">
                        <img src="@/assets/memberCenter/member-info.png" alt="">
                    </div>
                    <p>积分历史</p>
                </div>
                <div class="btn-item flex-column">
                    <div class="img-box flex-column" @click="goPage('')">
                        <img src="@/assets/memberCenter/point.png" alt="">
                    </div>
                    <p>消费历史</p>
                </div>
                <div class="btn-item flex-column">
                    <div class="img-box flex-column" @click="goPage('')">
                        <img src="@/assets/memberCenter/card.png" alt="">
                    </div>
                    <p>卡券包</p>
                </div>
            </div>
        </div>
        <div class="popup" v-if="isShow">
            <div class="content">
                <img class="close" src="@/assets/close.png" alt="" @click="close">
                <h4>会员卡</h4>
                <img class="" :src="url" alt="">
                <p>二维码</p>
            </div>
        </div>
    </div>
</template>
<script>
import { getMemberInfo } from '@/api/memberCenter/index'
import QRCode from 'qrcode'
export default {
    data () {
        return {
            info: {},
            isShow: false,
            url: ''
        }
    },
    methods: {
        goPage(str){
            if(str!=''){
                this.$router.push(str)
            }
        },
        close(){
            this.isShow = false
        },
        use(){
            this.isShow = true
            QRCode.toDataURL('http://www.baidu.com').then(url => {
                this.url = url
                console.log(url)
            }).catch(err => {
                console.error(err)
            })
        },
    },
    mounted () {
        let mobile = '15026970585'
        getMemberInfo(mobile).then(res=>{
            console.log(res)
            if(res.code == 0){
                this.info = res.data
            }
        })
    }
}
</script>

<style lang="sass" scoped>
.member-box
  padding: 10px 15px
  .card-code
    position: absolute
    width: 40px
    right: 40px
    top: 60px
  img
    width: 100%
.info-box
  margin-bottom: 20px
  .info-item
    padding: 20px 12px 8px
    border-bottom: 1px solid #dbdbdb
    display: flex
    justify-content: flex-start
    span
        color: #666666
        &:first-child
        width: 25%
.btn-box
  border-bottom: 1px solid #dbdbdb
.btn-item
  padding-top: 10px
  height: 80px
  flex: 1
  .img-box
    height: 30px
    img
      width: 35%
  p
    font-size: 16px
    padding: 10px 0
    color: #666666
  &:nth-child(2)
    border-left: 1px solid #dbdbdb
    border-right: 1px solid #dbdbdb 
.popup
  position: fixed
  width: 100%
  height: 100%
  top: 0
  background: rgba(0,0,0,0.7)
  z-index: 9999
  .content
    width: 60%
    margin-left: 20%
    margin-top: 50%
    height: 200px
    padding: 5px 0 10px
    background: #ffffff
    border-radius: 4px
    text-align: center
    .close 
      position: absolute
      right: 21%
    h4
      font-size: 18px
      margin: 10px 0
      text-align: center
    p
      text-align: center
      font-size: 14px
      color: #999999
</style>