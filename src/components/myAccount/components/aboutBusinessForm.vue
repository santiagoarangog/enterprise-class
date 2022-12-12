<script setup lang="ts">
  import useRules from '../rules/aboutBusinessRules'
  import { i18n } from '@/composables'
  import type { AboutBusinessContract } from '../contracts/aboutBusinessContract'
  import getIndustries from '@/actions/http/lists/getIndustries'
  import useMyAccountStore from '@/components/myAccount/store'
  import getQuantityWorkers from '../actions/http/getQuantityWorkers'
  import saveAboutbusiness from '../actions/http/saveAboutbusiness'
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'
  import type { FileObjectContract } from './uploadFile.vue'
  import type { IRut } from '../contracts/generalInfoContract'

  const form = ref()
  const model = ref({} as AboutBusinessContract)
  const rules = reactive(useRules)
  const loading = ref(false)
  const store = useMyAccountStore()
  const summaryStore = useSummaryTabsStore()
  const industries = computed(() => store.getIndustriesForSelect())
  const quantityWorkers = computed(() => store.getQuantityWorkersForSelect())
  const emits = defineEmits(['success'])
  const props = defineProps({
    buttonText: {
      type: String,
      default: () => i18n.value.myAccount.continue,
    },
  })
  const isMounted = ref(false)

  const fileObject = ref<FileObjectContract>({
    name: null,
    size: 0,
    sizeLabel: '',
    type: null,
    base64: null,
  })

  const submit = () => {
    form.value.validate(async (valid: any) => {
      if (!valid) return
      loading.value = true

      const newModel = Object.assign({}, model.value)

      if (!model.value.logo) {
        newModel.logo = null
      } else if (
        !model.value.logo.file ||
        !model.value.logo.name ||
        !model.value.logo.type
      ) {
        newModel.logo = {} as IRut
      }

      const result = await saveAboutbusiness(newModel)
      loading.value = false
      if (result) emits('success')
    })
  }

  const loadFile = (rut: FileObjectContract) => {
    const onlyBase64 = rut.base64?.split(',')[1]
    const onlyType = rut.type?.split('/')[1]
    const fileName = rut.name

    model.value.logo = {
      file: onlyBase64 || '',
      type: onlyType || '',
      name: fileName || '',
    }

    fileObject.value = rut
  }

  const loadData = () => {
    const data = summaryStore.getAboutBusiness()
    if (!data) return
    model.value = Object.assign(model.value, {
      history_achievements: data.history_achievements,
      why_should_work_with_you: data.why_should_work_with_you,
      industry_id: data.industry_id,
      quantity_worker_id: data.quantity_worker_id,
      logo: {
        file: data.logo.file_name,
      },
      web_site: data.web_site,
    })

    fileObject.value = {
      name: data.logo.file_name,
      size: data.logo.file_size,
      sizeLabel: '',
      type: '',
      base64: '',
      url: data.logo.url,
    }
  }

  onMounted(async () => {
    await getIndustries()
    await getQuantityWorkers()
    loadData()
    isMounted.value = true
  })
</script>

<template>
  <div
    class="font-roboto w-full text-left text-[13px] mt-5 mb-4 px-6 md:px-12 text-[#033541] leading-[18px]"
  >
    <div class="opacity-50">
      {{ i18n.clientCreate.requiredFieldsText }}
    </div>

    <div
      class="flex items-center gap-3 font-roboto text-sm text-[#033541] bg-[#FFB99352] p-3 px-6 rounded-lg mt-5"
    >
      <div>
        <i class="fa-duotone fa-bullhorn text-[#F77B39] text-2xl"></i>
      </div>
      <div class="ml-2">
        <p>
          {{ i18n.myAccount.aboutBusiness.alertMessage }}
        </p>
      </div>
    </div>
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
      <el-form-item
        :label="i18n.myAccount.aboutBusiness.historyAchievements"
        prop="history_achievements"
      >
        <el-input
          type="textarea"
          v-model="model.history_achievements"
          class="w-full"
          :rows="5"
          maxlength="800"
          show-word-limit
        />
      </el-form-item>

      <el-form-item
        :label="i18n.myAccount.aboutBusiness.whyShouldWorkWithYou"
        prop="why_should_work_with_you"
      >
        <el-input
          type="textarea"
          v-model="model.why_should_work_with_you"
          class="w-full"
          :rows="5"
          maxlength="800"
          show-word-limit
        />
      </el-form-item>

      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.aboutBusiness.industry"
          prop="industry_id"
          class="w-full md:w-1/2"
        >
          <el-select v-model="model.industry_id" class="w-full">
            <el-option
              v-for="item in industries"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="i18n.myAccount.aboutBusiness.quantityWorker"
          prop="quantity_worker_id"
          class="w-full md:w-1/2"
        >
          <el-select v-model="model.quantity_worker_id" class="w-full">
            <el-option
              v-for="item in quantityWorkers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="text-center flex justify-center items-center">
        <el-form-item
          :label="i18n.myAccount.aboutBusiness.logo"
          prop="logo"
          class="w-full"
        >
          <upload-file
            view-image
            accept=".png,.jpg,.jpeg"
            @upload="loadFile"
            :size="5240000"
            :value="fileObject"
            v-if="isMounted"
            @remove="model.logo = null"
          />
        </el-form-item>
      </div>

      <!-- website -->

      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.aboutBusiness.webSite"
          prop="web_site"
          class="w-full md:w-1/2 flex-1"
        >
          <el-input type="url" v-model="model.web_site" />
        </el-form-item>

        <div class="flex-1"></div>
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
