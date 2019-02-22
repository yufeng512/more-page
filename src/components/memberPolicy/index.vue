<template>
<div>
  <div class="img-box" v-if="isRegister">
    <img src="@/assets/memberPolicy/1.jpg" alt="">
    <img src="@/assets/memberPolicy/2.jpg" alt="">
    <img src="@/assets/memberPolicy/3.jpg" alt="">
    <img src="@/assets/memberPolicy/4.jpg" alt="">
    <div class="img-box" @click="goPage">
      <img src="@/assets/memberPolicy/5.jpg" alt="">
    </div>
  </div>
  <div class="register-box" v-else>
    <img src="@/assets/memberPolicy/logo.jpg" alt="">
    <div>
      <div class="info-item">
        <span>姓名</span>
        <span>{{member.name}}</span>
      </div>
      <div class="info-item">
        <span>手机号码</span>
        <span>{{member.mobile}}</span>
      </div>
      <div class="info-item">
        <span>生日</span>
        <span>{{member.birthday}}</span>
      </div>
      <div class="info-item">
        <span>省市区</span>
        <span>{{member.province + member.city + member.region}}</span>
      </div>
      <div class="info-item">
        <span>详细信息</span>
        <span>{{member.address}}</span>
      </div>
    </div>
    <button @click="changeInfo">修改我的信息</button>
  </div>
  
</div>
</template>
<script>
import $ from 'jquery'
import { Login, ProvincesList, Cities, Districts,} from '@/api/memberPolicy/index'
export default {
  data(){
    return {
      isRegister: false,
      openId: '',
      member: {},
      unionId: ''
    }
  },
  mounted(){
    this.isLogin()
  },
  methods: {
    getData (province,city,region) {
      let self = this
      ProvincesList().then(res=>{
        let obj = res.data.find(item=>{
          return item.code == province
        })
        self.member.province = obj.name
      })
      Cities({provinceCode: province}).then(res=>{
       let obj = res.data.find(item=>{
          return item.code == city
        })
        self.member.city = obj.name
      })
      Districts({cityCode: city}).then(res=>{
        let obj = res.data.find(item=>{
          return item.code == region
        })
        self.member.region = obj.name
      })
    },
    changeInfo () {
      // alert(JSON.stringify(this.member))
      let obj = {
        name: this.member.name,
        mobile: this.member.mobile,
        sex: this.member.sex,
        birthday: this.member.birthday,
        province: this.member.province,
        city: this.member.city,
        region: this.member.region,
        address: this.member.address
      }
      this.$router.push({name:'userInfo', params: obj})
    },
    goPage () {
      this.$router.push('register')
    },
    isLogin (){
      let self = this
      let code = self.UrlSearch()
      // alert(code)
      self.code = code
      let params ={
        code: code
      }
      $.ajax({ url: process.env.BASE_API+"mobile/auth/login", type:"post", data: params,
        success:function(res){
          // alert(JSON.stringify(res))
          if(res.code==0){
            self.openId=res.data.openId
            self.unionId=res.data.unionId
            localStorage.setItem("openId",res.data.openId)
            localStorage.setItem("unionId",res.data.unionId)
            localStorage.setItem("member",res.data.member)
            if(res.data.member){
              self.isRegister = false
              self.member=res.data.member
              self.getData(self.member.province,self.member.city,self.member.region)
            }else{
              self.isRegister = true
            }
          }
        },
        error:function(e){
          console.log("错误！！");
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
    },
  }
}
</script>
<style scoped>
.register-box img,
.img-box img{
  width: 100%;
}
.register-box{
  padding: 10px;
}
.register-box button{
  background: #666666;
  color: #ffffff;
  border: none;
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
  margin-top: 20px;
  border-radius: 6px;
}
.info-item{
  padding: 15px 0;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: flex-start;
}
.info-item span:first-child{
  width: 30%;
}
</style>

