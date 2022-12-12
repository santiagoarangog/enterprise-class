const trigger = 'blur'
import { i18n } from '@/composables'
import type { FormItemRule } from 'element-plus'

export default {
  email: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
    {
      type: 'email',
      message: i18n.value.formValidationMessages.pleaseInputCorrectEmail,
      trigger: trigger,
    },
  ],
  password: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
} as Record<string, FormItemRule[]>
