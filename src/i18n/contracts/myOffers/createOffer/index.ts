import type IOfferInfoFormI18n from './offerInfo'
import type IBenefitsFormI18n from './benefits'

export interface ICardTimeLineI18n {
  showStepByStep: string
  hideStepByStep: string
}
export interface ICardWarningI18n {
  remember: string
  firstParagraph: string
  iconText: string
  secondParagraph: string
}

export default interface ICreateOfferI18n {
  title: string
  offerInfo: IOfferInfoFormI18n
  benefits: IBenefitsFormI18n
  cardTimeLine: ICardTimeLineI18n
  cardWarning: ICardWarningI18n
}
