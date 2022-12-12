import Store from './Store'
import exeptionsModel from './data/exeptions.data'
import refreshToken from './components/auth/@actions/refreshToken'

export interface HttpContract {
  setJwtToken: (token: string) => void
  get: (route: string) => any
  post: (route: string, body: any) => any
  put: (route: string, body: any) => any
  del: (route: string) => any
}

interface HttpErrorReturnContract {
  error: string
  status: number
}

export default function http(): HttpContract {
  const countryHeader = computed(() => Store().getCountryHeader())

  const headers = {
    'Content-Type': 'application/json',
    authorization: 'Bearer ',
    Accept: 'application/json',
    country: countryHeader.value,
    authorization2: 'Bearer ',
  }

  async function get(route: string): Promise<any | HttpErrorReturnContract> {
    try {
      // reset exeption
      Store().setException(null)
      const api = `${route}`
      const response = await fetch(api, {
        method: 'get',
        headers: new Headers(headers),
      })

      if (response.status !== 200) throw response
      return await response.json()
    } catch (error: any) {
      return await setRefreshToken(error, 'get')
    }
  }

  async function post(
    route: string,
    body: any
  ): Promise<any | HttpErrorReturnContract> {
    try {
      // reset exeption
      Store().setException(null)
      const api = `${route}`
      // stringify body
      body = JSON.stringify(body)
      const response = await fetch(api, {
        method: 'post',
        body,
        headers: new Headers(headers),
      })
      if (response.status === 403) throw response
      return await response.json()
    } catch (error: any) {
      return await setRefreshToken(error, 'post')
    }
  }

  async function put(
    route: string,
    body: any
  ): Promise<any | HttpErrorReturnContract> {
    try {
      // reset exeption
      Store().setException(null)
      const api = `${route}`
      // stringify body
      body = JSON.stringify(body)
      const response = await fetch(api, {
        method: 'put',
        body,
        headers: new Headers(headers),
      })
      if (response.status !== 200) throw await response
      return await response.json()
    } catch (error: any) {
      return await setRefreshToken(error, 'put')
    }
  }

  async function del(route: string): Promise<any | HttpErrorReturnContract> {
    try {
      // reset exeption
      Store().setException(null)
      const api = `${route}`
      const response = await fetch(api, {
        method: 'delete',
        headers: new Headers(headers),
      })
      if (response.status !== 200) throw await response
      return await response.json()
    } catch (error: any) {
      return await setRefreshToken(error, 'delete')
    }
  }

  function setJwtToken(token: string): void {
    headers.authorization = `Bearer ${token}`
    headers.authorization2 = `Bearer ${token}`
  }

  async function setRefreshToken(response: Response, method: string) {
    const codes = [401, 403]
    if (!codes.includes(response.status)) return response
    const { url, body } = response
    const endResponse = await refreshToken({ route: url, body, method })
    return endResponse
  }

  function makeExeption(status: number, message: string): void {
    const exeption = exeptionsModel.find((ex) => ex.status === status)
    if (!exeption) return exeption
    exeption.message = message
    Store().setException(exeption)
  }

  return {
    setJwtToken,
    get,
    post,
    put,
    del,
  }
}
