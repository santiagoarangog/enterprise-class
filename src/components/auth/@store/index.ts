import type { UserInfoContract } from '@/entities/User'
import { reactive } from 'vue'
import passwordRecoveryVerificationModule, {
  type PasswordRecoveryVerificationModuleContract,
} from './passwordRecoveryVerificationModule'
import registrationModule, {
  type RegistrationModuleContract,
} from './registrationFormModule'

type AuthModule =
  | PasswordRecoveryVerificationModuleContract
  | RegistrationModuleContract

type GetModulePropType =
  | 'passwordRecoveryVerificationModule'
  | 'registrationModule'

interface StoreModulesContract {
  passwordRecoveryVerificationModule: typeof passwordRecoveryVerificationModule
  registrationModule: typeof registrationModule
}

interface AuthStateContract {
  user: UserInfoContract
  modules: StoreModulesContract
  showWelcomeModal: boolean
}

const state = reactive<AuthStateContract>({
  user: {} as UserInfoContract,
  modules: {
    passwordRecoveryVerificationModule,
    registrationModule,
  },
  showWelcomeModal: false,
})

const useAuthStore = () => {
  const setUser = (user: UserInfoContract) => {
    state.user = user
  }

  const isUserAuthenticated = () => {
    return !!state.user
  }

  const getUser = () => {
    return state.user
  }

  const getFullName = () => {
    if (!state.user.names)
      return JSON.parse(localStorage.getItem('vincu-user') || '{}').full_name
    return `${state.user.names} ${state.user.surnames}`
  }

  const getModule = (module: GetModulePropType): AuthModule | void => {
    if (module === 'registrationModule')
      return state.modules[module]() as RegistrationModuleContract
    if (module === 'passwordRecoveryVerificationModule')
      return state.modules[
        module
      ]() as PasswordRecoveryVerificationModuleContract
  }

  const showWelcomeModal = () => (state.showWelcomeModal = true)
  const hideWelcomeModal = () => (state.showWelcomeModal = false)
  const getShowWelcomeModal = () => state.showWelcomeModal

  return {
    setUser,
    isUserAuthenticated,
    getUser,
    getModule,
    showWelcomeModal,
    hideWelcomeModal,
    getShowWelcomeModal,
    getFullName,
  }
}

export default useAuthStore
