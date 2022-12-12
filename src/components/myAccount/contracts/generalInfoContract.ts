export interface IRut {
  file: string
  type: string
  name: string
}

export interface GeneralInfoContract {
  name: string
  type: number
  document_type_id: number
  identification_document: string
  business_name: string
  country_id: number
  department_id: number
  city_id: number
  billing_address: string
  contact_number: string
  email: string
  rut?: IRut | null
}
