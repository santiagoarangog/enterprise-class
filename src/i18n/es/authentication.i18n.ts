import type { AuthenticationI18nContract } from '../i18nContract'

export default {
  name: 'Nombre',
  lastname: 'Apellido',
  email: 'Correo electrónico',
  password: 'Contraseña',
  phone: 'Teléfono',
  repeatPassword: 'Re-digite su contraseña',
  recoverPassword: 'Restablecer contraseña',
  passwordRecoveryCodeInstructions:
    'Por favor digital el codigo que hemos enviado a #email# y verifica tu solicitud.',
  registrationSuccess: 'Registro exitoso',
  registrationSuccessMessage: 'Te hemos enviado n correo electronico a #email#',
  verify: 'Verificar',
  forgotPassword: '¿Olvidaste tu contraseña?',
  forgotPasswordSent: {
    bold: 'Revisa tu correo.',
    normal: 'Hemos enviado las instrucciones para restablecer tu contraseña.',
  },
  forgotPasswordMessage: 'No te preocupes, te enviaremos instrucciones',
  register: 'Registrarse',
  login: 'Iniciar sesión',
  closeSession: 'Cerrar sesión',
  passwordChangeSuccessMessage: 'Your password have change successfully',
  changePassword: 'Ingresa tu nueva contraseña',
  pleaseEnterNewPassword: 'Nueva contraseña',
  confirmNewPassword: 'Confirmar nueva contraseña',
  savePasswordAndEnter: 'Guardar contraseña e ingresar',
  welcomeModal: {
    title: '¡Genial! Ya haces parte de Vincu',
    message:
      'Recuerda que para empezar a publicar ofertas, primero deberas completar la información de tu empresa.',
    button: 'Completar info de la empresa',
    link: 'Saltar',
  },
  backToLogin: 'Volver a iniciar sesión',
} as AuthenticationI18nContract
