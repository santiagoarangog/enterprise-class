<script setup lang="ts">
  import { useScroll } from '@vueuse/core'
  import { i18n } from '@/composables'

  const hideTitle = ref(false)
  const content = ref<HTMLElement | null>(null)
  const { x, y, isScrolling, arrivedState, directions } = useScroll(content)
  const countScrolling = ref(0)
  const stopScrolling = ref(false)

  const activeTab = ref('summary')
  const handleTabClick = () => {
    console.log(activeTab.value)
  }

  watchEffect(() => {
    if (directions.top && y.value < 1) {
      hideTitle.value = false
      return
    }

    if (countScrolling.value > 0 && countScrolling.value < 5) {
      hideTitle.value = true
      countScrolling.value = 0
      stopScrolling.value = false
      return
    }

    if (directions.bottom && y.value >= 100 && y.value < 1000) {
      if (!stopScrolling.value) content.value?.scrollTo(0, 0)
      stopScrolling.value = true
    }
  })

  watch(
    () => isScrolling.value,
    (value) => {
      if (value) countScrolling.value++
    }
  )
</script>

<template>
  <div class="w-full h-full">
    <section
      id="header"
      class="bg-[#095669] absolute top-0 left-0 right-0 overflow-hidden h-[269px] md:h-[243px]"
      :class="hideTitle ? 'headerHidden' : 'headerVisible'"
    >
      <div class="flex items-center justify-center w-full h-full px-5 md:px-10">
        <div class="form-max-with w-full h-full">
          <section
            class="flex flex-col items-center justify-center w-full mt-5 lg:mt-12 text-center text-white font-red-hat title"
          >
            <h1 class="text-[32px] md:text-[38px] font-bold">
              {{ i18n.summaryForm.title }}
            </h1>

            <p class="text-[20px] mt-3 font-normal">
              {{ i18n.summaryForm.subtitle }}
            </p>
          </section>

          <section
            class="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full"
          >
            <el-tabs
              id="tabSummary"
              v-model="activeTab"
              class="text-base form-max-with w-full lg:w-[30%]"
              stretch
              @tab-click="handleTabClick"
              type="card"
            >
              <el-tab-pane :label="i18n.summaryForm.summary" name="summary">
              </el-tab-pane>

              <el-tab-pane :label="i18n.summaryForm.preview" name="preview">
              </el-tab-pane>
            </el-tabs>
          </section>
        </div>
      </div>
    </section>

    <section
      ref="content"
      name="content"
      :class="hideTitle ? 'contentPlus' : 'contentMinus'"
      class="absolute top-[269px] md:top-[243px] bottom-[76px] left-0 right-0 overflow-auto pb-8"
    >
      <div class="flex items-center justify-center py-3">
        <div class="w-full h-full form-max-with">
          <div v-if="activeTab == 'summary'" class="flex flex-col gap-6">
            <tab-summary />
          </div>
          <div v-if="activeTab == 'preview'" class="flex flex-col gap-6">
            <tab-preview />
          </div>
        </div>
      </div>
    </section>
  </div>

  <SummaryDialogs />
</template>

<style>
  #tabSummary .el-tabs__item.is-top {
    color: white;
  }

  #tabSummary .el-tabs__item.is-top.is-active {
    color: white;
    font-weight: bold;
    background-color: #226778;
  }

  #tabSummary .el-tabs__nav-wrap::after {
    background-color: transparent !important;
  }

  #tabSummary .el-tabs__item.is-top {
    @apply px-2 !important;
  }

  #tabSummary .el-tabs__item.is-top:hover {
    background-color: #226778;
  }

  .el-tabs--card > .el-tabs__header {
    border-bottom: 0px;
    padding-top: 5px;
  }

  @media (max-width: 768px) {
    #tabSummary .el-tabs__item.is-top:hover {
      /* background-color: #095669; */
    }
  }

  .headerHidden .title {
    display: none;
  }

  .headerHidden {
    transition: all 0.5s ease-in-out;
    height: 76px;
  }

  .contentPlus {
    transition: all 0.5s ease-in-out;
    top: 76px;
  }

  .contentMinus {
    transition: all 0.5s ease-in-out;
    top: 269px;
  }

  .headerVisible {
    transition: all 0.5s ease-in-out;
    transform: translateY(0%);
  }

  .footerShadown {
    box-shadow: 0px -2px 4px rgba(144, 140, 140, 0.25);
  }
</style>
