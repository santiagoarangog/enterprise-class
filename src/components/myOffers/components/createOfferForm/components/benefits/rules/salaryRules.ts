const trigger = 'blur'
import { i18n } from '@/composables'
import type { FormItemRule } from 'element-plus'

export default {
  salary: {
    min: [
      {
        required: true,
        message: i18n.value.formValidationMessages.required,
        trigger,
      },
    ],
    max: [
      {
        required: true,
        message: i18n.value.formValidationMessages.required,
        trigger,
      },
    ],
    bonus: [],
  },
} as Record<string, Record<string, FormItemRule[]>>
