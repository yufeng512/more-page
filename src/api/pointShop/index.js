import api from '../baseUrl'
import {
  fetch,
  post
} from '@/utils/requestApi'
//当前城市
export function getMemberScoreQuery(memberNo) {
  return post(api.MemberScoreQuery + '?tenantId=3&memberNo=' + memberNo)
}