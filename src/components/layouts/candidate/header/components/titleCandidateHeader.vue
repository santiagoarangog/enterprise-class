<script setup lang="ts">
  import useCandidateLayoutHeader from '../../store'

  const { toggleDrawerCandidate } = useCandidateLayoutHeader()

  const props = defineProps({
    logoWhite: {
      type: Boolean,
      default: false,
    },

    hasCandidateButtonBurger: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <div class="flex gap-3 items-center">
    <div
      v-if="hasCandidateButtonBurger"
      class="text-[#095669] text-2xl text-left lg:hidden mt-1"
    >
      <i class="fa-regular fa-bars" @click="toggleDrawerCandidate(true)"></i>
    </div>

    <div class="w-[93px] md:w-[109px]">
      <logo-vincu-white v-if="props.logoWhite" />
      <logo-vincu v-else />
    </div>

    <div class="flex items-center gap-3 mt-1">
      <div
        class="w-[1px] h-[17px] md:h-[24px]"
        :class="props.logoWhite ? 'bg-white' : 'bg-[#095669]'"
      ></div>

      <h1
        class="font-red-hat text-xs md:text-sm font-semibold tracking-[1.4px]"
        :class="props.logoWhite ? 'text-white' : 'text-[#095669]'"
      >
        CANDIDATOS
      </h1>
    </div>
  </div>
</template>
