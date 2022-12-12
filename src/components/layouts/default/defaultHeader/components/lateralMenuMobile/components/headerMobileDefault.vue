<script setup lang="ts">
  import useDefaultLayoutStore from '@/components/layouts/default/store'
</script>
<template>
  <div class="w-full flex items-end justify-between">
    <TitleHeader logo-white />
    <div class="flex flex-col gap-4 text-md text-white relative">
      <div
        class="rounded-full w-8 h-8 flex justify-center items-center cursor-pointer bg-[#367684]"
        @click="useDefaultLayoutStore().toggleDrawer(false)"
      >
        <i class="fa-solid fa-times"></i>
      </div>

      <div
        class="rounded-full w-8 h-8 flex justify-center items-center cursor-pointer bg-[#367684]"
      >
        <i class="fa-solid fa-bell absolute opacity-100"></i>
      </div>
    </div>
  </div>
</template>
