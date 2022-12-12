<script setup lang="ts">
  import { i18n } from '@/composables'
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'

  const store = useSummaryTabsStore()
  const aboutBusiness = computed(() => store.getAboutBusiness())

  const editDialog = () => {
    store.setComponent('aboutBusinessForm')
    store.setDialog(true)
  }
</script>

<template>
  <div class="bg-white rounded-lg">
    <div
      class="border-b p-5 px-6 md:pr-6 md:px-12 flex justify-between h-[64px]"
    >
      <p class="font-bold text-base font-red-hat text-[#033541] capitalize">
        {{ i18n.myAccount.aboutBusiness.title }}
      </p>
      <div class="flex gap-1 items-center">
        <i class="fa-solid fa-pen text-xs text-[#10A39C]"></i>
        <a @click="editDialog" class="font-roboto">
          <span class="text-sm">Editar</span>
        </a>
      </div>
    </div>

    <div class="p-5 px-6 md:px-12 mt-3 w-full">
      <div class="form-wrapper">
        <div class="form-item w-full overflow-hidden break-normal">
          <label>{{ i18n.myAccount.aboutBusiness.historyAchievements }}</label>
          <span class="w-full h-auto break-all">
            {{ aboutBusiness.history_achievements }}
          </span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label>{{ i18n.myAccount.aboutBusiness.whyShouldWorkWithYou }}</label>
          <span class="w-full h-auto break-all">{{
            aboutBusiness.why_should_work_with_you
          }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label>{{ i18n.myAccount.aboutBusiness.industry }}</label>
          <span>{{ aboutBusiness.industry }}</span>
        </div>

        <div class="form-item">
          <label>{{ i18n.myAccount.aboutBusiness.quantityWorker }}</label>
          <span>{{ aboutBusiness.quantity_worker }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label>{{ i18n.myAccount.aboutBusiness.logo }}</label>
          <div class="flex items-center gap-3 text-sm mt-2">
            <div
              class="w-[53px] h-[53px] rounded-md border flex items-center justify-center"
            >
              <img
                v-if="aboutBusiness.logo.url"
                class="w-[90%] h-[90%] object-cover rounded-md"
                :src="aboutBusiness.logo.url"
              />

              <div v-else>
                <i class="fa-solid fa-buildings text-[#CDD4D9] text-3xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="form-item">
          <label>{{ i18n.myAccount.aboutBusiness.webSite }}</label>
          <span>{{ aboutBusiness.web_site }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .form-item {
    font-family: 'Roboto', sans-serif;
    @apply flex flex-col text-[15px] mb-5 flex-1;
  }

  .form-wrapper {
    @apply flex flex-col md:flex-row;
  }

  .form-item > label {
    @apply text-[#739098];
  }

  .form-item > span {
    @apply text-[#033541];
  }

  @media (max-width: 768px) {
    .form-item > label {
      @apply text-base !important;
    }

    .form-item > span {
      @apply text-base !important;
    }
  }
</style>
