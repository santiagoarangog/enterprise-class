<script setup lang="ts">
import useProgressBarCurriculumStore , { type IStepCurriculum } from './createCurriculumForm/store'

const showStep = ref(true)

const { getCurrentStep, getSteps, setCurrentStep } = useProgressBarCurriculumStore()

const isCurrentStep = (stepName: string) => {
  return getCurrentStep().name === stepName
}

const withProgressBar = computed(() => {
  console.log(getSteps().filter(value => value.completed).length);
  return ((getSteps().filter(value => value.completed).length / getSteps().length) * 100);
})

const goToStep = (stepSelected: IStepCurriculum) => {
  if (!stepSelected?.completed) return
  const step = getSteps().find((step) => step === stepSelected)
  if (step) setCurrentStep(step)
}
</script>
<template>
  <div class="min-w-[302px] max-h-[341px] bg-[#F7FAF9] rounded-2xl shadow-sm">

    <div class="p-[16px]">
        <div class="flex justify-between mb-1">
          <span class="text-black font-medium">Estado: 30%</span>
          <span class="bg-[#6CDBA5] text-black rounded-full text-xs font-semibold px-2.5 py-1 tracking-tight">{{withProgressBar}} / {{getSteps().length}}</span>
        </div>
        <div class="flex justify-between mb-1 items-center">
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div class="bg-[#6CDBA5] h-2.5 rounded-full" :style="{width: withProgressBar+'%'}"></div>
          </div>
          <section>
            <div @click="showStep = true"
                 v-if="!showStep"
                 class="font-medium text-[#10A39C] text-sm my-3">
              <i class="fa-solid fa-chevron-down ml-2"></i>
            </div>

            <div v-if="showStep" @click="showStep = false"
                 class="font-medium text-[#10A39C] text-sm my-3">
              <i class="fa-solid fa-chevron-up ml-2"></i>
            </div>
          </section>
        </div>
      <span class="w-full text-sm">Última actualización: 16/12/2022</span>

      <div v-if="showStep" class="text-[15px] text-[#095669] text-left">
        <ul class="flex flex-col p-2 z-10 justify-center gap-2">
          <li
              v-for="(step, i) in getSteps()"
              class="flex items-center gap-3 font-red-hat"
              :class="{ 'font-bold': step.completed ||  isCurrentStep(step.name)}"
          >
            <div
                class="w-4 h-4 rounded-full flex items-center justify-center"
                :class="
                step.completed
                  ? 'step-green'
                  : isCurrentStep(step.name)
                  ? 'step-current'
                  : 'step-gray'"
            >
              <i v-if="step.completed" class="fa-solid fa-check text-white text-sm"></i>
            </div>
            {{ step.title }}
          </li>
        </ul>
      </div>
      </div>

    </div>

  <div class="font-roboto w-full text-center min-w-[302px] max-h-[341px] bg-[#F7FAF9] rounded-2xl shadow-sm lg:hidden">

  </div>
</template>

<style scoped>
.step-green {
  @apply bg-[#6CDBA5];
}

.step-current {
  @apply bg-white;
  @apply border-[#6CDBA5]
  border-2
  text-[#6CDBA5]
}

.step-gray {
  @apply bg-[#D5D9DF];
}
</style>
