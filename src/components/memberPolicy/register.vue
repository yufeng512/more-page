<template>
  <div>
    <div class="register-box">
      <img src="@/assets/memberPolicy/logo.jpg" alt="">
    </div>
    <div class="input-item flex-box">
      <input type="number" v-model="phone" placeholder="请输入您的手机号码">
    </div>
    <div class="input-item flex-box">
      <input type="number" v-model="code" placeholder="请输入验证码">
      <button @click="getCode">获取验证码</button>
    </div>
    <div class="input-item flex-box">
      <input type="checkbox" v-model="checked"><p>我已阅读和了解普罗旺斯欧舒丹官方微信的<span>隐私条款</span>，并同意接受其中的所有条款。</p>
    </div>
    <div class="btn-item flex-box">
      <button @click="regiter">注册绑定</button>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { MemberInsert, Send,CodeVerify } from '@/api/memberPolicy/index'
import { Message } from 'element-ui'


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
      // this.$router.push('userInfo')
    },
    getCode () {
      let self = this
      let params = {
        mobile: this.phone
      }
      if(this.phone==''){
        this.$message({
          message: '请输入正确的手机号码！',
          type: 'warning'
        });
        return false
      }
      $.ajax({ url:process.env.BASE_API+"mobile/code/send", type:"post", data: params,
        success:function(data){
          // alert(JSON.stringify(data))
          if(data.code==0){
            self.$message({
              message: '获取成功',
              type: 'success'
            });
          }
        },
        error:function(e){
          console.log("错误！！");
        }
      })
    },
    regiter () {
      let self = this
      let params = {
        mobile: self.phone,
        code: self.code
      }
      if(this.phone==''){
        this.$message({
          message: '请输入正确的手机号码！',
          type: 'warning'
        });
        return false
      } else if(this.code==''){
        this.$message({
          message: '请输入验证码！',
          type: 'warning'
        });
        return false
      }
      if(!self.checked){
        self.$message({
          message: '请勾选隐私条款！',
          type: 'warning'
        });
        return false
      }
      CodeVerify(params).then(res=>{
        // alert(JSON.stringify(res))
        if(res.code == 0){
          self.$message({
            message: res.msg,
            type: 'success'
          });
          setTimeout(function(){
            self.$router.push({name:'userInfo',params:{mobile: self.mobile}})
          },1000)
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.register-box img
  width: 100%
.register-box
  padding: 10px

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

