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
import $ from 'jquery'
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
                alert('积分'+JSON.stringify(res))
                this.pointList = res
            })
        },
        isLogin (){
            let self = this
            let code = self.UrlSearch()
            self.code = code
            let params ={
                code: code
            }
            $.ajax({ url: process.env.BASE_API+"mobile/auth/login", type:"post", data: params,
                success:function(res){
                    alert(JSON.stringify(res))
                    if(res.code==0){
                        localStorage.setItem("openId",res.data.openId)
                        localStorage.setItem("unionId",res.data.unionId)
                        if(res.data.member){
                            localStorage.setItem("memberCode",res.data.member.memberCode)
                            self.getMemberPoint(res.data.member.memberCode)
                        }
                    }else {
                        self.getMemberPoint(localStorage.getItem("memberCode"))
                    }
                },
                error:function(e){
                    console.log(e)
                }
            })
        },
        UrlSearch() {
            var name,value;
            var str=location.href; //取得整个地址栏
            var num=str.indexOf("?")
            str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
            var arr=str.split("&"); //各个参数放到数组里
            for(var i=0;i < arr.length;i++){
                num=arr[i].split("=");
                if(num[0]=='code'){
                value = num[1]
                }
            }
            return value
        }
    },
    mounted () {
        this.isLogin()
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

