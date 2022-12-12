<script setup lang="ts">
  import routesConfig from '@/router/routesConfig'

  const router = useRouter()

  const isMyAccountCurrentRoute = computed(
    () => router.currentRoute.value.path === routesConfig.MyAccount.path
  )
</script>

<template>
  <div class="flex gap-3">
    <div
      class="rounded-full border w-8 h-8 flex justify-center items-center text-[#095669] hover:bg-[#DEE8E4] cursor-pointer"
    >
      <i class="fa-solid fa-bell text-sm"></i>
    </div>

    <el-popover ref="passwordPopover" width="200" trigger="click">
      <template #reference>
        <div
          class="rounded-full border w-8 h-8 flex justify-center items-center text-[#095669] cursor-pointer"
          :class="{ 'bg-[#FDD759] border-none': isMyAccountCurrentRoute }"
        >
          <i class="fa-solid fa-user text-sm"></i>
        </div>
      </template>

      <UserMenu />
    </el-popover>
  </div>
</template>
