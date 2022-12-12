import { ElMessage } from 'element-plus'
import Store from '@/Store'
import authenticate from './authenticate'

export interface ResetPasswordContract {
  email: string
  password: string
  token: string
  type: string
  password_confirm: string
}

const resetPassword = async (model: ResetPasswordContract) => {
  try {
    const http = Store().getHttp()
    const path = Store().getInitialData()?.paths.accountCreation.forgotPassword
    if (!path) return Promise.reject('Path not found')
    const response = await http.put(path, model)
    const isSuccess = response.status_code === 200
    ElMessage({
      message: response.message,
      type: isSuccess ? 'success' : 'error',
    })

    if (isSuccess) {
      await authenticate({
        email: model.email,
        password: model.password,
      })
    }

    return isSuccess
  } catch (error: any) {
    ElMessage.error(error.message)
    return false
  }
}

export default resetPassword
