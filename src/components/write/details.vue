<template>
    <div class="warpper">
        <div>
            <div class="info">
                <p>{{campaignName}}</p>
                <p>参与人手机号：{{mobile}}</p>
                <p>可领取礼包：{{giftName||''}}</p>
            </div>
            <div class="item-box" v-if="campaignStatus==0">
                <el-button @click="getGift" type="primary" size="small">确认领取</el-button>
            </div>
            <div class="item-box" v-if="campaignStatus==1">
                <el-button @click="goSearch" type="info" size="small">已领取,返回</el-button>
            </div>
            <div class="item-box" v-if="mobileAdd==1">
                <el-button @click="addPhone" type="warning" size="small">添加手机号至此活动</el-button>
            </div>
        </div>
        <div class="popup" v-if="isShow">
            <div class="content" v-if="current==1">
                <div class="select-box">
                    <el-select v-model="channel" placeholder="选择渠道" size="small">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="btn-group">
                    <el-button @click="confirm" type="warning" size="small">确定</el-button>
                    <el-button @click="concal" type="info" size="small">取消</el-button>
                </div>
            </div>
            <div class="content" v-if="current==2">
                <div class="tip-box">
                    <p>已成功核销</p>
                    <el-button @click="goSearch" type="warning" size="small">确定</el-button>
                </div>
            </div>
            <div class="content" v-if="current==3">
                <div class="tip-box">
                    <p>已成功添加并领取完成</p>
                    <el-button @click="goSearch" type="warning" size="small">确定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import {ListAvailable, Verify, AddMobile} from '@/api/write/index'
export default {
    data () {
        return {
            isGet: true,
            campaignName: '',
            mobile: '',
            giftName: '',
            mobileAdd: '',
            id: '',
            options: [],
            channel: '',
            isShow:false,
            current: 0,
            campaignStatus: '',
            detail: {},
            campaign: {}
        }
    },
    mounted () {
        if(this.$route.params.detail){
            this.detail = this.$route.params.detail
            this.giftName = this.detail.giftName
        }
        this.campaign = this.$route.params.campaign
        
        this.campaignName = this.campaign.campaignName
        this.mobile = this.campaign.mobile
        this.campaignStatus = this.campaign.campaignStatus
        this.id = this.campaign.id
        this.mobileAdd = this.campaign.mobileAdd
        this.getListAvailable()
    },
    methods:{
        getGift () {
            let self = this
            Verify(self.id).then(res=>{
                if(res.code==0){
                    this.isShow = true
                    this.current = 2
                }else {
                    self.$toast(res.msg||'核销成功');
                    setTimeout(()=>{
                        self.goSearch()
                    },1500)
                }
            })
        },
        getListAvailable() {
            ListAvailable().then(res=>{
                console.log(res)
                let obj = []
                res.data.forEach(item => {
                    obj.push({
                        text: item.channelNames,
                        value: item.channelIds,
                        id: item.id,
                    })
                });
                this.options = obj
            })
        },
        addPhone () {
            this.isShow = true
            this.current = 1
        },
        goSearch () {
            this.$router.push('search')
        },
        confirm(){
            let self = this
            let params = {
                campaignId: self.id,
                baCode: localStorage.getItem('baCode'),
                mobile: self.mobile,
                channelId: self.channel,
            }
            $.ajax({ url: process.env.BASE_API+"mobile/campaignDetail/addMobile", type:"post", data: params,
            success:function(res){
                if(res.code==0){
                    self.isShow = true
                    self.curren = 3
                }else {
                    self.goSearch()
                }
            },
            error:function(e){
                self.$toast(e)
            }
        })
        },
        concal () {
            this.isShow = false
        }
    }
}
</script>
<style scoped>
button{
    display: inline;
    width: 120px;
}
.popup{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0,0,0,0.7);
}
.content{
    width: 80%;
    margin-left: 10%;
    margin-top: 50%;
    height: 160px;
    padding: 5px 0 10px;
    background: #ffffff;
    border-radius: 4px;
}
.info p{
    text-align: center;
    margin: 10px 0;
}
.tip-box{
    text-align: center;
    padding: 20px 0 0
}
.tip-box p {
    margin-bottom: 20px;
}
.content p{
    color: #666666;
    text-align: center
}
.warpper p{
    text-align: center;
    margin: 10px 0;
}
.select-box{
    padding: 25px 20px;
}
.select-box .el-select{
    width: 100%;
}
.btn-group{
    margin-top: 30px;
    text-align: center
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

