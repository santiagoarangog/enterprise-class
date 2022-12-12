const trigger = 'blur'
import { i18n } from '@/composables'
import type { FormItemRule } from 'element-plus'

export default {
  industry_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  quantity_worker_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  web_site: [
    {
      type: 'url',
      message: i18n.value.formValidationMessages.pleaseEnterValidUrl,
      trigger: trigger,
    },
  ],
} as Record<string, FormItemRule[]>
