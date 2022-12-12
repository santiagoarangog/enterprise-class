import type IMyOffersI18n from '../contracts/myOffers'

export default {
  createOffer: {
    title: 'Crear tu oferta',
    offerInfo: {
      title: 'Información de la oferta',
      generalInfo: {
        title: 'Información general',
        name: 'Nombre de la oferta',
        description: 'Descripción del cargo',
        work_sector: 'Industria del cargo',
        work_area: 'Área del cargo',
        work_role: 'Rol asociado al cargo',
        position_level: 'Nivel del cargo',
        job_modality: 'Modalidad del cargo',
        location: 'Ubicación',
        hide_company_info:
          '¿La información de la empresa debe ser confidencial? ',
        hide_company_info_tooltip:
          'La información sobre la empresa no sera visible para esta oferta',
        vancancy_number: 'Número de vacantes',
        buttonText: 'Continuar',
      },
      otherRequeriments: {
        title: 'Otros requerimientos',
        language: 'Idiomas (opcional)',
        languajeLevel: 'Nivel mínimo requerido',
        helpText: 'Si no conoces alguno de estos términos, haz',
        addOtherLanguage: 'Agregar otro idioma',
        transport: '¿El candidato debe contar con transporte? (opcional)',
        transportType: '¿Qué tipo de transporte?',
        driverLicense: '¿Se requiere licencia de conducir? (opcional)',
        category: '¿Categoría?',
      },
    },
    benefits: {
      title: 'Beneficios',
      salary: {
        title: 'Salario',
        description: '¿Cuál es el rango de salario?',
        salary: 'Salario base mensual',
        from: 'Desde',
        to: 'Hasta',
        bonuses: 'Bonificaciones (Opcional)',
        bonusValue: 'Valor bonificación',
        minSalary: 'El salario mínimo debe ser mayor a',
        maxSalary: 'El salario máximo debe ser mayor a',
        minSalaryError: 'El salario mínimo debe ser menor al salario máximo',
      },
      contract: {},
    },
    cardTimeLine: {
      showStepByStep: 'Mostrar paso',
      hideStepByStep: 'Ocultar paso',
    },
    cardWarning: {
      remember: '¡Recuerda!',
      firstParagraph:
        'Completa el formulario lo más detallado posible para que los candidatos tengan la mejor información sobre tu oferta.',
      iconText: 'Si ves este icono: ',
      secondParagraph: 'La información no será visible para el candidato.',
    },
  },
} as IMyOffersI18n
