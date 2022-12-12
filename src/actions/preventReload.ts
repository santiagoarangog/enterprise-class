import Store from '@/Store'

export default () => {
  const isPreventReload = computed(() => Store().getPreventReload())

  const preventReload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  watch(
    () => isPreventReload.value,
    (value) => {
      if (value) {
        onbeforeunload = preventReload
        return
      }
      onbeforeunload = () => {
        return
      }
    }
  )
}
