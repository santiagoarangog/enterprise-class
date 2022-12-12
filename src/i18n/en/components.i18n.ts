import type ComponentsI18nContract from '../contracts/components'

export default {
  uploadFile: {
    title: 'Upload file',
    description: '.doc, .docx, .pdf - Max 2Mb',
    button: 'Upload file',
    maxFileMessage: 'File is too big',
    fileNotValid: 'File is not valid',
  },
  footer: {
    link: {
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      regulations: 'Regulations',
      fraudNotice: 'Fraud Notice',
    },
    services: 'Linked to the Public Employment Service Network of Providers',
    authorized:
      'Authorized by the Special Administrative Unit of the Public Employment Service, pursuant to resolution No. 000929 of 2014.',
    copyRight: '© 2014 - 2022 Vincu S.A.S. All rights reserved.',
  },
  utils: {
    next: 'Next',
    previous: 'Previous',
    delete: 'Delete',
    clicHere: 'Click here',
    yes: 'Yes',
    no: 'No',
  },
} as ComponentsI18nContract
