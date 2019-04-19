import index from '../components/memberPolicy/index'
import userInfo from '../components/memberPolicy/userInfo'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: userInfo
  }
]

export default routes