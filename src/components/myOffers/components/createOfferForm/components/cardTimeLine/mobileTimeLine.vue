<script setup lang="ts">
  import useProgressBarCurriculumStore, { type IStepOffer } from '../../store'

  const { getCurrentStep, getSteps, setCurrentStep } = useProgressBarCurriculumStore()

  const isCurrentStep = (stepName: string) => {
    return getCurrentStep().name === stepName
  }

  const goToStep = (stepSelected: IStepOffer) => {
    if (!stepSelected?.completed) return
    const step = getSteps().find((step) => step === stepSelected)
    if (step) setCurrentStep(step)
  }
</script>
<template>
  <div class="min-w-[302px] max-h-[341px] bg-[#F7FAF9] rounded-2xl shadow-sm">
    <div
      class="flex lg:flex-col lg:gap-10 justify-between items-center p-5 py-5 lg:py-10 relative"
    >
      <div
        v-for="(step, i) in getSteps()"
        :key="i"
        class="flex justify-center items-center relative w-full"
      >
        <div class="flex z-10 items-center justify-center gap-3">
          <div
            class="flex lg:flex-col justify-between items-center w-full lg:w-auto"
          >
            <div
              class="rounded-full bg-white min-w-[31px] min-h-[31px] w-[31px] h-[31px] w-full border-2 flex justify-center items-center border-[#6CDBA5]"
              :class="[
                step.completed
                  ? 'step-green'
                  : isCurrentStep(step.name)
                  ? 'border-[#6CDBA5]'
                  : 'border-[#D5D9DF]',
                step.completed ? 'cursor-pointer' : 'cursor-not-allowed',
              ]"
              @click="goToStep(step)"
            >
              <i v-if="step.completed" class="fa-solid fa-check text-white"></i>

              <div
                v-else
                class="w-[13px] h-[13px] rounded-full"
                :class="isCurrentStep(step.name) ? 'step-green' : 'step-gray'"
              ></div>
            </div>
          </div>
        </div>

        <div
          v-if="i < getSteps().length - 1"
          class="lg:hidden absolute w-full left-[50%] z-0 border-t-[2.5px] border-dotted"
          :class="[
            step.completed ? 'border-[#6CDBA5]' : 'border-[#D5D9DF]',
            { hidden: i === getSteps().length - 1 },
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .step-green {
    @apply bg-[#6CDBA5];
  }

  .step-gray {
    @apply bg-[#D5D9DF];
  }
</style>
