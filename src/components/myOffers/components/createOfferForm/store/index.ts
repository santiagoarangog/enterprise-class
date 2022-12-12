import type { Component } from 'vue'
import offerInfo from '@/components/myOffers/components/createOfferForm/components/offerInfo/index.vue'
import benefits from '@/components/myOffers/components/createOfferForm/components/benefits/index.vue'
import type { ICampaign } from '../contracts/IPayloadResponse'

export interface IStepOffer {
  title: string
  name: string
  component: Component | null
  completed: boolean
}

interface IState {
  currentStep: IStepOffer
  steps: IStepOffer[]
  currentOffer: ICampaign | null
}

const state = reactive<IState>({
  currentStep: {
    title: 'Información de la oferta',
    name: 'offerInfo',
    component: markRaw(offerInfo),
    completed: true,
  },
  steps: [
    {
      title: 'Información de la oferta',
      name: 'offerInfo',
      component: markRaw(offerInfo),
      completed: false,
    },
    {
      title: 'Beneficios',
      name: 'benefits',
      component: markRaw(benefits),
      completed: false,
    },
    {
      title: 'Canidato Ideal',
      name: 'idealCandidate',
      component: null,
      completed: false,
    },
    {
      title: 'Resumen y vista previa',
      name: 'summary',
      component: null,
      completed: false,
    },
  ],
  currentOffer: null,
})

const useCreateOfferFormStore = () => {
  const setCurrentStep = (step: IStepOffer) => {
    state.currentStep = step
  }

  const getCurrentStep = (): IStepOffer => {
    return state.currentStep
  }

  const getSteps = (): IStepOffer[] => {
    return state.steps
  }

  const nextStep = () => {
    const currentStepIndex = state.steps.findIndex(
      (step) => step.name === state.currentStep.name
    )
    state.steps[currentStepIndex].completed = true
    const nextStep = state.steps[currentStepIndex + 1]
    if (nextStep) setCurrentStep(nextStep)
  }

  const setCurrentOffer = (offer: ICampaign) => {
    state.currentOffer = offer
  }

  const getCurrentOffer = (): ICampaign | null => {
    return state.currentOffer
  }

  return {
    getCurrentStep,
    setCurrentStep,
    getSteps,
    nextStep,
    setCurrentOffer,
    getCurrentOffer,
  }
}

export default useCreateOfferFormStore
