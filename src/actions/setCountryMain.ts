import Store, { type ICountryHeader } from '@/Store'
import colombia from '@/components/iconos/logo/colombia.vue'
import mexico from '@/components/iconos/logo/mexico.vue'

const setCountryMain = () => {
  const { setCountry } = Store()
  const vincuCountry = (localStorage.getItem('vincu-country-header') ||
    'co') as ICountryHeader

  const isCol = vincuCountry === 'co'
  setCountry({
    country: vincuCountry,
    icon: isCol ? markRaw(colombia) : markRaw(mexico),
    code: isCol ? '+57' : '+52',
  })
}

export default setCountryMain
