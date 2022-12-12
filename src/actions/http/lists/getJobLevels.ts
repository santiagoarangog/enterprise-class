import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setJobLevels } = useListStore()

const getJobLevels = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['job_level'] })
    const { lists } = response
    const { job_level } = lists
    if (job_level) setJobLevels(job_level)
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getJobLevels
