export interface IState {
  openDrawer: boolean
}

const state = reactive<IState>({
  openDrawer: false,
})

const useCandidateLayoutHeader = () => {
  const toggleDrawerCandidate = (value: boolean) => {
    state.openDrawer = value
  }

  const getOpenDrawerCandidate = () => state.openDrawer

  return {
    toggleDrawerCandidate,
    getOpenDrawerCandidate,
  }
}

export default useCandidateLayoutHeader
