import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useMyAccountStore from '@/components/myAccount/store'

const getDiscoveredList = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['document_type'] })
    const { lists } = response
    const { document_type } = lists
    if (document_type) {
      useMyAccountStore().setDocumentTypes(document_type)
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
