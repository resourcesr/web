import Home from '@/views/Home.vue'

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
        component: () => import('@/views/Teacher.vue'),
        meta: {
            breadcrumb: [
                {name: "Home"}
            ],
        },
    },
    {
        path: '/classes/:department/:dname',
        name: 'classes:index',
        component: () => import('@/views/Classes.vue'),
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
        component: () => import('@/views/Courses.vue'),
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
        component: () => import('@/views/Resource.vue'),
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
        component: () => import('@/views/About.vue')
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('@/views/Auth/Account.vue'),
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
        component: () => import('@/views/Auth/Profile.vue'),
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
        component: () => import('@/views/About.vue')
    },
    {
        path: '/reset',
        name: 'reset',
        component: () => import('@/views/Auth/reset_password.vue'),
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
        component: () => import('@/views/Management.vue'),
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
        component: () => import('@/views/Accouncement.vue'),
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

export default routes
