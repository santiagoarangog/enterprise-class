<script lang="ts" setup>
  import useDefaultLayoutStore from '../../../store'

  const visible = computed({
    get: () => useDefaultLayoutStore().getOpenDrawer(),
    set: (value) => useDefaultLayoutStore().toggleDrawer(value),
  })
</script>

<template>
  <el-drawer
    v-model="visible"
    :show-close="false"
    size="70%"
    direction="ltr"
    custom-class="bg-[#095669] text-white"
    append-to-body
  >
    <template #header>
      <header-mobile-default />
    </template>

    <menu-mobile-default />

    <template #footer>
      <footer-menu-mobile-default />
    </template>
  </el-drawer>
</template>
