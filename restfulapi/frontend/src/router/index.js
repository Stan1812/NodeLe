import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import admin from '@/components/admin.vue'
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
    }]
})