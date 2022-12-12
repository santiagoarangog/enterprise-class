import type { UserInfoContract } from './entities/User'

export interface AuthenticationSuccessResponseContract {
  access_token: string
  refresh_token: string
  status_code: number
  user: UserInfoContract
  expires_in: number
  message: string
}

export interface ExceptionContract {
  status: number
  title: string
  message: string
}

export interface InitialPathsContract {
  accountCreation: {
    newAccount: string
    forgotPassword: string
  }
  common: {
    lists: string
  }
  business: {
    save: string
    plan: string
  }
  auth: {
    login: string
    refresh: string
    email_generator: string
    logout: string
  }
  offer: {
    change_status: string
    delete: string
    get: string
    get_all: string
    save: string
    update: string
  }
}

export interface InitialDataContract {
  paths: InitialPathsContract
}

export interface SelectOptionContract {
  value: any
  label: string
}

export interface ListContract {
  id: number
  name: string
}
