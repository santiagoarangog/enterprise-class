import type { ClientInfoContract } from '@/entities/Client'
import Store from '@/Store'
import { ElMessage } from 'element-plus'
import useClientStore from '../store'

const newClient = async (client: ClientInfoContract) => {
  try {
    const store = Store()
    const { getHttp, getPaths } = store
    const path = getPaths().accountCreation.newAccount
    const response = await getHttp().post(path, client)
    const { status } = response
    if (status == 1) {
      useClientStore().setShowVerifyAccountModal(true)
      return
    }
  } catch (error: any) {
    ElMessage({
      message: error,
      type: 'error',
    })
    return error
  }
}

export default newClient
