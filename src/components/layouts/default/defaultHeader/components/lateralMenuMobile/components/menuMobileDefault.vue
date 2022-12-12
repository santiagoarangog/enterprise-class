<script setup lang="ts">
  import useDefaultLayoutStore from '@/components/layouts/default/store'
  import menuData from '@/components/layouts/default/data/menu.data'

  const router = useRouter()
  const menuList = reactive(menuData)
  const currentRoute = computed(() => router.currentRoute.value.path)

  const goToRoute = (route: string) => {
    useDefaultLayoutStore().toggleDrawer(false)
    router.push(route)
  }
</script>

<template>
  <ul
    class="flex flex-col items-start gap-8 text-white font-normal font-red-hat menu"
  >
    <li
      v-for="(menu, i) in menuList"
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
