const trigger = 'blur'
import { i18n } from '@/composables'
import type { FormItemRule } from 'element-plus'

export default {
  name: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  type: [
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
  business_name: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  country_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  department_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  city_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  billing_address: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
  contact_number: [
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
      message: i18n.value.formValidationMessages.pleaseInputCorrectEmail,
      trigger: trigger,
    },
  ],
  rut: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger: trigger,
    },
  ],
} as Record<string, FormItemRule[]>
