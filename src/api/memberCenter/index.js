import api from '../baseUrl'
import request from '@/utils/requestApi'
//当前城市
export function getMemberInfo(mobile) {
    return request({
      url: api.MemberInfo + mobile + '?tenantId=3',
      method: 'get'
    })
    // return fetch(api.MemberInfo + mobile + '?tenantId=3')
}
export function getMemberCoupon(couponNo) {
    return request({
      url: api.MemberCoupon + '?tenantId=3&couponNo=' + couponNo,
      method: 'get'
    })
    // return post(api.MemberCoupon + '?tenantId=3&couponNo=' + couponNo)
}
export function getMemberNoCoupon(memberNo) {
    return request({
      url: api.MemberNoCoupon + '?tenantId=3&memberNo=' + memberNo,
      method: 'get'
    })
    //   return post(api.MemberNoCoupon + '?tenantId=3&memberNo=' + memberNo)
}
export function getMemberScoreQuery(memberNo) {
    return request({
      url: api.MemberScoreQuery + '?tenantId=3&memberNo=' + memberNo,
      method: 'post'
    })
    //   return post(api.MemberScoreQuery + '?tenantId=3&memberNo=' + memberNo)
}
export function getMemberOrderQuery(memberNo) {
    return request({
      url: api.MemberOrderQuery + '?tenantId=3&memberNo=' + memberNo,
      method: 'post'
    })
    //   return post(api.MemberOrderQuery + '?tenantId=3&memberNo=' + memberNo)
}
export function getMemberCouponList() {
  return request({
    url: api.MemberCouponList + '?tenantId=3&menuId=1700000268',
    method: 'get'
  })
  // return fetch(api.MemberCouponList + '?tenantId=3&menuId=1700000268')
}
export function getMemberCouponExchange(params) {
  return request({
    url: api.MemberCouponExchange + '?ids=' + params.ids + '&nums=' + params.nums + '&memberId=' + params.memberId,
    method: 'post'
  })
  //   return post(api.MemberCouponExchange + '?ids=' + params.ids + '&nums=' + params.nums + '&memberId=' + params.memberId)
}
export function getMemberCouponReturnBack(params) {
  return request({
    url: api.MemberCouponReturnBack,
    method: 'post'
  })
  //   return post(api.MemberCouponReturnBack, params)
}