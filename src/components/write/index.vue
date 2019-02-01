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
export default {
  data () {
    return {
      baCode: ''
    }
  },
  methods: {
    login () {
      this.$router.push('search')
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


