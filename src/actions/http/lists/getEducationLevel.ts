import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setEducationLevels } = useListStore()

const getEducationLevels = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['education_level'] })
    const { lists } = response
    const { education_level } = lists
    if (education_level) setEducationLevels(education_level)
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getEducationLevels
