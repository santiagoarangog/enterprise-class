import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useSummaryTabsStore from '../../components/summaryTabs/store'

const getAccountInfo = async (): Promise<boolean> => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().business.save

    const response = await getHttp().get(path)
    const { general_info, legal_representative, about_business } = response
    useSummaryTabsStore().setData(
      general_info,
      legal_representative,
      about_business
    )
    return true
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return false
  }
}

export default getAccountInfo
