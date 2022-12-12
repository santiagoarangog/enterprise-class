export interface IOfferPlan {
  discount: number
  quantity: number
  cost: number
}

export interface IIncludePlan {
  checked: boolean
  description: string
}

export default interface IPLans {
  id: number
  header: string
  description: string
  offer?: IOfferPlan[]
  cost: number
  button: string
  include: IIncludePlan[]
}
