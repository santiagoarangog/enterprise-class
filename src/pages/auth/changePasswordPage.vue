<script setup lang="ts">
  import routesConfig from '@/router/routesConfig'

  const route = useRoute()
  const router = useRouter()

  const { country, email, token, type } = route.params

  if (!country || !email || !token || !type) {
    router.push(routesConfig.Login)
  }
</script>

<template>
  <PasswordChangeForm />
</template>
