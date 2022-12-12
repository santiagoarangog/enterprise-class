import type IPersonalInfoForm
    from "@/components/myCurriculum/components/createCurriculumForm/components/personalInfo/contracts/IPersonalInfoForm";

export enum EOfferInfoForm {
    generalInfo = 'generalInfo',
    otherRequeriments = 'otherRequeriments',
}

export interface IOfferInfoFormStatus {
    generalInfo: boolean
    otherRequeriments: boolean
}

interface IState {
    currentForm: EOfferInfoForm
    statusForm: IOfferInfoFormStatus
    formData: {
        personalInfo?: IPersonalInfoForm | null
    }
}

const state = reactive<IState>({
    currentForm: EOfferInfoForm.generalInfo,
    statusForm: {
        generalInfo: false,
        otherRequeriments: false,
    },
    formData: {
        personalInfo: null,
    },
})

const useOfferInfoStore = () => {
    const setCurrentForm = (form: EOfferInfoForm) => {
        state.currentForm = form
    }

    const getCurrentForm = (): EOfferInfoForm => {
        return state.currentForm
    }

    const setGeneralInfoStatus = (status: boolean) => {
        state.statusForm.generalInfo = status
    }

    const getGeneralInfoStatus = (): boolean => {
        return state.statusForm.generalInfo
    }

    const setPersonalInfoData = (data: IPersonalInfoForm) => {
        state.formData.personalInfo = data
    }

    const getPersonalInfoData = (): IPersonalInfoForm => {
        return state.formData.personalInfo as IPersonalInfoForm
    }

    return {
        getCurrentForm,
        setCurrentForm,
        getGeneralInfoStatus,
        setGeneralInfoStatus,
        setPersonalInfoData,
        getPersonalInfoData,
    }
}

export default useOfferInfoStore
