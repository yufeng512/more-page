import api from './baseUrl'
import {
  fetch,
  post,
  patch,
  put
} from '@/utils/request'
//当前城市
export function addQuestion(params) {
  return fetch(api.addQuestion, params)
}
export function hasPartQues(req) {
  return post(api.hasPartQues + req.openId + '/' + req.campaignId)
}