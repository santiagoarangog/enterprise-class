<template>
  <div class="w-screen h-screen overflow-x-hidden">
    <candidate-header class="w-full" />

    <main class="w-full h-full">
      <div>
        <router-view />
      </div>

      <default-footer class="w-full mt-5" />
    </main>
  </div>
</template>
