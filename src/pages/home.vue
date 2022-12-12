<script setup lang="ts">
  import useAuthStore from '@/components/auth/@store'
  import Store from '@/Store'
  const fullName = computed(() => useAuthStore().getFullName())

  onMounted(() => {
    if (Store().getIsNewUser()) useAuthStore().showWelcomeModal()
  })
</script>

<template>
  <div class="vin-container">
    <h1>Welcome {{ fullName }}</h1>
    <WelcomeModal />
  </div>
</template>
