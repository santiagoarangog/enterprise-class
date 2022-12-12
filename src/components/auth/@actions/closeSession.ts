import Store from '@/Store'
import routesConfig from '@/router/routesConfig'

const closeSession = async () => {
  Store().setPreventReload(false)

  try {
    const { getPaths, getHttp } = Store()
    const path = getPaths().auth.logout
    await getHttp().post(path, null)
  } catch (error) {
    console.error(error)
  }

  localStorage.removeItem('vincu-token')
  localStorage.removeItem('vincu-user')
  window.location.href = routesConfig.Login.path
}

export default closeSession
