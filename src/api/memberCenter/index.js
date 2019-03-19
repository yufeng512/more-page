import api from '../baseUrl'
import {
  fetch,
  post,
  patch,
  put
} from '@/utils/request'
//当前城市
export function getMemberInfo(mobile) {
  return fetch(api.MemberInfo + mobile + '?tenantId=3')
}
export function getMemberCoupon(couponNo) {
  return post(api.MemberCoupon + '?tenantId=3&couponNo=' + couponNo)
}