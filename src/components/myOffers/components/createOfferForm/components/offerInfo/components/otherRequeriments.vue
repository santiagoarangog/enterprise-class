<script setup lang="ts">
  import getLanguajes from '@/actions/http/lists/getLanguajes'
  import { i18n } from '@/composables'
  import type IOtherRequeriments from '../contracts/IOtherRequeriments'
  import useListStore from '@/modules/list'
  import getEducationLevels from '@/actions/http/lists/getEducationLevel'
  import getTransportTypes from '@/actions/http/lists/getTransportTypes'
  import type {
    ILanguage,
    IDriverLicence,
  } from '../contracts/IOtherRequeriments'
  import otherRequerimentsRules from '../rules/otherRequerimentsRules'
  import useCreateOfferFormStore from '../../../store'
  import saveOffer from '../../../actions/http/saveOffer'
  import useOfferInfoStore from '../store'

  const form = ref()
  const model = ref({
    driver_license: {} as IDriverLicence,
    showLevelName: false,
  } as IOtherRequeriments)
  const loading = ref(false)
  const isMounted = ref(false)
  const t = i18n.value.myOffers.createOffer.offerInfo.otherRequeriments
  const listStore = useListStore()
  const rules = reactive(otherRequerimentsRules)
  const { nextStep } = useCreateOfferFormStore()
  const { setOtherRequerimentsData, getGeneralInfoData } = useOfferInfoStore()

  const languajes = computed(() => listStore.getLanguagesForSelect())
  const transportTypes = computed(() => listStore.getTransportTypesForSelect())
  const educationLevels = computed(() =>
    listStore.getEducationLevelsForSelect()
  )
  const driverCategories = computed(() => listStore.getDriverCategories() || [])

  const emits = defineEmits(['success'])

  const props = defineProps({
    buttonText: {
      type: String,
      default: () => i18n.value.myAccount.continue,
    },
  })

  const submit = async (): Promise<void> => {
    form.value.validate(async (valid: any) => {
      if (!valid) return
      loading.value = true
      await saveOffer({
        generalInfo: getGeneralInfoData(),
        otherRequeriments: model.value,
      })
      setOtherRequerimentsData(model.value)
      loading.value = false
      nextStep()
    })
  }

  const deleteLanguageMain = (): void => {
    form.value.resetFields(['language_id', 'languageLevelId'])
  }

  const addLanguage = (): void => {
    if (!model.value.languages) model.value.languages = []
    model.value.languages.push({} as ILanguage)
  }

  const deleteLanguageList = (index: number): void => {
    model.value.languages?.splice(index, 1)
  }

  const configCustomRules = (): void => {
    const { languageLevelId, driver_license } = rules
    languageLevelId.push({
      validator: (rule: any, value: any, callback: any) => {
        if (model.value.languageId && model.value.languageId > 0 && !value) {
          callback(new Error(i18n.value.formValidationMessages.required))
        } else callback()
      },
      trigger: 'change',
    } as never)

    driver_license.push({
      validator: (rule: any, value: any, callback: any) => {
        if (
          model.value.driverLicenseStatus &&
          (!model.value.driver_license.level ||
            model.value.driver_license.level.length === 0)
        ) {
          callback(new Error(i18n.value.formValidationMessages.required))
        } else callback()
      },
      trigger: 'change',
    } as never)
  }

  const setLanguageName = (source: any): void => {
    const language = languajes.value.find((l) => l.value === source?.languageId)
    if (language) source.languageName = language.label
  }

  onMounted(async () => {
    configCustomRules()
    isMounted.value = true
    await getLanguajes()
    await getEducationLevels()
    await getTransportTypes()
  })
</script>

