<script setup lang="ts">
  import { i18n } from '@/composables'
  import generalInfoOfferFormRules from '../rules/generalInfoOfferFormRules'
  import useListStore from '@/modules/list'
  import getRoles from '@/actions/http/lists/getRoles'
  import useOfferInfoStore, { EOfferInfoForm } from '../store'
  import { ElMessage } from 'element-plus'
  import saveOffer from '../../../actions/http/saveOffer'
  import type IGeneralInfoOfferForm from '../contracts/IGeneralInfoOfferForm'
  import Store from '@/Store'

  const form = ref()
  const model = ref({
    hide_company_info: false,
  } as IGeneralInfoOfferForm)
  const rules = reactive(generalInfoOfferFormRules)
  const loading = ref(false)
  const isMounted = ref(false)
  const currentCountry = computed(() => Store().getCountryHeader())

  const listStore = useListStore()

  const { setGeneralInfoStatus, setCurrentForm, setGeneralInfoData } =
    useOfferInfoStore()

  const industries = computed(() => listStore.getIndustriesForSelect())
  const areas = computed(() => listStore.getAreasForSelect())
  const roles = computed(() => listStore.getRolesForSelect())
  const jobLevels = computed(() => listStore.getJobLevelsForSelect())
  const modalities = computed(() => listStore.getJobModalitiesForSelect())
  const locations = computed(() => listStore.getLocations())

  const t = i18n.value.myOffers.createOffer.offerInfo.generalInfo
  const tCountry = i18n.value.country

  const countryOptions = computed(() => listStore.getCountriesForSelect())
  const departamentOptions = computed(() =>
    listStore.getStatesForSelect(model.value?.country_id || 0)
  )

  const cityOptions = computed(() =>
    listStore.getCitiesForSelect(
      model.value?.country_id || 0,
      model.value?.department_id || 0
    )
  )

  const emits = defineEmits(['success'])

  const props = defineProps({
    buttonText: {
      type: String,
      default: () => i18n.value.myAccount.continue,
    },
  })

  const clearDepartments = (): void => {
    form.value.resetFields(['department_id', 'city_id'])
  }

  const clearCities = (): void => {
    form.value.resetFields(['city_id'])
  }

  const submit = (): void => {
    form.value.validate(async (valid: any) => {
      if (!valid) return
      loading.value = true
      await saveOffer({ generalInfo: model.value })
      setGeneralInfoStatus(true)
      setCurrentForm(EOfferInfoForm.otherRequeriments)
      setGeneralInfoData(model.value)
      loading.value = false
      ElMessage.success('Success')
    })
  }

  const clearLocations = (): void => {
    model.value.location = []
    model.value.cities = []
    form.value.resetFields([
      'location_id',
      'country_id',
      'city_id',
      'department_id',
    ])

    model.value.country_id =
      model.value.city_id =
      model.value.department_id =
      model.value.location_id =
        undefined

    setCurrentLocation()
  }

  const setCurrentLocation = (): void => {
    if (model.value.job_modality_id == 32) {
      countryOptions.value.forEach((row) => {
        const name = row.label
        if (currentCountry.value == 'co' && name == 'Colombia')
          model.value.country_id = row.value
        else if (currentCountry.value == 'mx' && name == 'México')
          model.value.country_id = row.value
      })
    }
  }

  onMounted(async () => {
    isMounted.value = true
    await getRoles()
  })
</script>

