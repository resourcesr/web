import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

// Nprogress
import Nprogress from 'nprogress/'
// Nprogress CSS
import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '',
        component: Home,
        meta: {
            breadcrumb: [
                {name: "Home"}
            ],
        },
    },
    {
        path: '/teacher',
        name: 'teacher',
        component: () => import('../views/Teacher.vue'),
        meta: {
            breadcrumb: [
                {name: "Home"}
            ],
        },
    },
    {
        path: '/classes/:department/:dname',
        name: 'classes:index',
        component: () => import('../views/Classes.vue'),
        meta: {
            title: (route) => route.params.dname,
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: (route) => route.params.dname, last: true}
            ],
        },
    },
    {
        path: '/classes/:department/:dname/:course/:name',
        name: 'courses:index',
        component: () => import('../views/Courses.vue'),
        meta: {
            title: (route) => route.params.name,
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Classes", route: 'classes:index', middle: true},
                {name: (route) => route.params.dname},
            ],
        },
    },
    {
        path: '/res/:department/:dname/:course/:name/:sub/:subName',
        name: 'courses:resources',
        component: () => import('../views/Resource.vue'),
        meta: {
            title: (route) => route.params.subName,
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Classes", route: 'classes:index'},
                {name: "Courses", route: "courses:index", middle: true},
                {name: (route) => route.params.subName},
            ],
        },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('../views/Auth/Account.vue'),
        meta: {
            title: "Account",
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Account"},
            ],
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Auth/Profile.vue'),
        meta: {
            title: "Profile",
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Profile", middle: true},
            ],
        }
    },
    {
        path: '/timetable',
        name: 'timetable',
        component: () => import('../views/About.vue')
    },
    {
        path: '/reset',
        name: 'reset',
        component: () => import('../views/Auth/reset_password.vue'),
        meta: {
            title: "Reset Password",
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Account", route: "account"},
                {name: "Reset Password"},
            ],
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/Management.vue'),
        meta: {
            requiresAuth: true,
            title: "Admistrator",
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Admin"}
            ],
        }
    },
    {
        path: '/accouncement',
        name: 'accouncement',
        component: () => import('../views/Accouncement.vue'),
        meta: {
            requiresAuth: true,
            title: "Accouncement",
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Accouncement"}
            ],
        }
    },
]

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
