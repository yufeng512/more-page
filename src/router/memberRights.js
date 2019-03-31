import index from '../components/memberRights/index'
import goldCard from '../components/memberRights/goldCard'
import silverCard from '../components/memberRights/silverCard'
import ordinary from '../components/memberRights/ordinary'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/goldCard',
    component: goldCard
  },
  {
    path: '/silverCard',
    component: silverCard
  },
  {
    path: '/ordinary',
    component: ordinary
  },
]

export default routes