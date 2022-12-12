<script setup lang="ts">
  import useDefaultLayoutStore from '../../store'

  const { toggleDrawer } = useDefaultLayoutStore()

  const props = defineProps({
    logoWhite: {
      type: Boolean,
      default: false,
    },

    hasButtonBurger: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <div class="flex gap-3 items-center">
    <div
      v-if="hasButtonBurger"
      class="text-[#095669] text-2xl text-left lg:hidden mt-1"
    >
      <i class="fa-regular fa-bars" @click="toggleDrawer(true)"></i>
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
        EMPRESAS
      </h1>
    </div>
  </div>
</template>
