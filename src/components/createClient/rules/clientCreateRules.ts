const trigger = 'blur'
import passwordValidation from '../../auth/@actions/passwordValidation'
import { i18n } from '@/composables'
import type { FormItemRule } from 'element-plus'

export default {
  first_name: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  last_name: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
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
  phone: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  business_name: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  job_title: [
    {
      required: true,
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
  about_us: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
} as Record<string, FormItemRule[]>
