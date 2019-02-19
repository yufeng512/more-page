import api from '../baseUrl'
import {
  fetch,
  post,
  patch,
  put
} from '@/utils/request'
//当前城市
export function getCurrentCity(params) {
  return fetch(api.CurrentCity, params)
}
//城市门店
export function getCounterList(params) {
  return fetch(api.CounterList, params)
}
export function Provinces() {
    return fetch(api.Provinces)
}
export function Cities(params) {
    return fetch(api.Cities, params)
}