import type { GeneralInfoContract } from '../../../contracts/generalInfoContract.Info'
import type { LegalRepresentativeContract } from '../../../contracts/legalRepresentativeContract.Info'
import type { AboutBusinessContract } from '../../../contracts/aboutBusinessContract.Info'

export interface StateContract {
  openDialog: boolean
  currentComponent: string | null
  generalInfo: GeneralInfoContract | null
  legalRepresentative: LegalRepresentativeContract | null
  aboutBusiness: AboutBusinessContract | null
}

const state = reactive<StateContract>({
  openDialog: false,
  currentComponent: null,
  generalInfo: null,
  legalRepresentative: null,
  aboutBusiness: null,
})

const useSummaryTabsStore = () => {
  const setDialog = (value: boolean) => {
    state.openDialog = value
  }

  const getDialog = (): boolean => {
    return state.openDialog
  }

  const setComponent = (value: string) => {
    state.currentComponent = value
  }

  const getComponent = (): string | null => {
    return state.currentComponent
  }

  const setData = (
    generalInfo: GeneralInfoContract | null,
    legalRepresentative: LegalRepresentativeContract | null,
    aboutBusiness: AboutBusinessContract | null
  ) => {
    if (generalInfo) state.generalInfo = generalInfo
    if (legalRepresentative) state.legalRepresentative = legalRepresentative
    if (aboutBusiness) state.aboutBusiness = aboutBusiness
  }

  const getGeneralInfo = (): GeneralInfoContract => {
    return state.generalInfo as GeneralInfoContract
  }

  const getLegalRepresentative = (): LegalRepresentativeContract => {
    return state.legalRepresentative as LegalRepresentativeContract
  }

  const getAboutBusiness = (): AboutBusinessContract => {
    return state.aboutBusiness as AboutBusinessContract
  }

  const allGeneralInfoFieldFilled = (): boolean => {
    const generalInfo = state.generalInfo as GeneralInfoContract
    for (const key in generalInfo) {
      // @ts-ignore
      if (generalInfo[key] === null || generalInfo[key] === '') return false
    }
    return true
  }

  const allLegalRepresentativeFieldFilled = (): boolean => {
    const legalRepresentative =
      state.legalRepresentative as LegalRepresentativeContract

    for (const key in legalRepresentative) {
      // @ts-ignore
      if (legalRepresentative[key] === null || legalRepresentative[key] === '')
        return false
    }

    return true
  }

  const allAboutBusinessFieldFilled = (): boolean => {
    const aboutBusiness = state.aboutBusiness as AboutBusinessContract

    for (const key in aboutBusiness) {
      // @ts-ignore
      if (aboutBusiness[key] === null || aboutBusiness[key] === '') return false
    }

    return true
  }

  return {
    state,
    setDialog,
    getDialog,
    setComponent,
    getComponent,
    setData,
    getGeneralInfo,
    getLegalRepresentative,
    getAboutBusiness,
    allGeneralInfoFieldFilled,
    allLegalRepresentativeFieldFilled,
    allAboutBusinessFieldFilled,
  }
}

export default useSummaryTabsStore
