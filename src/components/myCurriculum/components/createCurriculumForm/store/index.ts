import type { Component } from 'vue'
import personalInfo from '@/components/myCurriculum/components/createCurriculumForm/index.vue'
import type { ICampaign } from '@/components/myOffers/components/createOfferForm/contracts/IPayloadResponse'

export interface IStepCurriculum {
    title: string
    name: string
    component: Component | null
    completed: boolean
}

interface IState {
    currentStep: IStepCurriculum
    steps: IStepCurriculum[]
    currentOffer: ICampaign | null
}

const state = reactive<IState>({
    currentStep: {
        title: 'Datos Personales',
        name: 'personalInfo',
        component: markRaw(personalInfo),
        completed: true,
    },
    steps: [
        {
            title: 'Datos Personales',
            name: 'personalInfo',
            component: markRaw(personalInfo),
            completed: false,
        },
        {
            title: 'Experiencia Laboral',
            name: 'workExperience',
            component: markRaw(personalInfo),
            completed: false,
        },
        {
            title: 'Estudios e Idiomas',
            name: 'studiesAndLanguages',
            component: markRaw(personalInfo),
            completed: false,
        },
        {
            title: 'Otros conocimientos',
            name: 'othersExperience',
            component: null,
            completed: false,
        },
        {
            title: 'Referencias',
            name: 'references',
            component: null,
            completed: false,
        },
        {
            title: 'Aspiración Salarial',
            name: 'salary',
            component: null,
            completed: false,
        },
        {
            title: 'Documentación Adicional',
            name: 'othersDocuments',
            component: null,
            completed: false,
        },
    ],
    currentOffer: null,
})

const useProgressBarCurriculumStore = () => {
    const setCurrentStep = (step: IStepCurriculum) => {
        state.currentStep = step
    }

    const getCurrentStep = (): IStepCurriculum => {
        return state.currentStep
    }

    const getSteps = (): IStepCurriculum[] => {
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

export default useProgressBarCurriculumStore
