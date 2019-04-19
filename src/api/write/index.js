import api from '../baseUrl'
import {
  fetch,
  post,
  patch,
  put
} from '@/utils/request'
//核销查询
export function FindByCode(params) {
  return fetch(api.FindByCode + params)
}
//活动礼包查询
export function Query(params) {
  return fetch(api.Query, params)
}
//活动礼包核销
export function Verify(params) {
  return post(api.Verify + params)
}
//活动礼包核销
export function ListAvailable() {
  return fetch(api.ListAvailable)
}
//手机自主核销
export function AddMobile(params) {
  return post(api.AddMobile, params)
}