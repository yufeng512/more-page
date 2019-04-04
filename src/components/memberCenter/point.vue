<template>
    <div>即将上线,敬请期待...</div>
</template>
<script>
import { getMemberScoreQuery } from '@/api/pointShop/index'
export default {
    data () {
        return {
            
        }
    },
    methods:{
        getMemberPoint(no) {
            getMemberScoreQuery(no).then((res)=>{

            })
        }
    },
    mounted () {
        // let no = localStorage.getItem("memberCode")
        // this.getMemberPoint(no)
        // this.getMemberPoint('CNL000000451')
    }
}
</script>
