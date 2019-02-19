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