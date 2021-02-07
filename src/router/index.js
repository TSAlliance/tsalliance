import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '@/store'
import { Account } from '@/models/account'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta?.requiresAuth) {
    store.state.appRequiresAuth = true
    store.state.appIsReady = false

    if(!store.state.account.isLoggedIn) {
      next({name: 'authIndex'})
      store.state.appIsReady = true
    } else {
      Account.verifySession().then((isVerified) => {
        if(!isVerified) {
          router.push({name: 'authIndex'})
        } 
        store.state.appIsReady = true
      })

      next()
    }
    
  } else {
    store.state.appIsReady = true
    next()
  }

})
router.afterEach((to) => {
  if(store.state.account.isLoggedIn && to.meta?.requiresAuth) {
    Account.verifySession()
  }
})

export default router
