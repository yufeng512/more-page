<template>
<div>
  <div class="img-box">
    <img src="@/assets/brandStory/1.jpg" alt="">
    <img src="@/assets/brandStory/2.jpg" alt="">
    <img src="@/assets/brandStory/3.jpg" alt="">
    <img src="@/assets/brandStory/4.jpg" alt="">
    <img src="@/assets/brandStory/5.jpg" alt="">
    <div class="video-box">
      <video src="@/assets/brandStory/brand.mp4" controls="controls"></video>
    </div>
    <img src="@/assets/brandStory/6.jpg" alt="">
  </div>
  <div class="img-box" @click="go">
    <img src="@/assets/brandStory/7.jpg" alt="">
  </div>
</div>
</template>
<script>
export default {
  methods: {
    go () {
      this.$router.push('brandStory')
    }
  }
}
</script>
<style scoped>
.img-box img{
  width: 100%;
}
.video-box{
  padding: 0 20px;
}
.video-box video{
  width: 100%;
}
</style>


