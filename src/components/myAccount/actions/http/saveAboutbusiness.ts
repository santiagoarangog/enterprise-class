import type { AboutBusinessContract } from './../../contracts/aboutBusinessContract'
import Store from '@/Store'
import { ElMessage } from 'element-plus'
import getAccountInfo from '../../../summaryView/actions/http/getAccountInfo'

const saveAboutbusiness = async (model: AboutBusinessContract) => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().business.save

    const response = await getHttp().post(path, {
      about_business: model,
    })
    const { status_code, message } = response
    const type = status_code === 200 ? 'success' : 'error'

    ElMessage({
      message: message,
      type,
    })

    if (status_code === 200) {
      getAccountInfo()
      return true
    }
    return false
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default saveAboutbusiness
