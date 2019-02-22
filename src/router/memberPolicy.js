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
    name: 'register',
    component: register
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: userInfo
  }
]

export default routes