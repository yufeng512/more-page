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
                        <span></span>
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
var local,
    map,
    address = {},
    provinceCodeList = {},
    cityCodeList = {}
export default {
    name: 'store',
    data() { 
        return {
            current: 0,
            panelList: [],
            currentLocation: '北京',
            searchWord: '欧舒丹精品店',
            areaText: '',
            title: '',
            address: '',
            detailUrl: '',
            popupVisible: false,
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
                "上海": [ "上海" ],
                "北京": [ "北京" ],
                "广东": [ "广州", "深圳" ],
                "江苏": [ "徐州", "南京" ],
                "福建": [ "福州" ]
            },
            provinceCodeList: {
                "上海": [ "120001" ],
                "北京": [ "110001" ],
                "广东": [ "130001" ],
                "江苏": [ "130007" ],
                "福建": [ "0100" ]
            },
            cityCodeList: {
                "上海": [ "120002" ],
                "北京": [ "110002" ],
                "广州": [ "130002" ],
                "南京": [ "130006" ],
                "深圳": [ "518000" ],
                "福州": [ "0200"],
                "徐州": [ "130009" ]
            }
        }
    },
    created(){ 
        address = this.areaList
        this.citySlots[0].values = Object.keys(address)
        this.citySlots[2].values = Object.values(address)[0]
    },
    mounted(){
        var options = {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 1
        }
        navigator.geolocation.getCurrentPosition(this.success, this.error, options);
        setTimeout(()=>{
            map = new BMap.Map("map",{enableMapClick:false });
            // let geolocation = new BMap.Geolocation();
            // geolocation.getCurrentPosition(function(r){
            //     console.log(this)
                // if(this.getStatus() == BMAP_STATUS_SUCCESS){
                //     var mk = new BMap.Marker(r.point);
                //     this.map.addOverlay(mk);
                //     this.map.panTo(r.point);
                //     console.log('您的位置：'+r.point.lng+','+r.point.lat);
                // }else {
                //     console.log('failed'+this.getStatus());
                // }
            // },{enableHighAccuracy: false})
            this.doSearch()
        },300)
    },
    methods: {
        success(pos) {
            var crd = pos.coords;
            alert('Your current position is:');
            alert('Latitude : ' + crd.latitude);
            alert('Longitude: ' + crd.longitude);
            alert('More or less ' + crd.accuracy + ' meters.');
        },
        error(err) {
            alert('ERROR(' + err.code + '): ' + err.message);
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
        },
        onCityChange (picker, values) {
            console.log(picker, values)
            picker.setSlotValues(1, address[values[0]])
            this.areaText =values[0]+' / '+ values[1]
            this.currentLocation = values[1]
        },
        doSearch () {
            map.centerAndZoom(this.currentLocation,11);  //设置地图的中心点：
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            map.setCurrentCity(this.currentLocation); // 设置地图显示的城市
            let option = { map:map, autoViewport:false, selectFirstResult: false }
            local = new BMap.LocalSearch(map,{ renderOptions:option});
            local.search(this.searchWord);
            // local.searchNearby([val], mPoint, 2000)
            local.setSearchCompleteCallback((res)=>{
                this.panelList = res.Gq
            })
            local.setMarkersSetCallback((res)=>{
                console.log('23423423', res)
            })
            local.setInfoHtmlSetCallback((res)=>{
                console.log('234234231111111111', res)
                this.panelList.forEach((item,i)=>{
                    if(item.uid == res.uid){
                        this.current = i
                    }
                })
            })
        },
        infohtmlset(item,index) {
            this.current = index
            this.infoWindow(item)
        },
        infoWindow (item) {
            this.title = item.title
            this.address = item.address
            this.detailUrl = item.detailUrl
            let option = { lat: item.point.lat, lng: item.point.lng }
            let point = new BMap.Point(option.lng, option.lat);
            let marker = new BMap.Marker(point);
            // map.addOverlay(marker);
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
            map.enableScrollWheelZoom(true);
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


