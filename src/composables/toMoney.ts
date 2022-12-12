export const toMoney = (value: number, country: string = 'USD') => {
  const formatter = new Intl.NumberFormat(country, {
    style: 'currency',
    currency: country,
    minimumFractionDigits: 0,
    currencyDisplay: 'symbol',
  })

  return formatter.format(value)
}
