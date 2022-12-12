import Store from '@/Store'
import { ElMessage } from 'element-plus'

const getPersonTypes = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['person'] })
    const { lists } = response
    const { person } = lists
    if (person) {
      store.setPersonTypes(person)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getPersonTypes
