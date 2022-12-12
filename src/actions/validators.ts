export function isEmail(value: string): boolean {
  return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value)
}

export function isMobile(value: string): boolean {
  return /^\+\d+$/.test(value) || /^\d+$/.test(value)
}

export function isUrl(value: string): boolean {
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
    value
  )
}

export function isEmpty(value: string): boolean {
  return value.trim() === ''
}

export function numberMustBeGreaterThanZero(value: number): boolean {
  return value > 0
}
