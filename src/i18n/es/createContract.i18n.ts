import type ClientCreateContracti18nContract from '../contracts/clientCreate'

export default {
  title: 'CREA TU CUENTA',
  bePartOf: {
    text: '¡Haz parte de ',
    text2: 'Vincu!',
  },
  firstName: 'Nombres',
  lastName: 'Apellidos',
  email: 'Correo electrónico',
  phone: 'Celular',
  businessName: 'Nombre de la empresa',
  jobTitle: '¿Cuál es tu cargo?',
  password: 'Contraseña',
  confirmPassword: 'Confirmar contraseña',
  about: '¿Dónde escuchaste sobre Vincu?',
  privacyPolicy: {
    text: 'He leído y acepto los',
    link: 'Términos y Condiciones.',
  },
  termsAndConditions: {
    text: 'He leído, entendido y autorizo de forma previa, expresa e informada al Titular para llevar a cabo el tratamiento de mis datos personales, de acuerdo a la',
    link: 'Política de Tratamiento de Datos Personales.',
  },
  buttonText: 'Crear cuenta',
  alreadyRegistered: {
    text: '¿Ya  estás registrado?',
    link: 'Ingresa aquí',
  },
  requiredFieldsText: 'Los campos marcados con asterisco (*) son obligatorios',
  passwordRequirements: {
    minCharacters: 'Mínimo 8 caracteres',
    lowercase: 'Al menos una letra minúscula',
    uppercase: 'Al menos una letra MAYÚSCULA',
  },
  pleaseAcceptTermsAndConditions:
    'Por favor acepta todos los términos y condiciones',
} as ClientCreateContracti18nContract
