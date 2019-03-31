<template>
    <div>敬请期待...</div>
</template>
<script>
import { getMemberScoreQuery } from '@/api/memberCenter/index'
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
        let no = localStorage.getItem("memberCode")
        this.getMemberPoint(no)
    }
}
</script>
