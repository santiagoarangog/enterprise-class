export default interface IGeneralInfoOfferForm {
  name: string
  description: string
  work_sector_id: number
  work_area_id: number
  work_role_id: number
  position_level_id: number
  job_modality_id: number
  location_id?: number
  location: []
  state?: number
  country_id?: number
  department_id?: number
  city_id?: number
  cities: number[]
  hide_company_info: boolean
  vancancy_number: number
}
