import type { SelectOptionContract } from '@/@types'
import Store from '@/Store'

export interface IList {
  id: number
  name: string
  info?: string
}

export interface ICountryMain {
  id: number
  name: string
  area_code: string
  drivers_license: string[]
}

export interface ICountryState {
  country_id: number
  id: number
  name: string
}

export interface ICountryStateCity {
  country_id: number
  id: number
  name: string
  state_id: number
}

export interface IJobLevel {
  id: number
  name: string
  info: string
}

export interface ISalaryMain {
  id: number
  range: {
    min: number
    max: number
  }
}

export interface IState {
  industries: IList[]
  countries: ICountryMain[]
  states: ICountryState[]
  cities: ICountryStateCity[]
  areas: IList[]
  roles: IList[]
  jobLevels: IJobLevel[]
  jobModalities: IList[]
  languages: IList[]
  educationLevels: IList[]
  transportTypes: IList[]
  salary: ISalaryMain[]
}

const state = reactive<IState>({
  industries: [],
  countries: [],
  states: [],
  cities: [],
  areas: [],
  roles: [],
  jobLevels: [],
  jobModalities: [],
  languages: [],
  educationLevels: [],
  transportTypes: [],
  salary: [],
})

const castToSelectOption = (list: IList[]): SelectOptionContract[] => {
  return list.map((item) => {
    return {
      value: item.id,
      label: item.name,
    }
  })
}

const useListStore = () => {
  const setIndustries = (list: IList[]) => {
    state.industries = list
  }

  const getIndustriesForSelect = (): SelectOptionContract[] => {
    return castToSelectOption(state.industries)
  }

  const setCountries = (list: ICountryMain[]) => {
    state.countries = list
  }

  const getCountriesForSelect = (): SelectOptionContract[] => {
    return castToSelectOption(state.countries)
  }

  const setStates = (list: ICountryState[]) => {
    state.states = list
  }

  const getStatesForSelect = (country_id: number): SelectOptionContract[] => {
    const filter = state.states.filter((row) => row.country_id === country_id)
    return castToSelectOption(filter)
  }

  const setCities = (list: ICountryStateCity[]) => {
    state.cities = list
  }

  const getCitiesForSelect = (
    country_id: number,
    state_id: number
  ): SelectOptionContract[] => {
    const filter = state.cities.filter(
      (row) => row.country_id === country_id && row.state_id === state_id
    )
    return castToSelectOption(filter)
  }

  const setAreas = (list: IList[]) => {
    state.areas = list
  }

  const getAreasForSelect = (): SelectOptionContract[] => {
    return castToSelectOption(state.areas)
  }

  const setRoles = (list: IList[]) => {
    state.roles = list
  }

  const getRolesForSelect = (): SelectOptionContract[] => {
    return castToSelectOption(state.roles)
  }

  const setJobLevels = (list: IJobLevel[]) => {
    state.jobLevels = list
  }

  const getJobLevelsForSelect = (): IJobLevel[] => {
    return state.jobLevels
  }

  const setJobModalities = (list: IList[]) => {
    state.jobModalities = list
  }

  const getJobModalitiesForSelect = (): SelectOptionContract[] => {
    return castToSelectOption(state.jobModalities)
  }

  const getLocations = () => {
    const currentCountry = Store().getCountryHeader()

    let countries = Object.assign([], state.countries) as IList[]

    if (currentCountry === 'co') {
      countries = countries.filter((row) => row.name === 'Colombia')
    } else {
      countries = countries.filter((row) => row.name !== 'Colombia')
    }

    countries.push({
      id: 0,
      name: 'En cualquier lugar del mundo',
    })

    return castToSelectOption(countries)
  }

  const setLanguages = (list: IList[]) => {
    state.languages = list
  }

  const getLanguagesForSelect = (): SelectOptionContract[] => {
    return castToSelectOption(state.languages)
  }

  const setEducationLevels = (list: IList[]) => {
    state.educationLevels = list
  }

  const getEducationLevelsForSelect = (): IList[] => {
    return state.educationLevels
  }

  const setTransportTypes = (list: IList[]) => {
    state.transportTypes = list
  }

  const getTransportTypesForSelect = (): SelectOptionContract[] => {
    return castToSelectOption(state.transportTypes)
  }

  const getDriverCategories = (): string[] => {
    const countryName =
      Store().getCountryHeader() === 'co' ? 'colombia' : 'méxico'
    const currentCountry = state.countries.find(
      (item) => item.name.toLocaleLowerCase() === countryName
    )
    return currentCountry?.drivers_license || []
  }

  const setSalary = (list: ISalaryMain[]) => {
    state.salary = list
  }

  const getSalaryMain = (): ISalaryMain => {
    return state.salary.length > 0
      ? state.salary[0]
      : { id: 0, range: { min: 0, max: 0 } }
  }

  return {
    setIndustries,
    getIndustriesForSelect,
    setCountries,
    getCountriesForSelect,
    setStates,
    getStatesForSelect,
    setCities,
    getCitiesForSelect,
    setAreas,
    getAreasForSelect,
    setRoles,
    getRolesForSelect,
    setJobLevels,
    getJobLevelsForSelect,
    setJobModalities,
    getJobModalitiesForSelect,
    getLocations,
    setLanguages,
    getLanguagesForSelect,
    setEducationLevels,
    getEducationLevelsForSelect,
    setTransportTypes,
    getTransportTypesForSelect,
    getDriverCategories,
    setSalary,
    getSalaryMain,
  }
}

export default useListStore
