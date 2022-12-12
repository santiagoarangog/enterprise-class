<script setup lang="ts">
  import { useMobile } from '@/composables'
  const isMobile = useMobile().isMobile
</script>

<template>
  <div v-if="!isMobile" class="flex items-center justify-center">
    <ul class="flex gap-8 text-[rgb(9,86,105)] font-normal font-red-hat menu">
      <li>Mis ofertas</li>
    </ul>

    <div class="w-[1px] h-[24px] bg-gray-300 mx-6"></div>
    <user-icons-header />
  </div>
</template>

<style scoped>
  .menu li {
    font-size: 15px !important;
  }
  .menu li:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
