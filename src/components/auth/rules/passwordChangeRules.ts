const trigger = 'blur'
import { i18n } from '@/composables'
import type { FormItemRule } from 'element-plus'
import passwordValidation from '../@actions/passwordValidation'

export default {
  email: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
    {
      type: 'email',
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],

  password: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: 'change',
    },
    {
      validator: passwordValidation,
      trigger: 'change',
    },
  ],
  password_confirm: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: 'change',
    },
  ],
} as Record<string, FormItemRule[]>
