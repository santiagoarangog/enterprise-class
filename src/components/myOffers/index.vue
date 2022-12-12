<script setup lang="ts">
  import { i18n, useMobile } from '@/composables'
  import routesConfig from '@/router/routesConfig'

  const isMobile = useMobile().isMobile
  const activeTab = ref('myAccount')
  const isMounted = ref(false)
  const router = useRouter()

  const createNewOffer = () => {
    router.replace(routesConfig.CreateOffer)
  }

  onMounted(() => {
    isMounted.value = true
  })
</script>

<template>
  <section
    class="flex flex-col justify-center items-center p-5 py-10 bg-[#FAF6EF]"
  >
    <div
      class="vin-container w-full text-[#033541] font-red-hat text-center md:text-left"
    >
      <div class="vincu-over-title">Mis ofertas</div>

      <div class="mt-2">
        <b class="vincu-title">Crea y revisa tus ofertas</b>
      </div>

      <div class="mt-5">
        <el-button
          @click="createNewOffer"
          class="bg-[#ffc915] opacity-1"
          type="primary"
        >
          <template #icon>
            <div class="rounded-full bg-[#FFDA5D] p-2 mr-10">
              <i class="fas fa-plus"></i>
            </div>
          </template>
          Crear nueva oferta</el-button
        >
      </div>
    </div>
  </section>
</template>
