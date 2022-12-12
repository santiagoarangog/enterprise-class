import routesConfig from '@/router/routesConfig'
import { i18n } from '@/composables'

export default [
  {
    name: i18n.value.menu.MyOffers,
    route: routesConfig.MyOffers.path,
    isCurrent: false,
  },
  {
    name: i18n.value.menu.Orientation,
    route: '#',
    isCurrent: false,
  },
  {
    name: i18n.value.menu.OtherOffers,
    route: '#',
    isCurrent: false,
  },
  {
    name: i18n.value.menu.Plans,
    route: '#',
    isCurrent: false,
  },
  {
    name: i18n.value.menu.Support,
    route: '#',
    isCurrent: false,
  },
]
