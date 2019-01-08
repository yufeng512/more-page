import api from '../baseUrl'
import { fetch, post, patch, put } from '@/utils/request'
export function getMapJson(url,params) {
  return fetch(url, params)
}