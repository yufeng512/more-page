<template>
  <div>
    <div class="register-box">
      <img src="@/assets/memberPolicy/logo.jpg" alt="">
    </div>
    <div class="input-item">
      <span>姓名*</span>
      <div class="input-box">
        <el-input v-model="params.name" type="text" placeholder="请输入您的姓名" size="small"></el-input>
      </div>
    </div>
    <div class="input-item">
      <span>手机号码*</span>
      <div class="input-box">
        <el-input v-model="params.mobile" type="number" placeholder="请输入您的手机号码" size="small"></el-input>
      </div>
    </div>
    <div class="input-item">
      <span>生日*</span>
      <div class="input-box">
        <el-date-picker
          v-model="params.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请输入您的生日" 
          :editable="false"
          size="small">
        </el-date-picker>
      </div>
    </div>
    <div class="input-item">
      <span>性别*</span>
      <div class="input-box">
        <el-select v-model="params.sex" placeholder="请选择性别" size="small">
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
        <el-select v-model="params.province" @change="choseProvince" placeholder="省级地区" size="small">
          <el-option
            v-for="item in provinces"
            :key="item.id"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select  v-model="params.city" @change="choseCity" placeholder="市级地区" size="small">
          <el-option
            v-for="item in citys"
            :key="item.id"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="params.region" @change="choseBlock" placeholder="区级地区" size="small">
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
      <span>详细地址*</span>
      <div class="input-box">
        <input type="text" v-model="params.address" placeholder="请输入您的地址">
      </div>
    </div>
    <div class="btn-item flex-box">
      <button @click="save">提交信息</button>
    </div>
  </div>
</template>
<script>
import { getPosition } from '@/utils/utils'
import $ from 'jquery'
import { getMapJson, ProvincesList, Cities, Districts, MemberUpdate, MemberInsert } from '@/api/memberPolicy'
import _  from 'lodash'

export default {
  data() {
    return {
      params:{
        name: '',
        mobile: '',
        sex: "",
        birthday: '',
        province: '',
        city: '',
        region: '',
        address:''
      },
      sexList: [{ label: "男", value: 1 }, { label: "女", value: 0 }],
      mapJson: '../../static/json/map.json',
      provinces: [],
      citys: [],
      regions: []
    };
  },
  mounted () {
    this.getProvincesList()
    if(this.$route.params.mobile){
      this.params.mobile = this.$route.params.mobile
    }
    this.params = this.$route.params
    console.log(this.params)
    if(this.$route.params.name){
      this.getData()
    }
  },
  methods:{
    save () {
      let self = this
      // self.params.openId = localStorage.getItem("openId")||'od0aPwkytWYTQ8YE0J3y6awM0Nts'
      // self.params.unionId = localStorage.getItem("unionId")||'otMBn1ON_z6ahyzGkQaPnWzPBRVy'
      self.params.openId = localStorage.getItem("openId")
      self.params.unionId = localStorage.getItem("unionId")
      alert(JSON.stringify(self.params))
      alert(localStorage.getItem("member"))
      if (localStorage.getItem("member")){
        alert(1111)
        MemberUpdate(self.params).then(res=>{
          alert('res'+JSON.stringify(res))
          if(res.code == 0){
            self.$router.push('index')
          }
        }).catch(err=>{
          alert('err'+JSON.stringify(err))
        })
      }else{
        alert(222222)
        MemberInsert(self.params).then(res=>{
          alert('res'+JSON.stringify(res))
          if(res.code == 0){
            self.$router.push('index')
          }
        }).catch(err=>{
          alert('err'+JSON.stringify(err))
        })
      }
    },
    getData () {
      let self = this
      ProvincesList().then(res=>{
        console.log(res)
        let obj = []
        res.data.forEach(item => {
          obj.push({
            text: item.name,
            value: item.code
          })
        });
        self.provinces =  obj
      })
      Cities({provinceCode: this.member.province}).then(res=>{
        console.log(res)
        let obj = []
        res.data.forEach(item => {
          obj.push({
            text: item.name,
            value: item.code
          })
        });
        self.citys =  obj
      })
      Districts({cityCode: this.member.city}).then(res=>{
        console.log(res)
        let obj = []
        res.data.forEach(item => {
          obj.push({
            text: item.name,
            value: item.code
          })
        });
        self.regions =  obj
      })
    },
    getProvincesList(){
      ProvincesList().then(res=>{
        console.log(res)
        let obj = []
        res.data.forEach(item => {
          obj.push({
            text: item.name,
            value: item.code
          })
        });
        this.provinces =  obj
        })
    },
    // 选省
    choseProvince (e) {
      console.log(e,this.provinces)
      Cities({provinceCode: e}).then(res=>{
        console.log(res)
        let obj = []
        res.data.forEach(item => {
          obj.push({
            text: item.name,
            value: item.code
          })
        });
        this.citys =  obj
      })
      
    },
    // 选市
    choseCity (e) {
      console.log(e)
      Districts({cityCode: e}).then(res=>{
        console.log(res)
        let obj = []
        res.data.forEach(item => {
          obj.push({
            text: item.name,
            value: item.code
          })
        });
        this.regions =  obj
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
      border: #999999
      padding: 0 20px
      border-radius: 4px
      background: #999999
      color: #ffffff
      height: 32px
      margin-left: 10px
</style>

