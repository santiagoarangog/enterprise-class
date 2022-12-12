import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setCities } = useListStore()

const checkCache = () => {
  const data = JSON.parse(localStorage.getItem('vincu-cities') || '[]')
  if (data.length > 0) {
    Store().setCities(data)
    setCities(data)
    return true
  }
  return data.length > 0
}

const getCities = async () => {
  try {
    if (checkCache()) return

    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['city'] })
    const { lists } = response
    const { city } = lists
    if (city) {
      store.setCities(city)
      setCities(city)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getCities
