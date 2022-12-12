export interface ISalary {
  min: number | string | null
  max: number | string | null
  bonus: number
}

export default interface ISalaryForm {
  salary: ISalary
  bonuses: boolean
}
