import useAuthStore from '../@store'
import Store from '@/Store'

const store = useAuthStore()

export interface AuthenticatePayloadContract {
  email: string
  password: string
  password_confirm?: string
}

const authenticate = async ({
  email,
  password,
}: AuthenticatePayloadContract) => {
  try {
    const http = Store().getHttp()
    const path = Store().getInitialData()?.paths.auth.login ?? ''
    const result = await http.post(path, { email, password })

    const { status_code } = result

    if (status_code === 200) {
      store.setUser(result.user)
      Store().setJwtToken(result.access_token)

      const { access_token, refresh_token } = result

      localStorage.setItem(
        'vincu-token',
        JSON.stringify({ access_token, refresh_token })
      )

      const { full_name, email, id } = result.user
      localStorage.setItem(
        'vincu-user',
        JSON.stringify({ full_name, email, id })
      )

      return {
        status: true,
        message: result.message,
      }
    }

    return {
      status: false,
      message: result.message,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    }
  }
}

export default authenticate
