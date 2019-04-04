import api from '../baseUrl'
import {
  fetch,
  post
} from '@/utils/request'
//当前城市
export function getMemberInfo(mobile) {
  return fetch(api.MemberInfo + mobile + '?tenantId=3')
}
export function getMemberCoupon(couponNo) {
  return post(api.MemberCoupon + '?tenantId=3&couponNo=' + couponNo)
}
export function getMemberNoCoupon(memberNo) {
  return post(api.MemberNoCoupon + '?tenantId=3&memberNo=' + memberNo)
}
export function getMemberScoreQuery(memberNo) {
  return post(api.MemberScoreQuery + '?tenantId=3&memberNo=' + memberNo)
}
export function getMemberOrderQuery(memberNo) {
  return post(api.MemberOrderQuery + '?tenantId=3&memberNo=' + memberNo)
}