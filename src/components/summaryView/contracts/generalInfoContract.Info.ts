export interface GeneralInfoContract {
  name: string
  type: number
  type_name: number
  document_type_id: number
  document_type: string
  identification_document: string
  business_name: string
  country_id: number
  country: string
  department_id: number
  department: string
  city_id: number
  city: string
  billing_address: string
  contact_number: string
  email: string
  rut: {
    url: string
    file_name: string
    file_size: number
  }
}
