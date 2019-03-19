import index from '../components/memberCenter/index'
import info from '../components/memberCenter/info'
import point from '../components/memberCenter/point'
import card from '../components/memberCenter/card'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/info',
    name: 'info',
    component: info
  },
  {
    path: '/point',
    name: 'point',
    component: point
  },
  {
    path: '/card',
    name: 'card',
    component: card
  }
]

export default routes