import index from '../components/pointShop/index'
import pointDetails from '../components/pointShop/details'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/pointDetails',
    name: 'pointDetails',
    component: pointDetails,
    meta: {
      title: '详情'
    }
  }
]

export default routes