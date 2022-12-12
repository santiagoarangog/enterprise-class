<script setup lang="ts">
  import useSummaryTabsStore from '@/components/summaryView/components/summaryTabs/store'
  const store = useSummaryTabsStore()
  const currentComponent = computed(() => store.getComponent())
</script>

<template>
  <general-info-dialog v-if="currentComponent === 'generalInfoForm'" />
  <legal-representative-dialog
    v-if="currentComponent === 'legalRepresentativeForm'"
  />
  <abaout-business-dialog v-if="currentComponent === 'aboutBusinessForm'" />
</template>
