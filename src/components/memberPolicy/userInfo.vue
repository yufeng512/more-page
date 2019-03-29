<template>
  <div>
    <div class="register-box">
      <img src="@/assets/memberPolicy/logo.jpg" alt="">
    </div>
    <div class="input-item">
      <span>姓名*</span>
      <div class="input-box">
        <el-input v-model="info.name" type="text" placeholder="请输入您的姓名" size="small"></el-input>
      </div>
    </div>
    <div class="input-item">
      <span>手机号码*</span>
      <div class="input-box">
        <el-input v-model="info.mobile" type="number" disabled placeholder="请输入您的手机号码" size="small"></el-input>
      </div>
    </div>
    <div class="input-item">
      <span>生日*</span>
      <div class="input-box">
        <el-date-picker
          v-model="info.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请输入您的生日" 
          :editable="false"
          size="small">
        </el-date-picker>
      </div>
      <p>生日当月会有礼品送达</p>
    </div>
    <div class="input-item">
      <span>性别*</span>
      <div class="input-box">
        <el-select v-model="info.gender" placeholder="请选择性别" size="small">
          <el-option
            v-for="item in sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="input-item">
      <span>省市区</span>
      <div class="input-box">
        <el-select v-model="info.province" @change="choseProvince" placeholder="省级地区" size="small">
          <el-option
            v-for="item in provinces"
            :key="item.id"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <el-select  v-model="info.city" @change="choseCity" placeholder="市级地区" size="small">
          <el-option
            v-for="item in citys"
            :key="item.id"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <el-select v-model="info.region" @change="choseBlock" placeholder="区级地区" size="small">
          <el-option
             v-for="item in regions"
            :key="item.id"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="input-item">
      <span>详细地址</span>
      <div class="input-box">
        <el-input v-model="info.address" type="text" placeholder="请输入您的地址" size="small"></el-input>
      </div>
    </div>
    <div class="btn-item flex-box">
      <button @click="save">提交信息</button>
    </div>
  </div>
</template>
<script>
import { ProvincesList, Cities, Districts, MemberUpdate, MemberInsert, GetCardSign} from '@/api/memberPolicy'
import _  from 'lodash'

