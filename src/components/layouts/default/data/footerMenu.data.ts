import routesConfig from '@/router/routesConfig'
import { i18n } from '@/composables'

export default [
  {
    name: i18n.value.myAccount.myAccount,
    route: routesConfig.MyAccount.path,
    isCurrent: false,
  },
  {
    name: i18n.value.authentication.closeSession,
    route: '/logout',
    isCurrent: false,
  },
]
