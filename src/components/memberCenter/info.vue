<template>
    <div class="member-box">
        <img src="@/assets/memberCenter/logo.jpg" alt="">
        <div>
            <div class="info-item" >
                <span>姓名:</span>
                <span>{{info.name}}</span>
            </div>
            <div class="info-item">
                <span>手机:</span>
                <span>{{info.mobile}}</span>
            </div>
            <div class="info-item" >
                <span>性别:</span>
                <span>{{info.sex==1?'男':'女'}}</span>
            </div>
            <div class="info-item">
                <span>生日:</span>
                <span>{{info.birthday}}</span>
            </div>
            <div class="info-item">
                <span>省市区:</span>
                <span>{{info.province+info.city+info.region}}</span>
            </div>
            <div class="info-item">
                <span>详细地址:</span>
                <span>{{info.memberAddress}}</span>
            </div>
            <div class="info-item" >
                <span>邮件:</span>
                <span>{{info.mail}}</span>
            </div>
            <div class="info-item" >
                <span>等级:</span>
                <span>{{info.gradeDesc}}</span>
            </div>
            <div class="info-item">
                <span>积分:</span>
                <span>{{info.point}}</span>
            </div>
            <div class="info-item" >
                <span>天猫积分:</span>
                <span>{{info.tmallPoint}}</span>
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
    methods: {
        getMobileInfo(mobile){
            getMemberInfo(mobile).then(res=>{
                // alert(JSON.stringify(res))
                if(res.code == 0){
                    this.info = res.data
                }
            })

        }
    },
    mounted () {
        // let mobile = '13818645674'
        // this.getMobileInfo(mobile)
        this.getMobileInfo(localStorage.getItem("mobile"))
    }
}
</script>

<style lang="sass" scoped>
.member-box
  padding: 10px 15px
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