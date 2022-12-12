import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setAreas } = useListStore()

const getAreas = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['area_industry'] })
    const { lists } = response
    const { area_industry } = lists
    if (area_industry) setAreas(area_industry)
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getAreas
