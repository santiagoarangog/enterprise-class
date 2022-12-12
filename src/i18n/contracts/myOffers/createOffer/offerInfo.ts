export interface IGeneralInfoOfferFormI18n {
  title: string
  name: string
  description: string
  work_sector: string
  work_area: string
  work_role: string
  position_level: string
  job_modality: string
  location: string
  hide_company_info: string
  hide_company_info_tooltip: string
  vancancy_number: string
  buttonText: string
}

export interface IOtherRequerimentsI18n {
  title: string
  language: string
  languajeLevel: string
  helpText: string
  addOtherLanguage: string
  transport: string
  transportType: string
  driverLicense: string
  category: string
}

export default interface IOfferInfoFormI18n {
  title: string
  generalInfo: IGeneralInfoOfferFormI18n
  otherRequeriments: IOtherRequerimentsI18n
}
