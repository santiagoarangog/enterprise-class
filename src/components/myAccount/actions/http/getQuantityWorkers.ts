import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useMyAccountStore from '@/components/myAccount/store'

const getQuantityWorkers = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['quantity_worker'] })
    const { lists } = response
    const { quantity_worker } = lists
    if (quantity_worker) {
      useMyAccountStore().setQuantityWorkers(quantity_worker)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getQuantityWorkers
