import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useListStore from '@/modules/list'
const { setSalary } = useListStore()

const getSalary = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['salary'] })
    const { lists } = response
    const { salary } = lists
    if (salary) {
      setSalary(salary)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getSalary
