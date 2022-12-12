import type { SelectOptionContract, ListContract } from '@/@types'

export interface StateContract {
  discoveredList: ListContract[]
  showVerifyAccountModal: boolean
}

const state = reactive<StateContract>({
  discoveredList: [],
  showVerifyAccountModal: false,
})

const useClientStore = () => {
  const setDiscoveredList = (list: ListContract[]) => {
    state.discoveredList = list
  }

  const getDiscoveredList = (): ListContract[] => {
    return state.discoveredList
  }

  const getDiscoveredListForSelect = (): SelectOptionContract[] => {
    return state.discoveredList.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
  }

  const setShowVerifyAccountModal = (value: boolean) => {
    state.showVerifyAccountModal = value
  }

  const getShowVerifyAccountModal = () => {
    return state.showVerifyAccountModal
  }

  return {
    setDiscoveredList,
    getDiscoveredList,
    getDiscoveredListForSelect,
    setShowVerifyAccountModal,
    getShowVerifyAccountModal,
  }
}

export default useClientStore
