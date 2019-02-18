import api from '../baseUrl'
import { fetch, post, patch, put } from '@/utils/request'
export function getMapJson(url) {
  return fetch(url)
}
//会员注册
export function MemberInsert(params) {
  return post(api.MemberInsert, params)
}
//会员更新
export function MemberUpdate(params) {
  return post(api.MemberUpdate, params)
}
//手机查询信息
export function QueryByMobile(params) {
  return fetch(api.QueryByMobile + params)
}
//OpenId查询信息
export function QueryByOpenId(params) {
  return fetch(api.QueryByOpenId + params)
}
//获取当前城市
export function CurrentCity(params) {
  return fetch(api.CurrentCity, params)
}
//获取省
export function Provinces(params) {
  return fetch(api.Provinces, params)
}
//获取城市
export function Cities(params) {
  return fetch(api.Cities, params)
}
//获取区
export function Districts(params) {
  return fetch(api.Districts, params)
}