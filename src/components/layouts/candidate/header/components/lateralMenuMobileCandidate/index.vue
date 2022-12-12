<script lang="ts" setup>
  import useCandidateLayoutHeader from '../../../store'

  const visible = computed({
    get: () => useCandidateLayoutHeader().getOpenDrawerCandidate(),
    set: (value) => useCandidateLayoutHeader().toggleDrawerCandidate(value),
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
      <header-candidate-mobile />
    </template>

    <menu-candidate-mobile />

    <template #footer>
      <footer-candidate-mobile/>
    </template>
  </el-drawer>
</template>
