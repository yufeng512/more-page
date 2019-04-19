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
<<<<<<< HEAD
                    <span>{{info.name}}</span>
=======
                    <p class="flex-btw">
                        <span>{{info.name}}</span>
                        <a style="" @click="getCard">领取卡券</a>
                    </p>
>>>>>>> dev
                </div>
                <div class="info-item">
                    <span>手机:</span>
                    <span>{{info.mobile}}</span>
                </div>
                <div class="info-item">
                    <span>等级:</span>
                    <span>{{info.gradeDesc}}</span>
                </div>
                <div class="info-item">
<<<<<<< HEAD
                    <span>积分:</span>
                    <span>{{info.point}}</span>
=======
                    <span>会员积分:</span>
                    <span>{{info.point?info.point:0}}</span>
                </div>
                <div class="info-item" >
                    <span>天猫积分:</span>
                    <span>{{info.tmallPoint?info.tmallPoint:'0'}}</span>
>>>>>>> dev
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
                <div class="btn-item flex-column" @click="goPage('pointHistory')">
                    <div class="img-box flex-column">
<<<<<<< HEAD
                        <img src="@/assets/memberCenter/search.png" alt="">
=======
                        <img src="@/assets/memberCenter/point-search.png" alt="">
>>>>>>> dev
                    </div>
                    <p>积分历史</p>
                </div>
                <div class="btn-item flex-column">
                    <div class="img-box flex-column" @click="goPage('orderHistory')">
                        <img src="@/assets/memberCenter/money.png" alt="">
                    </div>
                    <p>消费历史</p>
                </div>
                <div class="btn-item flex-column">
                    <div class="img-box flex-column" @click="goStore">
<<<<<<< HEAD
                        <img src="@/assets/memberCenter/store.png" alt="">
=======
                        <img src="@/assets/memberCenter/address.png" alt="">
>>>>>>> dev
                    </div>
                    <p>附近门店</p>
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
import $ from 'jquery'
<<<<<<< HEAD
=======
import { GetCardSign} from '@/api/memberPolicy'
>>>>>>> dev
import { getMemberInfo } from '@/api/memberCenter/index'
import QRCode from 'qrcode'
export default {
    data () {
        return {
            info: {

            },
            isShow: false
        }
    },
    methods: {
        goPage(str){
            if(str!=''){
<<<<<<< HEAD
                this.$router.push(str)
=======
                this.$router.push('/'+str)
>>>>>>> dev
            }
        },
        goStore () {
            window.location.href = 'https://crm.eloccitane.com/wmth5/storeSearch.html'
        },
        close(){
            this.isShow = false
        },
        use(){
            this.isShow = true
            QRCode.toDataURL(this.info.memberCode).then(url => {
                this.url = url
                console.log(url)
            }).catch(err => {
                console.error(err)
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
<<<<<<< HEAD
                // alert(JSON.stringify(res))
                if(res.code==0){
                    if(res.data.member){
                        localStorage.setItem("isMemberCenter",true)
                        localStorage.setItem("mobile",res.data.member.mobile)
                        self.getMobileInfo(res.data.member.mobile)
                    }else{
                        window.location = 'http://wmtuat.eloccitane.com/member/memberPolicy.html'
                        // window.location = 'https://crm.eloccitane.com/member/memberPolicy.html'
                    }
                }else {
                    if(localStorage.getItem("isMemberCenter")){
                        self.getMobileInfo(localStorage.getItem("mobile"))
                    }else{
                        window.location = 'http://wmtuat.eloccitane.com/member/memberPolicy.html'
                        // window.location = 'https://crm.eloccitane.com/member/memberPolicy.html'
                    }
                }
                },
                error:function(e){
                    alert(e)
                }
            })
        },
=======
                    if(res.code==0){
                        localStorage.setItem("openId",res.data.openId)
                        localStorage.setItem("unionId",res.data.unionId)
                        if(res.data.member){
                            localStorage.setItem("mobile",res.data.member.mobile)
                            self.getMobileInfo(res.data.member.mobile)
                        }
                        else{
                            window.location.href = 'http://wmtuat.eloccitane.com/member/memberPolicy.html'
                            //  window.location.href = 'https://crm.eloccitane.com/member/memberPolicy.html'
                        }
                    }else {
                        if(localStorage.getItem("isMember")){
                            self.getMobileInfo(localStorage.getItem("mobile"))
                        }
                    }
                },
                error:function(e){
                    console.log(e)
                }
            })
        },
        getCard () {
            let self = this
            let no = self.info.memberCode
            GetCardSign(no).then(res=>{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx4a63496668c5dac4', // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名
                    jsApiList: ['addCard'] // 必填，需要使用的JS接口列表
                });
                wx.ready(function(){
                    wx.addCard({
                        cardList: [{
                        cardId: res.data.card_id,
                        cardExt: '{"code":"' + res.data.memberCode + '","openid":"","timestamp":"' + res.data.timestamp + '","nonce_str":"' + res.data.nonceStr + '","signature":"' + res.data.signature + '","outer_str":"wx"}'
                        }], //这里需要注意的是cardExt参数的value值是 String类型，不要使用对象发送；另外openid如果在创建优惠券的时候没有指定，则这边为空，千万不要填写当前用户的openid
                        success: function(result) {
                            self.$toast("领取成功");
                        },
                        fail: function(res) {
                            self.$toast("已领取");
                        },
                        complete: function() {
                            self.$toast("领取完成");
                        }
                    })
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                });
                wx.error(function(res){
                    // alert('res2'+JSON.stringify(res))
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            })
        },
>>>>>>> dev
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
        },
<<<<<<< HEAD
=======
        
>>>>>>> dev
        getMobileInfo (mobile){
            getMemberInfo(mobile).then(res=>{
                // alert(JSON.stringify(res))
                if(res.code == 0){
<<<<<<< HEAD
                    this.info = res.data
                    // localStorage.setItem("memberCode",'C0004500000019851')
                    localStorage.setItem("memberCode",res.data.memberCode)
=======
                    localStorage.setItem("memberCode",res.data.memberCode)
                    this.info = res.data
                }else{
                    // window.location.href = 'https://crm.eloccitane.com/member/memberPolicy.html'
                    window.location.href = 'http://wmtuat.eloccitane.com/member/memberPolicy.html'
>>>>>>> dev
                }
            })
        }
    },
    mounted () {
        this.isLogin()
<<<<<<< HEAD
        // let mobile = '13818645674'
        // this.getMobileInfo(mobile)
=======
>>>>>>> dev
    }
}
</script>

<style lang="sass" scoped>
.member-box
  padding: 10px 15px
  .card-code
    position: absolute
    width: 40px
<<<<<<< HEAD
    right: 40px
    top: 60px
=======
    left: 30px
    top: 35px
>>>>>>> dev
  img
    width: 100%
.info-box
  margin-bottom: 20px
  .info-item
    padding: 20px 12px 8px
    border-bottom: 1px solid #dbdbdb
    display: flex
    justify-content: flex-start
<<<<<<< HEAD
    span
        color: #666666
        &:first-child
        width: 25%
=======
    align-items: center
    p
      width: 70%
      a
        font-size: 14px
        color: #666666
    span
      color: #666666
      &:first-child
        width: 30%
      &:last-child
        width: 70%
>>>>>>> dev
.btn-box
  border-bottom: 1px solid #dbdbdb
.btn-item
  padding-top: 10px
  height: 80px
  flex: 1
  .img-box
<<<<<<< HEAD
    height: 30px
    img
      width: 35%
=======
    height: 40px
    img
      width: 30%
>>>>>>> dev
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