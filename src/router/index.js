import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase.js'
import SearchView from '../views/SearchView.vue'
import ResultView from '../views/ResultView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchView,
      meta: { requiresAuth: true }
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
})

// ログインしていない場合はログイン画面へリダイレクト
router.beforeEach(async (to) => {
  const { data: { session } } = await supabase.auth.getSession()
  const isLoggedIn = !!session

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login' }
  }

  if (to.name === 'login' && !isLoggedIn) {
    return { name: 'search' }
  }
})

export default router
