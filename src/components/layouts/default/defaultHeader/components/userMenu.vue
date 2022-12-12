<script setup lang="ts">
  import closesession from '@/components/auth/@actions/closeSession'
  import routesConfig from '@/router/routesConfig'
  import { i18n } from '@/composables'

  const route = useRouter()

  const goToMyAccount = () => {
    route.push(routesConfig.MyAccount)
  }
</script>

<template>
  <ul
    class="text-[#095669] flex flex-col gap-3 font-red-hat text-[15px] p-2 lista menu"
  >
    <li>
      <button @click="goToMyAccount">{{ i18n.myAccount.myAccount }}</button>
    </li>

    <li>
      <button @click="closesession">
        {{ i18n.authentication.closeSession }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
  .menu li {
    font-size: 15px !important;
  }
  .menu li > *:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
