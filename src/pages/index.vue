<script setup lang="ts">
  import routesConfig from '@/router/routesConfig'
</script>

<template>
  <div class="p-10">
    <router-link :to="routesConfig.Client">
      <el-button class="bg-blue-50"> Ir a Creacion de Cliente </el-button>
    </router-link>

    <router-link :to="routesConfig.MyAccount">
      <el-button class="bg-blue-50"> Ir a Mi Cuenta </el-button>
    </router-link>
  </div>
</template>
