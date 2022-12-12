import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setCountries } = useListStore()

const checkCache = () => {
  const countires = JSON.parse(localStorage.getItem('vincu-countries') || '[]')
  if (countires.length > 0) {
    Store().setCountries(countires)
    setCountries(countires)
    return true
  }
  return countires.length > 0
}

const getCountries = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['country'] })
    const { lists } = response
    const { country } = lists
    if (country) {
      store.setCountries(country)
      setCountries(country)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getCountries
