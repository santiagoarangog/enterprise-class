<script setup lang="ts">
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'
  import { i18n, useMobile } from '@/composables'

  const store = useSummaryTabsStore()
  const isMobile = useMobile().isMobile

  const openDialog = computed({
    get: () => store.getDialog(),
    set: (value) => store.setDialog(value),
  })
</script>

<template>
  <el-dialog
    id="dialogGeneralInfo"
    v-model="openDialog"
    class="md:w-[747px]"
    :fullscreen="isMobile"
    center
  >
    <div class="px-6 md:px-12 font-red-hat font-bold text-base text-[#033541]">
      <span>Sobre tu empresa</span>
    </div>

    <div class="w-full mt-6 border-t"></div>
    <AboutBusinessForm
      :button-text="i18n.summaryForm.buttonSaveAndClose"
      @success="openDialog = false"
    />
  </el-dialog>
</template>

<style>
  #dialogGeneralInfo .el-dialog__body {
    @apply p-0 !important;
  }
</style>
