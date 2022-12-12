const trigger = 'blur'
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
  document_type_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  identification_document: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
} as Record<string, FormItemRule[]>
