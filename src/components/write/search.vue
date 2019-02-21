<template>
  <div>
    <img src="../../assets/logo.png" alt="">
    <div class="item-box">
      <el-select v-model="value" placeholder="选择活动" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
    </div>
    <div class="item-box">
      <el-input v-model="phone" placeholder="参与人手机号" size="small"></el-input>
    </div>
    <div class="item-box">
      <el-button @click="search" type="primary" size="small">查询</el-button>
    </div>
  </div>
</template>
<script>
import {ListAvailable} from '@/api/write/index'
export default {
  data () {
    return {
      options: [
        { value: '选项1', label: '黄金糕' }, 
        { value: '选项2', label: '双皮奶' }, 
        { value: '选项3', label: '蚵仔煎' }, 
        { value: '选项4', label: '龙须面' }, 
        { value: '选项5', label: '北京烤鸭' }
        ],
      value: '',
      phone: ''
    }
  },
  mounted(){
    this.getListAvailable()
  },
  methods: {
    search () {
      this.$router.push({name: 'details', params: {active: this.value, phone:this.phone}})
    },
    getListAvailable() {
        ListAvailable().then(res=>{
            console.log(res)
        })
    }
  }
} 
</script>
<style>
.item-box{
  padding: 0 20px;
  margin: 20px 0;
}
.item-box input,
.item-box .el-select,
.item-box button{
  width: 100%;
}
</style>
