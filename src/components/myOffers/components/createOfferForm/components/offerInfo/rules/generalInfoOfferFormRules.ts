const trigger = 'blur'
import { i18n } from '@/composables'
import type { FormItemRule } from 'element-plus'
import {
  isEmpty,
  isMobile,
  isEmail,
  numberMustBeGreaterThanZero,
  isUrl,
} from '@/actions/validators'

export const countryRules: FormItemRule[] = [
  {
    required: true,
    message: i18n.value.formValidationMessages.required,
    trigger,
  },
]

export default {
  name: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
    {
      validator: (rule: FormItemRule, value: string, callback: any) => {
        if (
          isEmpty(value) ||
          isEmail(value) ||
          isMobile(value) ||
          isUrl(value)
        ) {
          callback(
            new Error(
              i18n.value.formValidationMessages.rememberNoNumbersLinksEmailsEmoticonsOrDiscriminatoryContent
            )
          )
        }

        callback()
      },
      trigger,
    },
  ],

  description: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
    {
      min: 150,
      message: `La descripción ${i18n.value.formValidationMessages.minCharacters} 150`,
      trigger,
    },
    {
      validator: (rule: FormItemRule, value: string, callback: any) => {
        if (
          isEmpty(value) ||
          isEmail(value) ||
          isMobile(value) ||
          isUrl(value)
        ) {
          callback(
            new Error(
              i18n.value.formValidationMessages.rememberNoNumbersLinksEmailsEmoticonsOrDiscriminatoryContent
            )
          )
        }

        callback()
      },
      trigger,
    },
  ],

  work_sector_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],

  work_area_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],

  work_role_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],

  position_level_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],

  job_modality_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],

  vancancy_number: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },

    {
      validator: (rule: FormItemRule, value: string, callback: any) => {
        if (!numberMustBeGreaterThanZero(Number(value))) {
          callback(
            new Error(
              i18n.value.formValidationMessages.numberMustBeGreaterThanZero
            )
          )
        }

        callback()
      },
      trigger,
    },
  ],
  country_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],
  department_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],
  city_id: [
    {
      required: true,
      message: i18n.value.formValidationMessages.required,
      trigger,
    },
  ],
} as Record<string, FormItemRule[]>
