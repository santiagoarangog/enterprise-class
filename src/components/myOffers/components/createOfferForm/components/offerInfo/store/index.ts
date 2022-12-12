import type IGeneralInfoOfferForm from '../contracts/IGeneralInfoOfferForm'
import type IOtherRequeriments from '../contracts/IOtherRequeriments'

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
    generalInfo?: IGeneralInfoOfferForm | null
    otherRequeriments?: IOtherRequeriments | null
  }
}

const state = reactive<IState>({
  currentForm: EOfferInfoForm.generalInfo,
  statusForm: {
    generalInfo: false,
    otherRequeriments: false,
  },
  formData: {
    generalInfo: null,
    otherRequeriments: null,
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

  const setGeneralInfoData = (data: IGeneralInfoOfferForm) => {
    state.formData.generalInfo = data
  }

  const getGeneralInfoData = (): IGeneralInfoOfferForm => {
    return state.formData.generalInfo as IGeneralInfoOfferForm
  }

  const setOtherRequerimentsData = (data: IOtherRequeriments) => {
    state.formData.otherRequeriments = data
  }

  const getOtherRequerimentsData = (): IOtherRequeriments => {
    return state.formData.otherRequeriments as IOtherRequeriments
  }

  return {
    getCurrentForm,
    setCurrentForm,
    getGeneralInfoStatus,
    setGeneralInfoStatus,
    getGeneralInfoData,
    setGeneralInfoData,
    getOtherRequerimentsData,
    setOtherRequerimentsData,
  }
}

export default useOfferInfoStore
