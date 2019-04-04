<template>
    <!-- <div>即将上线,敬请期待...</div> -->
    <div>
        <div class="banner-box">
            <img src="@/assets/memberCenter/logo.jpg" alt="">
        </div>
        <div>
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="item.name" v-for="(item, index) in tags" :key="index">
                    <div class="list-box" v-if="couponList.length>0">
                        <div class="list-item flex-btw" v-for="(item,index) in couponList" :key="index">
                            <div>
                                <h4>{{item.couponName}}</h4>
                                <p>有效期：{{item.beginDate}}-{{item.endDate}} </p>
                            </div>
                            <div class="btn-box" @click="use(item.id)">
                                <button>立即兑换</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>当前没有卡券</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { getMemberScoreQuery } from '@/api/pointShop/index'
export default {
    data () {
        return {
            tags:[ {name:'1-1000'}, {name:'1001-3000'}, {name:'3000以上'}],
            couponList: [
                {id: '1',couponName:'端午优惠券',beginDate:'2019-06-01' ,endDate:'2019-06-15'},
                {id: '2',couponName:'七夕优惠券',beginDate:'2019-07-01' ,endDate:'2019-07-15'},
            ],
            activeName: ''
        }
    },
    methods:{
        getMemberPoint(no) {
            getMemberScoreQuery(no).then((res)=>{

            })
        },
        handleClick () {
            
        },
        use (id) {
            this.$router.push('exchangeDetail/'+id)
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
.list-item
  padding: 15px 0
  border-bottom: 1px solid #dbdbdb
  h4
    font-size: 16px
  h4,p
    height: 32px
    line-height: 32px
  p
    color: #666666
    font-size: 14px
    
    
</style>
