const BASEAPI = process.env.BASE_API
console.log('请求接口地址',BASEAPI)
export default { 
    MemberInsert: BASEAPI + 'mobile/member/insert', //会员注册接口
    MemberUpdate: BASEAPI + 'mobile/member/update', //会员更新
    QueryByMobile: BASEAPI + 'mobile/member/queryByMobile/', //根据手机号查询会员信息
    QueryByOpenId: BASEAPI + 'mobile/member/queryByOpenId/', //根据OpenId查询会员信息
    CurrentCity: BASEAPI + 'mobile/region/currentCity', //获取经纬度所在的城市
    Provinces: BASEAPI + 'mobile/region/provinces', //省列表
    Cities: BASEAPI + 'mobile/region/cities', //城市列表
    Districts: BASEAPI + 'mobile/region/districts', //区列表
    //核销
    FindByCode: BASEAPI + 'mobile/ba/findByCode/',//核销查询
    Query: BASEAPI + 'mobile/campaignDetail/query', //活动礼包查询
    Verify: BASEAPI + 'mobile/campaignDetail/verify/', //活动礼包核销
    AddMobile: BASEAPI + 'mobile/campaignDetail/addMobile', //活动礼包自助核销接口
    ListAvailable: BASEAPI + 'mobile/campaign/listAvailable', //渠道查询接口
    //专柜查询
    CounterList: BASEAPI + 'mobile/counter/counterList', //城市门店列表
}