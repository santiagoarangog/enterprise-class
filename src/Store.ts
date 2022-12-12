import routesConfig from '@/router/routesConfig'
import type { SelectOptionContract } from '@/@types'
import type { ListContract } from './@types'
import http from '@/http'
import type { HttpContract } from '@/http'
import { reactive, type Component } from 'vue'
import i18n from '@/i18n'
import type {
  I18nContract,
  I18nType,
  LanguageTransContract,
} from './i18n/i18nContract'
import type {
  ExceptionContract,
  InitialDataContract,
  InitialPathsContract,
} from './@types'

export interface CountryStateContract {
  country_id: number
  id: number
  name: string
}

export interface CountryStateCityContract {
  country_id: number
  id: number
  name: string
  state_id: number
}

export type ICountryHeader = 'co' | 'mx'

export interface ICountry {
  country: ICountryHeader
  icon: Component | null
  code: string
}

interface StateContract {
  http: HttpContract
  i18n: I18nContract
  i18nSelectedLanguage: I18nType
  exception: ExceptionContract | null
  initialData: InitialDataContract | null
  countries: ListContract[]
  states: CountryStateContract[]
  cities: CountryStateCityContract[]
  personTypes: ListContract[]
  preventReload: boolean
  isNewUser: boolean
  country: ICountry
}

const state = reactive<StateContract>({
  http: http(),
  i18n,
  i18nSelectedLanguage: 'es',
  exception: null,
  initialData: null,
  countries: [],
  states: [],
  cities: [],
  personTypes: [],
  preventReload: false,
  isNewUser: false,
  country: {
    country: 'co',
    icon: () => import('@/assets/svg/colombia.svg'),
    code: '+57',
  },
})

export default function Store() {
  function setException(exception: ExceptionContract | null): void {
    state.exception = exception
  }
  function getException(): ExceptionContract | null {
    return state.exception
  }
  function setI18nLanguage(language: I18nType): void {
    state.i18nSelectedLanguage = language
  }
  function getI18n(): LanguageTransContract {
    const lang = state.i18nSelectedLanguage
    return state.i18n[lang]
  }
  function getHttp(): HttpContract {
    return state.http
  }
  function setJwtToken(token: string): void {
    state.http.setJwtToken(token)
  }

  function setInitialData(data: InitialDataContract): void {
    state.initialData = data
  }

  function getInitialData(): InitialDataContract | null {
    return state.initialData
  }

  function getPaths(): InitialPathsContract {
    return state.initialData?.paths as InitialPathsContract
  }

  function setCountries(list: ListContract[]): void {
    localStorage.setItem('vincu-countries', JSON.stringify(list))
    state.countries = list
  }

  function getCountries(): ListContract[] {
    return state.countries
  }

  function getCountriesForSelect(): SelectOptionContract[] {
    return state.countries.map((country) => ({
      label: country.name,
      value: country.id,
    }))
  }

  function setStates(list: CountryStateContract[]): void {
    localStorage.setItem('vincu-states', JSON.stringify(list))
    state.states = list
  }

  function getStates(): CountryStateContract[] {
    return state.states
  }

  function getStatesForSelect(country_id: number): SelectOptionContract[] {
    return state.states
      .filter((row) => row.country_id === country_id)
      .map((state) => ({
        label: state.name,
        value: state.id,
      }))
  }

  function setCities(list: CountryStateCityContract[]): void {
    localStorage.setItem('vincu-cities', JSON.stringify(list))
    state.cities = list
  }

  function getCities(): CountryStateCityContract[] {
    return state.cities
  }

  function getCitiesForSelect(
    country_id: number,
    state_id: number
  ): SelectOptionContract[] {
    return state.cities
      .filter(
        (row) => row.country_id == country_id && row.state_id === state_id
      )
      .map((city) => ({
        label: city.name,
        value: city.id,
      }))
  }

  function setPersonTypes(list: ListContract[]): void {
    state.personTypes = list
  }

  function getPersonTypesForSelect(): SelectOptionContract[] {
    return state.personTypes.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  }

  function setPreventReload(value: boolean): void {
    state.preventReload = value
  }

  function getPreventReload(): boolean {
    return state.preventReload
  }

  const setIsNewUser = () => {
    state.isNewUser = true
  }

  const getIsNewUser = () => state.isNewUser

  const setCountryHeader = async (country: ICountryHeader) => {
    localStorage.setItem('vincu-country-header', country)
    Store().setPreventReload(false)
    await new Promise((resolve) => setTimeout(resolve, 10))
    window.location.href = routesConfig.Login.path
  }

  const getCountryHeader = () => {
    const country = localStorage.getItem('vincu-country-header')
    return country ? (country as ICountryHeader) : 'co'
  }

  const setCountry = (country: ICountry) => {
    state.country = country
  }

  const getCountry = () => {
    return state.country
  }

  return {
    getHttp,
    setJwtToken,
    getI18n,
    setI18nLanguage,
    setException,
    getException,
    setInitialData,
    getInitialData,
    getPaths,
    setCountries,
    getCountries,
    getCountriesForSelect,
    setStates,
    getStates,
    getStatesForSelect,
    setCities,
    getCities,
    getCitiesForSelect,
    setPersonTypes,
    getPersonTypesForSelect,
    setPreventReload,
    getPreventReload,
    setIsNewUser,
    getIsNewUser,
    setCountryHeader,
    getCountryHeader,
    setCountry,
    getCountry,
  }
}
