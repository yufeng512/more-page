import index from '../components/memberPolicy/index'
import register from '../components/memberPolicy/register'
import userInfo from '../components/memberPolicy/userInfo'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/userInfo',
    component: userInfo
  }
]

export default routes