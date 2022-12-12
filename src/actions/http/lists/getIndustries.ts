import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useMyAccountStore from '@/components/myAccount/store'
import useListStore from '@/modules/list'
const { setIndustries } = useListStore()

const getIndustries = async () => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().common.lists
    const response = await getHttp().post(path, { lists: ['industry'] })
    const { lists } = response
    const { industry } = lists
    if (industry) {
      useMyAccountStore().setIndustries(industry)
      setIndustries(industry)
    }
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    })
    return error
  }
}

export default getIndustries
