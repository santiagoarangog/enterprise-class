import type ClientCreateContracti18nContract from './contracts/clientCreate'
import type AccountVerificationstContracti18nContract from './contracts/accountVerifications'
import type MyAccountFormi18nContract from './contracts/IMyAccount'
import type ComponentsI18nContract from './contracts/components'
import type SummaryFormi18nContract from './contracts/summaryForm'
import type InfoPagesI18nContract from './contracts/infoPages'
import type { IMenu } from './contracts/IMenu'
import type IMyOffersI18n from './contracts/myOffers'
import type ICountryI18n from './contracts/ICountry'
import type {IMenuCandidates} from "@/i18n/contracts/IMenuCandidates";
import type IMyCurriculumI18n from "@/i18n/contracts/myCurriculum";

export type I18nType = 'es' | 'en'

export interface FormValidationMessagesContract {
  required: string
  pleaseEnterYourPassword: string
  pleaseInputCorrectEmail: string
  pleaseEnterEmailAddress: string
  pleaseEnterYourName: string
  pleaseEnterYourLastname: string
  minSevenCharacters: string
  minSixCharacters: string
  minEightCharacters: string
  minCharacters: string
  twoPasswordsDontMatch: string
  pleaseInputPasswordAgain: string
  pleaseEnterYourPhone: string
  pleaseEnterYourBusinessName: string
  pleaseEnterYourJobTitle: string
  pleaseEnterYourAboutUs: string
  passwordDoesNotMatch: string
  pleaseEnterValidUrl: string
  fieldNotEmail: string
  fieldNotMobile: string
  numberMustBeGreaterThanZero: string
  rememberNoNumbersLinksEmailsEmoticonsOrDiscriminatoryContent: string
}

export interface AuthenticationI18nContract {
  name: string
  lastname: string
  email: string
  password: string
  phone: string
  repeatPassword: string
  register: string
  login: string
  closeSession: string
  recoverPassword: string
  passwordRecovery: string
  passwordRecoveryCodeInstructions: string
  registrationSuccess: string
  registrationSuccessMessage: string
  verify: string
  forgotPassword: string
  forgotPasswordMessage: string
  forgotPasswordSent: {
    bold: string
    normal: string
  }
  passwordChangeSuccessMessage: string
  changePassword: string
  pleaseEnterNewPassword: string
  confirmNewPassword: string
  savePasswordAndEnter: string
  welcomeModal: {
    title: string
    message: string
    button: string
    link: string
  }
  backToLogin: string
}

export interface ExeptionsI18nContract {
  badRequest: string
  serverError: string
  unauthorize: string
}

export interface LanguageTransContract {
  authentication: AuthenticationI18nContract
  formValidationMessages: FormValidationMessagesContract
  exeptions: ExeptionsI18nContract
  clientCreate: ClientCreateContracti18nContract
  accountVerifications: AccountVerificationstContracti18nContract
  myAccount: MyAccountFormi18nContract
  components: ComponentsI18nContract
  summaryForm: SummaryFormi18nContract
  infoPages: InfoPagesI18nContract
  menu: IMenu,
  menuCandidates: IMenuCandidates,
  myOffers: IMyOffersI18n,
  country: ICountryI18n,
  myCurriculum: IMyCurriculumI18n,
}

export interface I18nContract {
  es: LanguageTransContract
  en: LanguageTransContract
  mx: LanguageTransContract
}
