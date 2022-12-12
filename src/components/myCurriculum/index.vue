<script setup lang="ts">
import { i18n, useMobile } from '@/composables'
import useProgressBarCurriculumStore from "@/components/myCurriculum/components/createCurriculumForm/store";
import Store from "@/Store";

const isMobile = useMobile().isMobile
const isMounted = ref(false)

const { getCurrentStep } = useProgressBarCurriculumStore()
const currentStep = computed(() => getCurrentStep())


Store().setPreventReload(true)
</script>

<template>
  <section class="flex flex-col justify-center items-center p-5 py-6 bg-[#FAF6EF]">
    <div class="vin-container w-full text-[#033541] font-red-hat text-center md:text-left">
      <div class="lg:flex lg:justify-between md:justify-between mb-1">
        <div class="mt-2">
          <b class="vincu-title">Mi Hoja de Vida</b>
          <div class="vincu-over-title">Una información más completa, te dará mas oportunidades en el proceso</div>
        </div>
        <div class="mt-5">
          <el-button class="bg-[#ffc915] opacity-1" type="primary">
            <template #icon>
              <div class="rounded-full bg-[#FFDA5D] p-2 mr-10">
                <i class="fa-solid fa-download"></i>
              </div>
            </template> Descargar HV</el-button
          >
        </div>
      </div>
    </div>
  </section>

  <section class="text-[#033541]" :class="{ 'vin-container': !isMobile }">
    <div class="flex flex-col gap-4 py-3 pb-10 lg:flex-row lg:gap-16 lg:mt-10">
      <div class="flex flex-col lg:gap-5 px-3 font-red-hat">
        <progress-bar class="w-full"/>
        <visualizer class="hidden md:hidden lg:table-cell"/>
      </div>

      <div class="px-2 lg:max-w-[747px] w-full">
        <keep-alive>
          <component :is="currentStep.component || ''" />
        </keep-alive>
      </div>
    </div>
  </section>
</template>
