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
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select  v-model="info.city" @change="choseCity" placeholder="市级地区" size="small">
          <el-option
            v-for="item in citys"
            :key="item.id"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="info.region" @change="choseBlock" placeholder="区级地区" size="small">
          <el-option
             v-for="item in regions"
            :key="item.id"
            :label="item.text"
            :value="item.value">
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
import { getMemberInfo } from '@/api/memberCenter/index'
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
      regions: [],
      memberCode: ''
    };
  },
  mounted () {
    this.getProvincesList()
    this.info.mobile = this.$route.params.mobile
    alert(JSON.stringify(this.info.mobile))
    getMemberInfo(this.info.mobile).then(res=>{
        alert(JSON.stringify(res))
        if(res.code == 0){
            localStorage.setItem("memberCode",res.data.memberCode)
            this.info = res.data
        }
    })
  },
  methods:{
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
      alert('res'+JSON.stringify(params))
      MemberUpdate(params).then(res=>{
        alert('res'+JSON.stringify(res))
        if(res.code == 0){
          self.$toast("更新成功");
          self.$router.push('/')
        }else{
          self.$toast(res.msg||"更新失败");
        }
      }).catch(err=>{
        self.$toast('更新失败')
      })
    },
    getData () {
      let self = this
      Cities({province: this.info.province}).then(res=>{
        self.citys =  res.data
      })
      Districts({city: this.info.city}).then(res=>{
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
      Cities({province: e}).then(c=>{
        self.citys = c.data
        self.info.city =  self.citys[0].text
        Districts({city: self.citys[0].text}).then(r=>{
          this.regions = r.data
          this.info.region =  this.regions[0].text
        })
      })
    },
    // 选市
    choseCity (e) {
      console.log(e)
      Districts({city: e}).then(res=>{
        this.regions = res.data
        this.info.region =  this.regions[0].text
      })
    },
    choseBlock (e) { }
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

