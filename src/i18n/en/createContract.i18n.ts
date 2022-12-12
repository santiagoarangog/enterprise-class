import type ClientCreateContracti18nContract from '../contracts/clientCreate'

export default {
  title: 'Create your account',
  bePartOf: {
    text: 'Be part of ',
    text2: 'Vincu!',
  },
  firstName: 'Names',
  lastName: 'Lastname',
  email: 'Email address',
  phone: 'Phone number',
  businessName: 'Business name',
  jobTitle: 'Job title',
  password: 'Password',
  confirmPassword: 'Confirm password',
  about: 'Where did you hear about vincu?',
  privacyPolicy: {
    text: 'I have read and accept',
    link: 'Privacy policy',
  },
  termsAndConditions: {
    text: 'I have read, understood and authorize in advance, expressly and informed to the Holder to carry out the treatment of my personal data, according to the',
    link: 'Data Processing Policy',
  },
  buttonText: 'Create account',
  alreadyRegistered: {
    text: 'Already registered?',
    link: 'Log in here',
  },
  requiredFieldsText: 'The fields marked with asterisk (*) are mandatory',
  passwordRequirements: {
    minCharacters: 'Minimum 8 characters',
    lowercase: 'At least one lowercase letter',
    uppercase: 'At least one uppercase letter',
  },
  pleaseAcceptTermsAndConditions: 'Please accept all terms and conditions',
} as ClientCreateContracti18nContract
