import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'
import routes from "./routes"

// Nprogress
import Nprogress from 'nprogress/'
// Nprogress CSS
import 'nprogress/nprogress.css';

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    Nprogress.start()
  }

  // if user is not logged in redirect to auth page.
  if (requiresAuth && !auth.currentUser) {
    next('/account')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    Nprogress.done()
})

export default router
