<template id="">
  <div class="loading-box">
    <!-- <div class='loader-ring'>
      <div class='loader-ring-light'></div>
      <div class='loader-ring-track'></div>
    </div> -->
    <div class="loadEffect">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  data () {
    return {
    }
  }
}
</script>
<style lang="css" rel="stylesheet/sass">
/* .loading-box
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 9999
  .loader-ring
    position: absolute
    top: 50%
    left: 50%
    margin: -30px 0 0 -30px
    width: 60px
    height: 60px
    border-radius: 50%
    background: rgba(0,0,0,.1)
    .loader-ring-light
      width: 60px
      height: 60px
      position: absolute
      top: 0px
      left: 0px
      // -moz-border-radius: 120px
      // -webkit-border-radius: 120px
      border-radius: 60px
      // -moz-box-shadow: 0 4px 0 #00abf2 inset
      // -webkit-box-shadow: 0 4px 0 #00abf2 inset
      box-shadow: 0 4px 0 #00abf2 inset
      animation: rotate-360 .8s linear infinite
    .loader-ring-track
      position: absolute
      top: 0px
      left: 0px
      width: 60px
      height: 60px
      z-index: 100000
      // -moz-border-radius: 120px
      // -webkit-border-radius: 120px
      border-radius: 60px
      // -moz-box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset
      // -webkit-box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset
      box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset
@keyframes rotate-360
  from
    // -moz-transform: rotate(0)
    // -ms-transform: rotate(0)
    // -webkit-transform: rotate(0)
    transform: rotate(0)
  to
    // -moz-transform: rotate(360deg)
    // -ms-transform: rotate(360deg)
    // -webkit-transform: rotate(360deg)
    transform: rotate(360deg) */
.loading-box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

}
.loadEffect{
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    margin-top:100px;
}
.loadEffect span{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #999999;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
}
@-webkit-keyframes load{
    0%{
        -webkit-transform: scale(.8);
        opacity: 1;
    }
    100%{
        -webkit-transform: scale(.3);
        opacity: 0.5;
    }
}
.loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-10px;
    -webkit-animation-delay:0.13s;
}
.loadEffect span:nth-child(2){
    left: 14px;
    top: 14px;
    -webkit-animation-delay:0.26s;
}
.loadEffect span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -10px;
    -webkit-animation-delay:0.39s;
}
.loadEffect span:nth-child(4){
    top: 14px;
    right:14px;
    -webkit-animation-delay:0.52s;
}
.loadEffect span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-10px;
    -webkit-animation-delay:0.65s;
}
.loadEffect span:nth-child(6){
    right: 14px;
    bottom:14px;
    -webkit-animation-delay:0.78s;
}
.loadEffect span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -10px;
    -webkit-animation-delay:0.91s;
}
.loadEffect span:nth-child(8){
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay:1.04s;
}

</style>