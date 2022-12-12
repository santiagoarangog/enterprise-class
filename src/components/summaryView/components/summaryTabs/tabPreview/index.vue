<script setup lang="ts">
  import useSummaryTabsStore from '../store'

  const store = useSummaryTabsStore()
  const getGeneralInfo = computed(() => store.getGeneralInfo())
  const getAboutBusiness = computed(() => store.getAboutBusiness())
  const showImage = ref(false)
</script>

<template>
  <div class="p-8 bg-white rounded-lg">
    <div class="flex gap-6 pb-6 border-b border-gray-100">
      <div>
        <figure
          @click="showImage = true"
          class="w-32 h-32 border border-gray-100 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
        >
          <img
            v-if="getAboutBusiness.logo.url"
            class="w-[90%] h-[90%] object-contain rounded-lg"
            :src="getAboutBusiness.logo.url"
          />

          <div v-else>
            <i class="fa-solid fa-buildings text-[#CDD4D9] text-8xl"></i>
          </div>
        </figure>

        <el-dialog v-model="showImage" width="25%">
          <img
            v-if="getAboutBusiness.logo.url"
            class="w-full object-cover rounded-lg"
            :src="getAboutBusiness.logo.url"
          />
        </el-dialog>
      </div>

      <div class="flex flex-col w-full py-4 sm:pr-16">
        <p class="text-xl text-[#033541] font-bold font-red-hat">
          {{ getGeneralInfo.business_name }}
        </p>

        <p class="flex-1 font-red-hat">
          <a :href="getAboutBusiness.web_site" target="_blank">
            <span class="text-base text-[#10A39C]">{{
              getAboutBusiness.web_site
            }}</span>
          </a>
        </p>

        <div
          class="justify-between flex flex-col gap-3 md:gap-0 md:flex-row w-full"
        >
          <p class="text-[15px] text-[#033541] font-red-hat lg:w-[20%]">
            <i class="fa-solid fa-location-dot"></i> {{ getGeneralInfo.city }}
          </p>
          <p class="text-[15px] text-[#033541] font-red-hat lg:w-[60%]">
            <i class="fa-solid fa-industry-windows"></i>
            {{ getAboutBusiness.industry }}
          </p>
          <p class="text-[15px] text-[#033541] font-red-hat lg:w-[20%]">
            <i class="fa-solid fa-people-group"></i>
            {{ getAboutBusiness.quantity_worker }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <p class="mt-8 mb-2 text-center text-[#095669] font-bold font-red-hat">
        Sobre la empresa
      </p>

      <p
        class="text-[15px] text-[#033541] font-red-hat text-justify break-words"
      >
        {{
          getAboutBusiness.history_achievements ||
          'No hay información disponible.'
        }}
      </p>

      <p
        class="mt-8 mb-2 text-center text-[#095669] font-bold font-red-hat break-normal"
      >
        ¿Por qué trabajar en {{ getGeneralInfo.business_name }}?
      </p>
      <p
        class="text-[15px] text-[#033541] font-red-hat text-justify break-words"
      >
        {{
          getAboutBusiness.why_should_work_with_you ||
          'No hay información disponible.'
        }}
      </p>
    </div>
  </div>
</template>
