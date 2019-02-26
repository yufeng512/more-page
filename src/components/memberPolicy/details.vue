<template>
    <div class="register-box">
        <img src="@/assets/memberPolicy/logo.jpg" alt="">
        <div>
        <div class="info-item">
            <span>姓名</span>
            <span>{{name}}</span>
        </div>
        <div class="info-item">
            <span>手机号码</span>
            <span>{{mobile}}</span>
        </div>
        <div class="info-item">
            <span>生日</span>
            <span>{{birthday}}</span>
        </div>
        <div class="info-item">
            <span>性别</span>
            <span>{{gender==1?'男':'女'}}</span>
        </div>
        <div class="info-item">
            <span>省市区</span>
            <span>{{countryName}}</span>
        </div>
        <div class="info-item">
            <span>详细信息</span>
            <span>{{address}}</span>
        </div>
        </div>
        <button @click="changeInfo">修改我的信息</button>
    </div>
</template>
<script>
import { Login, ProvincesList, Cities, Districts,} from '@/api/memberPolicy/index'
export default {
    data () {
        return {
            name: '',
            mobile: '',
            gender: "",
            birthday: '',
            province: '',
            city: '',
            region: '',
            address:'',
            countryName: ''
        }
    },
    mounted() {
        this.name = localStorage.getItem("name")
        this.mobile = localStorage.getItem("mobile")
        this.gender = localStorage.getItem("gender")
        this.birthday = localStorage.getItem("birthday")
        this.province = localStorage.getItem("province")
        this.city = localStorage.getItem("city")
        this.region = localStorage.getItem("region")
        this.address = localStorage.getItem("address")
        this.getData(this.province,this.city,this.region)
    },
    methods:{
        changeInfo () {
            this.$router.push('userInfo')
        },
        getData (province,city,region) {
            let self = this,a='',b='',c=''
            ProvincesList().then(res=>{
                let obj = res.data.find(item=>{
                return item.code == province
                })
                a = obj.name
                Cities({provinceCode: province}).then(res=>{
                    let obj = res.data.find(item=>{
                        return item.code == city
                    })
                    b = obj.name
                    Districts({cityCode: city}).then(res=>{
                        let obj = res.data.find(item=>{
                            return item.code == region
                        })
                        c = obj.name
                        self.countryName = a+b+c
                    })
                })
            })
        },
    }
}
</script>
<style scoped>
.register-box img{
  width: 100%;
}
.register-box{
  padding: 10px;
}
.register-box button{
  background: #666666;
  color: #ffffff;
  border: none;
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
  margin-top: 20px;
  border-radius: 6px;
}
.info-item{
  padding: 15px 0;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: flex-start;
}
.info-item span:first-child{
  width: 30%;
}
</style>
