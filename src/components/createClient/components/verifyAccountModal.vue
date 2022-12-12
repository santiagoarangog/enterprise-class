<script setup lang="ts">
  import { i18n, useMobile } from '@/composables'
  import useClientStore from '../store'

  const { isMobile } = useMobile()
  const showModal = computed({
    get: () => useClientStore().getShowVerifyAccountModal(),
    set: (value) => useClientStore().setShowVerifyAccountModal(value),
  })

  const redirectToHomeBusiness = () => {
    useClientStore().setShowVerifyAccountModal(false)
    window.location.href = import.meta.env.VITE_APP_HOME_VINCU_EMPRESAS
  }
</script>

<template>
  <el-dialog
    :fullscreen="isMobile"
    v-model="showModal"
    :width="530"
    :close-on-click-modal="false"
    align-center
    center
    class="flex flex-col justify-center items-center"
    @close="redirectToHomeBusiness"
  >
    <div
      class="flex flex-col justify-center items-center text-[#033541] font-red-hat text-center"
    >
      <img src="@/assets/svg/email-verification.svg" alt="email-verification" />

      <div class="font-bold text-[22px] mt-5">
        {{ i18n.accountVerifications.verifyYourAccount }}
      </div>
      <div class="text-base break-normal mt-3 text-center">
        {{ i18n.accountVerifications.checkYourEmail }}
      </div>
      <div class="w-full mt-7 text-center md:max-w-[130px]">
        <el-button
          @click="showModal = false"
          class="w-full bg-[#FFC915] text-[#033541]"
        >
          {{ i18n.accountVerifications.understood }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
