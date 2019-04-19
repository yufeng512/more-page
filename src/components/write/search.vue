<template>
  <div>
    <div class="item-box">
      <el-select v-model="value" placeholder="选择活动" size="small">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.text"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="item-box">
      <el-input v-model="mobile" placeholder="参与人手机号" size="small"></el-input>
    </div>
    <div class="item-box">
      <el-button @click="search" type="primary" size="small">查询</el-button>
    </div>
  </div>
</template>
<script>
import {ListAvailable, Query} from '@/api/write/index'
export default {
  data () {
    return {
      options: [],
      value: '',
      mobile: '',
      baCode: ''
    }
  },
  mounted(){
    this.baCode = localStorage.getItem('baCode')
    this.getListAvailable()
  },
  methods: {
    isPoneAvailable(str) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    search () {
      let params = {
        baCode: this.baCode,
        mobile: this.mobile,
        campaignId: this.value
      }
      if(this.value == ''){
        this.$toast('请选择活动');
        return false
      }else if(!this.isPoneAvailable(this.mobile)){
        this.$toast('请输入有效的11位手机号码');
        return false
      } 
      Query(params).then(res=>{
        console.log(res)
        let obj = res.data.campaign
        if(res.code == 0){
          if(res.data.detail){
            this.$router.push({name:'details',params: res.data})
          }else {
            this.$toast('该用户没有参与活动');
          }
        }
      })
    },
    getListAvailable() {
      ListAvailable().then(res=>{
        console.log(res)
          let obj = []
          res.data.forEach(item => {
            obj.push({
              text: item.campaignName,
              value: item.campaignStatus,
              id: item.id,
            })
          });
          this.options = obj
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
