import type { ILanguage } from './../components/offerInfo/contracts/IOtherRequeriments'
import type IGeneralInfoOfferForm from '../components/offerInfo/contracts/IGeneralInfoOfferForm'
import type IOtherRequeriments from '../components/offerInfo/contracts/IOtherRequeriments'
import type {
  IBenefitsRequest,
  IMainInfoRequest,
} from '../contracts/IPayloadRequest'
import type ICreateOfferPayload from '../contracts/IPayloadRequest'
import type ISalaryForm from '../components/benefits/contracts/ISalaryForm'

const castModelToRequest = ({
  generalInfoParams = {} as IGeneralInfoOfferForm,
  otherRequerimentsParams = {} as IOtherRequeriments,
  salaryParams = {} as ISalaryForm,
}): ICreateOfferPayload => {
  const {
    name,
    description,
    work_sector_id,
    work_area_id,
    work_role_id,
    position_level_id,
    job_modality_id,
    location_id,
    department_id,
    city_id,
    hide_company_info,
    vancancy_number,
  } = generalInfoParams || null

  const {
    languageId,
    languageLevelId,
    showLevelName,
    languageName,
    languages,
    driverLicenseStatus,
    driver_license,
  } = otherRequerimentsParams || null

  const allLanguajes = [] as ILanguage[]
  if (languageId && languageLevelId) {
    allLanguajes.push({
      languageId: languageId,
      languageLevelId: languageLevelId,
      showLevelName: showLevelName,
      languageName: languageName,
    })

    if (languages) {
      languages.forEach((item) => {
        allLanguajes.push({
          languageId: item.languageId,
          languageLevelId: item.languageLevelId,
          showLevelName: item.showLevelName,
          languageName: item.languageName,
        })
      })
    }
  }

  const main_info: IMainInfoRequest = {
    name: name || '',
    description: description || '',
    work_sector_id,
    work_area_id,
    work_role_id,
    position_level_id,
    vacancy_number: vancancy_number,
    state: department_id,
    cities: city_id ? [city_id] : [],
    languages: allLanguajes,
    location: {
      countries: location_id ? [location_id] : [],
    },
    skills: [],
    driverLicenseStatus,
    driver_license,
    hide_company_info: hide_company_info ? 1 : 0,
  }

  const benefits: IBenefitsRequest[] = [
    {
      job_modality_id: job_modality_id || null,
      salary: {
        min: salaryParams.salary?.min || null,
        max: salaryParams.salary?.max || null,
        bonus: salaryParams.salary?.bonus || 0,
      },
      bonuses: salaryParams.bonuses,
    },
  ]

  const payload: ICreateOfferPayload = {
    offer_status: 2,
    main_info,
    benefits,
    profiles: [],
  }

  return payload
}

export default castModelToRequest
