import Store from '@/Store'

const { getCountryHeader } = Store()

const useToLocaleMoney = (value: number | string) => {
  return Number(value).toLocaleString(`es-${getCountryHeader()}`, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    currency: getCountryHeader() === 'co' ? 'COP' : 'MX',
    style: 'currency',
  })
}

export default useToLocaleMoney
