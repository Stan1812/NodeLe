import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import admin from '@/components/admin.vue'
import login from '@/components/login.vue'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: home
    }, {
        path: '/admin',
        name: 'admin',
        component: admin
    }, {
        path: '/login',
        name: 'login',
        component: login
    }]
})