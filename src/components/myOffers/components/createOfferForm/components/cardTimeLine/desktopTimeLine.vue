<script setup lang="ts">
  import useCreateOfferFormStore, { type IStepOffer } from '../../store'

  const { getCurrentStep, getSteps, setCurrentStep } = useCreateOfferFormStore()

  const isCurrentStep = (stepName: string): boolean => {
    return getCurrentStep().name === stepName
  }

  const goToStep = (stepSelected: IStepOffer) => {
    if (!stepSelected?.completed) return
    const step = getSteps().find((step) => step === stepSelected)
    if (step) setCurrentStep(step)
  }
</script>
<template>
  <div
    class="flex w-full lg:flex-col justify-between items-center p-5 py-5 lg:py-10 relative"
  >
    <div
      v-for="(step, i) in getSteps()"
      :key="i"
      class="flex w-full lg:flex-col items-center lg:justify-start lg:items-start"
    >
      <div class="flex lg:justify-start items-center w-full justify-center">
        <div class="flex z-10 items-center justify-center lg:items-start gap-3">
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
                :class="isCurrentStep(step.name) ? 'step-green ' : 'step-gray'"
              ></div>
            </div>
          </div>

          <div
            class="text-base text-[#095669] hidden lg:flex"
            :class="{ 'font-bold': isCurrentStep(step.name) }"
          >
            {{ step.title }}
          </div>
        </div>
      </div>

      <div
        class="flex w-5 h-[48px] border-l-[2.5px] border-dotted ml-3.5"
        :class="[
          step.completed ? 'border-[#6CDBA5]' : 'border-[#D5D9DF]',
          { hidden: i == getSteps().length - 1 },
        ]"
      ></div>
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
