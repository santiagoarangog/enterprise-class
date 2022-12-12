import type ISalaryForm from '../contracts/ISalaryForm'

export enum EBenefitForm {
  salary = 'salary',
}

export interface IBenefitFormStatus {
  salary: boolean
}

interface IState {
  currentForm: EBenefitForm
  statusForm: IBenefitFormStatus
  formData: {
    salary: ISalaryForm | null
  }
}

const state = reactive<IState>({
  currentForm: EBenefitForm.salary,
  statusForm: {
    salary: false,
  },
  formData: {
    salary: null,
  },
})

const useBenefitStore = () => {
  const setCurrentForm = (form: EBenefitForm) => {
    state.currentForm = form
  }

  const getCurrentForm = () => {
    return state.currentForm
  }

  const setSalaryStatus = (status: boolean) => {
    state.statusForm.salary = status
  }

  const getSalaryStatus = (): boolean => {
    return state.statusForm.salary
  }

  const setSalaryData = (data: ISalaryForm) => {
    state.formData.salary = data
  }

  const getSalaryData = (): ISalaryForm => {
    return state.formData.salary as ISalaryForm
  }

  return {
    getCurrentForm,
    setCurrentForm,
    getSalaryStatus,
    setSalaryStatus,
    getSalaryData,
    setSalaryData,
  }
}

export default useBenefitStore
