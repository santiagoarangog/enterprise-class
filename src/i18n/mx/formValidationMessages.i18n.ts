import type { FormValidationMessagesContract } from '../i18nContract'

export default {
  required: 'Este campo es requerido',
  pleaseEnterYourPassword: 'Por favor digite su contraseña',
  pleaseInputCorrectEmail:
    'Por favor digite un correo valido Ej: user@email.com',
  pleaseEnterEmailAddress: 'Por favor digite su correo electronico',
  pleaseEnterYourName: 'Por favor digite su nombre',
  pleaseEnterYourLastname: 'Por favor digite su apellido',
  minSevenCharacters: 'Mínimo 7 caracteres',
  minSixCharacters: 'Mínimo 6 caracteres',
  minEightCharacters: 'Mínimo 8 caracteres',
  minCharacters: ' debe tener un mínimo de caracteres de ',
  twoPasswordsDontMatch: 'Las dos contraseñas no coiciden',
  pleaseInputPasswordAgain: 'Por favor digite su contraseña de nuevo',
  pleaseEnterYourPhone: 'Por favor digite su telefono',
  pleaseEnterYourBusinessName: 'Por favor digite su nombre de negocio',
  pleaseEnterYourJobTitle: 'Por favor digite su cargo',
  pleaseEnterYourAboutUs: 'Por favor elija una opcion',
  passwordDoesNotMatch: 'La contraseña no coincide',
  pleaseEnterValidUrl: 'Ingrese una URL valida',
  fieldNotEmail: 'El campo no debe ser un correo',
  fieldNotMobile: 'El campo no debe ser un celular',
  numberMustBeGreaterThanZero: 'El número debe ser mayor que cero',
  rememberNoNumbersLinksEmailsEmoticonsOrDiscriminatoryContent:
    '*No ingresar números de teléfono, links, correos electrónicos, emoticones o contenido discriminatorio o excluyente',
} as FormValidationMessagesContract
