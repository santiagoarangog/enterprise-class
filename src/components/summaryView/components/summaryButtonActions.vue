<script setup lang="ts">
  import routesConfig from '@/router/routesConfig'
  import useSummaryFormStore from '../store'

  const { getCurrentStep, nextStep, previousStep } = useSummaryFormStore()
  const router = useRouter()

  const setReturn = () => {
    if (getCurrentStep().name === 'stepSummary') {
      router.back()
      return
    }
    previousStep()
  }

  const goToOffer = () => {
    router.push(routesConfig.MyOffers)
  }
</script>

<template>
  <section
    class="bg-[#FAF6EF] w-full flex items-center justify-center lg:justify-end px-2 lg:px-0"
  >
    <div
      class="w-full lg:w-auto lg:mr-40 flex flex-col gap-2 md:flex-row justify-end items-center"
    >
      <el-button class="w-full lg:w-40 btnRegresar" @click="setReturn">
        <span> Regresar </span>
      </el-button>

      <el-button
        v-if="getCurrentStep()?.name == 'stepSummary'"
        class="btnPrimary"
        @click="nextStep()"
      >
        <span> Continuar</span>
      </el-button>

      <el-button v-else class="btnPrimary" @click="goToOffer()">
        <span> Ir a Mis ofertas</span>
      </el-button>
    </div>
  </section>
</template>

<style>
  .btnRegresar {
    @apply w-full lg:w-full border border-[#033541] hover:bg-transparent hover:border-[#033541] !important;
  }

  .btnPrimary {
    @apply bg-[#FFC915] w-full mr-1;
  }
</style>
