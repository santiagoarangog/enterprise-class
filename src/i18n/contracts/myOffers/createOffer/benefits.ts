export interface ISalaryI18n {
  title: string
  description: string
  salary: string
  from: string
  to: string
  bonuses: string
  bonusValue: string
  minSalary: string
  maxSalary: string
  minSalaryError: string
}

export interface IContractI18n {}

export default interface IBenefitsFormI18n {
  title: string
  salary: ISalaryI18n
  contract: IContractI18n
}
