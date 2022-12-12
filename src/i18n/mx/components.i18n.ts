import type ComponentsI18nContract from '../contracts/components'

export default {
  uploadFile: {
    title: 'Carga el archivo',
    description: '.doc, .docx, .pdf - Max 2Mb',
    button: 'Carga el archivo',
    maxFileMessage: 'El archivo es demasiado grande',
    fileNotValid: 'El archivo no es válido',
  },
  footer: {
    link: {
      contactUs: 'Contáctanos',
      privacyPolicy: 'Políticas de privacidad',
      regulations: 'Reglamentos',
      fraudNotice: 'Aviso de fraude',
    },
    services:
      'Vinculado a la red de prestadores del Servicio Público de Empleo.',
    authorized:
      'Autorizado por la Unidad Administrativa Especial del Servicio Público de Empleo según Resolución número 0439 de 2022',
    copyRight: '© 2014 - 2022 Vincu S.A.S. Todos los derechos',
  },
  utils: {
    next: 'Siguiente',
    previous: 'Anterior',
    delete: 'Eliminar',
    clicHere: 'Clic aquí',
    yes: 'Sí',
    no: 'No',
  },
} as ComponentsI18nContract
