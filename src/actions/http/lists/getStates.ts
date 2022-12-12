import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setStates } = useListStore()

const checkCache = () => {
  const data = JSON.parse(localStorage.getItem('vincu-states') || '[]')
  if (data.length > 0) {
    Store().setStates(data)
    setStates(data)
    return true
  }
  return data.length > 0
}

const getStates = async () => {
  try {
    if (checkCache()) return

    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['state'] })
    const { lists } = response
    const { state } = lists
    if (state) {
      store.setStates(state)
      setStates(state)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getStates