<template>
  <div
    class="font-roboto w-full text-left opacity-50 text-[13px] mt-5 mb-4 px-6 lg:px-12 text-[#033541] leading-[18px]"
  >
    {{ i18n.clientCreate.requiredFieldsText }}
  </div>

  <el-form
    v-if="isMounted"
    ref="form"
    label-position="top"
    :model="model"
    :rules="rules"
    class="flex flex-col px-6 pb-3 lg:px-12 lg:pb-6"
    scroll-to-error
  >
    <div>
      <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
        <el-form-item
          :label="t.language"
          prop="languageId"
          class="w-full lg:w-1/2 flex-1"
        >
          <el-select
            @change="setLanguageName(model)"
            filterable
            class="w-full"
            v-model="model.languageId"
          >
            <el-option
              v-for="item in languajes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="capitalize"
            />
          </el-select>
        </el-form-item>

        <div class="flex-1"></div>
      </div>

      <el-form-item
        :label="t.languajeLevel"
        prop="languageLevelId"
        class="w-full"
      >
        <el-radio-group
          v-model="model.languageLevelId"
          class="flex w-full lg:flex-row lg:gap-8 items-start text-left"
        >
          <div
            v-for="(lang, i) in educationLevels"
            :key="i"
            class="w-1/2 lg:w-auto"
          >
            <el-radio :label="lang.id" class="w-full lg:w-auto">{{
              !model.showLevelName ? lang.name : lang.info
            }}</el-radio>
          </div>

          <div></div>
        </el-radio-group>
      </el-form-item>

      <div
        class="font-roboto w-full text-xs lg:text-[13px] text-[#033541] leading-[18px] break-normal"
      >
        <span class="opacity-50 mr-1">{{ t.helpText }}</span>
        <a
          @click="model.showLevelName = !model.showLevelName"
          class="customA"
          >{{ i18n.components.utils.clicHere }}</a
        >
      </div>

      <div class="lg:text-right flex justify-end gap-5">
        <div
          class="w-full rounded-lg lg:w-auto mt-8 text-[#10a39c] font-roboto font-medium text-sm cursor-pointer"
          @click="addLanguage()"
        >
          <i class="fas fa-plus mr-2"></i>
          {{ t.addOtherLanguage }}
        </div>

        <div
          @click="deleteLanguageMain()"
          v-if="model.languageId && model.languageId > 0"
          class="text-right"
        >
          <div
            class="w-full rounded-lg lg:w-auto mt-8 text-[#10a39c] font-roboto font-medium text-sm cursor-pointer"
          >
            <i class="fas fa-trash mr-2"></i>
            {{ i18n.components.utils.delete }}
          </div>
        </div>
      </div>

      <div v-if="model.languages && model.languages.length > 0">
        <div
          v-for="(language, i) in model.languages"
          :key="i"
          class="bg-[#F6F8F8] p-3 rounded mt-5"
        >
          <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
            <el-form-item :label="t.language" class="w-full lg:w-1/2 flex-1">
              <el-select
                @change="setLanguageName(language)"
                filterable
                class="w-full"
                v-model="language.languageId"
              >
                <el-option
                  v-for="item in languajes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="capitalize"
                />
              </el-select>
            </el-form-item>

            <div class="flex-1"></div>
          </div>

          <el-form-item
            :label="t.languajeLevel"
            :prop="`languageLevelId${i}`"
            class="w-full"
          >
            <el-radio-group
              class="flex w-full lg:flex-row lg:gap-8 items-start text-left"
              v-model="language.languageLevelId"
            >
              <div
                v-for="(lang, i) in educationLevels"
                :key="i"
                class="w-1/2 lg:w-auto"
              >
                <el-radio :label="lang.id" class="w-full lg:w-auto">{{
                  language.showLevelName ? lang.info : lang.name
                }}</el-radio>
              </div>

              <div></div>
            </el-radio-group>
          </el-form-item>

          <div
            class="font-roboto w-full text-xs lg:text-[13px] text-[#033541] leading-[18px] break-normal"
          >
            <span class="opacity-50 mr-1">{{ t.helpText }}</span>
            <a
              @click="language.showLevelName = !language.showLevelName"
              class="customA"
              >{{ i18n.components.utils.clicHere }}</a
            >
          </div>

          <div class="text-right">
            <div
              class="w-full rounded-lg lg:w-auto mt-8 text-[#10a39c] font-roboto font-medium text-sm cursor-pointer"
              @click="deleteLanguageList(i)"
            >
              <i class="fas fa-trash mr-2"></i>
              {{ i18n.components.utils.delete }}
            </div>
          </div>
        </div>
      </div>

      <el-divider />

      <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
        <el-form-item
          :label="t.transport"
          class="w-full lg:w-1/2 txtTest"
          prop="transportStatus"
        >
          <el-radio-group
            class="w-[80%] lg:w-[60%] flex justify-between uppercase"
            v-model="model.transportStatus"
          >
            <el-radio :label="true">{{ i18n.components.utils.yes }}</el-radio>
            <el-radio :label="false">{{ i18n.components.utils.no }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="model.transportStatus"
          :label="t.driverLicense"
          class="w-full lg:w-1/2"
          prop="transport_type"
        >
          <el-select
            filterable
            class="w-full"
            v-model="model.driver_license.type"
          >
            <el-option
              v-for="item in transportTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="capitalize"
            />
          </el-select>
        </el-form-item>
      </div>

      <el-divider />

      <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
        <el-form-item
          :label="t.driverLicense"
          class="w-full lg:w-1/2 txtTest"
          prop="driverLicenseStatus"
        >
          <el-radio-group
            class="w-[80%] lg:w-[60%] flex justify-between uppercase"
            v-model="model.driverLicenseStatus"
          >
            <el-radio :label="true">{{ i18n.components.utils.yes }}</el-radio>
            <el-radio :label="false">{{ i18n.components.utils.no }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="w-full"></div>
      </div>

      <el-form-item
        v-if="model.driverLicenseStatus"
        :label="t.category"
        class="w-full"
        prop="driver_license"
      >
        <el-checkbox-group
          v-model="model.driver_license.level"
          class="flex flex-wrap mt-2 w-full lg:flex-row gap-4 items-start text-left"
        >
          <el-checkbox
            v-for="item in driverCategories"
            :key="item"
            :label="item"
            class="capitalize w-auto"
          >
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <div class="w-full text-right mt-8">
        <el-button
          :loading="loading"
          class="bg-[#FFC915] w-full lg:w-auto"
          @click="submit"
        >
          {{ props.buttonText }}
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<style>
  .customA {
    font-family: 'Roboto', sans-serif;
    @apply text-xs lg:text-[13px] font-medium cursor-pointer hover:underline !important;
    color: #10a39c !important;
  }
</style>
