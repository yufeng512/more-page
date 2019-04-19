import api from '../baseUrl'
import { fetch, post } from '@/utils/request'

//会员新增
export function MemberInsert(params) {
  return post(api.MemberInsert, params)
}
//会员绑定
export function MemberCheckBind(params) {
  return post(api.CheckBind, params)
}
//会员新增
export function Login(params) {
  return post(api.Login, params)
}
//获取验证码
export function Send(data) {
  return post(api.Send, data)
}
//验证验证码
export function CodeVerify(params) {
  return fetch(api.CodeVerify, params)
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
export function ProvincesList(params) {
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
//获取权限
export function GetCardSign(params) {
  return post(api.GetCardSign +'?memberCode='+ params)
}
//获取权限
export function DecryptCode(params) {
  return post(api.DecryptCode, params)
}