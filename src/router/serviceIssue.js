import index from '../components/serviceIssue/index'
import questionnaire from '../components/serviceIssue/questionnaire'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/questionnaire',
    component: questionnaire
  }
]

export default routes