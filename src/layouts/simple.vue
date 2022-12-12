<template>
  <div class="w-screen h-screen overflow-x-hidden">
    <simple-header class="w-full" />

    <main class="w-full h-full">
      <div>
        <router-view />
      </div>

      <default-footer class="w-full lg:mt-8" />
    </main>
  </div>
</template>
