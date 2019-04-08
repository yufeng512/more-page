<template>
  <div>
      <div class="banner-box">
          <img src="@/assets/memberCenter/logo.jpg" alt="">
      </div>
      <div>
          <div class="coupon-box">
              <div>
                  <h4>端午优惠券</h4>
                  <p>分值：1200</p>
                  <div class="number-box">
                    <el-input-number v-model="num1" @change="handleChange"  size="small" :min="1" :max="10" label="描述文字"></el-input-number>
                  </div>
              </div>
              <div class="btn-box" @click="use">
                  <button>立即兑换</button>
              </div>
          </div>   
      </div>
  </div>
</template>
<script>
import { getMemberScoreQuery } from '@/api/pointShop/index'
export default {
    data () {
        return {
            num1: ''
        }
    },
    methods:{
        getMemberPoint(no) {
            getMemberScoreQuery(no).then((res)=>{

            })
        },
        handleChange () {
            
        },
        use () {
        }
    },
    mounted () {
        // let no = localStorage.getItem("memberCode")
        // this.getMemberPoint(no)
        // this.getMemberPoint('CNL000000451')
    }
}
</script>
<style lang="sass" scoped>
.banner-box
  height: 120px
  overflow: hidden
  img
    width: 100%
.coupon-box
  margin-top: 20px
  padding: 15px 20px
  h4
    font-size: 16px
    margin-bottom: 20px
  h4,p
    height: 32px
    line-height: 32px
  p
    margin-top: 20px
    color: #666666
    font-size: 14px
  button
    margin-top: 20px
    border-radius: 4px
    width: 100%
    height: 32px
    line-height: 32px
    outline: none
    border: 1px solid #dbdbdb
.number-box
  width: 120px
  .el-input-number
    width: 100%
    
</style>
