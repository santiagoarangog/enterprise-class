<script setup lang="ts">
  import useRules from '../rules/legalRepresentativeRules'
  import { i18n } from '@/composables'
  import type { LegalRepresentativeContract } from '../contracts/legalRepresentativeContract'
  import useMyAccountStore from '@/components/myAccount/store'
  import saveLegalRepresentative from '../actions/http/saveLegalRepresentative'
  import getPersonTypes from '@/actions/http/lists/getPersonTypes'
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'
  import getDocumentTypes from '../actions/http/getDocumentTypes'

  const form = ref()
  const model = ref({} as LegalRepresentativeContract)
  const rules = reactive(useRules)
  const loading = ref(false)
  const myAccountStore = useMyAccountStore()
  const summaryStore = useSummaryTabsStore()
  const documentTypeOptions = computed(() =>
    myAccountStore.getDocumentTypesForSelect()
  )
  const emits = defineEmits(['success'])
  const props = defineProps({
    buttonText: {
      type: String,
      default: () => i18n.value.myAccount.continue,
    },
  })

  const submit = () => {
    form.value.validate(async (valid: any) => {
      if (!valid) return
      loading.value = true
      const result = await saveLegalRepresentative(model.value)
      loading.value = false
      if (result) emits('success')
    })
  }

  const loadData = async () => {
    const data = summaryStore.getLegalRepresentative()
    if (!data) return
    model.value = Object.assign(model.value, {
      first_name: data.first_name,
      last_name: data.last_name,
      document_type_id: data.document_type_id,
      identification_document: data.identification_document,
    } as LegalRepresentativeContract)
  }

  onMounted(async () => {
    await getPersonTypes()
    await getDocumentTypes()
    loadData()
  })
</script>

<template>
  <div
    class="font-roboto w-full text-left opacity-50 text-[13px] mt-5 mb-4 px-6 md:px-12 text-[#033541] leading-[18px]"
  >
    {{ i18n.clientCreate.requiredFieldsText }}
  </div>

  <el-form
    ref="form"
    label-position="top"
    :model="model"
    :rules="rules"
    class="flex flex-col px-6 pb-3 md:px-12 md:pb-6"
    scroll-to-error
  >
    <div class="">
      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.legalRepresentative.firstName"
          prop="first_name"
          class="w-full md:w-1/2"
        >
          <el-input v-model="model.first_name" class="w-full" />
        </el-form-item>

        <el-form-item
          :label="i18n.myAccount.legalRepresentative.lastName"
          prop="last_name"
          class="w-full md:w-1/2"
        >
          <el-input v-model="model.last_name" class="w-full" />
        </el-form-item>
      </div>

      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.legalRepresentative.documentType"
          prop="document_type_id"
          class="w-full md:w-1/2"
        >
          <el-select v-model="model.document_type_id" class="w-full">
            <el-option
              v-for="item in documentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="i18n.myAccount.legalRepresentative.identificationDocument"
          prop="identification_document"
          class="w-full md:w-1/2"
        >
          <el-input v-model="model.identification_document" class="w-full" />
        </el-form-item>
      </div>

      <div class="w-full text-right mt-8">
        <el-button
          :loading="loading"
          class="bg-[#FFC915] w-full md:w-auto"
          @click="submit"
        >
          {{ props.buttonText }}
        </el-button>
      </div>
    </div>
  </el-form>
</template>
