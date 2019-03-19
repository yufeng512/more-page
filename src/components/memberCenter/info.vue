<template>
    <div class="member-box">
        <img src="@/assets/memberCenter/logo.jpg" alt="">
        <div>
            <div class="info-item">
                <span>姓名:</span>
                <span>{{info.name}}</span>
            </div>
            <div class="info-item">
                <span>手机:</span>
                <span>{{info.mobile}}</span>
            </div>
            <div class="info-item">
                <span>性别:</span>
                <span>{{info.sex==1?'男':'女'}}</span>
            </div>
            <div class="info-item">
                <span>生日:</span>
                <span>{{info.birthday}}</span>
            </div>
            <div class="info-item">
                <span>住址:</span>
                <span>{{info.province}}</span>
            </div>
            <div class="info-item">
                <span>邮件:</span>
                <span>{{info.mail}}</span>
            </div>
            <div class="info-item">
                <span>等级:</span>
                <span>{{info.mobilegrade}}</span>
            </div>
            <div class="info-item">
                <span>积分:</span>
                <span>{{info.point}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { getMemberInfo } from '@/api/memberCenter/index'
export default {
    data () {
        return {
           info:{} 
        }
    },
    mounted () {
        let mobile = '15026970585'
        getMemberInfo(mobile).then(res=>{
            console.log(res)
            if(res.code == 0){
                this.info = res.data
            }
        })
    }
}
</script>

<style lang="sass" scoped>
.member-box
  padding: 10px 20px
  .card-code
    position: absolute
    width: 60px
    right: 40px
    top: 60px
  img
    width: 100%

.info-item
  padding: 20px 12px 8px
  border-bottom: 1px solid #dbdbdb
  display: flex
  justify-content: flex-start
  span
    color: #666666
    &:first-child
      width: 25%
</style>