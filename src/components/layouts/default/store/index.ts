export interface IState {
  openDrawer: boolean
}

const state = reactive<IState>({
  openDrawer: false,
})

const useDefaultLayoutStore = () => {
  const toggleDrawer = (value: boolean) => {
    state.openDrawer = value
  }

  const getOpenDrawer = () => state.openDrawer

  return {
    toggleDrawer,
    getOpenDrawer,
  }
}

export default useDefaultLayoutStore
