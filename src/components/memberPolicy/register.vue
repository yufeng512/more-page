<template>
  <div>
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
      $.ajax({ url:"http://172.21.11.23/api/member/mobile/code/send", type:"post", data: params,
        success:function(data){
          console.log(data);
          if(data.code==0){
            self.$message({
              message: data.msg,
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
      let params = {
        mobile: this.phone,
        code: this.code
      }
      
      if(!this.checked){
        this.$message({
          message: '请勾选隐私条款！',
          type: 'warning'
        });
        return false
      }
      CodeVerify(params).then(res=>{
        if(res.code == 0){
          this.$message({
            message: res.msg,
            type: 'warning'
          });
          setTimeout(function(){
            this.$router.push('userInfo')
          },1000)
        }
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

