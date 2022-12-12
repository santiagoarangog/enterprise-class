export interface UserInfoContract {
  id: number
  code: string
  names: string
  surnames: string
  email: string
  email_verified_at: string | null
  active: number
  document_type_id: number | null
  identification_document: string
  accept_tyc_at: number
  accept_privacy_at: number
  created_by: number | null
  deleted_at: string | null
  is_candidate: number
  autologin_token: string
  autologin_date: number
  contact_id: number
  disable_notifications: number
  source: string
  created_at: number
  updated_at: number
}

export interface UserContract {
  getInfo: () => UserInfoContract
  updateInfo: (newInfo: UserInfoContract) => void
  refreshTokens: () => Promise<void>
}

export default function User(user?: UserInfoContract | void): UserContract {
  let info: UserInfoContract
  if (user) {
    info = {
      id: user.id,
      code: user.code,
      names: user.names,
      surnames: user.surnames,
      email: user.email,
      email_verified_at: user.email_verified_at,
      active: user.active,
      document_type_id: user.document_type_id,
      identification_document: user.identification_document,
      accept_tyc_at: user.accept_tyc_at,
      accept_privacy_at: user.accept_privacy_at,
      created_by: user.created_by,
      deleted_at: user.deleted_at,
      is_candidate: user.is_candidate,
      autologin_token: user.autologin_token,
      autologin_date: user.autologin_date,
      contact_id: user.contact_id,
      disable_notifications: user.disable_notifications,
      source: user.source,
      created_at: user.created_at,
      updated_at: user.updated_at,
    } // protected
  }
  const getInfo = (): UserInfoContract => ({ ...info }) // read only. this can help to protect the information stored in info variable
  const updateInfo = (newInfo: UserInfoContract): void => {
    info = newInfo
  }
  const refreshTokens = async (): Promise<void> => {
    // refresh tokens
  }

  return {
    updateInfo,
    getInfo,
    refreshTokens,
  }
}
