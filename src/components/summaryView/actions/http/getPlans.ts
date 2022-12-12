import { ElMessage } from 'element-plus'
import Store from '@/Store'
import useSummaryFormStore from '../../store'

const getPlans = async (): Promise<boolean> => {
  try {
    const summaryStore = useSummaryFormStore()
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().business.plan
    const response = await getHttp().get(path)

    if (response?.plans) {
      summaryStore.setPlans(response.plans)
      return true
    }

    return false
  } catch (error: any) {
    ElMessage.error(error.message)
    return false
  }
}

export default getPlans
