<script setup lang="ts">
  import { i18n, useMobile } from '@/composables'
  const isMobile = useMobile().isMobile
</script>

<template>
  <header class="h-[81px] bg-[#FAF6EF] row-span-2">
    <div class="vin-container flex justify-between items-center h-full">
      <section class="flex items-center justify-start gap-2">
        <title-simple-header />
      </section>

      <section class="flex justify-between">
        <menu-simple-header class="flex items-center justify-between" />
      </section>
    </div>
  </header>
</template>
