<script setup lang="ts">
  import { i18n } from '@/composables'
  import {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElMessage,
    ElRadio,
    ElRadioGroup,
  } from 'element-plus'
  import salaryRules from './rules/salaryRules'
  import Store from '@/Store'
  import useListStore from '@/modules/list'
  import saveOffer from '../../actions/http/saveOffer'
  import type ISalaryForm from './contracts/ISalaryForm'
  import useOfferInfoStore from '../offerInfo/store'
  import useToLocaleMoney from '@/actions/toLocaleMoney'

  const t = i18n.value.myOffers.createOffer.benefits.salary
  const rules = reactive(salaryRules)
  const model = ref({ salary: { min: null, max: null } } as ISalaryForm)
  const form = ref()
  const loading = ref(false)
  const isMounted = ref(false)
  const { getGeneralInfoData, getOtherRequerimentsData } = useOfferInfoStore()
  const salaryConfig = useListStore().getSalaryMain()

  const props = defineProps({
    buttonText: {
      type: String,
      required: false,
      default: 'Continuar',
    },
  })

  const rulesSalaryMin = computed(() => [
    {
      require: true,
      message: i18n.value.formValidationMessages.required,
      trigger: 'blur',
    },
    { validator: setMinSalaryRule, trigger: 'change' },
  ])

  const rulesSalaryMax = computed(() => [
    {
      require: true,
      message: i18n.value.formValidationMessages.required,
      trigger: 'blur',
    },
    {
      validator: setMaxSalaryRule,
      trigger: 'change',
    },
  ])

  const setMinSalaryRule = (rule: any, value: any, callback: any) => {
    if (value < salaryConfig.range.min)
      callback(new Error(`${t.minSalary} ${salaryConfig.range.min}`))

    if (!model.value.salary.max) callback()

    if (!value) callback(new Error(i18n.value.formValidationMessages.required))

    if (model.value.salary.max && value > model.value.salary.max)
      callback(new Error(t.minSalaryError))

    callback()
  }

  const setMaxSalaryRule = (rule: any, value: any, callback: any) => {
    if (model.value.salary.min && value < model.value.salary.min)
      callback(new Error(`${t.maxSalary} ${model.value.salary.min}`))

    callback()
  }

  const configCustomRules = (): void => {
    const { bonus } = rules.salary
    bonus.push({
      validator: (rule: any, value: any, callback: any) => {
        if (model.value.bonuses && !value) {
          callback(new Error(i18n.value.formValidationMessages.required))
        } else {
          callback()
        }
      },
      trigger: 'change',
    } as never)
  }

  const submit = async (): Promise<void> => {
    form.value.validate(async (valid: any) => {
      if (!valid) return
      loading.value = true
      await saveOffer({
        generalInfo: getGeneralInfoData(),
        otherRequeriments: getOtherRequerimentsData(),
        salary: model.value,
      })
      loading.value = false
      ElMessage.success('Success')
    })
  }

  onMounted(() => {
    configCustomRules()
    isMounted.value = true
  })
</script>

<template>
  <el-form
    v-if="isMounted"
    ref="form"
    label-position="top"
    :model="model"
    class="flex flex-col px-6 pb-3 lg:px-12 lg:pb-6"
    :rules="rules"
  >
    <div class="py-4 mb-4">
      <p class="text-[13px] text-[#819AA0] mb-2">
        {{ i18n.clientCreate.requiredFieldsText }}
      </p>
      <p class="text-[#4E717A] text-[14px] mt-4 lg:mt-2 font-semibold">
        {{ t.salary }}
        {{
          Store().getCountryHeader() === 'co' ? '(COP)' : '(Pesos Mexicanos)'
        }}
      </p>

      <div class="flex flex-col lg:gap-6 lg:flex-row">
        <div class="flex-1">
          <el-form-item
            :label="t.from"
            prop="salary.min"
            class="flex flex-col justify-start w-full vnvInput md:w-1/2"
            :rules="rulesSalaryMin"
          >
            <el-input v-model="model.salary.min" class="w-full" placeholder="0">
            </el-input>
          </el-form-item>
        </div>

        <div class="flex-1">
          <el-form-item
            :label="t.to"
            prop="salary.max"
            class="flex flex-col justify-start w-full vnvInput md:w-1/2"
            :rules="rulesSalaryMax"
          >
            <el-input
              type="number"
              v-model="model.salary.max"
              class="w-full input-number-clear"
              placeholder="0"
            >
              <template #prefix> $ </template>
            </el-input>
          </el-form-item>
        </div>
      </div>
    </div>

    <div>
      <div
        class="flex flex-col justify-between gap-6 mt-8 lg:flex-row lg:mt-2 lg:mb-4"
      >
        <div class="flex flex-col w-full lg:w-1/2">
          <p class="text-sm text-[#4E717A] mb-2">{{ t.bonuses }}</p>
          <el-radio-group
            v-model="model.bonuses"
            class="flex justify-between w-40 uppercase"
          >
            <el-radio class="normal-case" :label="true">{{
              i18n.components.utils.yes
            }}</el-radio>
            <el-radio class="normal-case" :label="false">{{
              i18n.components.utils.no
            }}</el-radio>
          </el-radio-group>
        </div>

        <div class="flex flex-col w-full lg:w-1/2" v-if="model.bonuses">
          <p class="text-sm text-[#4E717A] mb-2">{{ t.bonusValue }}</p>
          <el-form-item
            prop="salary.bonus"
            class="flex flex-col justify-start w-full vnvInput md:w-1/2"
          >
            <el-input
              v-model="model.salary.bonus"
              class="w-full"
              placeholder="0"
            >
              <template #prefix> $ </template>
            </el-input>
          </el-form-item>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8 mb-10 lg:mt-0 lg:mb-4">
      <el-button
        @click="submit"
        class="bg-[#FFC915] py-2 px-6 rounded-full w-full lg:w-auto"
        :loading="loading"
      >
        {{ props.buttonText }}
      </el-button>
    </div>
  </el-form>
</template>

<style>
  .input-number-clear > div > input[type='number']::-webkit-inner-spin-button,
  .input-number-clear > div > input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input-number-clear > div > input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
