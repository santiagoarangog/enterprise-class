export interface FooterI18nContract {
  link: {
    contactUs: string
    privacyPolicy: string
    regulations: string
    fraudNotice: string
  }
  services: string
  authorized: string
  copyRight: string
}

export interface IUtils {
  next: string
  previous: string
  delete: string
  clicHere: string
  yes: string
  no: string
}

export default interface ComponentsI18nContract {
  uploadFile: {
    title: string
    description: string
    button: string
    maxFileMessage: string
    fileNotValid: string
  }
  footer: FooterI18nContract
  utils: IUtils
}
