import type { ISalary } from './../components/benefits/contracts/ISalaryForm'
import type { IList } from '@/modules/list'
import type {
  ILanguage,
  IDriverLicence,
} from '../components/offerInfo/contracts/IOtherRequeriments'

export interface IStateRequest {
  id: number
  name: string
  cities: IList[]
}

export interface ILocationRequest {
  states?: IStateRequest[] | null
  countries?: number[] | null
}

export interface IMainInfoRequest {
  id?: number
  code?: string
  name: string
  description: string
  work_sector_id: number | null
  work_area_id: number | null
  work_role_id: number | null
  position_level_id: number | null
  vacancy_number: number | null
  state?: number | null
  cities?: number[] | null
  languages: ILanguage[]
  location?: ILocationRequest | null
  skills: number[]
  driverLicenseStatus: boolean
  driver_license: IDriverLicence
  changeOtherLanguage?: IList[] //OBS: No se usa
  hide_company_info: number
}

export interface IBenefitsRequest {
  job_modality_id?: number | null
  salary?: ISalary
  bonuses?: boolean
}

export interface IProfileRequest {
  active: boolean
}

export interface IEnrichmentConfigRequest {}

export default interface ICreateOfferPayload {
  offer_status: number
  main_info?: IMainInfoRequest
  benefits?: IBenefitsRequest[]
  profiles?: IProfileRequest[]
  enrichment_config?: IEnrichmentConfigRequest[]
}
