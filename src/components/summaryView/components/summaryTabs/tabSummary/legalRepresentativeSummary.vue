<script setup lang="ts">
  import { i18n, useMobile } from '@/composables'
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'

  const store = useSummaryTabsStore()
  const getLegalRepresentative = computed(() => store.getLegalRepresentative())

  const editDialog = () => {
    store.setComponent('legalRepresentativeForm')
    store.setDialog(true)
  }
</script>

<template>
  <div class="bg-white rounded-lg">
    <div
      class="border-b p-5 px-6 md:pr-6 md:px-12 flex justify-between h-[64px]"
    >
      <p class="font-bold text-base font-red-hat text-[#033541] capitalize">
        {{ i18n.myAccount.legalRepresentative.title }}
      </p>
      <div class="flex gap-1 items-center">
        <i class="fa-solid fa-pen text-xs text-[#10A39C]"></i>
        <a @click="editDialog" class="font-roboto">
          <span class="text-sm">Editar</span>
        </a>
      </div>
    </div>

    <div class="p-5 px-6 md:px-12 mt-3 w-[100%]">
      <div class="form-wrapper">
        <div class="form-item">
          <label>{{ i18n.myAccount.legalRepresentative.firstName }} </label>
          <span>{{ getLegalRepresentative.first_name }}</span>
        </div>

        <div class="form-item">
          <label>{{ i18n.myAccount.legalRepresentative.lastName }} </label>
          <span>{{ getLegalRepresentative.last_name }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label>{{ i18n.myAccount.legalRepresentative.documentType }} </label>
          <span>{{ getLegalRepresentative.document_type }}</span>
        </div>

        <div class="form-item">
          <label
            >{{ i18n.myAccount.legalRepresentative.identificationDocument }}
          </label>
          <span>{{ getLegalRepresentative.identification_document }}</span>
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
