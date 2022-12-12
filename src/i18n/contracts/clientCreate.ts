export default interface ClientCreateContracti18nContract {
  title: string
  bePartOf: {
    text: string
    text2: string
  }
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName: string
  jobTitle: string
  password: string
  confirmPassword: string
  about: string
  privacyPolicy: {
    text: string
    link: string
  }
  termsAndConditions: {
    text: string
    link: string
  }
  buttonText: string
  alreadyRegistered: {
    text: string
    link: string
  }
  requiredFieldsText: string
  passwordRequirements: {
    minCharacters: string
    lowercase: string
    uppercase: string
  }
  pleaseAcceptTermsAndConditions: string
}
