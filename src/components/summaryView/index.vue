<script setup lang="ts">
  import getAccountInfo from './actions/http/getAccountInfo'
  import useSummaryFormStore from './store'

  const isMounted = ref(false)
  const store = useSummaryFormStore()

  onMounted(async () => {
    await getAccountInfo()
    isMounted.value = true
  })
</script>

<template>
  <div v-if="isMounted" class="w-full h-screen overflow-hidden">
    <summary-breadcumbs class="absolute top-10 left-20 z-10 hidden lg:flex" />
    <component :is="store.getCurrentStep()?.component" />
    <summary-button-actions
      class="absolute z-10 bottom-0 h-[120px] lg:h-[76px] left-0 right-0 overflow-hidden"
    />
  </div>
</template>
