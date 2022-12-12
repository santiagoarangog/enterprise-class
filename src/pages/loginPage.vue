<script setup lang="ts">
  onMounted(() => {
    localStorage.removeItem('vincu-token')
    localStorage.removeItem('vincu-user')
  })
</script>

<template>
  <LoginFrom />
</template>
