import emptyVue from '@/layouts/empty.vue'
import simpleVue from '@/layouts/simple.vue'
import candidateVue from '@/layouts/candidate.vue'
import pageNotFoundVue from '@/pages/pageNotFound.vue'

export default {
  Index: {
    path: '/',
    name: 'index',
    component: () => import('@/pages/home.vue'),
    redirect: '/mis-ofertas',
    meta: {
      auth: true,
    },
  },

  Client: {
    path: '/crear-cliente',
    name: 'client',
    component: () => import('@/pages/createClientPage.vue'),
    meta: {
      layout: simpleVue,
    },
  },

  Login: {
    path: '/iniciar-sesion',
    name: 'login',
    component: () => import('@/pages/loginPage.vue'),
    meta: {
      layout: emptyVue,
    },
  },

  Home: {
    path: '/home',
    name: 'home',
    redirect: '/mis-ofertas',
    component: () => import('@/pages/home.vue'),
    meta: {
      auth: true,
    },
  },

  MyAccount: {
    path: '/mi-cuenta',
    name: 'my-account',
    component: () => import('@/pages/myAccountPage.vue'),
    meta: {
      auth: true,
    },
  },

  Summary: {
    path: '/resumen',
    name: 'summary',
    component: () => import('@/pages/summaryPage.vue'),
    meta: {
      auth: false,
      layout: emptyVue,
    },
  },

  AccountVerified: {
    path: '/cuenta-verificada',
    name: 'account-verified',
    component: () => import('@/pages/accountVerifiedPage.vue'),
    meta: {
      layout: emptyVue,
    },
  },

  ExpiredLink: {
    path: '/enlace-caducado/:country/:type/:token/:email/',
    name: 'expired-link',
    component: () => import('@/pages/expiredLinkPage.vue'),
    meta: {
      layout: emptyVue,
    },
  },

  ResetPassword: {
    path: '/auth/reset-password',
    name: 'resetPassword',
    component: () => import('@/pages/auth/resetPasswordPage.vue'),
    meta: {
      layout: emptyVue,
    },
  },

  PasswordChange: {
    path: '/auth/change-password/:country/:type/:token/:email/',
    name: 'changePassword',
    component: () => import('@/pages/auth/changePasswordPage.vue'),
    meta: {
      layout: emptyVue,
    },
  },

  MyOffers: {
    path: '/mis-ofertas',
    name: 'myOffers',
    component: () => import('@/pages/offer/myOffersPage.vue'),
    meta: {
      auth: true,
    },
  },

  CreateOffer: {
    path: '/crear-oferta',
    name: 'createOffer',
    component: () => import('@/pages/offer/createOfferPage.vue'),
    meta: {
      auth: true,
    },
  },

  MyCurriculum: {
    path: '/mi-hoja-de-vida',
    name: 'myCurriculum',
    component: () => import('@/pages/curriculum/myCurriculumPage.vue'),
    meta: {
      auth: true,
      layout: candidateVue,
    },
  },
  PageNotFund: {
    path: '*',
    name: 'pageNotFound',
    component: pageNotFoundVue,
    meta: {
      layout: emptyVue,
    },
  },
}
