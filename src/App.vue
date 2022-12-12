<script setup lang="ts">
  import exeption from '@/components/exeptions/index.vue'
  import getInitialData from './actions/http/getInitialData'
  import Store from '@/Store'
  import preventReload from '@/actions/preventReload'
  import setCountryMain from './actions/setCountryMain'

  const isMounted = ref(false)

  onMounted(async () => {
    const token = JSON.parse(localStorage.getItem('vincu-token') || '{}')
    if (token) Store().setJwtToken(token.access_token)
    await getInitialData()
    setCountryMain()
    isMounted.value = true
  })

  preventReload()
</script>

<template>
  <exeption />
  <component v-if="isMounted" :is="$route.meta?.layout || 'div'"></component>
</template>
