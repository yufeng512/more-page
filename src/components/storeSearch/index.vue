<template>
    <div class="map-warpper">
        <div class="map-box" id="map">
        </div>
        <div class="panel-box">
            <div class="panel-item" :class="{'active':current == index}" v-for="(item,index) in panelList" :key="index" @click="infohtmlset(item,index)">
                <div class="logo-box">
                    <img src="@/assets/logo.jpg" alt="">
                </div>
                <div class="text-box">
                    <h2>{{item.title}}</h2>
                    <p>{{item.address}}</p>
                    <div class="tag">
                        <span>{{item.phoneNumber}}</span>
                        <span>{{item.distance}}KM</span>
                        <span></span>
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
        <div v-show="false">
            <div id='redituser'>
                <h4 style='font-size:14px'>{{title}}</h4>
                <p style='margin:6px 0;font-size:12px;color:#666666;'>{{address}}</p>
                <button @click='goDetails' style='color:#666666;font-size:12px;'>到这里去</button>
            </div>
        </div>
    </div>
</template>
<script>
import { getCurrentCity, getCounterList, Provinces, Cities} from '@/api/storeSearch/index'
var local,
    map,
    address = {}
export default {
    name: 'store',
    data() { 
        return {
            current: 0,
            panelList: [],
            currentLocation: '',
            searchWord: '欧舒丹精品店',
            areaText: '',
            title: '',
            address: '',
            detailUrl: '',
            popupVisible: false,
            latitude: '',
            longitude: '',
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
        this.getCurrentCity()
    },
    mounted(){
        
        var options = {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 1
        }
        setTimeout(()=>{
            map = new BMap.Map("map",{enableMapClick:false });
            let geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    this.map.addOverlay(mk);
                    this.map.panTo(r.point);
                    this.longitude = r.point.lng
                    this.latitude = r.point.lat
                    console.log('您的位置：'+r.point.lng+','+r.point.lat);
                }else {
                    console.log('failed'+this.getStatus());
                }
            },{enableHighAccuracy: false})
            this.getProvinces()
            this.counterList()
            this.doSearch()
        },300)
    },
    methods: {
        getCurrentCity () {
            let params = {
                longitude:this.longitude||121.443010,
                latitude:this.latitude||31.280850
            }
            getCurrentCity(params).then((res)=>{
                console.log(res)
                this.currentLocation = res.data.name
            })
        },
        counterList () {
            let params = {
                city: this.currentLocation,
                longitude:this.longitude||121.443010,
                latitude:this.latitude||31.280850
            }
            getCounterList(params).then(res=>{
                console.log(res.data)
                this.panelList = res.data
            })
        },
        getProvinces() {
            let obj={}
            Provinces().then((res)=>{ 
                res.data.forEach((item)=>{
                    Cities({provinceCode:item.code}).then(r=>{
                        let arr = []
                        r.data.forEach((i)=>{ arr.push(i.name) })
                        obj[item.name] =arr
                        address = obj
                        this.citySlots[0].values = Object.keys(address)
                        this.citySlots[2].values = Object.values(address)[0]
                    })
                })
            })
        },
        choiceArea () {
            this.popupVisible = true
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
            this.areaText =values[0]+' / '+ values[1]
            this.currentLocation = values[1]
        },
        doSearch () {
            map.centerAndZoom(this.currentLocation,11);  //设置地图的中心点：
            map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
            map.setCurrentCity(this.currentLocation); // 设置地图显示的城市
            let option = { map:map, autoViewport:false, selectFirstResult: false }
            local = new BMap.LocalSearch(map,{ renderOptions:option});
            // local.search(this.searchWord);
            // // local.searchNearby([val], mPoint, 2000)
            // local.setSearchCompleteCallback((res)=>{
            //     this.panelList = res.Gq
            // })
            // local.setMarkersSetCallback((res)=>{
            //     console.log('23423423', res)
            // })
            // local.setInfoHtmlSetCallback((res)=>{
            //     console.log('234234231111111111', res)
            //     this.panelList.forEach((item,i)=>{
            //         if(item.uid == res.uid){
            //             this.current = i
            //         }
            //     })
            // })
        },
        infohtmlset(item,index) {
            this.current = index
            this.infoWindow(item)
        },
        infoWindow (item) {
            this.title = item.title
            this.address = item.address
            this.detailUrl = item.detailUrl
            let option = { lat: item.latitude, lng: item.longitude }
            let point = new BMap.Point(option.lng, option.lat);
            let marker = new BMap.Marker(point);
            map.addOverlay(marker);
            map.centerAndZoom(point,11);
            let opts ={
                width :250,
                minHeight:45
            }
            var sContent = document.getElementById('redituser')
            let infoWindow =new BMap.InfoWindow(sContent,opts);// 创建信息窗口对象
            marker.addEventListener("click",function(){
                map.openInfoWindow(infoWindow,point);
            });
            map.enableScrollWheelZoom(false);
            map.openInfoWindow(infoWindow,map.getCenter());//开启信息窗口
        },
        goDetails () {
            location.href= this.detailUrl
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
    z-index: 2;
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
.tag span{
    font-size: 12px
}
.anchorBL{
    display: none;
}
.mint-popup-4{
    width: 100%;
}
</style>