<template>
  <div
    class="font-roboto w-full text-left opacity-50 text-[13px] mt-5 mb-4 px-6 lg:px-12 text-[#033541] leading-[18px]"
  >
    {{ i18n.clientCreate.requiredFieldsText }}
  </div>

  <el-form
    ref="form"
    label-position="top"
    :model="model"
    class="flex flex-col px-6 pb-3 lg:px-12 lg:pb-6"
    :rules="rules"
    scroll-to-error
    v-if="isMounted"
  >
    <div>
      <el-form-item :label="t.name" prop="name" class="w-full">
        <el-input
          maxlength="55"
          type="text"
          class="w-full"
          v-model="model.name"
        />
      </el-form-item>

      <el-form-item :label="t.description" prop="description" class="w-full">
        <el-input
          type="textarea"
          :rows="5"
          maxlength="800"
          minlength="150"
          show-word-limit
          class="w-full"
          v-model="model.description"
        />
      </el-form-item>

      <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
        <el-form-item
          :label="t.work_sector"
          prop="work_sector_id"
          class="w-full lg:w-1/2"
        >
          <el-select filterable class="w-full" v-model="model.work_sector_id">
            <el-option
              v-for="item in industries"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="capitalize"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="t.work_area"
          prop="work_area_id"
          class="w-full lg:w-1/2"
        >
          <el-select filterable class="w-full" v-model="model.work_area_id">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="capitalize"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
        <el-form-item
          :label="t.work_role"
          prop="work_role_id"
          class="w-full lg:w-1/2 flex-1"
        >
          <el-select filterable class="w-full" v-model="model.work_role_id">
            <el-option
              v-for="item in roles"
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
        :label="t.position_level"
        prop="position_level_id"
        class="w-full"
      >
        <template #label="{ label }">
          {{ label }}
          <i class="fas fa-eye-slash ml-1 text-xs text-[#F77B39]"></i>
        </template>

        <el-radio-group
          v-model="model.position_level_id"
          class="flex flex-col w-full lg:flex-row justify-between items-start text-left"
        >
          <el-radio
            v-for="(level, i) in jobLevels"
            :key="i"
            :label="level.id"
            class="w-full lg:w-auto"
            >{{ level.name }}

            <el-tooltip v-if="level.info" effect="dark" placement="top-start">
              <template #content>
                <div class="text-[14px] lg:text-xs font-roboto w-44">
                  {{ level.info }}
                </div>
              </template>

              <i
                class="fa-solid fa-circle-info cursor-pointer text-[#095669]"
              ></i>
            </el-tooltip>
          </el-radio>
          <div></div>
        </el-radio-group>
      </el-form-item>

      <el-divider />

      <el-form-item
        :label="t.job_modality"
        prop="job_modality_id"
        class="w-full"
      >
        <el-radio-group
          v-model="model.job_modality_id"
          class="w-full flex flex-col lg:flex-row justify-start"
          @change="clearLocations"
        >
          <el-radio
            v-for="(model, i) in modalities"
            :key="i"
            :label="model.value"
            class="text-left w-full lg:w-auto"
            >{{ model.label }}</el-radio
          >
          <div></div>
        </el-radio-group>
      </el-form-item>

      <div v-if="model.job_modality_id">
        <div v-if="model.job_modality_id == 31">
          <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
            <el-form-item
              :label="t.location"
              prop="location_id"
              class="w-full lg:w-1/2 flex-1"
            >
              <el-select v-model="model.location_id" filterable class="w-full">
                <el-option
                  v-for="item in locations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="capitalize"
                />
              </el-select>
            </el-form-item>

            <div class="flex-1"></div>
          </div>
        </div>

        <div v-else>
          <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
            <el-form-item
              :label="tCountry.country"
              prop="country_id"
              class="w-full lg:w-1/2"
            >
              <el-select
                @change="clearDepartments()"
                v-model="model.country_id"
                class="w-full"
                :disabled="model.job_modality_id == 32"
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
              :label="tCountry.state"
              prop="department_id"
              class="w-full lg:w-1/2"
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

          <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
            <el-form-item
              :label="tCountry.city"
              prop="city_id"
              class="w-full lg:w-1/2 flex-1"
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

            <div class="flex-1"></div>
          </div>
        </div>
      </div>

      <el-divider />

      <div class="flex flex-col lg:flex-row lg:gap-[30.99px]">
        <el-form-item
          :label="t.hide_company_info"
          prop="hide_company_info"
          class="w-full lg:w-1/2 txtTest"
        >
          <template #label="{ label }">
            {{ label }}
            <el-tooltip effect="dark" placement="top-start">
              <template #content>
                <div class="text-[14px] lg:text-xs font-roboto w-44">
                  {{ t.hide_company_info_tooltip }}
                </div>
              </template>

              <i
                class="fa-solid fa-circle-info cursor-pointer text-[#033541] icon"
              ></i>
            </el-tooltip>
          </template>

          <el-radio-group
            v-model="model.hide_company_info"
            class="w-[60%] flex justify-between uppercase"
          >
            <el-radio :label="true">{{ i18n.components.utils.yes }}</el-radio>
            <el-radio :label="false">{{ i18n.components.utils.no }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          :label="t.vancancy_number"
          prop="vancancy_number"
          class="w-full lg:w-1/2"
        >
          <template #label="{ label }">
            {{ label }}
            <i class="fas fa-eye-slash ml-1 text-xs text-[#F77B39]"></i>
          </template>

          <el-input
            v-model="model.vancancy_number"
            type="number"
            class="w-full input-number-clear"
            :min="1"
            :max="999999999"
          />
        </el-form-item>
      </div>

      <div class="w-full text-right mt-8">
        <el-button
          :loading="loading"
          class="bg-[#FFC915] w-full lg:w-auto"
          @click="submit()"
        >
          {{ props.buttonText }}
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<style scoped>
  .txtTest > label .icon {
    opacity: 100% !important;
    color: #033541 !important;
  }
</style>