export default {
  data() {
    return {
      info:{
        name: '',
        mobile: '',
        gender: '2',
        birthday: '',
        province: '',
        city: '',
        region: '',
        address:''
      },
      sexList: [{ label: "男", value: '1'}, { label: "女", value: '2' }],
      provinces: [],
      citys: [],
      regions: []
    };
  },
  mounted () {
    this.getProvincesList()
    if(this.$route.params.mobile){
      this.info.mobile = this.$route.params.mobile
    }
    if(localStorage.getItem("isMember")){
      this.info.id = localStorage.getItem("id").toString()
      this.info.name = localStorage.getItem("name")
      this.info.mobile = localStorage.getItem("mobile")
      this.info.gender = localStorage.getItem("gender")
      this.info.birthday = localStorage.getItem("birthday")
      this.info.province = localStorage.getItem("province")||''
      this.info.city = localStorage.getItem("city")||''
      this.info.region = localStorage.getItem("region")||''
      this.info.address = localStorage.getItem("address")||''
      this.getData()
    }
  },
  methods:{
    getGetCardSign (no) {
      GetCardSign(no).then(res=>{
        alert('res'+JSON.stringify(res))
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: localStorage.getItem("openId"), // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature,// 必填，签名
            jsApiList: ['addCard'] // 必填，需要使用的JS接口列表
        });
        wx.addCard({
          cardList: [{
            cardId: res.data.card_id,
            cardExt: '{"code":"' + res.data.memberCode + '","openid":"'+localStorage.getItem("openId")+'","timestamp":"' + res.data.timestamp + '","nonce_str":"' + res.data.nonceStr + '","signature":"' + res.data.signature + '","outer_str":"wx"}'
          }], //这里需要注意的是cardExt参数的value值是 String类型，不要使用对象发送；另外openid如果在创建优惠券的时候没有指定，则这边为空，千万不要填写当前用户的openid
          success: function(result) {
            alert('领取成功', result);
            window.location.href="http://wmtuat.eloccitane.com/memberCenter/memberCenter.html"
          },
          fail: function(res) {
            alert('领取失败', res);
          },
          complete: function() {

          }
        })
      })
    },
    save () {
      let self = this
      let params = self.info
      if(self.info.name==''){
        self.$toast("请输入姓名！");
        return false
      } else if (self.info.gender=='') {
        self.$toast("请选择性别！");
        return false
      } else if (self.info.birthday=='') {
        self.$toast("请输入生日！");
        return false
      }
      // params.openId = localStorage.getItem("openId")||'od0aPwkytWYTQ8YE0J3y6awM0Nts'
      // params.unionId = localStorage.getItem("unionId")||'otMBn1ON_z6ahyzGkQaPnWzPBRVy'
      params.openId = localStorage.getItem("openId")
      params.unionId = localStorage.getItem("unionId")
      // alert('res'+JSON.stringify(params))
      if (params.id){
        MemberUpdate(params).then(res=>{
          // alert('res'+JSON.stringify(res))
          if(res.code == 0){
            self.$toast("更新成功");
            setTimeout(function(){
              self.$router.push('/')
            },2000)
            self.setLocal(res.data)
          }else{
            self.$toast(res.msg||"更新失败");
          }
        }).catch(err=>{
          alert('err'+JSON.stringify(err))
        })
      }else{
        MemberInsert(params).then(res=>{
          // alert('res'+JSON.stringify(res))
          if(res.code == 0){
            self.$toast("注册成功");
            self.setLocal(res.data)
            self.getGetCardSign(res.data.memberCode)
          }else{
            self.$toast(res.msg||'保存失败');
          }
        }).catch(err=>{
          alert('err'+JSON.stringify(err))
        })
      }
    },
    setLocal (member) {
      localStorage.setItem("isMember", true)
      localStorage.setItem("id", member.id)
      localStorage.setItem("name", member.name)
      localStorage.setItem("mobile", member.mobile)
      localStorage.setItem("gender", member.gender)
      localStorage.setItem("birthday", member.birthday)
      localStorage.setItem("province", member.province||'')
      localStorage.setItem("city", member.city||'')
      localStorage.setItem("region", member.region||'')
      localStorage.setItem("address", member.address||'')
    },
    getData () {
      let self = this
      Cities({provinceCode: this.info.province}).then(res=>{
        self.citys =  res.data
      })
      Districts({cityCode: this.info.city}).then(res=>{
        self.regions = res.data
      })
    },
    getProvincesList(){
      ProvincesList().then(res=>{
        this.provinces = res.data
      })
    },
    // 选省
    choseProvince (e) {
      console.log(e,this.provinces)
      let self = this
      Cities({provinceCode: e}).then(c=>{
        self.citys = c.data
        self.info.city =  self.citys[0].code
        Districts({cityCode: self.citys[0].code}).then(r=>{
          this.regions = r.data
          this.info.region =  this.regions[0].code
        })
      })
      
    },
    // 选市
    choseCity (e) {
      console.log(e)
      Districts({cityCode: e}).then(res=>{
        this.regions = res.data
        this.info.region =  this.regions[0].code
      })
    },
    choseBlock (e) {
    }
  }
};
</script>
<style lang="sass" scoped>
.register-box img
  width: 100%
.register-box
  padding: 10px

.btn-item
  margin-top: 20px
  padding: 0 20px
  button
    outline: none
    border: 1px solid #dcdfe6
    padding: 0 20px
    border-radius: 4px
    background: none
    color: #666666
    height: 32px
    flex: 1
    margin-bottom: 20px
.input-item
  margin-top: 20px
  padding: 0 20px
  p
    font-size: 14px
    color: #999999
    margin-top: 5px
  span
    font-size: 14px
    color: #666666
    display: block
    margin-bottom: 8px
  .input-box
    display: flex
    .el-date-editor
      width: 100%
    .el-select
      width: 100%
      &:nth-child(2)
        margin: 0 10px
    input
      border: 1px solid #dcdfe6
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
      border: 1px solid #999999
      padding: 0 20px
      border-radius: 4px
      color: #ffffff
      height: 32px
      margin-left: 10px  
</style>

