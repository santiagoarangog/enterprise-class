<script setup lang="ts">
  import useDefaultLayoutStore from '@/components/layouts/default/store'
  import closesession from '@/components/auth/@actions/closeSession'
  import footerMenuData from '@/components/layouts/default/data/footerMenu.data'

  const router = useRouter()
  const currentRoute = computed(() => router.currentRoute.value.path)
  const footerMenuList = reactive(footerMenuData)

  const goToRoute = (route: string) => {
    if (route === '/logout') {
      closesession()
      return
    }

    useDefaultLayoutStore().toggleDrawer(false)
    router.push(route)
  }
</script>

<template>
  <ul class="flex flex-col items-start gap-8 text-lg font-red-hat menu">
    <li
      v-for="(menu, i) in footerMenuList"
      :key="i"
      @click="goToRoute(menu.route)"
      class="relative"
    >
      {{ menu.name }}

      <div
        v-if="menu.route === currentRoute"
        class="absolute mt-2 menu-item w-full"
      ></div>
    </li>
  </ul>
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
