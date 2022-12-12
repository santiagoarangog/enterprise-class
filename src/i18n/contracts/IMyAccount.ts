export default interface MyAccountFormi18nContract {
  myAccount: string
  myBusiness: string
  generalInfo: {
    title: string
    name: string
    type: string
    documentType: string
    identificationDocument: string
    businessName: string
    businnesNamePopOverMessage: string
    country: string
    department: string
    city: string
    billingAddress: string
    contactNumber: string
    email: string
    emailPopOverMessage: string
    rut: string
  }
  legalRepresentative: {
    title: string
    firstName: string
    lastName: string
    documentType: string
    identificationDocument: string
  }
  aboutBusiness: {
    title: string
    industry: string
    quantityWorker: string
    logo: string
    webSite: string
    historyAchievements: string
    whyShouldWorkWithYou: string
    alertMessage: string
  }
  continue: string
  save: string
}
