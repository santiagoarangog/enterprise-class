<script setup lang="ts">
  import getCities from '@/actions/http/lists/getCities'
  import getCountries from '@/actions/http/lists/getCountries'
  import getStates from '@/actions/http/lists/getStates'
  import getIndustries from '@/actions/http/lists/getIndustries'
  import { i18n, useMobile } from '@/composables'
  import routesConfig from '@/router/routesConfig'
  import getJobLevels from '@/actions/http/lists/getJobLevels'
  import getJobModalities from '@/actions/http/lists/getJobModalities'
  import getAreas from '@/actions/http/lists/getAreas'
  import useCreateOfferFormStore from './store'
  import Store from '@/Store'

  const isMobile = useMobile().isMobile
  const router = useRouter()
  const t = i18n.value.myOffers.createOffer
  const { getCurrentStep } = useCreateOfferFormStore()
  const currentStep = computed(() => getCurrentStep())

  const goToMyOffers = () => {
    router.push(routesConfig.MyOffers)
  }

  onMounted(async () => {
    await getCountries()
    await getStates()
    await getCities()
    await getIndustries()
    await getJobLevels()
    await getJobModalities()
    await getAreas()
  })

  Store().setPreventReload(true)
</script>

<template>
  <section
    class="flex flex-col justify-center items-center border-t pb-7 pt-4 px-5 lg:px-0 bg-[#FAF6EF]"
  >
    <div
      class="w-full text-[#033541] font-red-hat text-center md:text-left flex items-center"
      :class="{ 'vin-container': !isMobile }"
    >
      <div class="flex items-center gap-4 mt-2">
        <div
          @click="goToMyOffers"
          class="border border-[#033541] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <i class="fas fa-arrow-left text-[#033541] text-xl"></i>
        </div>

        <b class="vincu-title">{{ t.title }}</b>
      </div>
    </div>
  </section>

  <section class="text-[#033541]" :class="{ 'vin-container': !isMobile }">
    <div class="flex flex-col gap-8 py-3 pb-10 lg:flex-row lg:gap-16 lg:mt-10">
      <div class="flex flex-col gap-5 px-3 font-red-hat">
        <card-time-line class="w-full" />
        <card-warn class="w-full" />
      </div>

      <div class="px-2 lg:max-w-[747px] w-full">
        <keep-alive>
          <component :is="currentStep.component || ''" />
        </keep-alive>
      </div>
    </div>
  </section>
</template>
