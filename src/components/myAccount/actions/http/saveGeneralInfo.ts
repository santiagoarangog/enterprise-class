import type { GeneralInfoContract } from './../../contracts/generalInfoContract'
import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useMyAccountStore from '@/components/myAccount/store'
import getAccountInfo from '../../../summaryView/actions/http/getAccountInfo'

const saveGeneralInfo = async (model: GeneralInfoContract) => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().business.save

    const response = await getHttp().post(path, {
      general_info: model,
    })

    const { status_code, message } = response
    const type = status_code === 200 ? 'success' : 'warning'

    ElMessage({
      message: message,
      type,
    })

    if (status_code == 200) {
      useMyAccountStore().activeLegalRepresentativeCollapse()
      getAccountInfo()
      return true
    }

    return false
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return false
  }
}

export default saveGeneralInfo
