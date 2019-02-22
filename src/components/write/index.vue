<template>
  <div>
    <div>
      <img src="" alt="">
    </div>
    <div class="item-box">
      <el-input v-model="baCode" placeholder="BA CODE" size="small"></el-input>
    </div>
    <div class="item-box">
      <el-button @click="login" type="primary" size="small">登录</el-button>
    </div>
  </div>
</template>
<script>
import {FindByCode} from '@/api/write/index'
export default {
  data () {
    return {
      baCode: ''
    }
  },
  methods: {
    login () {
      let self = this
      let params = self.baCode
      FindByCode(params).then(res=>{
        console.log(res)
        if(res.code==0){
          self.$router.push({name:'search',params:{code: self.baCode}})
        }else {
          self.$message({
            message: res.msg,
            type: 'fail'
          });
        }
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
.item-box input{
  width: 100%;
}
.item-box button{
  width: 100%;
  text-align: center;
}
</style>


