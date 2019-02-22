<template>
    <div class="warpper">
        <p>{{params.active}}</p>
        <p>参与人手机号：{{params.mobile}}</p>
        <p>可领取礼包：{{params.gift}}</p>
        <div class="item-box">
            <el-button @click="getGift" type="primary" size="small">确认领取</el-button>
        </div>
    </div>
</template>
<script>

import {ListAvailable} from '@/api/write/index'
export default {
    data () {
        return {
            params:{
                active: '',
                mobile: '',
                gift: ''
            }
        }
    },
    mounted () {
        this.params = this.$route.params
    },
    methods:{
        getGift () {

        },
        getListAvailable() {
            ListAvailable().then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style>
.warpper{

}
.warpper p{
    text-align: center;
    margin: 10px 0;
}
.item-box{
  padding: 20px
}
.item-box input{
  width: 100%;
}
.item-box button{
  width: 100%;
  text-align: center;
}
</style>

