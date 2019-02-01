<template>
    <div class="warpper">
        <p>{{active}}</p>
        <p>参与人手机号：{{phone}}</p>
        <p>可领取礼包：{{gift}}</p>
        <div class="item-box">
            <el-button @click="getGift" type="primary" size="small">确认领取</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            active: '2018年*************活动',
            phone: '',
            gift: ''
        }
    },
    mounted () {
        this.active = '2018年'+this.$route.params.active+'活动'
        this.phone = this.$route.params.phone
    },
    methods:{
        getGift () {

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

