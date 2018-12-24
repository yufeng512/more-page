<template>
<div>
  <div class="img-box">
    <img src="@/assets/memberPolicy/1.jpg" alt="">
    <img src="@/assets/memberPolicy/2.jpg" alt="">
    <img src="@/assets/memberPolicy/3.jpg" alt="">
    <img src="@/assets/memberPolicy/4.jpg" alt="">
  </div>
  <div class="img-box" @click="go">
    <img src="@/assets/memberPolicy/5.jpg" alt="">
  </div>
</div>
</template>
<script>
export default {
  methods: {
    go () {
      this.$router.push('register')
    }
  }
}
</script>
<style scoped>
.img-box img{
  width: 100%;
}
</style>

