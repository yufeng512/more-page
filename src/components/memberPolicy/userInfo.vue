<template>
  <div>
    <div></div>
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
          v-model="params.birthDay"
          type="date"
          placeholder="请输入您的生日" 
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
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select  v-model="params.city" @change="choseCity" placeholder="市级地区" size="small">
          <el-option
            v-for="item in citys"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="params.region" @change="choseBlock" placeholder="区级地区" size="small">
          <el-option
             v-for="item in regions"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="input-item">
      <span>详细地址*</span>
      <div class="input-box">
        <input type="number" v-model="params.address" placeholder="请输入您的地址">
      </div>
    </div>
    <div class="btn-item flex-box">
      <button @click="save">提交信息</button>
    </div>
  </div>
</template>
<script>
import { getPosition } from '@/utils/utils'
import { getMapJson, Provinces, Cities, Districts, MemberUpdate } from '@/api/memberPolicy'
import axios  from 'axios'

export default {
  data() {
    return {
      params:{
        name: '',
        mobile: '',
        sex: "",
        birthDay: '',
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
    this.getCityData()
  },
  methods:{
    save () {
      let params = this.params
      console.log(params)
    },
    // provinces () {
    //   Provinces().then(res=>{
    //     console.log(res)
    //   })
    // },
    getCityData () {
      var that = this
      getMapJson(that.mapJson).then(function(response){
        var data = response
        that.provinces = []
        that.citys = []
        that.regions = []
        // 省市区数据分类
        for (var item in data) {
          if (item.match(/0000$/)) {//省
            that.provinces.push({id: item, value: data[item], children: []})
          } else if (item.match(/00$/)) {//市
            that.citys.push({id: item, value: data[item], children: []})
          } else {//区
            that.regions.push({id: item, value: data[item]})
          }
        }
        // 分类市级
        for (var index in that.provinces) {
          for (var index1 in that.citys) {
            if (that.provinces[index].id.slice(0, 2) === that.citys[index1].id.slice(0, 2)) {
              that.provinces[index].children.push(that.citys[index1])
            }
          }
        }
        // 分类区级
        for(var item1 in that.citys) {
          for(var item2 in that.regions) {
            if (that.regions[item2].id.slice(0, 4) === that.citys[item1].id.slice(0, 4)) {
              that.citys[item1].children.push(that.regions[item2])
            }
          }
        }
      }).catch(function(error){console.log(typeof+ error)})
    },
    // 选省
    choseProvince (e) {
      for (var index2 in this.provinces) {
        if (e === this.provinces[index2].id) {
          this.citys = this.provinces[index2].children
          this.city = this.provinces[index2].children[0].value
          this.regions =this.provinces[index2].children[0].children
          this.region = this.provinces[index2].children[0].children[0].value
          this.E = this.regions[0].id
        }
      }
    },
    // 选市
    choseCity (e) {
      for (var index3 in this.citys) {
        if (e === this.citys[index3].id) {
          this.regions = this.citys[index3].children
          this.region = this.citys[index3].children[0].value
          this.E = this.regions[0].id
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock (e) {
      this.E=e;
      // console.log(this.E)
    }
  }
};
</script>
<style lang="sass" scoped>
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

