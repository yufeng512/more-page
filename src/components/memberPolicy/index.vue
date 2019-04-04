<template>
<div>
  <div v-show="isRegister">
    <div class="register-box">
      <img src="@/assets/memberPolicy/logo.jpg" alt="">
    </div>
    <div class="input-item flex-box">
      <input type="number" v-model="phone" placeholder="请输入您的手机号码">
    </div>
    <div class="input-item flex-box">
      <input type="number" v-model="code" placeholder="请输入验证码">
      <button :disabled="isDisabled"  @click="getCode">{{codeText}}</button>
    </div>
    <div class="input-item flex-box">
      <el-checkbox v-model="checked"></el-checkbox><p>我已阅读和了解普罗旺斯欧舒丹官方微信的<span @click="isOpen(true)">隐私条款</span>，并同意接受其中的所有条款。</p>
    </div>
    <div class="btn-item flex-box">
      <button @click="regiter">注册绑定</button>
    </div>
  </div>
  
  <div class="register-box" v-show="isInfo">
    <img src="@/assets/memberPolicy/logo.jpg" alt="">
    <div>
      <div class="info-item">
          <span>姓名</span>
          <span>{{name}}</span>
      </div>
      <div class="info-item">
          <span>手机号码</span>
          <span>{{mobile}}</span>
      </div>
      <div class="info-item">
          <span>生日</span>
          <span>{{birthday}}</span>
      </div>
      <div class="info-item">
          <span>性别</span>
          <span>{{gender==1?'男':'女'}}</span>
      </div>
      <div class="info-item">
          <span>省市区</span>
          <span>{{province+city+region}}</span>
      </div>
      <div class="info-item">
          <span>详细信息</span>
          <span>{{address}}</span>
      </div>
    </div>
    <button @click="changeInfo">修改我的信息</button>
  </div>
  <div class="popup" v-if="isShow">
    <div class="content">
        <img class="close" src="@/assets/close.png" alt="" @click="isOpen(false)">
        <privacy></privacy>
    </div>
  </div>
</div>
</template>
<script>
import $ from 'jquery'
import privacy from './privacy'
import { MemberInsert, Send, MemberCheckBind } from '@/api/memberPolicy/index'
import { Login } from '@/api/memberPolicy/index'

