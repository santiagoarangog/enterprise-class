import type MyAccountFormi18nContract from '../contracts/IMyAccount'

export default {
  myAccount: 'Mi cuenta',
  myBusiness: 'Mi empresa',
  generalInfo: {
    title: 'Información general',
    name: 'Nombre comercial de la empresa',
    type: 'Tipo de Persona',
    documentType: 'Tipo de documento',
    identificationDocument: 'Número de documento',
    businessName: 'Denominación o razón social',
    businnesNamePopOverMessage:
      'Nombre de la empresa como figura en la Cámara de Comercio',
    country: 'País',
    department: 'Departamento',
    city: 'Ciudad',
    billingAddress: 'Dirección de notificación',
    contactNumber: 'Teléfono de la empresa',
    email: 'Correo electrónico de la empresa',
    emailPopOverMessage: 'Correo de notificación judiciales de la empresa',
    rut: 'RUT',
  },
  legalRepresentative: {
    title: 'Representante legal',
    firstName: 'Nombres',
    lastName: 'Apellidos',
    documentType: 'Tipo de documento',
    identificationDocument: 'Número de documento',
  },
  aboutBusiness: {
    title: 'Sobre tu empresa',
    industry: '¿A qué industria pertenece tu empresa?',
    quantityWorker: '¿Cuántas personas trabajan en tu empresa?',
    logo: 'Logo de la empresa',
    webSite: 'Sitio web de la empresa',
    historyAchievements:
      'Cuéntanos sobre tu empresa: trayectoria, qué vender, logros, etc.',
    whyShouldWorkWithYou: '¿Por qué trabajar con tu empresa?',
    alertMessage:
      'Esta información la verá el candidato, por eso es importante destacar lo más relevante de tu empresa.',
  },
  continue: 'Continuar',
  save: 'Guardar cambios',
} as MyAccountFormi18nContract
