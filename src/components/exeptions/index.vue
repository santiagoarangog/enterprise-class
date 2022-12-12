<script setup lang="ts">
  import Store from '@/Store'
  import { computed } from 'vue'
  const exeption = computed(() => Store().getException())
  const dialogVisible = computed(() => exeption.value !== null)
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="exeption?.title" width="30%">
    <p>{{ exeption?.message }}</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Store().setException(null)">Ok</el-button>
      </span>
    </template>
  </el-dialog>
</template>
