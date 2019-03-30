<template>
  <div class="warpper">
    <div class="img-box">
      <img src="@/assets/memberRights/bg.png" alt="">
    </div>
    <div class="img-btn" >
      <img src="@/assets/memberRights/ordinary-btn.png" alt="" @click="go('ordinary')">
      <img src="@/assets/memberRights/silverCard-btn.png" alt="" @click="go('silverCard')">
      <img src="@/assets/memberRights/goldCard-btn.png" alt="" @click="go('goldCard')"> 
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    go (str) {
      this.$router.push(str)
    }
  }
}
</script>
<style scoped>
.warpper{
  height: 100%;
  background: #ffffff
}
.img-btn img,
.img-box img{
  width: 100%;
}
.img-btn{
  width: 60%;
  margin-left: 20%;
}
.img-btn img{
  margin: 10px 0;
}
</style>


