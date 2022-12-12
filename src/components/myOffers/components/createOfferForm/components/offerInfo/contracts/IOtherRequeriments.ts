export interface ILanguage {
  languageId: number
  languageName: string
  languageLevelId: number
  addLanguage?: boolean
  showLevelName: boolean
}

export interface IDriverLicence {
  type: number
  level: number[]
}

export default interface IOtherRequeriments {
  languageId: number
  languageLevelId: number
  languageName: string
  showLevelName: boolean
  languages?: ILanguage[]
  transportStatus: boolean
  driverLicenseStatus: boolean
  driver_license: IDriverLicence
}
