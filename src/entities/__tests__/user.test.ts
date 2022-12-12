import { describe, test, expect } from 'vitest'
import User, { type UserContract } from '../User'

describe('User entiti', () => {
  test('set user information', () => {
    const objForTesting = {
      id: 1,
      code: 'code',
      names: 'names',
      surnames: 'surnames',
      email: 'email',
      email_verified_at: 'email_verified_at',
      active: 1,
      document_type_id: 1,
      identification_document: 'identification_document',
      accept_tyc_at: 1,
      accept_privacy_at: 1,
      created_by: 1,
      deleted_at: 'deleted_at',
      is_candidate: 1,
      autologin_token: 'autologin_token',
      autologin_date: 1,
      contact_id: 1,
      disable_notifications: 1,
      source: 'source',
      created_at: 1,
      updated_at: 1,
    }
    const user = User(objForTesting)

    const info = user.getInfo()

    expect(info).toMatchObject(objForTesting)
  })

  test('update user information', () => {
    const oldInfoObj = {
      id: 1,
      code: 'code',
      names: 'names',
      surnames: 'surnames',
      email: 'email',
      email_verified_at: 'email_verified_at',
      active: 1,
      document_type_id: 1,
      identification_document: 'identification_document',
      accept_tyc_at: 1,
      accept_privacy_at: 1,
      created_by: 1,
      deleted_at: 'deleted_at',
      is_candidate: 1,
      autologin_token: 'autologin_token',
      autologin_date: 1,
      contact_id: 1,
      disable_notifications: 1,
      source: 'source',
      created_at: 1,
      updated_at: 1,
    }
    const user = User(oldInfoObj)
    const oldInfo = user.getInfo()
    const newInfoObj = {
      id: 2,
      code: 'code2',
      names: 'names2',
      surnames: 'surnames2',
      email: 'email2',
      email_verified_at: 'email_verified_at2',
      active: 2,
      document_type_id: 2,
      identification_document: 'identification_document2',
      accept_tyc_at: 2,
      accept_privacy_at: 2,
      created_by: 2,
      deleted_at: 'deleted_at2',
      is_candidate: 2,
      autologin_token: 'autologin_token2',
      autologin_date: 2,
      contact_id: 2,
      disable_notifications: 2,
      source: 'source2',
      created_at: 2,
      updated_at: 2,
    }
    user.updateInfo(newInfoObj)
    const newInfo = user.getInfo()

    expect(newInfo).toMatchObject(newInfoObj)
    expect(oldInfo).toMatchObject(oldInfoObj)
  })
})
