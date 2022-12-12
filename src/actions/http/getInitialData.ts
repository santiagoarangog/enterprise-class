import http from '@/http'
import Store from '@/Store'

const getInitialData = async () => {
  try {
    const baseUrl = import.meta.env.DEV
      ? import.meta.env.VITE_APP_URL_DEV
      : import.meta.env.VITE_APP_URL_PROD

    const data = await http().get(`${baseUrl}/initial_data`)
    Store().setInitialData(data)
  } catch (error) {
    console.error('getInitialData', error)
  }
}

export default getInitialData
