import type { FormValidationMessagesContract } from '../i18nContract'

export default {
  required: 'This field is required',
  pleaseEnterYourPassword: 'Please enter your password',
  pleaseInputCorrectEmail:
    'Please enter a valid email address Ej: user@email.com',
  pleaseEnterEmailAddress: 'Please enter your email address',
  pleaseEnterYourName: 'Please enter your name',
  pleaseEnterYourLastname: 'Please enter your lastname',
  minSevenCharacters: 'Miniimum 7 characters long',
  minSixCharacters: 'Miniimum 6 characters long',
  minEightCharacters: 'Minimo 8 caracteres',
  minCharacters: ' must be at least ',
  twoPasswordsDontMatch: 'The 2 passwords dont match',
  pleaseInputPasswordAgain: 'Please input your password again',
  pleaseEnterYourPhone: 'Please enter your phone',
  pleaseEnterYourBusinessName: 'Please enter your business name',
  pleaseEnterYourJobTitle: 'Please enter your job title',
  pleaseEnterYourAboutUs: 'Please choose an option',
  passwordDoesNotMatch: 'The password does not match',
  pleaseEnterValidUrl: 'Please enter a valid URL',
  fieldNotEmail: 'The field should not be an email',
  fieldNotMobile: 'The field should not be a mobile',
  numberMustBeGreaterThanZero: 'The number must be greater than zero',
  rememberNoNumbersLinksEmailsEmoticonsOrDiscriminatoryContent:
    '*You should not enter numbers, links, emails, emoticons or discriminatory or exclusionary content in this field',
} as FormValidationMessagesContract
