import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import admin from '@/components/admin.vue'
import login from '@/components/login.vue'
import timeline from '@/components/timeline.vue'
import classify from '@/components/classify.vue'
import links from '@/components/links.vue'
import favorites from '@/components/favorites.vue'
import aboutme from '@/components/aboutme.vue'
import detail from '@/components/detail.vue'
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
        }, {
            path: '/timeline',
            name: 'timeline',
            component: timeline
        }, {
            path: '/classify',
            name: 'classify',
            component: classify
        }, {
            path: "/links",
            name: 'links',
            component: links
        }, {
            path: "/favorites",
            name: 'favorites',
            component: favorites
        },
        {
            path: "/aboutme",
            name: 'aboutme',
            component: aboutme
        }, {
            path: "/detail",
            name: '/detail',
            component: detail
        }
    ]
})