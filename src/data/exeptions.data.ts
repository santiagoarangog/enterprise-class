import type { ExceptionContract } from '@/@types'
import i18n from '@/i18n'

const trans = i18n.es.exeptions

export default [
  {
    status: 400,
    title: trans.badRequest,
    message: '',
  },
  {
    status: 401,
    title: trans.unauthorize,
    message: '',
  },
  {
    status: 403,
    title: trans.unauthorize,
    message: '',
  },
  {
    status: 500,
    title: trans.serverError,
    message: '',
  },
] as ExceptionContract[]
