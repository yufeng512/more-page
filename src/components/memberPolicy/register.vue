<template>
  <div>
    <div></div>
    <div class="input-item flex-box">
      <input type="number" v-model="phone" placeholder="请输入您的手机号码">
    </div>
    <div class="input-item flex-box">
      <input type="number" v-model="code" placeholder="请输入验证码">
      <button>获取验证码</button>
    </div>
    <div class="input-item flex-box">
      <input type="checkbox" v-model="checked"><p>我已阅读和了解普罗旺斯欧舒丹官方微信的<span>隐私条款</span>，并同意接受其中的所有条款。</p>
    </div>
    <div class="btn-item flex-box">
      <button @click="go">注册绑定</button>
    </div>
  </div>
</template>
<script>
import { MemberInsert } from '@/api/memberPolicy/index'

export default {
  data () {
    return {
      phone: '',
      code: '',
      checked: false
    }
  },
  methods: {
    go () {
      this.$router.push('userInfo')
    },
    regiter () {
      let params = {
        mobile: '',
      }
      MemberInsert(params).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.btn-item
  margin-top: 20px
  padding: 0 20px
  button
    outline: none
    border: #999999
    padding: 0 20px
    border-radius: 4px
    background: #999999
    color: #ffffff
    height: 32px
    flex: 1
.input-item
  margin-top: 20px
  padding: 0 20px
  input
    border: 1px solid #dbdbdb
    height: 30px
    line-height: 30px
    border-radius: 4px
    flex: 1 0 auto
    outline: none
    text-indent: 6px
    display: block
    font-size: 12px
  button
    outline: none
    border: #999999
    padding: 0 20px
    border-radius: 4px
    background: #999999
    color: #ffffff
    height: 32px
    margin-left: 10px
  p
    font-size: 12px
    margin-left: 6px
    span
      color: rgba(47,117,181,1)

</style>

