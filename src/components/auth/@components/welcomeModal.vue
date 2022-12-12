<script setup lang="ts">
  import { i18n, useMobile } from '@/composables'
  import useAuthStore from '@/components/auth/@store'
  import routesConfig from '@/router/routesConfig'

  const isMobile = useMobile().isMobile
  const showModal = computed({
    get: () => useAuthStore().getShowWelcomeModal(),
    set: (value: boolean) => useAuthStore().hideWelcomeModal(),
  })
  const router = useRouter()

  const goToMyAccount = () => {
    router.push(routesConfig.MyAccount)
  }
</script>

<template>
  <el-dialog
    :fullscreen="isMobile"
    v-model="showModal"
    align-center
    :width="530"
    class="flex flex-col justify-center items-center"
    :close-on-click-modal="false"
  >
    <div
      class="flex flex-col justify-center items-center text-[#033541] font-red-hat text-center"
    >
      <img src="@/assets/svg/check-welcome.svg" alt="check-welcome" />

      <div class="font-bold text-[22px] mt-5 break-normal">
        {{ i18n.authentication.welcomeModal.title }}
      </div>

      <div class="text-base break-normal mt-3 text-center break-normal">
        {{ i18n.authentication.welcomeModal.message }}
      </div>

      <div class="mt-7 text-center flex flex-col items-center justify-center">
        <el-button @click="goToMyAccount" class="bg-[#FFC915] text-[#033541]">
          {{ i18n.authentication.welcomeModal.button }}
        </el-button>

        <div class="mt-6 md:mt-4">
          <a @click="showModal = false">{{
            i18n.authentication.welcomeModal.link
          }}</a>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
