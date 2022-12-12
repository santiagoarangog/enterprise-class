import Store from '@/Store'

export default async function recoverPassword(email: string): Promise<any> {
  try {
    const http = Store().getHttp()
    const path = Store().getInitialData()?.paths.accountCreation.forgotPassword
    if (!path) return Promise.reject('Path not found')
    await http.post(path, { email })
    return true
  } catch (error: any) {
    return false
  }
}
