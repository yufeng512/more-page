<template>
    <div class="map-warpper">
        <div class="map-box" id="map">
        </div>
        <div class="panel-box">
            <div class="panel-item" v-for="(item,index) in panelList" :key="index" @click="infohtmlset(item,index)">
                <div class="logo-box">
                    <img src="@/assets/logo.jpg" alt="">
                </div>
                <div class="text-box">
                    <h2>{{item.counterName}}</h2>
                    <p>{{item.address}}</p>
                    <div class="tag">
                        <span v-show="item.phone">{{item.phone}}</span>
                        <span v-show="item.businessHour">{{item.businessHour}}</span>
                        <!-- <span v-show="item.distance">{{item.distance}}米</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="select-box" @click="choiceArea">
            <div class="img-box"><img src="@/assets/address.png" alt=""></div>
            <input placeholder="请选择省市" type="text" readonly disabled v-model="areaText">
        </div>
        <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade" class="mint-popup-4">
            <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
            </div>
            <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="5"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import { CurrentCity, getCounterList, Provinces, Cities} from '@/api/storeSearch/index'
import { GetCardSign } from '@/api/memberPolicy'
var local,
    map,
    infoWindow,
    address = {}
export default {
    name: 'store',
    data() {
        return {
            panelList: [],
            currentLocation: '',
            searchWord: '',
            areaText: '',
            title: '',
            address: '',
            detailUrl: '',
            popupVisible: false,
            latitude: '',
            longitude: '',
            targetLatitude: '',
            targetLongitude: '',
            citySlots: [{
                flex: 1,
                values: Object.keys(address),
                className: 'slot1',
                textAlign: 'center'
            }, {
                divider: true,
                content: '-',
                className: 'slot2'
            }, {
                flex: 1,
                values: Object.values(address)[0],
                className: 'slot3',
                textAlign: 'center'
            }],
            areaList: {
            }
        }
    },
    created(){ 
    },
    mounted(){
        let self = this
        
        setTimeout(()=>{
            map = new BMap.Map("map",{enableMapClick:false });
            let geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    // alert(77777)
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    self.latitude = r.point.lat
                    self.longitude = r.point.lng
                    // console.log('您的位置：'+r.point.lng+','+r.point.lat);
                    let params = {
                        longitude:self.longitude,
                        latitude:self.latitude
                    }
                    self.getCurrentCity(params)
                }else {
                    alert('您的浏览器不支持地图定位')
                }
            },{enableHighAccuracy: false})
            // GetCardSign(localStorage.getItem('memberCode')).then(res=>{
            //     // alert('res'+JSON.stringify(res))
            //     wx.config({
            //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //         appId: 'wx60671049a2f3e0f4', // 必填，公众号的唯一标识
            //         timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            //         nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            //         signature: res.data.signature,// 必填，签名
            //         jsApiList: ['ready','getLocation'] // 必填，需要使用的JS接口列表
            //     });
            //     wx.ready(function(){
            //         wx.getLocation({
            //             type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //             success: function (r) {
            //                 alert(JSON.stringify(r))
            //                 self.latitude = r.latitude; // 纬度，浮点数，范围为90 ~ -90
            //                 self.longitude = r.longitude; // 经度，浮点数，范围为180 ~ -180。
            //                 let params = {
            //                     longitude:self.longitude,
            //                     latitude:self.latitude
            //                 }
            //                 self.getCurrentCity(params)
            //             },
            //             fail: function (e) {
            //             alert('fail') 
            //             },
            //             complete: function () {
            //                 alert('complete')
            //             },
            //             cancel: function () {
            //                 alert('cancel')
            //             }
            //         })
            //     })
            // })
        },600)
    },
    methods: {
        getCurrentCity (params) {
            CurrentCity(params).then((res)=>{
                console.log(res.data)
                this.currentLocation = res.data.name
                this.areaText = res.data.name
                this.doSearch()
                this.counterList()
            })
        },
        counterList () {
            let params = {
                    longitude:this.longitude,
                    latitude:this.latitude,
                    city: this.currentLocation
                }
            // alert('params'+JSON.stringify(params))
            getCounterList(params).then(res=>{
                // alert('res'+JSON.stringify(res))
                console.log(res.data)
                res.data.forEach(item=>{
                    let option = { lat: item.latitude, lng: item.longitude }
                    let point = new BMap.Point(option.lng, option.lat)
                    let marker = new BMap.Marker(point);
                    map.addOverlay(marker);
                })
                this.panelList = res.data
                
            })
        },
        getProvinces() {
            let obj={}
            Provinces().then((res)=>{ 
                res.data.forEach((item)=>{
                    Cities({province:item.text}).then(r=>{
                        let arr = []
                        r.data.forEach((i)=>{ arr.push(i.text) })
                        obj[item.text] =arr
                        address = obj
                        this.citySlots[0].values = Object.keys(address)
                        this.citySlots[2].values = Object.values(address)[0]
                    })
                })
            })
        },
        choiceArea () {
            this.popupVisible = true
            this.getProvinces()
        },
        cancleaddress () {
            this.popupVisible = false
        },
        selectaddress () {
            this.popupVisible = false
            this.doSearch()
            this.counterList()
        },
        onCityChange (picker, values) {
            console.log(picker, values)
            picker.setSlotValues(1, address[values[0]])
            this.areaText = values[1]
            this.currentLocation = values[1]
        },
        doSearch () {
            map.centerAndZoom(this.currentLocation,11);  //设置地图的中心点：
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            map.setCurrentCity(this.currentLocation); // 设置地图显示的城市
            let option = { map:map, autoViewport:false, selectFirstResult: false }
            local = new BMap.LocalSearch(map,{ renderOptions:option});
        },
        infohtmlset(item,index) {
            this.targetLatitude = item.latitude
            this.targetLongitude = item.longitude
            this.infoWindow(item,index)
        },
        infoWindow (item,index) {
            let option = { lat: item.latitude, lng: item.longitude }
            let point = new BMap.Point(option.lng, option.lat)
            let marker = new BMap.Marker(point)
            map.addOverlay(marker)
            map.centerAndZoom(point,11)
            let opts ={
                width :250,
                minHeight:45,
            }
            let sContent =  `<div style="font-size:14px">欧舒丹精品店</div><div style="margin: 6px 0;color:#333;font-size:14px;">`+item.counterName+ `</div><div style="font-size:12px;color:#666;">`+item.address +`</div>`
                            // `</span><a style="font-size:14px;margin-left:15px;text-decoration:underline;color:#3d6dcc;" href="https://api.map.baidu.com/direction?origin=latlng:`+this.latitude+`,`+this.longitude+`|name:我的位置&destination=`+item.address+`&mode=driving&region=`+this.currentLocation+`&output=html&src=webapp.baidu.openAPIdemo'">到这里去</a></div>`
            console.log(sContent)
            infoWindow =new BMap.InfoWindow(sContent,opts);// 创建信息窗口对象
            infoWindow.disableCloseOnClick()
            marker.addEventListener("click",function(){
                map.openInfoWindow(infoWindow,point);
            });
            console.log(infoWindow)
            map.enableScrollWheelZoom(true);
            map.openInfoWindow(infoWindow, map.getCenter());//开启信息窗口
        },
        goDetails () {
            // alert(this.address)
            console.log(this.currentLocation)
            location.href = 'https://api.map.baidu.com/direction?origin=latlng:'+this.latitude+','+this.longitude+'|name:我的位置&destination='+this.address+'&mode=driving&region='+this.currentLocation+'&output=html&src=webapp.baidu.openAPIdemo'
        },
        handler (e) {
            e.preventDefault();
        }	
    },
    watch: {
        popupVisible(val) {
            if (val) {
                document.addEventListener('touchmove', this.handler, false)
            } else {
                document.removeEventListener('touchmove', this.handler, false)
            }
        }  
    }
}
</script>
<style scoped>
.img-box img{
  width: 100%;
}
.map-warpper{
    height: 100%;
    position: relative;
}
.map-box{
    position: absolute;
    width: 100%;
    height: 40vh;
    z-index: 2;
}
.select-box{
    position: fixed;
    left: 4%;
    top: 10px;
    z-index: 99;
    width: 92%;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    background: #ffffff;
    height: 32px;
    display: flex;
    align-self: center;
}
.select-box .img-box{
    width: 12px;
    padding-top: 8px; 
    margin: 0 10px
}
.select-box input{
    margin-top: 7px;
    height: 18px;
    text-indent: 10px;
    font-size: 14px;
    color: #333333;
    background: none;
    border-left: 1px solid #dbdbdb;
}
.select-box::before{
    content: '';
    width: 0;
    height: 0;
    right: 10px;
    top: 14px;
    border-top: 5px solid #333333; 
    border-left: 5px solid transparent; 
    border-right: 5px solid transparent; 
    position: absolute;
}
.el-cascader{
    margin: 10px;
    display: block;
}
.map {
    width: 100%;
    height: 40vh;
}
.panel-box{
    position: absolute;
    height: 60vh;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #ffffff;
    z-index: 3;
    overflow: auto;
}
.panel-item{
    display: flex;
    padding: 10px;
    border-bottom: 1px dotted #dbdbdb;
}
.panel-item img{
    display: block;
    width: 60px;
}
.active{
    background: #e9e9e9;
}
.text-box{
    margin-left: 10px;
}
.text-box h2{
    color: #333333;
    font-size: 14px;
}
.text-box p{
    margin:4px 0  4px;
    line-height: 18px;
    color: #333333;
    font-size: 12px;
}
.tag{
    background: #eee;
    padding: 4px;
    border-radius: 4px;
}
.tag span{
    font-size: 12px
}
.anchorBL{
    display: none;
}
.mint-popup-4{
    width: 100%;
}
.address{
    margin: 6px 0;
}
.tpl{
    position: absolute;
    bottom: 0
}
</style>


