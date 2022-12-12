<script setup lang="ts">
  const url = ref('')
  url.value = import.meta.env.VITE_APP_HOME_VINCU_EMPRESAS
</script>

<template>
  <a :href="url">
    <img
      src="@/assets/images/Logosvg-02.svg"
      alt="logo"
      class="hover:cursor-pointer"
      width="109"
    />
  </a>
</template>
