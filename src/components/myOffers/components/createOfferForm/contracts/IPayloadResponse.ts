import type { ILocationRequest } from './IPayloadRequest'

export interface ICompliancePercentageRange {
  min: number | null
  max: number | null
}

export interface IClient {
  id: number
  industry_id: number
  regime_id: number
  employees_range_id: number
  document_type_id: number
  business_type_id: number
  type_id: number
  discovered_id: number
  code: string
  name: string
  email: string
  hide_data: number
  user_admin_id: number
  city_id: number
  identification_number: string
  business_name: string
  web_site: string
  phone: string
  billing_address: string
  activation_date: string
  modules: string
  api_token: string
  active: number
  created_at: string
  updated_at: string
  deleted_at: string
  about: string
  why_join: string
  country_id: number
  logo_url: string
  state_id: number
  default_slug: string
  city: string
  settings: string
}

export interface ICampaign {
  user_id: number
  client_id: number
  name: string
  description: string
  location: ILocationRequest
  languages: any[]
  driver_license: any[]
  transport_type_id: any
  hide_company_info: number
  skills: any[]
  salary: any
  show_salary: boolean
  contract_type: any
  show_contract_type: boolean
  students: any
  working_time: any
  send_automated_questionnaires: boolean
  send_questionnaires_to: any
  compliance_percentage_range: ICompliancePercentageRange
  send_candidates_to_status: any
  active: number
  code: string
  updated_at: string
  created_at: string
  id: number
  contract_type_name: string
  location_city: string
  formatted_salary: string
  first_working_time_name: string
  first_working_time_comment: string
  client: IClient
}
