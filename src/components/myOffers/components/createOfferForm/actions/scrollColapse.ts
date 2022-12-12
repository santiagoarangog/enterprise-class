import { watch } from 'vue'

const useScroollColapse = (currentCollapse: any) => {
  const current = computed(() => currentCollapse.value)

  watch(
    () => current.value,
    () => {
      const el = document.querySelector('.el-collapse-item.is-active')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  )
}

export default useScroollColapse
