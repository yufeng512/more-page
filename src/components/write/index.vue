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
      if(self.baCode==''){
        self.$toast('请输入baCode');
        return false
      }
      FindByCode(params).then(res=>{
        console.log(res)
        if(res.code==0){
          self.$toast(res.msg||'查询成功');
          setTimeout(()=>{
            localStorage.setItem('baCode',self.baCode)
            self.$router.push({name:'search',params:{code: self.baCode}})
          },1000)
        }else {
          self.$toast(res.msg||'失败');
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


