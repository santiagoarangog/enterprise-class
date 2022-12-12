import { i18n } from '@/composables'

const passwordValidation = (rule: any, value: string, callback: any) => {
  if (value.length < 8) {
    callback(
      new Error(i18n.value.clientCreate.passwordRequirements.minCharacters)
    )
  }
  if (!/[a-z]/.test(value)) {
    callback(new Error(i18n.value.clientCreate.passwordRequirements.lowercase))
  }
  if (!/[A-Z]/.test(value)) {
    callback(new Error(i18n.value.clientCreate.passwordRequirements.uppercase))
  }
  callback()
}

export default passwordValidation
