import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './modules/user'
import classes from './modules/classes'
import courses from './modules/courses'
import resources from './modules/resources'
import announcements from './modules/announcements'

export default new Vuex.Store({
    modules: {
        user,
        classes,
        courses,
        resources,
        announcements,
    }
})
