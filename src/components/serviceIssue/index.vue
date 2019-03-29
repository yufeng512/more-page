<template>
    <div class="issue-box">
        <img class="logo-box" src="@/assets/logo_wx.png" alt="">
        <p>欧舒丹会员调查评价</p>
        <div class="btn-box">
          <el-button type="primary" @click="submit">点击进入</el-button>
        </div>
    </div>
</template>
<script>
import { getMemberScoreQuery } from '@/api/memberCenter/index'
export default {
    data () {
        return {
        }
    },
    methods:{
        submit () {
          this.$router.push('questionnaire')
        }
    },
    mounted () {
    }
}
</script>
<style lang="sass" scoped>
.el-radio,
.el-checkbox
  margin: 15px 0
  display: block
.issue-box
  height: 100%
  background-size: cover
  background-repeat: no
  background-image: url(../../assets//quest_bg.png)
  p
    padding-top: 12.25rem
    font-size: 2rem
    width: 100%
    font-weight: 300
    text-align: center
    color: #f8bc32
    line-height: 1.2rem
    padding-bottom: 0.675rem
    background: url(../../assets/border_quest.png) no-repeat bottom
    background-size: 13.325rem 1px
  .logo-box
    width: 50%
    margin-left: 25%
    padding-top: 2.9rem
  .btn-box 
    margin-top: 5.1rem
    text-align: center
    button
      width: 72%
      border: none
      background: #f8bc32

</style>

