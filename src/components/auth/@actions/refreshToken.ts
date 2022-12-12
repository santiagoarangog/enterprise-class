import routesConfig from '@/router/routesConfig'
import Store from '@/Store'
import useAuthStore from '../@store'
import closeSession from './closeSession'

export interface RequestForRefreshToken {
  route: string
  method: string
  body?: any
}

const refreshToken = async (currentRequest: RequestForRefreshToken | null) => {
  try {
    const http = Store().getHttp()
    const email = JSON.parse(localStorage.getItem('vincu-user') || '{}').email
    const refreshToken = JSON.parse(
      localStorage.getItem('vincu-token') || '{}'
    ).refresh_token

    const path = Store().getInitialData()?.paths.auth.refresh ?? ''
    const result = await http.post(path, {
      email,
      refresh_token: refreshToken,
    })

    const { access_token, refresh_token, status_code } = result

    if (access_token) {
      useAuthStore().setUser(result.user)
      Store().setJwtToken(access_token)
      localStorage.setItem(
        'vincu-token',
        JSON.stringify({ access_token, refresh_token })
      )
      if (!currentRequest) return

      const { route, method, body } = currentRequest

      if (method === 'post') {
        return await http.post(route, body)
      } else if (method === 'get') {
        return await http.get(route)
      } else if (method === 'put') {
        return await http.put(route, body)
      } else if (method === 'delete') {
        return await http.del(route)
      }
    }

    if (status_code === 400) closeSession()

    return {
      status: false,
      message: result.message,
    }
  } catch (error: any) {
    window.location.href = routesConfig.Login.path
    return {
      status: false,
      message: error.message,
    }
  }
}

export default refreshToken
