export interface ClientInfoContract {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  business_name: string
  job_title: string
  password: string
  password_confirm: string
  about_us: number
}

export interface ClientContract {
  getInfo: () => ClientInfoContract
  updateInfo: (newInfo: ClientInfoContract) => void
}

export default function Client(
  client?: ClientInfoContract | void
): ClientContract {
  let model: ClientInfoContract
  if (client) {
    model = {
      id: client.id,
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email,
      phone: client.phone,
      business_name: client.business_name,
      job_title: client.job_title,
      password: client.password,
      password_confirm: client.password_confirm,
      about_us: client.about_us,
    }
  }

  const getInfo = (): ClientInfoContract => ({ ...model })
  const updateInfo = (newInfo: ClientInfoContract): void => {
    model = newInfo
  }

  return {
    updateInfo,
    getInfo,
  }
}