export default {
  data () {
    return {
      isShow: false,
      phone: '',
      code: '',
      checked: true,
      isRegister: false,
      name: '',
      mobile: '',
      gender: "",
      birthday: '',
      province: '',
      city: '',
      region: '',
      address:'',
      codeText: '获取验证码',
      isDisabled: false,
      isInfo: false,
      time: 60,
      interval: null
    }
  },
  mounted(){
    this.isLogin()
  },
  components:{
    privacy
  },
  methods: {
    isOpen (p) {
      this.isShow = p
    },
    changeInfo () {
        this.$router.push({name:'userInfo',params:{mobile: this.mobile}})
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
              self.isInfo = true
              self.name = res.data.member.name
              self.mobile = res.data.member.mobile
              self.gender = res.data.member.sex
              self.birthday = res.data.member.birthday
              self.province = res.data.member.province||''
              self.city = res.data.member.city||''
              self.region = res.data.member.region||''
              self.address = res.data.member.memberAddress||''
              localStorage.setItem("isMember",true)
              localStorage.setItem("id",res.data.member.id)
              localStorage.setItem("name",res.data.member.name)
              localStorage.setItem("mobile",res.data.member.mobile)
              localStorage.setItem("gender",res.data.member.sex)
              localStorage.setItem("birthday",res.data.member.birthday)
              localStorage.setItem("province",res.data.member.province||'')
              localStorage.setItem("city",res.data.member.city||'')
              localStorage.setItem("region",res.data.member.region||'')
              localStorage.setItem("address",res.data.member.memberAddress||'')
            }else{
              self.setRemoveLocal()
              self.isRegister = true
            }
          }else {
            if(localStorage.getItem("isMember")){
              self.isInfo = true
              self.name = localStorage.getItem("name")
              self.mobile = localStorage.getItem("mobile")
              self.gender = localStorage.getItem("gender")
              self.birthday = localStorage.getItem("birthday")
              self.province = localStorage.getItem("province")||''
              self.city = localStorage.getItem("city")||''
              self.region = localStorage.getItem("region")||''
              self.address = localStorage.getItem("address")||''
            }else{
              self.setRemoveLocal()
              self.isRegister = true
            }
          }
        },
        error:function(e){
          self.$toast(e)
        }
      })
    },
    setRemoveLocal(){
      localStorage.removeItem("isMember")
      localStorage.removeItem("id")
      localStorage.removeItem("name")
      localStorage.removeItem("mobile")
      localStorage.removeItem("gender")
      localStorage.removeItem("birthday")
      localStorage.removeItem("province")
      localStorage.removeItem("city")
      localStorage.removeItem("region")
      localStorage.removeItem("address")
    },
    UrlSearch() {
      //encrypt_code=ENCRYPT_CODE&card_id=CARDID
      var value;
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
    getCode () {
      let self = this
      let params = {
        mobile: self.phone
      }
      if(!self.isPoneAvailable(self.phone)){
        self.$toast('请输入11位有效手机号码');
        return false
      }
      $.ajax({ url:process.env.BASE_API+"mobile/code/send", type:"post", data: params,
        success:function(data){
          if(data.code==0){
            self.$toast("验证码已发送");
            self.settime()
          }else if(data.code==1){
            self.$toast(data.msg||'错误');
            this.codeText="短信已发送";
          }else{
            self.$toast(data.msg||'错误');
          }
        },
        error:function(e){
          self.$toast(e.msg);
        }
      })
    },
    settime() {
        let self = this
        if (self.time == 0) {
            self.codeText="获取验证码";
            self.time = 60;
            self.isDisabled =  false
            clearInterval(self.interval)
        } else {
            self.isDisabled =  true
            self.codeText= self.time+"后重新发送"
            self.time--
            self.interval = setTimeout(function() {
                self.settime()
            },1000)
        }
 
    },
    regiter () {
      let self = this
      let params = {}
      
      if(!self.isPoneAvailable(self.phone)){
        self.$toast('请输入11位有效手机号码');
        return false
      } else if(this.code==''){
        self.$toast('请输入验证码！');
        return false
      }
      if(!self.checked){
        self.$toast('请勾选隐私条款！');
        return false
      }
      params.mobile = self.phone
      params.msgCode = self.code
      params.openId = localStorage.getItem("openId")
      params.unionId = localStorage.getItem("unionId")
      MemberCheckBind(params).then(res=>{
        if(res.code == 0){
          self.$toast(res.msg||'已绑定成功');
          localStorage.setItem("isMember",true)
          localStorage.setItem('mobile',res.data.mobile)
          setTimeout(function(){
            window.location.href = 'https://crm.eloccitane.com/memberCenter/memberCenter.html'
          },1500)
        }else if(res.code == 6){
          self.$toast(res.msg);
          setTimeout(function(){
            self.$router.push({name:'userInfo',params:{mobile: self.phone}})
          },1500)
        }else{
          self.$toast(res.msg);
        }
      })
    },
    isPoneAvailable(str) {
        var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }
  }
}
</script>
<style lang="sass" scoped>
.register-box img
  width: 100%
.register-box
  padding: 10px

.register-box button
  background: #666666
  color: #ffffff
  border: none
  width: 100%
  font-size: 16px
  padding: 10px 0
  margin-top: 20px
  border-radius: 6px

.info-item
  padding: 15px 0
  border-bottom: 1px solid #dbdbdb
  display: flex
  justify-content: flex-start

.info-item span:first-child
  width: 30%

.btn-item
  margin-top: 20px
  padding: 0 20px
  button
    outline: none
    border: #999999
    padding: 0 20px
    border-radius: 4px
    background: #999999
    color: #ffffff
    height: 32px
    flex: 1
.input-item
  margin-top: 20px
  padding: 0 20px
  .check-box
    width: 20px
  input
    border: 1px solid #dbdbdb
    height: 30px
    line-height: 30px
    border-radius: 4px
    flex: 1 0 auto
    outline: none
    text-indent: 6px
    display: block
    font-size: 12px
  button
    outline: none
    border: #999999
    padding: 0 20px
    border-radius: 4px
    background: #999999
    color: #ffffff
    height: 32px
    margin-left: 10px
  p
    font-size: 12px
    margin-left: 6px
    span
      color: rgba(47,117,181,1)
.popup
  position: fixed
  width: 100%
  height: 100%
  top: 0
  background: rgba(0,0,0,0.7)
  z-index: 9999
  .content
    width: 80%
    margin-left: 10%
    margin-top: 15%
    height: 80%
    padding: 5px 0 10px
    background: #ffffff
    border-radius: 4px
    text-align: center
    overflow: scroll
    .close 
      position: absolute
      right: 10%
</style>