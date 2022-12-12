<script setup lang="ts">
  import { i18n } from '@/composables'
  import useCreateOfferFormStore from '../../store'

  const t = i18n.value.myOffers.createOffer.cardTimeLine
  const showStep = ref(false)
  const { getCurrentStep, getSteps, setCurrentStep } = useCreateOfferFormStore()

  const isCurrentStep = (stepName: string) => {
    return getCurrentStep().name === stepName
  }
</script>
<template>
  <div class="min-w-[302px] max-h-[341px] bg-[#F7FAF9] rounded-2xl shadow-sm">
    <desktop-time-line class="hidden lg:flex" />
    <mobile-time-line class="lg:hidden" />

    <div class="font-roboto w-full text-center lg:hidden">
      <div
        @click="showStep = true"
        v-if="!showStep"
        class="font-medium text-[#10A39C] text-sm my-3"
      >
        {{ t.showStepByStep }}
        <i class="fa-solid fa-chevron-down ml-2"></i>
      </div>

      <div v-else class="text-[15px] text-[#095669] text-left">
        <ul class="p-5 py-5 lg:py-10 flex flex-col gap-3">
          <li
            v-for="(step, i) in getSteps()"
            class="flex items-center gap-3 font-red-hat"
            :class="{ 'font-bold': step.completed }"
          >
            <div
              class="w-4 h-4 rounded-full flex items-center justify-center"
              :class="
                step.completed
                  ? 'step-green'
                  : isCurrentStep(step.name)
                  ? 'step-green'
                  : 'step-gray'
              "
            >
              <i
                v-if="step.completed"
                class="fa-solid fa-check text-[10px] text-white"
              ></i>
            </div>
            {{ step.title }}
          </li>
        </ul>

        <div class="font-medium text-sm mt-5 border-t">
          <div @click="showStep = false" class="px-5 py-2 text-center">
            {{ t.hideStepByStep }}
            <i class="fa-solid fa-chevron-up ml-2"></i>
          </div>
        </div>
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
