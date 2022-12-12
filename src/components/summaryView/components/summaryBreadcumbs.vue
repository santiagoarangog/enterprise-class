<script setup lang="ts">
  import useSummaryStore from '../store'

  const { getPercentage, nextStep, previousStep } = useSummaryStore()
  const getPercent = computed(() => getPercentage())
</script>

<template>
  <div class="flex justify-between text-sm gap-5 text-white font-roboto">
    <div
      @click="previousStep()"
      class="item-breacumb"
      :class="{ 'text-green-500': getPercent == 50 }"
    >
      Resumen
    </div>
    <div>&gt</div>
    <div
      class="item-breacumb"
      :class="{ 'text-green-500': getPercent == 100 }"
      @click="nextStep()"
    >
      Seleccionar plan
    </div>
  </div>
</template>

<style scoped>
  .item-breacumb {
    @apply cursor-pointer;
  }
</style>
