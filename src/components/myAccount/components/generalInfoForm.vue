<script setup lang="ts">
  import type {
    GeneralInfoContract,
    IRut,
  } from '../contracts/generalInfoContract'
  import useRules from '../rules/generalInfoRules'
  import { i18n } from '@/composables'
  import useMyAccountStore from '@/components/myAccount/store'
  import Store from '@/Store'
  import saveGeneralInfo from '../actions/http/saveGeneralInfo'
  import getPersonTypes from '@/actions/http/lists/getPersonTypes'
  import getDocumentTypes from '../actions/http/getDocumentTypes'
  import getCountries from '@/actions/http/lists/getCountries'
  import getStates from '@/actions/http/lists/getStates'
  import getCities from '@/actions/http/lists/getCities'
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'
  import type { FileObjectContract } from './uploadFile.vue'

  const form = ref()
  const model = ref({} as GeneralInfoContract)
  const rules = reactive(useRules)
  const loading = ref(false)
  const myAccountStore = useMyAccountStore()
  const summaryStore = useSummaryTabsStore()
  const fileObject = ref<FileObjectContract>({
    name: null,
    size: 0,
    sizeLabel: '',
    type: null,
    base64: null,
  })
  const isMounted = ref(false)
  const { getCountry } = Store()

  const personTypes = computed(() => Store().getPersonTypesForSelect())
  const documentTypeOptions = computed(() =>
    myAccountStore.getDocumentTypesForSelect()
  )
  const countryOptions = computed(() => Store().getCountriesForSelect())
  const departamentOptions = computed(() =>
    Store().getStatesForSelect(model.value.country_id || 0)
  )

  const cityOptions = computed(() =>
    Store().getCitiesForSelect(
      model.value.country_id || 0,
      model.value.department_id || 0
    )
  )

  const emits = defineEmits(['success'])
  const props = defineProps({
    buttonText: {
      type: String,
      default: () => i18n.value.myAccount.continue,
    },
  })

  const submit = async () => {
    form.value.validate(async (valid: any) => {
      if (!valid) {
        return
      }
      loading.value = true

      const newModel = Object.assign({}, model.value)

      if (
        !model.value.rut?.file ||
        !model.value.rut?.name ||
        !model.value.rut?.type
      ) {
        newModel.rut = {} as IRut
      }

      const result = await saveGeneralInfo(newModel)
      loading.value = false
      if (result) emits('success')
    })
  }

  const clearDepartments = () => {
    form.value.resetFields(['department_id', 'city_id'])
  }

  const clearCities = () => {
    form.value.resetFields(['city_id'])
  }

  const loadRut = (rut: FileObjectContract) => {
    const onlyBase64 = rut.base64?.split(',')[1]
    const onlyType = rut.type?.split('/')[1]
    const fileName = rut.name

    model.value.rut = {
      file: onlyBase64 || '',
      type: onlyType || '',
      name: fileName || '',
    }
    fileObject.value = rut
  }

  const loadData = () => {
    if (!summaryStore.getGeneralInfo()) return
    const data = summaryStore.getGeneralInfo()

    model.value = Object.assign(model.value, {
      name: data.name,
      type: data.type,
      document_type_id: data.document_type_id,
      identification_document: data.identification_document,
      business_name: data.business_name,
      country_id: data.country_id,
      department_id: data.department_id,
      city_id: data.city_id,
      billing_address: data.billing_address,
      contact_number: data.contact_number,
      email: data.email,
      rut: {
        file: data.rut.file_name,
      },
    } as unknown as GeneralInfoContract)

    fileObject.value = {
      name: data.rut.file_name,
      size: data.rut.file_size,
      sizeLabel: '',
      type: '',
      base64: '',
    }
  }

  onMounted(async () => {
    await getCountries()
    await getStates()
    await getCities()
    await getDocumentTypes()
    await getPersonTypes()
    loadData()
    isMounted.value = true
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
    class="flex flex-col px-6 pb-3 md:px-12 md:pb-6"
    :rules="rules"
    scroll-to-error
  >
    <div>
      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.generalInfo.name"
          prop="name"
          class="w-full md:w-1/2"
        >
          <el-input v-model="model.name" class="w-full" />
        </el-form-item>

        <el-form-item
          :label="i18n.myAccount.generalInfo.type"
          prop="type"
          class="w-full md:w-1/2"
        >
          <el-radio-group v-model="model.type" class="w-full">
            <el-radio
              v-for="(item, i) in personTypes"
              :key="i"
              :label="item.value"
              :name="item.label"
              class="flex-1 w-full capitalize"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.generalInfo.documentType"
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
          :label="i18n.myAccount.generalInfo.identificationDocument"
          prop="identification_document"
          class="w-full md:w-1/2"
        >
          <el-input v-model="model.identification_document" class="w-full" />
        </el-form-item>
      </div>

      <el-form-item
        :label="i18n.myAccount.generalInfo.businessName"
        prop="business_name"
        class="w-full md:w-1/2"
      >
        <template #label="{ label }">
          {{ label }}
          <el-tooltip
            effect="dark"
            placement="top-start"
            content="Nombre de la empresa como figura en la Cámara de Comercio"
          >
            <template #content>
              <div class="text-[14px] md:text-xs font-roboto w-48">
                {{ i18n.myAccount.generalInfo.businnesNamePopOverMessage }}
              </div>
            </template>

            <i
              class="fa-solid fa-circle-info cursor-pointer text-[#095669]"
            ></i>
          </el-tooltip>
        </template>
        <el-input v-model="model.business_name" class="w-full" />
      </el-form-item>

      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.generalInfo.country"
          prop="country_id"
          class="w-full md:w-1/2"
        >
          <el-select
            @change="clearDepartments()"
            v-model="model.country_id"
            class="w-full"
          >
            <el-option
              v-for="item in countryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="capitalize"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="i18n.myAccount.generalInfo.department"
          prop="department_id"
          class="w-full md:w-1/2"
        >
          <el-select
            v-model="model.department_id"
            class="w-full"
            @change="clearCities()"
            filterable
          >
            <el-option
              v-for="item in departamentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="capitalize"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.generalInfo.city"
          prop="city_id"
          class="w-full md:w-1/2"
        >
          <el-select filterable v-model="model.city_id" class="w-full">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="capitalize"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="i18n.myAccount.generalInfo.billingAddress"
          prop="billing_address"
          class="w-full md:w-1/2"
        >
          <el-input v-model="model.billing_address" class="w-full" />
        </el-form-item>
      </div>

      <div class="flex flex-col md:flex-row md:gap-[30.99px]">
        <el-form-item
          :label="i18n.myAccount.generalInfo.contactNumber"
          prop="contact_number"
          class="w-full md:w-1/2"
        >
          <el-input
            v-model="model.contact_number"
            class="w-full"
            type="tel"
            maxlength="12"
          >
            <template #prefix>
              <div class="flex gap-1 justify-center items-center">
                <component :is="getCountry().icon" class="w-4" />
                <span>{{ getCountry().code }}</span>
              </div>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item
          :label="i18n.myAccount.generalInfo.email"
          prop="email"
          class="w-full md:w-1/2"
        >
          <template #label="{ label }">
            {{ label }}
            <el-tooltip effect="dark" placement="top-start">
              <template #content>
                <div class="text-[14px] md:text-xs font-roboto w-44">
                  {{ i18n.myAccount.generalInfo.emailPopOverMessage }}
                </div>
              </template>

              <i
                class="fa-solid fa-circle-info cursor-pointer text-[#095669]"
              ></i>
            </el-tooltip>
          </template>

          <el-input
            v-model="model.email"
            class="w-full"
            type="email"
            required
          />
        </el-form-item>
      </div>

      <div class="text-center flex justify-center items-center">
        <el-form-item
          :label="i18n.myAccount.generalInfo.rut"
          prop="rut"
          class="w-full"
        >
          <upload-file
            :size="2100000"
            accept=".doc,.docx,.pdf"
            @upload="loadRut"
            :value="fileObject"
            v-if="isMounted"
            @remove="model.rut = null"
          />
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
