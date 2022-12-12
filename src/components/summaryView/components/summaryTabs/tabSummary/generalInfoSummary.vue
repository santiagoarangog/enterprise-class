<script setup lang="ts">
  import { i18n } from '@/composables'
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'

  const store = useSummaryTabsStore()
  const getGeneralInfo = computed(() => store.getGeneralInfo())

  const editDialog = () => {
    store.setComponent('generalInfoForm')
    store.setDialog(true)
  }
</script>

<template>
  <div class="bg-white rounded-lg">
    <div
      class="border-b p-5 px-6 md:pr-6 md:px-12 flex justify-between h-[64px]"
    >
      <p class="font-bold text-[#033541] text-base font-red-hat capitalize">
        {{ i18n.myAccount.generalInfo.title }}
      </p>
      <div class="flex gap-1 items-center">
        <i class="fa-solid fa-pen text-xs text-[#10A39C]"></i>
        <a @click="editDialog" class="font-roboto">
          <span class="text-sm">Editar</span>
        </a>
      </div>
    </div>

    <div class="p-5 px-6 md:px-12 mt-2 w-[100%]">
      <div class="form-wrapper">
        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.name }}</label>
          <span>{{ getGeneralInfo.name }}</span>
        </div>

        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.type }} </label>
          <span>{{ getGeneralInfo.type_name }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.documentType }} </label>
          <span>{{ getGeneralInfo.document_type }}</span>
        </div>

        <div class="form-item">
          <label>
            {{ i18n.myAccount.generalInfo.identificationDocument }}
          </label>
          <span>{{ getGeneralInfo.identification_document }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.businessName }}</label>
          <span>{{ getGeneralInfo.business_name }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.country }} </label>
          <span>{{ getGeneralInfo.country }}</span>
        </div>

        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.department }} </label>
          <span>{{ getGeneralInfo.department }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.city }} </label>
          <span>{{ getGeneralInfo.city }}</span>
        </div>

        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.billingAddress }} </label>
          <span>{{ getGeneralInfo.billing_address }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.contactNumber }} </label>
          <span>{{ getGeneralInfo.contact_number }}</span>
        </div>

        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.email }} </label>
          <span>{{ getGeneralInfo.email }}</span>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-item">
          <label> {{ i18n.myAccount.generalInfo.rut }} </label>
          <a :href="getGeneralInfo.rut.url" target="_blank">{{
            getGeneralInfo.rut.file_name
          }}</a>
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

  .form-item > label {
    @apply text-[#739098];
  }

  .form-wrapper {
    @apply flex flex-col md:flex-row;
  }

  .form-item > span {
    @apply text-[#033541]  !important;
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
