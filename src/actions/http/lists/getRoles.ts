import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setRoles } = useListStore()

const getRoles = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['rol'] })
    const { lists } = response
    const { rol } = lists
    if (rol) setRoles(rol)
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getRoles
