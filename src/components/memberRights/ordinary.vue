<template>
    <div class="img-box">
      <img src="@/assets/memberRights/ordinary.png" alt="">
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
.video-box video{
  width: 100%;
}
</style>


