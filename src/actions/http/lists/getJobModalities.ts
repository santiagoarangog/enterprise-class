import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setJobModalities } = useListStore()

const getJobModalities = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['job_modality'] })
    const { lists } = response
    const { job_modality } = lists
    if (job_modality) setJobModalities(job_modality)
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getJobModalities
