<script setup lang="ts">
import { i18n, useMobile } from '@/composables'
import useClientStore from "@/components/createClient/store";

const { isMobile } = useMobile()

const redirectToCurriculumHome = () => {
  useClientStore().setShowVerifyAccountModal(false)
  window.location.href = ('mi-hoja-de-vida');
}
</script>

<template>
  <el-dialog
      :fullscreen="isMobile"
      v-model="true"
      :width="530"
      :close-on-click-modal="true"
      align-center
      center
      class="flex flex-col justify-center items-center"
      @close="redirectToCurriculumHome"
  >
    <div
        class="flex flex-col justify-center items-center text-[#033541] font-red-hat text-center"
    >
      <img src="@/assets/svg/email-verification.svg" alt="email-verification" />

      <div class="font-bold text-[22px] mt-5">
        Subir tu hoja de vida aumenta tus posibilidades
      </div>
      <div class="text-base break-normal mt-3 text-center">
        Si cuentas con hoja de vida en formato Word o PDF adjúntala aquí
      </div>
      <div class="w-full mt-7 text-center md:max-w-[130px]">
        <el-button
            @click="false"
            class="w-full bg-[#FFC915] text-[#033541]"
        >
          Adjuntar HV
        </el-button>
        <el-button
            @click="true"
            class="w-full bg-[#FFC915] text-[#033541]"
        >
          Saltar
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
