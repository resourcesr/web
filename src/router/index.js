import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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
        }
    },
    {
        path: '/complete/profile',
        name: 'fill',
        component: () => import('../views/Auth/fill.vue'),
        meta: {
            title: "Complete Profile",
        }
    },
    {
        path: '/reset',
        name: 'reset',
        component: () => import('../views/Auth/reset_password.vue'),
        meta: {
            title: "Reset Password",
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/Admin.vue'),
        meta: {
            requiresAuth: true,
            title: "Admistrator",
            breadcrumb: [
                {name: "Home", route: "Home"},
                {name: "Admin"}
            ],
        }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/account')
  } else {
    next()
  }
})

export default router
