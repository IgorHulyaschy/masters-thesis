import { createRouter, createWebHistory } from 'vue-router'
import InvoiceView from '@/views/InvoiceView.vue'
import AccountSignUp from '@/views/AccountSignUp.vue'
import AccountSignIn from '@/views/AccountSignIn.vue'
import Account from '@/views/account/Account.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/invoice/:invoiceId',
      component: InvoiceView,
    },
    {
      path: '/sign-up',
      component: AccountSignUp,
    },
    {
      path: '/sign-in',
      component: AccountSignIn,
    },
    {
      path: '/account',
      component: Account
    }
  ],
})

export default router
