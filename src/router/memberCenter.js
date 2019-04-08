import index from '../components/memberCenter/index'
import info from '../components/memberCenter/info'
import point from '../components/memberCenter/point'
import exchangeDetail from '../components/memberCenter/exchangeDetail'
import pointHistory from '../components/memberCenter/pointHistory'
import orderHistory from '../components/memberCenter/orderHistory'
import card from '../components/memberCenter/card'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/info',
    name: 'info',
    component: info,
    meta: {
      title: '会员信息'
    }
  },
  {
    path: '/point',
    name: 'point',
    component: point,
    meta: {
      title: '积分'
    }
  },
  {
    path: '/exchangeDetail/:id',
    name: 'exchangeDetail',
    component: exchangeDetail,
    meta: {
      title: '积分'
    }
  },
  {
    path: '/pointHistory',
    name: 'pointHistory',
    component: pointHistory,
    meta: {
      title: '积分历史'
    }
  },
  {
    path: '/orderHistory',
    name: 'orderHistory',
    component: orderHistory,
    meta: {
      title: '消费历史'
    }
  },
  {
    path: '/card',
    name: 'card',
    component: card,
    meta: {
      title: '卡券'
    }
  }
]

export default routes