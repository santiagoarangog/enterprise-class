<script setup lang="ts">
  import { i18n, useMobile } from '@/composables'
  import getAccountInfo from '../summaryView/actions/http/getAccountInfo'
  import useMyAccountStore from './store'
  import useSummaryTabsStore from '../summaryView/components/summaryTabs/store'
  import useAuthStore from '../auth/@store'
  import routesConfig from '@/router/routesConfig'
  import Store from '@/Store'

  const isMobile = useMobile().isMobile
  const activeTab = ref('myAccount')
  const activeName = ref('generalInfoForm')
  const isMounted = ref(false)
  const myAccountStore = useMyAccountStore()
  const router = useRouter()
  const buttonText = ref('Continuar')
  const authStore = useAuthStore()

  const getFullName = computed(() => authStore.getFullName() || '')

  const isActiveLegalRepresentative = computed(
    () => myAccountStore.state.activeCollapse.legalRepresentative
  )

  const isActiveAboutBusiness = computed(
    () => myAccountStore.state.activeCollapse.aboutBusiness
  )

  const nextCollapse = () => {
    if (activeName.value === 'generalInfoForm') {
      activeName.value = 'legalRepresentativeForm'
    } else if (activeName.value === 'legalRepresentativeForm') {
      activeName.value = 'aboutBusinessForm'
    } else {
      router.push(routesConfig.Summary)
    }
  }

  const loadValidation = async () => {
    await getAccountInfo()
    const {
      allGeneralInfoFieldFilled,
      allLegalRepresentativeFieldFilled,
      allAboutBusinessFieldFilled,
    } = useSummaryTabsStore()

    if (allGeneralInfoFieldFilled())
      myAccountStore.activeLegalRepresentativeCollapse()

    if (allLegalRepresentativeFieldFilled())
      myAccountStore.activeAboutBusinessCollapse()

    if (allLegalRepresentativeFieldFilled() && allAboutBusinessFieldFilled())
      buttonText.value = i18n.value.myAccount.save
  }

  onMounted(async () => {
    await loadValidation()
    isMounted.value = true
    Store().setPreventReload(true)
  })

  onBeforeUnmount(() => {
    Store().setPreventReload(false)
  })
</script>

<template>
  <section class="flex flex-col py-10 bg-[#FAF6EF]">
    <div
      class="vin-container text-[#033541] font-red-hat text-center lg:text-left"
    >
      <div class="vincu-over-title">
        {{ i18n.myAccount.myAccount }}
      </div>

      <div class="mt-2">
        <b class="vincu-title">¡Hola! {{ getFullName }}</b>
      </div>
    </div>
  </section>

  <section class="bg-[#FAF6EF] border-t flex flex-col">
    <el-tabs
      v-model="activeTab"
      :stretch="isMobile"
      id="tabAccount"
      type="card"
      :class="isMobile ? 'w-full' : 'vin-container'"
    >
      <el-tab-pane
        :label="i18n.myAccount.myAccount"
        name="myAccount"
        class="bg-[#E3EFEA]"
      >
      </el-tab-pane>

      <el-tab-pane label="Preferencias de correo" name="emailPreferences" />
      <el-tab-pane label="Cambiar contraseña" name="changePassword" />
    </el-tabs>

    <section ref="content" name="content" class="bg-[#E5EFEA]">
      <div class="flex justify-center items-center py-3">
        <div class="w-full h-full max-w-[747px]">
          <div v-if="activeTab == 'myAccount'" class="flex flex-col gap-6">
            <div class="flex flex-col items-center justify-center">
              <div
                class="flex items-center justify-center mt-8 mb-4 font-red-hat text-[#033541] font-bold text-lg md:text-2xl"
              >
                <img
                  :width="isMobile ? 32 : 36"
                  src="@/assets/svg/miempresa.svg"
                  alt="avatar"
                />
                {{ i18n.myAccount.myBusiness }}
              </div>
            </div>

            <el-collapse
              v-model="activeName"
              accordion
              class="w-full md:w-[747px] py-6 pb-20 px-2 md:px-6"
              v-if="isMounted"
            >
              <el-collapse-item
                :title="i18n.myAccount.generalInfo.title"
                name="generalInfoForm"
                class="w-full"
              >
                <general-info-form
                  :button-text="buttonText"
                  @success="nextCollapse"
                />
              </el-collapse-item>

              <el-collapse-item
                :disabled="!isActiveLegalRepresentative"
                :title="i18n.myAccount.legalRepresentative.title"
                name="legalRepresentativeForm"
              >
                <legal-representative-form
                  :button-text="buttonText"
                  @success="nextCollapse"
                />
              </el-collapse-item>

              <el-collapse-item
                :disabled="!isActiveAboutBusiness"
                :title="i18n.myAccount.aboutBusiness.title"
                name="aboutBusinessForm"
              >
                <about-business-form
                  @success="nextCollapse"
                  :button-text="buttonText"
                />
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style>
  .el-tabs--card > .el-tabs__header {
    border-bottom: 0px;
  }

  #tabAccount {
    height: 52px !important;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    border-bottom: 0px !important;
  }

  #tabAccount .el-tabs__nav {
    @apply flex justify-center items-center !important;
  }

  #tabAccount .el-tabs__item.is-top.is-active {
    font-weight: bold;
    background-color: #f4efe7;
  }

  #tabAccount .el-tabs__nav-wrap::after {
    background-color: transparent !important;
  }

  #tabAccount .el-tabs__header.is-top {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }

  #tabAccount .el-tabs__nav-prev.is-disabled {
    display: none !important;
  }

  #tabAccount .el-tabs__nav-next.is-disabled {
    display: none !important;
  }

  #tabAccount .el-tabs__nav-prev,
  .el-tabs__nav-next {
    width: 35px !important;
    height: 35px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    @apply rounded-full  mx-2 mt-2 bg-white p-2 shadow-lg !important;
    opacity: 100% !important;
    z-index: 100 !important;
  }

  #tabAccount .el-tabs__nav-next svg {
    display: none !important;
  }

  #tabAccount .el-tabs__nav-next::after {
    font-family: 'Font Awesome 6 Pro' !important;
    font-style: normal !important;
    content: '\f105' !important;
    font-weight: bold !important;
    font-size: 17px !important;
    color: #77e0a2 !important;
    margin-right: 4px;
  }

  #tabAccount .el-tabs__nav-prev svg {
    display: none !important;
  }

  #tabAccount .el-tabs__nav-prev::after {
    font-family: 'Font Awesome 6 Pro' !important;
    font-style: normal !important;
    content: '\f104' !important;
    font-weight: bold !important;
    font-size: 17px !important;
    color: #77e0a2 !important;
    margin-right: 5px;
  }

  #tabAccount .el-tabs__nav-wrap.is-scrollable {
    padding: 0px 0px !important;
  }
</style>
