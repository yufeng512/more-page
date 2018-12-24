<template>
<div>
  <div class="img-box">
    <img src="@/assets/brandStory/1.jpg" alt="">
    <img src="@/assets/brandStory/2.jpg" alt="">
    <img src="@/assets/brandStory/3.jpg" alt="">
    <img src="@/assets/brandStory/4.jpg" alt="">
    <img src="@/assets/brandStory/5.jpg" alt="">
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
</style>


