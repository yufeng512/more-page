<template>
    <div class="point-box">
        <div v-if="pointList.length>0">
            <div class="point-item" v-for="(item,index) in pointList" :key="index">
                <h4>{{item.storeName}}</h4>
                <p class="flex-btw"><span>积分：{{item.score}}</span><span>交易时间：{{item.transDate}}</span></p>
            </div>
        </div>
        <div v-else>
            <p>当前没有积分历史</p>
        </div>
    </div>
</template>
<script>
import { getMemberScoreQuery } from '@/api/memberCenter/index'
export default {
    data () {
        return {
            pointList: []
        }
    },
    methods:{
        getMemberPoint(no) {
            getMemberScoreQuery(no).then((res)=>{
                this.pointList = res
            })
        }
    },
    mounted () {
        let no = localStorage.getItem("memberCode")
        // alert(no)
        this.getMemberPoint(no)
    }
}
</script>
<style lang="sass" scoped>
.point-box
  padding: 0 15px
  .point-item
    border-bottom: 1px solid #dbdbdb
    padding: 10px 10px 
    color: #666666
    h4
      font-size: 16px
      padding: 10px 0 15px
    p
      font-size: 14px
</style>

