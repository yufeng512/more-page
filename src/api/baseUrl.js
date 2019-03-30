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
    //会员注册
    Send: BASEAPI + 'mobile/code/send', //发送短信验证码接口
    CodeVerify: BASEAPI + 'mobile/code/verify', //校验短信验证码接口
    Login: BASEAPI + 'mobile/auth/login', //校验短信验证码接口
    //会员中心
    MemberInfo: BASEAPI + 'mobile/member/queryByMobile/', //会员信息
    Querypoint: BASEAPI + 'mobile/scoreQuery', //积分信息
    MemberCoupon: BASEAPI + 'mobile/member/couponQueryByCode', //卡券信息
    MemberNoCoupon: BASEAPI + 'mobile/member/couponQuery', //会员卡号查询
    MemberScoreQuery: BASEAPI + 'mobile/member/scoreQuery', //会员卡号积分查询
    MemberOrderQuery: BASEAPI + 'mobile/member/orderQuery', //会员卡号消费查询

    GetCardSign: BASEAPI + 'mobile/wx/getCardSign', //会员卡param memberCode 签名
    DecryptCode: BASEAPI + 'mobile/wx/decryptCode', //会员param card_id, encrypt_code
}