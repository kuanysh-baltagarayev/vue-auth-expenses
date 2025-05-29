import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import AddExpenseView from '../views/AddExpenseView.vue'
import ExpensesView from '../views/ExpensesView.vue'

import { isTokenExpired } from '../utils/auth'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', component: AuthView },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/register', component: RegisterView },
  { path: '/add-expense', component: AddExpenseView, meta: { requiresAuth: true } },
  { path: '/expenses', component: ExpensesView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const token = auth.token

  if (to.meta.requiresAuth) {
    if (!token || isTokenExpired(token)) {
      auth.logout()
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
