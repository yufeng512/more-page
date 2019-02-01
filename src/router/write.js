import index from '../components/write/index'
import search from '../components/write/search'
import details from '../components/write/details'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/details',
    name: 'details',
    component: details
  }
]

export default routes