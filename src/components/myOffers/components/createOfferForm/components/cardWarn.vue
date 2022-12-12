<script setup lang="ts">
  import { i18n } from '@/composables'

  const t = i18n.value.myOffers.createOffer.cardWarning
</script>

<template>
  <div
    class="font-red-hat lg:w-[302px] max-h-[251px] bg-[#F7FAF9] rounded-2xl p-5 border border-[#F77B39]"
  >
    <div class="flex justify-end lg:hidden">
      <i class="fa-solid fa-times text-[#F77B39]"></i>
    </div>

    <h1 class="text-vincu-warn font-bold">{{ t.remember }}</h1>

    <div class="text-[15px] flex flex-col gap-5 text-vincu-primary">
      <p class="mt-3">
        {{ t.firstParagraph }}
      </p>

      <div>
        <span class="font-medium">{{ t.iconText }}</span>
        <i class="fas fa-eye-slash ml-2 text-[#829BA1]"></i>

        <div>{{ t.secondParagraph }}</div>
      </div>
    </div>
  </div>
</template>
