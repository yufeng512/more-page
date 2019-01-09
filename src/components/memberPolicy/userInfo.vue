<template>
  <div>
    <div></div>
    <div class="input-item">
      <span>姓名*</span>
      <div class="input-box">
        <el-input v-model="name" type="text" placeholder="请输入您的姓名" size="small"></el-input>
      </div>
    </div>
    <div class="input-item">
      <span>手机号码*</span>
      <div class="input-box">
        <el-input v-model="phone" type="number" placeholder="请输入您的手机号码" size="small"></el-input>
      </div>
    </div>
    <div class="input-item">
      <span>生日*</span>
      <div class="input-box">
        <el-date-picker
          v-model="birthDay"
          type="date"
          placeholder="请输入您的生日" 
          size="small">
        </el-date-picker>
      </div>
    </div>
    <div class="input-item">
      <span>性别*</span>
      <div class="input-box">
        <el-select v-model="sex" placeholder="请选择性别" size="small">
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
        <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" size="small">
          <el-option
            v-for="item in province"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select  v-model="shi" @change="choseCity" placeholder="市级地区" size="small">
          <el-option
            v-for="item in shi1"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="qu" @change="choseBlock" placeholder="区级地区" size="small">
          <el-option
             v-for="item in qu1"
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
        <input type="number" placeholder="请输入您的地址">
      </div>
    </div>
    <div class="btn-item flex-box">
      <button>提交信息</button>
    </div>
  </div>
</template>
<script>
import { getMapJson } from '@/api/memberPolicy/index'
import axios  from 'axios'

export default {
  data() {
    return {
      name: '',
      phone: '',
      sex: "",
      birthDay: '',
      sexList: [{ label: "男", value: 1 }, { label: "女", value: 0 }],
      mapJson: '../../static/json/map.json',
      province:'',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city:'',
      block:''
    };
  },
  mounted () {
    this.getCityData()
  },
  methods:{
    getCityData () {
      var that = this
      getMapJson(that.mapJson).then(function(response){
        var data = response
        that.province = []
        that.city = []
        that.block = []
        // 省市区数据分类
        for (var item in data) {
          if (item.match(/0000$/)) {//省
            that.province.push({id: item, value: data[item], children: []})
          } else if (item.match(/00$/)) {//市
            that.city.push({id: item, value: data[item], children: []})
          } else {//区
            that.block.push({id: item, value: data[item]})
          }
        }
        // 分类市级
        for (var index in that.province) {
          for (var index1 in that.city) {
            if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
              that.province[index].children.push(that.city[index1])
            }
          }
        }
        // 分类区级
        for(var item1 in that.city) {
          for(var item2 in that.block) {
            if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
              that.city[item1].children.push(that.block[item2])
            }
          }
        }
      }).catch(function(error){console.log(typeof+ error)})
    },
    // 选省
    choseProvince (e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children
          this.shi = this.province[index2].children[0].value
          this.qu1 =this.province[index2].children[0].children
          this.qu = this.province[index2].children[0].children[0].value
          this.E = this.qu1[0].id
        }
      }
    },
    // 选市
    choseCity (e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children
          this.qu = this.city[index3].children[0].value
          this.E = this.qu1[0].id
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

