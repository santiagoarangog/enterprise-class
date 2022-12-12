import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useClientStore from '../store'

const getDiscoveredList = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['discovered'] })
    const { lists } = response
    if (lists.discovered) {
      useClientStore().setDiscoveredList(lists.discovered)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getDiscoveredList
