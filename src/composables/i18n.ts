import Store from '@/Store'
const i18n = computed(() => Store().getI18n())
export { i18n }
