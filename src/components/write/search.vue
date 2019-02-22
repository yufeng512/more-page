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
    this.baCode = this.$route.params.code
    this.getListAvailable()
  },
  methods: {
    search () {
      let params = {
        baCode: this.baCode,
        mobile: this.mobile,
        campaignId: this.value
      }
      Query(params).then(res=>{
        console.log(res)
        let obj = res.data.campaign
        if(res.code == 0){
          this.$router.push({name: 'details', params: {active: obj.campaignName, mobile:this.mobile}})
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
