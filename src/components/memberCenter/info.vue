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
            <div class="info-item" >
                <span>等级:</span>
                <span>{{info.gradeDesc}}</span>
            </div>
            <div class="info-item">
                <span>会员积分:</span>
                <span>{{info.point?info.point:0}}</span>
            </div>
            <div class="info-item" >
                <span>天猫积分:</span>
                <span>{{info.tmallPoint?info.tmallPoint:'0'}}</span>
            </div>
            <div class="info-item">
                <span>省市区:</span>
                <span>{{info.province+info.city+info.region}}</span>
            </div>
            <div class="info-item">
                <span>详细地址:</span>
                <span>{{info.memberAddress}}</span>
            </div>
        </div>
        <div class="change-btn">
            <button  @click="changeInfo">修改我的信息</button>
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
        changeInfo() {
            this.$router.push({name:'userInfo',params:{mobile: this.info.mobile}})
        },
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
      width: 30%
    &:last-child
      width: 70%
.change-btn
  button
    outline: none
    border: #999999
    padding: 0 20px
    border-radius: 4px
    background: #999999
    color: #ffffff
    font-size: 14px
    width: 100%
    height: 32px
    margin-top: 10px
</style>