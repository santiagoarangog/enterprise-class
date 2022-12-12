import type { LegalRepresentativeContract } from './../../contracts/legalRepresentativeContract'
import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useMyAccountStore from '@/components/myAccount/store'
import getAccountInfo from '../../../summaryView/actions/http/getAccountInfo'

const saveLegalRepresentative = async (model: LegalRepresentativeContract) => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().business.save

    const response = await getHttp().post(path, {
      legal_representative: model,
    })
    const { status_code, message } = response
    const type = status_code === 200 ? 'success' : 'warning'

    ElMessage({
      message: message,
      type,
    })

    if (status_code === 200) {
      useMyAccountStore().activeAboutBusinessCollapse()
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

export default saveLegalRepresentative
