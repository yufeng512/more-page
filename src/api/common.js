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
export function hasPartQues(req) {
  return get(api.hasPartQues + req.openId + '/' + req.campaignId)
}