import type { ListContract, SelectOptionContract } from '@/@types'

export interface StateContract {
  documentTypes: ListContract[]
  activeCollapse: {
    generalInfo: boolean
    legalRepresentative: boolean
    aboutBusiness: boolean
  }
  industries: ListContract[]
  quantityWorkers: ListContract[]
}

const state = reactive<StateContract>({
  documentTypes: [],
  activeCollapse: {
    generalInfo: false,
    legalRepresentative: false,
    aboutBusiness: false,
  },
  industries: [],
  quantityWorkers: [],
})

const useMyAccountStore = () => {
  const setDocumentTypes = (list: ListContract[]) => {
    state.documentTypes = list
  }

  const getDocumentTypesForSelect = (): SelectOptionContract[] => {
    return state.documentTypes.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
  }

  const activeLegalRepresentativeCollapse = () => {
    state.activeCollapse.legalRepresentative = true
  }

  const activeAboutBusinessCollapse = () => {
    state.activeCollapse.aboutBusiness = true
  }

  const setIndustries = (list: ListContract[]) => {
    state.industries = list
  }

  const getIndustriesForSelect = (): SelectOptionContract[] => {
    return state.industries.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
  }

  const setQuantityWorkers = (list: ListContract[]) => {
    state.quantityWorkers = list
  }

  const getQuantityWorkersForSelect = (): SelectOptionContract[] => {
    return state.quantityWorkers.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
  }

  return {
    state,
    setDocumentTypes,
    getDocumentTypesForSelect,
    activeLegalRepresentativeCollapse,
    activeAboutBusinessCollapse,
    setIndustries,
    getIndustriesForSelect,
    setQuantityWorkers,
    getQuantityWorkersForSelect,
  }
}

export default useMyAccountStore
