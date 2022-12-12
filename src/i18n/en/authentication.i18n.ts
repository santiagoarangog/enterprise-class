import type { AuthenticationI18nContract } from '../i18nContract'

export default {
  name: 'Name',
  lastname: 'Lastname',
  email: 'Email address',
  password: 'Password',
  phone: 'Phone number',
  repeatPassword: 'Re-enter you password',
  recoverPassword: 'Recover password',
  passwordRecoveryCodeInstructions:
    'We have sent an email to #email# that contains a code. Please enter the code to continue with the process',
  registrationSuccess: 'Registration successful',
  registrationSuccessMessage: 'We have sent an email to #email#',
  verify: 'Verify',
  forgotPassword: 'Forgot your password?',
  forgotPasswordSent: {
    bold: 'Check your email.',
    normal: 'We have sent the instructions to recover your password.',
  },
  forgotPasswordMessage: 'No worries, we will send you instructions',
  register: 'Register',
  login: 'Login',
  closeSession: 'Close session',
  passwordChangeSuccessMessage: 'Your password have change successfully',
  changePassword: 'Enter your new password',
  pleaseEnterNewPassword: 'New password',
  confirmNewPassword: 'Confirm new password',
  savePasswordAndEnter: 'Save password and continue',
  welcomeModal: {
    title: 'Great! You are part of Vincu',
    message:
      'Remember that to start publishing offers, you must first complete the information of your company.',
    button: 'Complete company information',
    link: 'Skip',
  },
  backToLogin: 'Back to login',
} as AuthenticationI18nContract
