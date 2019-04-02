import api from './baseUrl'
import {
  fetch,
  post,
  patch,
  put
} from '@/utils/request'
//当前城市
export function addQuestion(params) {
  return post(api.addQuestion, params)
}
export function getlocalAPi(params) {
  return post(api.localAPi, params)
}
export function hasPartQues(req) {
  return fetch(api.hasPartQues + req.openId + '/' + req.campaignId)
}