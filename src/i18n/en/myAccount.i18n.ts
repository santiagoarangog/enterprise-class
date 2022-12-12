import type MyAccountFormi18nContract from '../contracts/IMyAccount'

export default {
  myAccount: 'My account',
  myBusiness: 'My business',
  generalInfo: {
    title: 'General information',
    name: 'Company name',
    type: 'Person type',
    documentType: 'Document type',
    identificationDocument: 'Document number',
    businessName: 'Business name',
    businnesNamePopOverMessage:
      'Name of the company as it appears in the Chamber of Commerce',
    country: 'Country',
    department: 'Department',
    city: 'City',
    billingAddress: 'Billing address',
    contactNumber: 'Company phone number',
    email: 'Company email',
    emailPopOverMessage: 'Company judicial notification email',
    rut: 'RUT',
  },
  legalRepresentative: {
    title: 'Legal representative',
    firstName: 'First name',
    lastName: 'Last name',
    documentType: 'Document type',
    identificationDocument: 'Document number',
  },
  aboutBusiness: {
    title: 'About your business',
    industry: 'Industry',
    quantityWorker: 'How many people work in your company?',
    logo: 'Logo',
    webSite: 'Website',
    historyAchievements:
      'Tell us about your company: history, what you sell, achievements, etc.',
    whyShouldWorkWithYou: 'Why should we work with you?',
    alertMessage:
      'This information will be seen by the candidate, so it is important to highlight the most relevant of your company.',
  },
  continue: 'Continue',
  save: 'Save changes',
} as MyAccountFormi18nContract
