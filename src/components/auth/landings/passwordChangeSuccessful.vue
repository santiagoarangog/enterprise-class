<script setup lang="ts">
  import Store from '@/Store'
  import { computed } from 'vue'

  const i18n = computed(() => Store().getI18n())

  defineProps<{ userEmail: string }>()
</script>
<template>
  <div>
    <p class="text-semibold">{{ i18n.authentication.passwordRecovery }}</p>
    <p>{{ i18n.authentication.passwordChangeSuccessMessage }}</p>
  </div>
</template>
