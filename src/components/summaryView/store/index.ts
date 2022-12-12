import type { Component } from 'vue'
import summaryTabs from '@/components/summaryView/components/summaryTabs/index.vue'
import paymentPlans from '@/components/summaryView/components/paymentPlans/index.vue'
import type IPLans from '../contracts/IPLans'

export interface IStep {
  name: string
  component: Component
}

export interface IState {
  currentStep: string
  steps: IStep[]
  plans: IPLans[]
}

export const state: IState = reactive({
  currentStep: 'stepSummary',
  steps: [
    {
      name: 'stepSummary',
      component: markRaw(summaryTabs),
    },
    {
      name: 'stepPlans',
      component: markRaw(paymentPlans),
    },
  ],
  plans: [],
})

const useSummaryFormStore = () => {
  const addStep = (step: IStep) => {
    state.steps.push(step)
  }

  const setCurrentStep = (stepId: string) => {
    state.currentStep = stepId
  }

  const getCurrentStep = (): IStep => {
    return state.steps.find((step) => step.name === state.currentStep) as IStep
  }

  const nextStep = (name?: string) => {
    const currentStepIndex = state.steps.findIndex(
      (step) => step.name === name || state.currentStep
    )

    const nextStep = state.steps[currentStepIndex + 1]
    if (nextStep) {
      state.currentStep = nextStep.name
    }
  }

  const previousStep = (name?: string) => {
    const currentStepIndex = state.steps.findIndex(
      (step) => step.name === getCurrentStep()?.name
    )

    const previousStep = state.steps[currentStepIndex - 1]

    if (previousStep) {
      state.currentStep = previousStep.name
    }
  }

  const getPercentage = (): number => {
    const totalStep = state.steps.length
    const currentStepIndex =
      state.steps.findIndex((step) => step.name === state.currentStep) + 1

    return Math.round((currentStepIndex / totalStep) * 100)
  }

  const setPlans = (plans: IPLans[]) => {
    state.plans = plans
  }

  const getPlans = (): IPLans[] => {
    return state.plans
  }

  return {
    addStep,
    setCurrentStep,
    getCurrentStep,
    nextStep,
    previousStep,
    getPercentage,
    setPlans,
    getPlans,
  }
}

export default useSummaryFormStore
