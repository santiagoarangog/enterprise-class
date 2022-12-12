import { ElMessage } from 'element-plus'
import useAuthStore from '../@store'
import Store from '@/Store'

const store = useAuthStore()

export interface EmailGeneratorContract {
  token: string
  type: string
  country: string
  email: string
}

const emailGenerator = async (payload: EmailGeneratorContract) => {
  try {
    const http = Store().getHttp()
    const path = Store().getInitialData()?.paths.auth.email_generator ?? ''
    const result = await http.post(path, payload)

    const { status_code, message } = result

    ElMessage({
      type: status_code === 200 ? 'success' : 'error',
      message,
    })

    return {
      status: status_code === 200,
      message,
    }
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.message,
    })

    return {
      status: false,
      message: error.message,
    }
  }
}

export default emailGenerator
