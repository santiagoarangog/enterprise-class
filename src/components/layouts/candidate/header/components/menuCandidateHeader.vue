<script setup lang="ts">
  import { useMobile } from '@/composables'
  import routesConfig from '@/router/routesConfig'

  const isMobile = useMobile().isMobile
  const router = useRouter()
  const menuList = reactive([
    {
      name: 'Mi espacio',
      route: '#',
      isCurrent: false,
    },
    {
      name: 'Mi hoja de vida',
      route: routesConfig.MyCurriculum.path,
      isCurrent: false,
    },
    {
      name: 'Orientación',
      route: '#',
      isCurrent: false,
    },
  ])

  const currentRoute = computed(() => router.currentRoute.value.path)

  const goTo = (route: string) => {
    router.push(route)
  }
</script>

<template>
  <div v-if="!isMobile" class="flex items-center justify-center">
    <ul class="flex gap-8 text-[#095669] font-normal font-red-hat menu">
      <li
        v-for="(menu, i) in menuList"
        :key="i"
        @click="goTo(menu.route)"
        class="relative"
      >
        {{ menu.name }}

        <div
          v-if="menu.route === currentRoute"
          class="absolute mt-2 menu-item w-[90%] ml-1"
        ></div>
      </li>
    </ul>

    <div class="w-[1px] h-[24px] bg-gray-300 mx-6"></div>
    <user-icons-header />
  </div>
</template>

<style scoped>
  .menu li {
    font-size: 15px !important;
  }
  .menu li:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .menu-item {
    @apply border-b-4 border-yellow-500 !important;
  }
</style>
