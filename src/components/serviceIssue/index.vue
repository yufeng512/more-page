<template>
    <div class="issue-box">
      <div class="bg">
        <img src="@/assets/quest_bg.png" alt="">
      </div>
      <div class="container">
        <img class="logo-box" src="@/assets/logo_wx.png" alt="">
        <p>欧舒丹会员调查评价</p>
        <div class="btn-box">
          <el-button type="primary" @click="submit">点击进入</el-button>
        </div>
      </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { hasPartQues } from '@/api/common.js'
import { Login } from '@/api/memberPolicy/index'
export default {
    data () {
        return {
        }
    },
    methods:{
        submit () {
          let self = this
          var obj = self.UrlSearch()
          alert('req'+JSON.stringify(obj))
          var req = {
            openId: localStorage.getItem("openId"),
            campaignId: obj.campaignId
          }
          localStorage.setItem("campaignId",obj.campaignId||'') 
          hasPartQues(req).then(res=>{
            alert(JSON.stringify(res))
            if(res){
              self.$toast('您已参与过该活动评价');
            }else{
              self.$router.push('questionnaire')
            }
          })
        },
        isLogin (){
          let self = this
          let obj = self.UrlSearch()
          let params ={
            code: obj.code
          }
          $.ajax({ url: process.env.BASE_API+"mobile/auth/login", type:"post", data: params,
            success:function(res){
              if(res.code==0){
                if(res.data.member){
                  localStorage.setItem("openId",res.data.openId) 
                }else{
                  self.$toast('登陆失败');
                }
              }else{
                self.$toast('登陆失败');
              }
            },
            error:function(e){
              self.$toast(e)
            }
          })
        },
        UrlSearch() {
          //encrypt_code=ENCRYPT_CODE&card_id=CARDID
          var obj={}
          var str=location.href; //取得整个地址栏
          var num=str.indexOf("?")
          str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
          var arr=str.split("&"); //各个参数放到数组里
          // alert('res11'+JSON.stringify(arr))
          for(var i=0;i < arr.length;i++){
            num=arr[i].split("=");
            if(num[0]=='code'){
              obj.code=num[1]
            }
            if(num[0]=='campaignId'){
              obj.campaginId=num[1]
            }
          }
          return obj
        }
    },
    mounted () {
      this.isLogin()
    }
}
</script>
<style lang="sass" scoped>
.el-radio,
.el-checkbox
  margin: 15px 0
  display: block
.issue-box
  position: relative
  .bg
    position: fixed
    top: 0
    z-index: 0
    img
      width: 100%
  .container
    position: absolute
    width: 100%
    z-index: 1
    p
      padding-top: 12.25rem
      font-size: 2rem
      width: 100%
      font-weight: 300
      text-align: center
      color: #f8bc32
      line-height: 1.2rem
      padding-bottom: 0.675rem
      background: url(../../assets/border_quest.png) no-repeat bottom
      background-size: 13.325rem 1px
    .logo-box
      width: 50%
      margin-left: 25%
      padding-top: 2.9rem
    .btn-box 
      margin-top: 5.1rem
      text-align: center
      button
        width: 72%
        border: none
        background: #f8bc32

</style>

