<script setup lang="ts">
  const url = ref('')
  url.value = import.meta.env.VITE_APP_HOME_VINCU_EMPRESAS
  const props = defineProps({
    size: {
      type: Number,
      default: () => 109,
      required: false,
    },
  })
</script>

<template>
  <a :href="url">
    <img
      src="@/assets/images/Logosvg-01.svg"
      alt="logo"
      class="hover:cursor-pointer"
      :width="props.size"
    />
  </a>
</template>
